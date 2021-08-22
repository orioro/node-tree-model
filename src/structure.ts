import type {
  TreeModel,
  Node,
  FnFromNodeArray,
  FnNodeIdArray,
  FnNodeArray,
  FnNodeTree,
} from './types'

export type NodeArray = Node[]

export type NodeIdArray = string[]

export const nodeIdArray =
  (model: TreeModel): FnNodeIdArray =>
  (nodesById) =>
    Object.keys(nodesById)

export const nodeArray =
  (model: TreeModel): FnNodeArray =>
  (nodesById) =>
    model.nodeIdArray(nodesById).map((nodeId) => nodesById[nodeId])

export const nodeTree =
  (model: TreeModel): FnNodeTree =>
  (nodesById, nodeId) => {
    const node = nodesById[nodeId]

    const childNodeTrees = model
      .nodeArray(nodesById)
      .filter((node) => node.parentId === nodeId)
      .map((childNode) => model.nodeTree(nodesById, childNode.id))

    return [node, childNodeTrees.length > 0 ? childNodeTrees : null]
  }
