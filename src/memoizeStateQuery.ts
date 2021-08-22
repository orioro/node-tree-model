type Cache = Map<any, any>

/**
 * Simplified version of memoizeOne for memoizing
 * functions that take only 1 single argument
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
