import type {
  Node,
  QueryProvider,
  FnNodeIdArray,
  FnNodeArray,
  FnNodeTree,
} from './types'

export type NodeArray = Node[]

export type NodeIdArray = string[]

export const nodeIdArray: QueryProvider<FnNodeIdArray> = () => (nodesById) =>
  Object.keys(nodesById)

export const nodeArray: QueryProvider<FnNodeArray> = (model) => (nodesById) =>
  model.nodeIdArray(nodesById).map((nodeId) => nodesById[nodeId])

export const nodeTree: QueryProvider<FnNodeTree> =
  (model) => (nodesById, nodeId) => {
    const node = nodesById[nodeId]

    const childNodeTrees = model
      .nodeArray(nodesById)
      .filter((node) => node.parentId === nodeId)
      .map((childNode) => model.nodeTree(nodesById, childNode.id))

    return [node, childNodeTrees.length > 0 ? childNodeTrees : null]
  }
