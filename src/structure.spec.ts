import { makeTreeNodes } from '../test/trees'

import {
  treeNodesById,
  treeNodeArray,
  treeNodeTree
} from './structure'

describe('treeNodesById(nodeArray)', () => {
  test('', () => {
    const nodesById = treeNodesById([
      { id: 'node-1', parentId: null },
      { id: 'node-2', parentId: 'node-1' },
      { id: 'node-3', parentId: 'node-1' },
    ])

    expect(nodesById).toEqual({
      'node-1': { id: 'node-1', parentId: null },
      'node-2': { id: 'node-2', parentId: 'node-1' },
      'node-3': { id: 'node-3', parentId: 'node-1' },
    })
  })
})

describe('treeNodeTree(nodesById, nodeId, memoTreeNodeArray, memoTreeNodeTree)', () => {
  const treeNodes = makeTreeNodes([
    'root',
    'root_0',
    'root_0_0',
    'root_0_1',
    ['root_0_1_0', { someData: 'some-value' }],
    'root_1'
  ])

  test('root', () => {
    expect(treeNodeTree(
      treeNodes,
      'root'
    )).toEqual([{ id: 'root', parentId: null }, [
      [{ id: 'root_0', parentId: 'root' }, [
        [{ id: 'root_0_0', parentId: 'root_0' }, null],
        [{ id: 'root_0_1', parentId: 'root_0' }, [
          [{ id: 'root_0_1_0', parentId: 'root_0_1', someData: 'some-value' }, null]
        ]]
      ]],
      [{ id: 'root_1', parentId: 'root' }, null],
    ]])
  })

  test('branches', () => {
    expect(treeNodeTree(
      treeNodes,
      'root_0'
    )).toEqual([{ id: 'root_0', parentId: 'root' }, [
      [{ id: 'root_0_0', parentId: 'root_0' }, null],
      [{ id: 'root_0_1', parentId: 'root_0' }, [
        [{ id: 'root_0_1_0', parentId: 'root_0_1', someData: 'some-value' }, null]
      ]]
    ]])

    expect(treeNodeTree(
      treeNodes,
      'root_0_1'
    )).toEqual([{ id: 'root_0_1', parentId: 'root_0' }, [
      [{ id: 'root_0_1_0', parentId: 'root_0_1', someData: 'some-value' }, null]
    ]])
  })

  test('leaves', () => {
    expect(treeNodeTree(
      treeNodes,
      'root_0_0'
    )).toEqual([{ id: 'root_0_0', parentId: 'root_0' }, null])

    expect(treeNodeTree(
      treeNodes,
      'root_0_1_0'
    )).toEqual([
      { id: 'root_0_1_0', parentId: 'root_0_1', someData: 'some-value' },
      null
    ])

    expect(treeNodeTree(
      treeNodes,
      'root_1'
    )).toEqual([{ id: 'root_1', parentId: 'root' }, null])
  })
})