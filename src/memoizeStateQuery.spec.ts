import { memoizeStateQuery } from './memoizeStateQuery'

describe('memoizeStateQuery(fn, keyResolver)', () => {
  test('query with no arguments', () => {
    const state1 = { key1: 'value1' }
    const state2 = { ...state1, key2: 'value2' }

    const getter = jest.fn((state) => Object.keys(state))
    const cachedGetter = memoizeStateQuery(getter)

    expect(cachedGetter(state1)).toEqual(['key1'])
    expect(getter.mock.calls.length).toEqual(1)
    expect(cachedGetter(state1)).toEqual(['key1'])
    expect(cachedGetter(state1)).toEqual(['key1'])
    expect(cachedGetter(state1)).toEqual(['key1'])
    expect(cachedGetter(state1)).toEqual(['key1'])
    expect(getter.mock.calls.length).toEqual(1)

    expect(cachedGetter(state2)).toEqual(['key1', 'key2'])
    expect(getter.mock.calls.length).toEqual(2)
  })

  test('query with 1 argument', () => {
    const state1 = { key1: 'value1' }
    const state2 = { ...state1, key2: 'value2' }

    const getter = jest.fn((state, key) => state[key])
    const cachedGetter = memoizeStateQuery(getter)

    expect(cachedGetter(state1, 'key1')).toEqual('value1')
    expect(getter.mock.calls.length).toEqual(1)
    expect(cachedGetter(state1, 'key2')).toEqual(undefined)
    expect(getter.mock.calls.length).toEqual(2)
    expect(cachedGetter(state1, 'key1')).toEqual('value1')
    expect(cachedGetter(state1, 'key2')).toEqual(undefined)
    expect(getter.mock.calls.length).toEqual(2)

    expect(cachedGetter(state2, 'key1')).toEqual('value1')
    expect(getter.mock.calls.length).toEqual(3)
    expect(cachedGetter(state2, 'key2')).toEqual('value2')
    expect(getter.mock.calls.length).toEqual(4)
    expect(cachedGetter(state2, 'key1')).toEqual('value1')
    expect(cachedGetter(state2, 'key2')).toEqual('value2')
    expect(getter.mock.calls.length).toEqual(4)
  })

  test('query with 2 arguments', () => {
    const state1 = { key1: 'value1' }
    const state2 = { ...state1, key2: 'value2' }

    const getter = jest.fn((state, key, length = Infinity) =>
      state[key].slice(0, length)
    )
    const cachedGetter = memoizeStateQuery(getter)

    expect(cachedGetter(state1, 'key1')).toEqual('value1')
    expect(cachedGetter(state1, 'key1')).toEqual('value1')
    expect(getter.mock.calls.length).toEqual(1)
    expect(cachedGetter(state1, 'key1', 1)).toEqual('v')
    expect(getter.mock.calls.length).toEqual(2)
    expect(cachedGetter(state1, 'key1', 1)).toEqual('v')
    expect(getter.mock.calls.length).toEqual(2)
    expect(cachedGetter(state1, 'key1', 2)).toEqual('va')
    expect(getter.mock.calls.length).toEqual(3)
    expect(cachedGetter(state1, 'key1', 1)).toEqual('v')
    expect(getter.mock.calls.length).toEqual(3)

    expect(cachedGetter(state2, 'key1')).toEqual('value1')
    expect(cachedGetter(state2, 'key1')).toEqual('value1')
    expect(getter.mock.calls.length).toEqual(4)
    expect(cachedGetter(state2, 'key1', 1)).toEqual('v')
    expect(getter.mock.calls.length).toEqual(5)
    expect(cachedGetter(state2, 'key1', 1)).toEqual('v')
    expect(getter.mock.calls.length).toEqual(5)
    expect(cachedGetter(state2, 'key1', 2)).toEqual('va')
    expect(getter.mock.calls.length).toEqual(6)
    expect(cachedGetter(state2, 'key1', 1)).toEqual('v')
    expect(getter.mock.calls.length).toEqual(6)
    expect(cachedGetter(state2, 'key2', 1)).toEqual('v')
    expect(getter.mock.calls.length).toEqual(7)
    expect(cachedGetter(state2, 'key2')).toEqual('value2')
    expect(getter.mock.calls.length).toEqual(8)
  })
})
