import { fromNodeArray } from './util'

test('fromNodeArray(nodeArray)', () => {
  const nodesById = fromNodeArray([
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
