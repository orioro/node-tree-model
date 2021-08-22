import { performance } from 'perf_hooks'
import { table } from 'table'
import { makeTreeNodes, TREE_1 } from '../test/trees'
import { callCounter } from '../test/util'

import * as treeStructure from './structure'
import * as treeTraversal from './traversal'

import { treeModel } from './treeModel'
import { TreeModel } from './types'

const _nonMemoTreeModel = () => {
  const model = {}

  const queries = {
    ...treeStructure,
    ...treeTraversal,
  }

  Object.assign(
    model,
    Object.keys(queries).reduce(
      (acc, queryId) => ({
        ...acc,
        [queryId]: queries[queryId](model),
      }),
      {}
    )
  )

  return model
}

const MEMO = treeModel()
const NON_MEMO = _nonMemoTreeModel()

const runNTimes = (fn, n) => {
  while (n > 0) {
    fn()

    n--
  }
}

const naiveBenchmark = (fn, runs = 10000) => {
  const start = performance.now()

  const result = fn()

  runNTimes(fn, runs - 1)

  const end = performance.now()

  return {
    result,
    timeElapsed: end - start,
  }
}

const TEST_NODES = makeTreeNodes([
  'root',
  'root_0',
  'root_0_0',
  'root_0_0_0',
  'root_0_0_1',
  'root_0_0_1_0',
  'root_0_0_1_1',
  'root_0_0_1_2',
  'root_0_0_1_2_0',
  'root_0_0_1_2_0_0',
  'root_0_0_1_2_0_0',
  'root_0_0_1_2_0_1',
  'root_0_0_1_2_0_1_0',
  'root_0_0_1_2_0_1_0_0',
  'root_0_0_1_2_0_1_0_0_0',
  'root_0_0_1_2_0_1_0_0_0_0',
  'root_0_0_1_2_0_1_0_0_0_1',
  'root_0_0_1_2_0_1_0_0_0_1_0',
  'root_0_0_1_2_0_2',
  'root_0_0_1_2_1',
  'root_0_0_1_2_2',
  'root_0_0_2',
  'root_0_1',
  'root_0_1_0',
  'root_0_1_1',
  'root_0_1_2',
  'root_1',
  'root_1_0',
  'root_1_1',
  'root_1_1_0',
  'root_1_1_0_0',
  'root_1_1_0_1',
  'root_1_1_0_1_0',
  'root_1_1_0_1_1',
  'root_1_1_0_1_1_0',
  'root_1_1_0_1_1_1',
  'root_1_1_0_1_1_1_0',
  'root_1_1_0_1_1_1_1',
  'root_1_1_0_2',
  'root_1_1_1',
  'root_1_1_2',
  'root_1_2',
  'root_2',
  'root_2_0',
  'root_2_0_0',
  'root_2_0_0_0',

  'root_3',
  'root_3_0',
  'root_3_0_0',
  'root_3_0_1',
  'root_3_0_1_0',
  'root_3_0_1_1',
  'root_3_0_1_2',
  'root_3_0_1_2_0',
  'root_3_0_1_2_0_0',
  'root_3_0_1_2_0_0',
  'root_3_0_1_2_0_1',
  'root_3_0_1_2_0_1_0',
  'root_3_0_1_2_0_1_0_0',
  'root_3_0_1_2_0_1_0_0_0',
  'root_3_0_1_2_0_1_0_0_0_0',
  'root_3_0_1_2_0_1_0_0_0_1',
  'root_3_0_1_2_0_1_0_0_0_1_0',
  'root_3_0_1_2_0_2',
  'root_3_0_1_2_1',
  'root_3_0_1_2_2',
  'root_3_0_2',
  'root_3_1',
  'root_3_1_0',
  'root_3_1_1',
  'root_3_1_2',
  'root_4',
  'root_4_0',
  'root_4_1',
  'root_4_1_0',
  'root_4_1_0_0',
  'root_4_1_0_1',
  'root_4_1_0_1_0',
  'root_4_1_0_1_1',
  'root_4_1_0_1_1_0',
  'root_4_1_0_1_1_1',
  'root_4_1_0_1_1_1_0',
  'root_4_1_0_1_1_1_1',
  'root_4_1_0_2',
  'root_4_1_1',
  'root_4_1_2',
  'root_4_2',
  'root_5',
  'root_5_0',
  'root_5_0_0',
  'root_5_0_0_0',
])

const RESULTS = []

type MemoCompareOpts = {
  timeRatio?: number | null
  id?: string | null
  pre?: (() => any) | null
  runs?: number
}

const _memoCompare = (
  fn,
  args,
  { timeRatio = null, id = null, pre = null, runs = 1000 }: MemoCompareOpts = {}
) => {
  const memoFn = typeof fn === 'string' ? MEMO[fn] : fn[0]
  const nonMemoFn = typeof fn === 'string' ? NON_MEMO[fn] : fn[1]

  const runMemoFn = () => memoFn(...args)
  const runNonMemoFn = () => nonMemoFn(...args)

  pre =
    typeof pre === 'function'
      ? pre
      : () => {
          runMemoFn()
          runNonMemoFn()
        }

  pre()

  const memoResult = naiveBenchmark(runMemoFn, runs)
  const nonMemoResult = naiveBenchmark(runNonMemoFn, runs)

  RESULTS.push([
    id,
    timeRatio,
    memoResult.timeElapsed,
    nonMemoResult.timeElapsed,
  ])

  expect(memoResult.result).toEqual(nonMemoResult.result)

  if (timeRatio !== null) {
    expect(memoResult.timeElapsed / nonMemoResult.timeElapsed).toBeLessThan(
      timeRatio
    )
  }

  return [memoResult, nonMemoResult]
}

describe('treeMemo(selectors)', () => {
  afterAll(() => {
    console.log(
      table([
        ['id', 'ratio', 'memo', 'non-memo'],
        ...RESULTS.map(([id, expectedRatio, memo, nonMemo]) => {
          const ratio = (memo / nonMemo).toFixed(4)
          return [
            id,
            expectedRatio
              ? `${ratio} (expected < ${expectedRatio.toFixed(4)})`
              : ratio,
            memo.toFixed(4),
            nonMemo.toFixed(4),
          ]
        }),
      ])
    )
  })

  test('nodeArray', () => {
    _memoCompare('nodeArray', [TEST_NODES], {
      id: 'nodeArray(TEST_NODES)',
      timeRatio: 1,
    })
  })

  describe('nodeTree', () => {
    test('root', () => {
      _memoCompare('nodeTree', [TEST_NODES, 'root'], {
        id: 'nodeTree(TEST_NODES, "root")',
        timeRatio: 0.05,
      })
    })

    test('root_1', () => {
      _memoCompare('nodeTree', [TEST_NODES, 'root_1'], {
        id: 'nodeTree(TEST_NODES, "root_1")',
        timeRatio: 0.1,
      })
    })
  })

  describe('isRoot', () => {
    test('root', () => {
      _memoCompare('isRoot', [TEST_NODES, 'root'], {
        id: 'isRoot(TEST_NODES, "root")',
      })
    })
  })

  describe('rootNodeId', () => {
    test('', () => {
      _memoCompare('rootNodeId', [TEST_NODES], {
        id: 'rootNodeId(TEST_NODES)',
        timeRatio: 1,
      })
    })
  })

  describe('ancestorIds', () => {
    test('', () => {
      _memoCompare('ancestorIds', [TEST_NODES, 'root_0_0_1_2_0_1_0_0_0_1_0'], {
        id: 'ancestorIds(TEST_NODES, "root_0_0_1_2_0_1_0_0_0_1_0")',
        timeRatio: 0.3,
      })
    })
  })

  describe('nodePath', () => {
    test('', () => {
      _memoCompare('nodePath', [TEST_NODES, 'root_0_0_1_2_0_1_0_0_0_1_0'], {
        id: 'nodePath(TEST_NODES, "root_0_0_1_2_0_1_0_0_0_1_0")',
        timeRatio: 0.3,
      })
    })
  })

  describe('isAncestorOf', () => {
    test('', () => {
      _memoCompare(
        'isAncestorOf',
        [TEST_NODES, 'root_0', 'root_0_0_1_2_0_1_0_0_0_1_0'],
        {
          id: 'isAncestorOf(TEST_NODES, "root_0", "root_0_0_1_2_0_1_0_0_0_1_0")',
          timeRatio: 0.5,
        }
      )
    })
  })

  describe('isDescendantOf', () => {
    test('', () => {
      _memoCompare(
        'isDescendantOf',
        [TEST_NODES, 'root_0_0_1_2_0_1_0_0_0_1_0', 'root_0'],
        {
          id: 'isDescendantOf(TEST_NODES, "root_0_0_1_2_0_1_0_0_0_1_0", "root_0")',
          timeRatio: 0.5,
        }
      )
    })
  })

  describe('childIds', () => {
    test('', () => {
      _memoCompare('childIds', [TEST_NODES, 'root'], {
        id: 'childIds(TEST_NODES, "root")',
        timeRatio: 0.5,
      })
    })
  })

  describe('siblingIds', () => {
    test('', () => {
      _memoCompare('siblingIds', [TEST_NODES, 'root_1'], {
        id: 'siblingIds(TEST_NODES, "root_1")',
        timeRatio: 0.5,
      })
    })
  })

  describe('isSiblingOf', () => {
    test('', () => {
      _memoCompare('isSiblingOf', [TEST_NODES, 'root_1', 'root_2'], {
        id: 'isSiblingOf(TEST_NODES, "root_1", "root_2")',
      })
    })
  })

  describe('custom fn', () => {
    test('', () => {
      const customQuery1 = (nodesById, nodeId) =>
        NON_MEMO.ancestorIds(nodesById, nodeId).reverse()

      const { memoCustomQuery } = treeModel({
        memoCustomQuery: (model) => (nodesById, nodeId) =>
          customQuery1(nodesById, nodeId),
      })

      _memoCompare(
        [memoCustomQuery, customQuery1],
        [TEST_NODES, 'root_0_0_1_2_0_1_0_0_0_1_0'],
        {
          id: 'customQuery1(TEST_NODES, "root_0_0_1_2_0_1_0_0_0_1_0")',
          timeRatio: 0.5,
        }
      )
    })
  })
})
