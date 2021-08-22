import type {
  Node,
  QueryProvider,
  FnNodeIdArray,
  FnNodeArray,
  FnNodeTree,
} from './types'

export type NodeArray = Node[]

export type NodeIdArray = string[]

/**
 * @function tree.nodeIdArray
 * @param {TreeState} nodesById
 * @returns {NodeId[]}
 */
export const nodeIdArray: QueryProvider<FnNodeIdArray> = () => (nodesById) =>
  Object.keys(nodesById)

/**
 * @function tree.nodeArray
 * @param {TreeState} nodesById
 * @returns {Node[]}
 */
export const nodeArray: QueryProvider<FnNodeArray> = (model) => (nodesById) =>
  model.nodeIdArray(nodesById).map((nodeId) => nodesById[nodeId])

/**
 * @function tree.nodeTree
 * @param {TreeState} nodesById
 * @param {NodeId} nodeId
 * @returns {NodeTree}
 */
export const nodeTree: QueryProvider<FnNodeTree> =
  (model) => (nodesById, nodeId) => {
    const node = nodesById[nodeId]

    const childNodeTrees = model
      .nodeArray(nodesById)
      .filter((node) => node.parentId === nodeId)
      .map((childNode) => model.nodeTree(nodesById, childNode.id))

    return [node, childNodeTrees.length > 0 ? childNodeTrees : null]
  }
