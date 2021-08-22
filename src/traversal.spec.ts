import { treeModel } from './'
import { makeTreeNodes } from '../test/trees'

const model = treeModel()

describe('model.isRoot(nodesById, nodeId)', () => {
  const treeNodes = makeTreeNodes([
    'root',
    'root_0',
    'root_0_0',
    'root_0_1',
    ['root_0_1_0', { someData: 'some-value' }],
    'root_1',
  ])

  test('root', () => {
    expect(model.isRoot(treeNodes, 'root')).toEqual(true)
  })

  test('branches and leaves', () => {
    expect(model.isRoot(treeNodes, 'root_0')).toEqual(false)
    expect(model.isRoot(treeNodes, 'root_0_0')).toEqual(false)
    expect(model.isRoot(treeNodes, 'root_0_1')).toEqual(false)
    expect(model.isRoot(treeNodes, 'root_0_1_0')).toEqual(false)
    expect(model.isRoot(treeNodes, 'root_1')).toEqual(false)
  })
})

describe('model.rootNodeId(nodesById)', () => {
  const treeNodes = makeTreeNodes([
    'root',
    'root_0',
    'root_0_0',
    'root_0_1',
    ['root_0_1_0', { someData: 'some-value' }],
    'root_1',
  ])

  test('model.rootNodeId(nodesById)', () => {
    expect(model.rootNodeId(treeNodes)).toEqual('root')
  })
})

describe('model.ancestorIds(nodesById, nodeId)', () => {
  const treeNodes = makeTreeNodes([
    'root',
    'root_0',
    'root_0_0',
    'root_0_1',
    ['root_0_1_0', { someData: 'some-value' }],
    'root_1',
  ])

  test('root', () => {
    expect(model.ancestorIds(treeNodes, 'root')).toEqual([])
  })

  test('root_0', () => {
    expect(model.ancestorIds(treeNodes, 'root_0')).toEqual(['root'])
  })

  test('root_0_1', () => {
    expect(model.ancestorIds(treeNodes, 'root_0_1')).toEqual(['root', 'root_0'])
  })

  test('root_0_1_0', () => {
    expect(model.ancestorIds(treeNodes, 'root_0_1_0')).toEqual([
      'root',
      'root_0',
      'root_0_1',
    ])
  })

  test('root_1', () => {
    expect(model.ancestorIds(treeNodes, 'root_1')).toEqual(['root'])
  })
})

describe('model.nodePath(nodesById, nodeId)', () => {
  const treeNodes = makeTreeNodes([
    'root',
    'root_0',
    'root_0_0',
    'root_0_1',
    ['root_0_1_0', { someData: 'some-value' }],
    'root_1',
  ])

  test('root', () => {
    expect(model.nodePath(treeNodes, 'root')).toEqual(['root'])
  })

  test('root_0', () => {
    expect(model.nodePath(treeNodes, 'root_0')).toEqual(['root', 'root_0'])
  })

  test('root_0_1', () => {
    expect(model.nodePath(treeNodes, 'root_0_1')).toEqual([
      'root',
      'root_0',
      'root_0_1',
    ])
  })

  test('root_0_1_0', () => {
    expect(model.nodePath(treeNodes, 'root_0_1_0')).toEqual([
      'root',
      'root_0',
      'root_0_1',
      'root_0_1_0',
    ])
  })

  test('root_1', () => {
    expect(model.nodePath(treeNodes, 'root_1')).toEqual(['root', 'root_1'])
  })
})

describe('model.isAncestorOf(nodesById, candidateAncestorId, candidateDescendantId)', () => {
  const treeNodes = makeTreeNodes([
    'root',
    'root_0',
    'root_0_0',
    'root_0_1',
    ['root_0_1_0', { someData: 'some-value' }],
    'root_1',
  ])

  test('root ancestor of any but self', () => {
    expect(model.isAncestorOf(treeNodes, 'root', 'root')).toEqual(false)
    expect(model.isAncestorOf(treeNodes, 'root', 'root_0')).toEqual(true)
    expect(model.isAncestorOf(treeNodes, 'root', 'root_0_0')).toEqual(true)
    expect(model.isAncestorOf(treeNodes, 'root', 'root_0_1')).toEqual(true)
    expect(model.isAncestorOf(treeNodes, 'root', 'root_0_1_0')).toEqual(true)
    expect(model.isAncestorOf(treeNodes, 'root', 'root_1')).toEqual(true)
  })

  test('root_0', () => {
    expect(model.isAncestorOf(treeNodes, 'root_0', 'root')).toEqual(false)
    expect(model.isAncestorOf(treeNodes, 'root_0', 'root_0')).toEqual(false)
    expect(model.isAncestorOf(treeNodes, 'root_0', 'root_0_0')).toEqual(true)
    expect(model.isAncestorOf(treeNodes, 'root_0', 'root_0_1')).toEqual(true)
    expect(model.isAncestorOf(treeNodes, 'root_0', 'root_0_1_0')).toEqual(true)
    expect(model.isAncestorOf(treeNodes, 'root_0', 'root_1')).toEqual(false)
  })

  test('root_0_0', () => {
    expect(model.isAncestorOf(treeNodes, 'root_0_0', 'root')).toEqual(false)
    expect(model.isAncestorOf(treeNodes, 'root_0_0', 'root_0')).toEqual(false)
    expect(model.isAncestorOf(treeNodes, 'root_0_0', 'root_0_0')).toEqual(false)
    expect(model.isAncestorOf(treeNodes, 'root_0_0', 'root_0_1')).toEqual(false)
    expect(model.isAncestorOf(treeNodes, 'root_0_0', 'root_0_1_0')).toEqual(
      false
    )
    expect(model.isAncestorOf(treeNodes, 'root_0_0', 'root_1')).toEqual(false)
  })

  test('root_0_1', () => {
    expect(model.isAncestorOf(treeNodes, 'root_0_1', 'root')).toEqual(false)
    expect(model.isAncestorOf(treeNodes, 'root_0_1', 'root_0')).toEqual(false)
    expect(model.isAncestorOf(treeNodes, 'root_0_1', 'root_0_0')).toEqual(false)
    expect(model.isAncestorOf(treeNodes, 'root_0_1', 'root_0_1')).toEqual(false)
    expect(model.isAncestorOf(treeNodes, 'root_0_1', 'root_0_1_0')).toEqual(
      true
    )
    expect(model.isAncestorOf(treeNodes, 'root_0_1', 'root_1')).toEqual(false)
  })
})

describe('model.isDescendantOf(nodesById, candidateAncestorId, candidateDescendantId)', () => {
  const treeNodes = makeTreeNodes([
    'root',
    'root_0',
    'root_0_0',
    'root_0_1',
    ['root_0_1_0', { someData: 'some-value' }],
    'root_1',
  ])

  test('root', () => {
    expect(model.isDescendantOf(treeNodes, 'root', 'root')).toEqual(false)
    expect(model.isDescendantOf(treeNodes, 'root', 'root_0')).toEqual(false)
    expect(model.isDescendantOf(treeNodes, 'root', 'root_0_0')).toEqual(false)
    expect(model.isDescendantOf(treeNodes, 'root', 'root_0_1')).toEqual(false)
    expect(model.isDescendantOf(treeNodes, 'root', 'root_0_1_0')).toEqual(false)
    expect(model.isDescendantOf(treeNodes, 'root', 'root_1')).toEqual(false)
  })

  test('root_0', () => {
    expect(model.isDescendantOf(treeNodes, 'root_0', 'root')).toEqual(true)
    expect(model.isDescendantOf(treeNodes, 'root_0', 'root_0')).toEqual(false)
    expect(model.isDescendantOf(treeNodes, 'root_0', 'root_0_0')).toEqual(false)
    expect(model.isDescendantOf(treeNodes, 'root_0', 'root_0_1')).toEqual(false)
    expect(model.isDescendantOf(treeNodes, 'root_0', 'root_0_1_0')).toEqual(
      false
    )
    expect(model.isDescendantOf(treeNodes, 'root_0', 'root_1')).toEqual(false)
  })

  test('root_0_0', () => {
    expect(model.isDescendantOf(treeNodes, 'root_0_0', 'root')).toEqual(true)
    expect(model.isDescendantOf(treeNodes, 'root_0_0', 'root_0')).toEqual(true)
    expect(model.isDescendantOf(treeNodes, 'root_0_0', 'root_0_0')).toEqual(
      false
    )
    expect(model.isDescendantOf(treeNodes, 'root_0_0', 'root_0_1')).toEqual(
      false
    )
    expect(model.isDescendantOf(treeNodes, 'root_0_0', 'root_0_1_0')).toEqual(
      false
    )
    expect(model.isDescendantOf(treeNodes, 'root_0_0', 'root_1')).toEqual(false)
  })

  test('root_0_1', () => {
    expect(model.isDescendantOf(treeNodes, 'root_0_1', 'root')).toEqual(true)
    expect(model.isDescendantOf(treeNodes, 'root_0_1', 'root_0')).toEqual(true)
    expect(model.isDescendantOf(treeNodes, 'root_0_1', 'root_0_0')).toEqual(
      false
    )
    expect(model.isDescendantOf(treeNodes, 'root_0_1', 'root_0_1')).toEqual(
      false
    )
    expect(model.isDescendantOf(treeNodes, 'root_0_1', 'root_0_1_0')).toEqual(
      false
    )
    expect(model.isDescendantOf(treeNodes, 'root_0_1', 'root_1')).toEqual(false)
  })
})

describe('model.childIds(nodesById, nodeId)', () => {
  const treeNodes = makeTreeNodes([
    'root',
    'root_0',
    'root_0_0',
    'root_0_1',
    ['root_0_1_0', { someData: 'some-value' }],
    'root_1',
  ])

  test('root', () => {
    expect(model.childIds(treeNodes, 'root')).toEqual(['root_0', 'root_1'])
  })

  test('branches: root_0', () => {
    expect(model.childIds(treeNodes, 'root_0')).toEqual([
      'root_0_0',
      'root_0_1',
    ])
    expect(model.childIds(treeNodes, 'root_0_1')).toEqual(['root_0_1_0'])
  })

  test('leaves: root_1, root_0_1_0', () => {
    expect(model.childIds(treeNodes, 'root_1')).toEqual([])
  })
})

test('model.isChildOf(nodesById, nodeId, candidateParentId)', () => {
  const treeNodes = makeTreeNodes([
    'root',
    'root_0',
    'root_0_0',
    'root_0_1',
    ['root_0_1_0', { someData: 'some-value' }],
    'root_1',
  ])

  expect(model.isChildOf(treeNodes, 'root_0', 'root')).toEqual(true)
  expect(model.isChildOf(treeNodes, 'root_0_0', 'root')).toEqual(false)
})

test('model.isParentOf(nodesById, nodeId, candidateChildId)', () => {
  const treeNodes = makeTreeNodes([
    'root',
    'root_0',
    'root_0_0',
    'root_0_1',
    ['root_0_1_0', { someData: 'some-value' }],
    'root_1',
  ])

  expect(model.isParentOf(treeNodes, 'root_0', 'root_0_0')).toEqual(true)
  expect(model.isParentOf(treeNodes, 'root_0', 'root_0_1')).toEqual(true)
  expect(model.isParentOf(treeNodes, 'root_0', 'root_1')).toEqual(false)
})

describe('model.siblingIds(nodesById, nodeId)', () => {
  const treeNodes = makeTreeNodes([
    'root',
    'root_0',
    'root_0_0',
    'root_0_1',
    ['root_0_1_0', { someData: 'some-value' }],
    'root_0_2',
    'root_0_3',
    'root_1',
  ])

  test('root', () => {
    expect(model.siblingIds(treeNodes, 'root')).toEqual([])
  })

  test('single-sibling: root_0', () => {
    expect(model.siblingIds(treeNodes, 'root_0')).toEqual(['root_1'])
  })

  test('multi-sibling: root_0_0, root_0_1, root_0_2, root_0_3', () => {
    expect(model.siblingIds(treeNodes, 'root_0_0')).toEqual([
      'root_0_1',
      'root_0_2',
      'root_0_3',
    ])
    expect(model.siblingIds(treeNodes, 'root_0_1')).toEqual([
      'root_0_0',
      'root_0_2',
      'root_0_3',
    ])
    expect(model.siblingIds(treeNodes, 'root_0_2')).toEqual([
      'root_0_0',
      'root_0_1',
      'root_0_3',
    ])
    expect(model.siblingIds(treeNodes, 'root_0_3')).toEqual([
      'root_0_0',
      'root_0_1',
      'root_0_2',
    ])
  })
})

describe('model.isSiblingOf(nodesById, nodeId, candidateSiblingId)', () => {
  const treeNodes = makeTreeNodes([
    'root',
    'root_0',
    'root_0_0',
    'root_0_1',
    ['root_0_1_0', { someData: 'some-value' }],
    'root_0_2',
    'root_0_3',
    'root_1',
  ])

  test('root', () => {
    expect(model.isSiblingOf(treeNodes, 'root', 'root')).toEqual(false)
    expect(model.isSiblingOf(treeNodes, 'root', 'root_0')).toEqual(false)
  })

  test('root_0', () => {
    expect(model.isSiblingOf(treeNodes, 'root_0', 'root')).toEqual(false)
    expect(model.isSiblingOf(treeNodes, 'root_0', 'root_0')).toEqual(false)
    expect(model.isSiblingOf(treeNodes, 'root_0', 'root_1')).toEqual(true)
  })

  test('root_0_0', () => {
    expect(model.isSiblingOf(treeNodes, 'root_0_0', 'root')).toEqual(false)
    expect(model.isSiblingOf(treeNodes, 'root_0_0', 'root_0')).toEqual(false)
    expect(model.isSiblingOf(treeNodes, 'root_0_0', 'root_1')).toEqual(false)
    expect(model.isSiblingOf(treeNodes, 'root_0_0', 'root_0_0')).toEqual(false)
    expect(model.isSiblingOf(treeNodes, 'root_0_0', 'root_0_1')).toEqual(true)
    expect(model.isSiblingOf(treeNodes, 'root_0_0', 'root_0_2')).toEqual(true)
    expect(model.isSiblingOf(treeNodes, 'root_0_0', 'root_0_3')).toEqual(true)
  })
})

describe('model.commonPath(nodesById, nodeIds)', () => {
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
    'root_1',
  ])

  test('root - when root node is involved', () => {
    expect(model.commonPath(treeNodes, ['root_0_0', 'root', 'root_1'])).toEqual(
      ['root']
    )
  })

  test('root_0_1_1_3 and root_0_1_1_3_0_1 - One node is ancestor of the other', () => {
    expect(
      model.commonPath(treeNodes, ['root_0_1_1_3', 'root_0_1_1_3_0_1'])
    ).toEqual(['root', 'root_0', 'root_0_1', 'root_0_1_1', 'root_0_1_1_3'])
  })

  test('root_0_1_1_3_1 and root_0_1_1_0 - different branches', () => {
    expect(
      model.commonPath(treeNodes, ['root_0_1_1_3_1', 'root_0_1_1_0'])
    ).toEqual(['root', 'root_0', 'root_0_1', 'root_0_1_1'])
  })
})

describe('model.commonAncestorPath(nodesById, nodeIds)', () => {
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
    'root_1',
  ])

  test('root - when root is involved', () => {
    expect(
      model.commonAncestorPath(treeNodes, ['root_0_0', 'root', 'root_1'])
    ).toEqual([])
  })

  test('root_0_1_1_3 and root_0_1_1_3_0_1 - One node is ancestor of the other', () => {
    expect(
      model.commonAncestorPath(treeNodes, ['root_0_1_1_3', 'root_0_1_1_3_0_1'])
    ).toEqual(['root', 'root_0', 'root_0_1', 'root_0_1_1'])
  })

  test('root_0_1_1_3_1 and root_0_1_1_0 - different branches', () => {
    expect(
      model.commonAncestorPath(treeNodes, ['root_0_1_1_3_1', 'root_0_1_1_0'])
    ).toEqual(['root', 'root_0', 'root_0_1', 'root_0_1_1'])
  })
})

describe('model.commonAncestorId(nodesById, nodeIds)', () => {
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
    'root_1',
  ])

  test('root - when root is involved', () => {
    expect(
      model.commonAncestorId(treeNodes, ['root_0_0', 'root', 'root_1'])
    ).toEqual(null)
  })

  test('root_0_1_1_3 and root_0_1_1_3_0_1 - One node is ancestor of the other', () => {
    expect(
      model.commonAncestorId(treeNodes, ['root_0_1_1_3', 'root_0_1_1_3_0_1'])
    ).toEqual('root_0_1_1')
  })

  test('root_0_1_1_3_1 and root_0_1_1_0 - different branches', () => {
    expect(
      model.commonAncestorId(treeNodes, ['root_0_1_1_3_1', 'root_0_1_1_0'])
    ).toEqual('root_0_1_1')
  })
})
