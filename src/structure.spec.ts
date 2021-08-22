import { makeTreeNodes } from '../test/trees'

import { treeModel } from './index'

const model = treeModel()

test('model.nodeIdArray', () => {
  const nodes = makeTreeNodes([
    'root',
    'root_0',
    'root_0_0',
    'root_0_1',
    ['root_0_1_0', { someData: 'some-value' }],
    'root_1',
  ])

  expect(model.nodeIdArray(nodes)).toEqual([
    'root',
    'root_0',
    'root_0_0',
    'root_0_1',
    'root_0_1_0',
    'root_1',
  ])
})

describe('model.nodeTree(nodesById, nodeId)', () => {
  const nodes = makeTreeNodes([
    'root',
    'root_0',
    'root_0_0',
    'root_0_1',
    ['root_0_1_0', { someData: 'some-value' }],
    'root_1',
  ])

  test('root', () => {
    expect(model.nodeTree(nodes, 'root')).toEqual([
      { id: 'root', parentId: null },
      [
        [
          { id: 'root_0', parentId: 'root' },
          [
            [{ id: 'root_0_0', parentId: 'root_0' }, null],
            [
              { id: 'root_0_1', parentId: 'root_0' },
              [
                [
                  {
                    id: 'root_0_1_0',
                    parentId: 'root_0_1',
                    someData: 'some-value',
                  },
                  null,
                ],
              ],
            ],
          ],
        ],
        [{ id: 'root_1', parentId: 'root' }, null],
      ],
    ])
  })

  test('branches', () => {
    expect(model.nodeTree(nodes, 'root_0')).toEqual([
      { id: 'root_0', parentId: 'root' },
      [
        [{ id: 'root_0_0', parentId: 'root_0' }, null],
        [
          { id: 'root_0_1', parentId: 'root_0' },
          [
            [
              {
                id: 'root_0_1_0',
                parentId: 'root_0_1',
                someData: 'some-value',
              },
              null,
            ],
          ],
        ],
      ],
    ])

    expect(model.nodeTree(nodes, 'root_0_1')).toEqual([
      { id: 'root_0_1', parentId: 'root_0' },
      [
        [
          { id: 'root_0_1_0', parentId: 'root_0_1', someData: 'some-value' },
          null,
        ],
      ],
    ])
  })

  test('leaves', () => {
    expect(model.nodeTree(nodes, 'root_0_0')).toEqual([
      { id: 'root_0_0', parentId: 'root_0' },
      null,
    ])

    expect(model.nodeTree(nodes, 'root_0_1_0')).toEqual([
      { id: 'root_0_1_0', parentId: 'root_0_1', someData: 'some-value' },
      null,
    ])

    expect(model.nodeTree(nodes, 'root_1')).toEqual([
      { id: 'root_1', parentId: 'root' },
      null,
    ])
  })
})
