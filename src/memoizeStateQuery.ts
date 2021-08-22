type Cache = Map<any, any>

/**
 * Creates a cache getter that memoizes the last state and returns corresponding
 * cache object. If the state object changes, the previous cache object
 * is abandoned and a new cache object is returned.
 *
 * The cache object itself is a JS Map
 *
 * @function stateCache
 * @returns {Function} getStateCache
 */
const stateCache = () => {
  let storedState: any
  let cache: Cache

  const getStateCache = (state: any): Cache => {
    if (state === storedState) {
      return cache
    } else {
      storedState = state
      cache = new Map()

      return cache
    }
  }

  return getStateCache
}

type StateQueryFn = (state: any, ...args: any[]) => any
type StateQueryKeyResolver = (...args: any[]) => any

const _keyResolverFirstArg = (first: any): any => first
const _keyResolverStrArgs = (...args: any): string => args.join('')

/**
 * Memoizes a function that takes as first argument the `state` object.
 * If the `state` changes (by identity/reference comparison), cache is reset.
 *
 * Calls to the memoized function attempt to locate a result in the cache object.
 *
 * @function memoizeStateQuery
 * @param {Function} queryFn
 * @param {Function} [keyResolver]
 */
export const memoizeStateQuery = (
  queryFn: StateQueryFn,
  keyResolver: StateQueryKeyResolver = queryFn.length === 1
    ? _keyResolverFirstArg
    : _keyResolverStrArgs
): StateQueryFn => {
  const getCache = stateCache()

  const memoized = (state: any, ...args: any[]) => {
    const cache = getCache(state)
    const cacheKey = keyResolver(...args)

    if (cache.has(cacheKey)) {
      return cache.get(cacheKey)
    } else {
      const result = queryFn(state, ...args)
      cache.set(cacheKey, result)

      return result
    }
  }

  return memoized
}
