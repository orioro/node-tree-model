import {
  treeNodeIsRoot,
  treeRootNodeId,

  treeNodeAncestorIds,
  treeNodePath,
  treeNodeIsAncestorOf,
  treeNodeIsDescendantOf,

  treeNodeChildNodeIds,

  treeNodeSiblingIds,
  treeNodeIsSiblingOf,

  treeNodesCommonPath,
  treeNodesCommonAncestorPath
} from './traversal'

import {
  makeTreeNodes
} from '../test/trees'

describe('treeNodeIsRoot(nodesById, nodeId)', () => {
  const treeNodes = makeTreeNodes([
    'root',
    'root_0',
    'root_0_0',
    'root_0_1',
    ['root_0_1_0', { someData: 'some-value' }],
    'root_1'
  ])

  test('root', () => {
    expect(treeNodeIsRoot(treeNodes, 'root')).toEqual(true)
  })

  test('branches and leaves', () => {
    expect(treeNodeIsRoot(treeNodes, 'root_0')).toEqual(false)
    expect(treeNodeIsRoot(treeNodes, 'root_0_0')).toEqual(false)
    expect(treeNodeIsRoot(treeNodes, 'root_0_1')).toEqual(false)
    expect(treeNodeIsRoot(treeNodes, 'root_0_1_0')).toEqual(false)
    expect(treeNodeIsRoot(treeNodes, 'root_1')).toEqual(false)
  })
})

describe('treeRootNodeId(nodesById)', () => {
  const treeNodes = makeTreeNodes([
    'root',
    'root_0',
    'root_0_0',
    'root_0_1',
    ['root_0_1_0', { someData: 'some-value' }],
    'root_1'
  ])

  test('', () => {
    expect(treeRootNodeId(treeNodes)).toEqual('root')
  })
})

describe('treeNodeAncestorIds(nodesById, nodeId)', () => {
  const treeNodes = makeTreeNodes([
    'root',
    'root_0',
    'root_0_0',
    'root_0_1',
    ['root_0_1_0', { someData: 'some-value' }],
    'root_1'
  ])

  test('root', () => {
    expect(treeNodeAncestorIds(treeNodes, 'root'))
      .toEqual([])
  })

  test('root_0', () => {
    expect(treeNodeAncestorIds(treeNodes, 'root_0'))
      .toEqual(['root'])
  })

  test('root_0_1', () => {
    expect(treeNodeAncestorIds(treeNodes, 'root_0_1'))
      .toEqual(['root', 'root_0'])
  })

  test('root_0_1_0', () => {
    expect(treeNodeAncestorIds(treeNodes, 'root_0_1_0'))
      .toEqual(['root', 'root_0', 'root_0_1'])
  })

  test('root_1', () => {
    expect(treeNodeAncestorIds(treeNodes, 'root_1'))
      .toEqual(['root'])
  })
})

describe('treeNodePath(nodesById, nodeId)', () => {
  const treeNodes = makeTreeNodes([
    'root',
    'root_0',
    'root_0_0',
    'root_0_1',
    ['root_0_1_0', { someData: 'some-value' }],
    'root_1'
  ])

  test('root', () => {
    expect(treeNodePath(treeNodes, 'root'))
      .toEqual(['root'])
  })

  test('root_0', () => {
    expect(treeNodePath(treeNodes, 'root_0'))
      .toEqual(['root', 'root_0'])
  })

  test('root_0_1', () => {
    expect(treeNodePath(treeNodes, 'root_0_1'))
      .toEqual(['root', 'root_0', 'root_0_1'])
  })

  test('root_0_1_0', () => {
    expect(treeNodePath(treeNodes, 'root_0_1_0'))
      .toEqual(['root', 'root_0', 'root_0_1', 'root_0_1_0'])
  })

  test('root_1', () => {
    expect(treeNodePath(treeNodes, 'root_1'))
      .toEqual(['root', 'root_1'])
  })
})

describe('treeNodeIsAncestorOf(nodesById, candidateAncestorId, candidateDescendantId)', () => {
  const treeNodes = makeTreeNodes([
    'root',
    'root_0',
    'root_0_0',
    'root_0_1',
    ['root_0_1_0', { someData: 'some-value' }],
    'root_1'
  ])

  test('root ancestor of any but self', () => {
    expect(treeNodeIsAncestorOf(treeNodes, 'root', 'root')).toEqual(false)
    expect(treeNodeIsAncestorOf(treeNodes, 'root', 'root_0')).toEqual(true)
    expect(treeNodeIsAncestorOf(treeNodes, 'root', 'root_0_0')).toEqual(true)
    expect(treeNodeIsAncestorOf(treeNodes, 'root', 'root_0_1')).toEqual(true)
    expect(treeNodeIsAncestorOf(treeNodes, 'root', 'root_0_1_0')).toEqual(true)
    expect(treeNodeIsAncestorOf(treeNodes, 'root', 'root_1')).toEqual(true)
  })

  test('root_0', () => {
    expect(treeNodeIsAncestorOf(treeNodes, 'root_0', 'root')).toEqual(false)
    expect(treeNodeIsAncestorOf(treeNodes, 'root_0', 'root_0')).toEqual(false)
    expect(treeNodeIsAncestorOf(treeNodes, 'root_0', 'root_0_0')).toEqual(true)
    expect(treeNodeIsAncestorOf(treeNodes, 'root_0', 'root_0_1')).toEqual(true)
    expect(treeNodeIsAncestorOf(treeNodes, 'root_0', 'root_0_1_0')).toEqual(true)
    expect(treeNodeIsAncestorOf(treeNodes, 'root_0', 'root_1')).toEqual(false)
  })

  test('root_0_0', () => {
    expect(treeNodeIsAncestorOf(treeNodes, 'root_0_0', 'root')).toEqual(false)
    expect(treeNodeIsAncestorOf(treeNodes, 'root_0_0', 'root_0')).toEqual(false)
    expect(treeNodeIsAncestorOf(treeNodes, 'root_0_0', 'root_0_0')).toEqual(false)
    expect(treeNodeIsAncestorOf(treeNodes, 'root_0_0', 'root_0_1')).toEqual(false)
    expect(treeNodeIsAncestorOf(treeNodes, 'root_0_0', 'root_0_1_0')).toEqual(false)
    expect(treeNodeIsAncestorOf(treeNodes, 'root_0_0', 'root_1')).toEqual(false)
  })

  test('root_0_1', () => {
    expect(treeNodeIsAncestorOf(treeNodes, 'root_0_1', 'root')).toEqual(false)
    expect(treeNodeIsAncestorOf(treeNodes, 'root_0_1', 'root_0')).toEqual(false)
    expect(treeNodeIsAncestorOf(treeNodes, 'root_0_1', 'root_0_0')).toEqual(false)
    expect(treeNodeIsAncestorOf(treeNodes, 'root_0_1', 'root_0_1')).toEqual(false)
    expect(treeNodeIsAncestorOf(treeNodes, 'root_0_1', 'root_0_1_0')).toEqual(true)
    expect(treeNodeIsAncestorOf(treeNodes, 'root_0_1', 'root_1')).toEqual(false)
  })
})

describe('treeNodeIsDescendantOf(nodesById, candidateAncestorId, candidateDescendantId)', () => {
  const treeNodes = makeTreeNodes([
    'root',
    'root_0',
    'root_0_0',
    'root_0_1',
    ['root_0_1_0', { someData: 'some-value' }],
    'root_1'
  ])

  test('root', () => {
    expect(treeNodeIsDescendantOf(treeNodes, 'root', 'root')).toEqual(false)
    expect(treeNodeIsDescendantOf(treeNodes, 'root', 'root_0')).toEqual(false)
    expect(treeNodeIsDescendantOf(treeNodes, 'root', 'root_0_0')).toEqual(false)
    expect(treeNodeIsDescendantOf(treeNodes, 'root', 'root_0_1')).toEqual(false)
    expect(treeNodeIsDescendantOf(treeNodes, 'root', 'root_0_1_0')).toEqual(false)
    expect(treeNodeIsDescendantOf(treeNodes, 'root', 'root_1')).toEqual(false)
  })

  test('root_0', () => {
    expect(treeNodeIsDescendantOf(treeNodes, 'root_0', 'root')).toEqual(true)
    expect(treeNodeIsDescendantOf(treeNodes, 'root_0', 'root_0')).toEqual(false)
    expect(treeNodeIsDescendantOf(treeNodes, 'root_0', 'root_0_0')).toEqual(false)
    expect(treeNodeIsDescendantOf(treeNodes, 'root_0', 'root_0_1')).toEqual(false)
    expect(treeNodeIsDescendantOf(treeNodes, 'root_0', 'root_0_1_0')).toEqual(false)
    expect(treeNodeIsDescendantOf(treeNodes, 'root_0', 'root_1')).toEqual(false)
  })

  test('root_0_0', () => {
    expect(treeNodeIsDescendantOf(treeNodes, 'root_0_0', 'root')).toEqual(true)
    expect(treeNodeIsDescendantOf(treeNodes, 'root_0_0', 'root_0')).toEqual(true)
    expect(treeNodeIsDescendantOf(treeNodes, 'root_0_0', 'root_0_0')).toEqual(false)
    expect(treeNodeIsDescendantOf(treeNodes, 'root_0_0', 'root_0_1')).toEqual(false)
    expect(treeNodeIsDescendantOf(treeNodes, 'root_0_0', 'root_0_1_0')).toEqual(false)
    expect(treeNodeIsDescendantOf(treeNodes, 'root_0_0', 'root_1')).toEqual(false)
  })

  test('root_0_1', () => {
    expect(treeNodeIsDescendantOf(treeNodes, 'root_0_1', 'root')).toEqual(true)
    expect(treeNodeIsDescendantOf(treeNodes, 'root_0_1', 'root_0')).toEqual(true)
    expect(treeNodeIsDescendantOf(treeNodes, 'root_0_1', 'root_0_0')).toEqual(false)
    expect(treeNodeIsDescendantOf(treeNodes, 'root_0_1', 'root_0_1')).toEqual(false)
    expect(treeNodeIsDescendantOf(treeNodes, 'root_0_1', 'root_0_1_0')).toEqual(false)
    expect(treeNodeIsDescendantOf(treeNodes, 'root_0_1', 'root_1')).toEqual(false)
  })
})

describe('treeNodeChildNodeIds(nodesById, nodeId)', () => {
  const treeNodes = makeTreeNodes([
    'root',
    'root_0',
    'root_0_0',
    'root_0_1',
    ['root_0_1_0', { someData: 'some-value' }],
    'root_1'
  ])

  test('root', () => {
    expect(treeNodeChildNodeIds(treeNodes, 'root'))
      .toEqual(['root_0', 'root_1'])
  })

  test('branches: root_0', () => {
    expect(treeNodeChildNodeIds(treeNodes, 'root_0'))
      .toEqual(['root_0_0', 'root_0_1'])
    expect(treeNodeChildNodeIds(treeNodes, 'root_0_1'))
      .toEqual(['root_0_1_0'])
  })

  test('leaves: root_1, root_0_1_0', () => {
    expect(treeNodeChildNodeIds(treeNodes, 'root_1'))
      .toEqual([])
  })
})

describe('treeNodeSiblingIds(nodesById, nodeId)', () => {
  const treeNodes = makeTreeNodes([
    'root',
    'root_0',
    'root_0_0',
    'root_0_1',
    ['root_0_1_0', { someData: 'some-value' }],
    'root_0_2',
    'root_0_3',
    'root_1'
  ])

  test('root', () => {
    expect(treeNodeSiblingIds(treeNodes, 'root'))
      .toEqual([])
  })

  test('single-sibling: root_0', () => {
    expect(treeNodeSiblingIds(treeNodes, 'root_0'))
      .toEqual(['root_1'])
  })

  test('multi-sibling: root_0_0, root_0_1, root_0_2, root_0_3', () => {
    expect(treeNodeSiblingIds(treeNodes, 'root_0_0'))
      .toEqual(['root_0_1', 'root_0_2', 'root_0_3'])
    expect(treeNodeSiblingIds(treeNodes, 'root_0_1'))
      .toEqual(['root_0_0', 'root_0_2', 'root_0_3'])
    expect(treeNodeSiblingIds(treeNodes, 'root_0_2'))
      .toEqual(['root_0_0', 'root_0_1', 'root_0_3'])
    expect(treeNodeSiblingIds(treeNodes, 'root_0_3'))
      .toEqual(['root_0_0', 'root_0_1', 'root_0_2'])
  })
})

describe('treeNodeIsSiblingOf(nodesById, nodeId, candidateSiblingId)', () => {
  const treeNodes = makeTreeNodes([
    'root',
    'root_0',
    'root_0_0',
    'root_0_1',
    ['root_0_1_0', { someData: 'some-value' }],
    'root_0_2',
    'root_0_3',
    'root_1'
  ])

  test('root', () => {
    expect(treeNodeIsSiblingOf(treeNodes, 'root', 'root')).toEqual(false)
    expect(treeNodeIsSiblingOf(treeNodes, 'root', 'root_0')).toEqual(false)
  })

  test('root_0', () => {
    expect(treeNodeIsSiblingOf(treeNodes, 'root_0', 'root')).toEqual(false)
    expect(treeNodeIsSiblingOf(treeNodes, 'root_0', 'root_0')).toEqual(false)
    expect(treeNodeIsSiblingOf(treeNodes, 'root_0', 'root_1')).toEqual(true)
  })

  test('root_0_0', () => {
    expect(treeNodeIsSiblingOf(treeNodes, 'root_0_0', 'root')).toEqual(false)
    expect(treeNodeIsSiblingOf(treeNodes, 'root_0_0', 'root_0')).toEqual(false)
    expect(treeNodeIsSiblingOf(treeNodes, 'root_0_0', 'root_1')).toEqual(false)
    expect(treeNodeIsSiblingOf(treeNodes, 'root_0_0', 'root_0_0')).toEqual(false)
    expect(treeNodeIsSiblingOf(treeNodes, 'root_0_0', 'root_0_1')).toEqual(true)
    expect(treeNodeIsSiblingOf(treeNodes, 'root_0_0', 'root_0_2')).toEqual(true)
    expect(treeNodeIsSiblingOf(treeNodes, 'root_0_0', 'root_0_3')).toEqual(true)
  })
})

describe('treeNodesCommonPath(nodesById, nodeIds)', () => {
  const treeNodes = makeTreeNodes([
    'root',
    'root_0',
    'root_0_0',
    'root_0_1',
    'root_0_1_0',
    'root_0_1_1',
    'root_0_1_1_0',
    'root_0_1_1_1',
    'root_0_1_1_1',
    'root_0_1_1_3',
    'root_0_1_1_3_0',
    'root_0_1_1_3_0_0',
    'root_0_1_1_3_0_1',
    'root_0_1_1_3_1',
    'root_0_2',
    'root_0_3',
    'root_1'
  ])

  test('root - when root node is involved', () => {
    expect(treeNodesCommonPath(treeNodes, [
      'root_0_0',
      'root',
      'root_1'
    ])).toEqual(['root'])
  })

  test('root_0_1_1_3 and root_0_1_1_3_0_1 - One node is ancestor of the other', () => {
    expect(treeNodesCommonPath(treeNodes, [
      'root_0_1_1_3',
      'root_0_1_1_3_0_1',
    ])).toEqual([
      'root',
      'root_0',
      'root_0_1',
      'root_0_1_1',
      'root_0_1_1_3',
    ])
  })

  test('root_0_1_1_3_1 and root_0_1_1_0 - different branches', () => {
    expect(treeNodesCommonPath(treeNodes, [
      'root_0_1_1_3_1',
      'root_0_1_1_0',
    ])).toEqual([
      'root',
      'root_0',
      'root_0_1',
      'root_0_1_1'
    ])
  })
})

describe('treeNodesCommonAncestorPath(nodesById, nodeIds)', () => {
  const treeNodes = makeTreeNodes([
    'root',
    'root_0',
    'root_0_0',
    'root_0_1',
    'root_0_1_0',
    'root_0_1_1',
    'root_0_1_1_0',
    'root_0_1_1_1',
    'root_0_1_1_1',
    'root_0_1_1_3',
    'root_0_1_1_3_0',
    'root_0_1_1_3_0_0',
    'root_0_1_1_3_0_1',
    'root_0_1_1_3_1',
    'root_0_2',
    'root_0_3',
    'root_1'
  ])

  test('root - when root is involved', () => {
    expect(treeNodesCommonAncestorPath(treeNodes, [
      'root_0_0',
      'root',
      'root_1'
    ])).toEqual(null)
  })

  test('root_0_1_1_3 and root_0_1_1_3_0_1 - One node is ancestor of the other', () => {
    expect(treeNodesCommonAncestorPath(treeNodes, [
      'root_0_1_1_3',
      'root_0_1_1_3_0_1',
    ])).toEqual([
      'root',
      'root_0',
      'root_0_1',
      'root_0_1_1'
    ])
  })

  test('root_0_1_1_3_1 and root_0_1_1_0 - different branches', () => {
    expect(treeNodesCommonAncestorPath(treeNodes, [
      'root_0_1_1_3_1',
      'root_0_1_1_0',
    ])).toEqual([
      'root',
      'root_0',
      'root_0_1',
      'root_0_1_1'
    ])
  })
})
