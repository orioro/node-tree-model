/**
 * String
 *
 * @typedef {String} NodeId
 */
export type NodeId = string

/**
 * A sequence of nodeIds that lead to the last node
 *
 * @typedef {NodeId[]} NodePath
 */
export type NodePath = NodeId[]

/**
 * ```
 * {
 *   id: NodeId
 *   parentId: NodeId | null
 *   [key: string]: any
 * }
 * ```
 *
 * @typedef {Object} Node
 */
export type Node = {
  id: NodeId
  parentId: NodeId | null
  [key: string]: any
}

/**
 * Index of all nodes that compose the tree indexed by id:
 * `{ [key: string]: Node }`
 *
 * @typedef {Object} TreeState
 */
export type TreeState = {
  [key: string]: Node
}

/**
 * Tree representation of the node
 * `[Node, NodeTree[] | null]`
 * @typedef NodeTree
 */
export type NodeTree = [Node, NodeTree[] | null]

type TreeModelQueryFn = (state: TreeState, ...args: any[]) => any

export type TreeModel = {
  nodeIdArray: FnNodeIdArray
  nodeArray: FnNodeArray
  nodeIsRoot: FnIsRoot
  nodeTree: FnNodeTree

  isRoot: FnIsRoot
  rootNodeId: FnRootNodeId
  ancestorIds: FnAncestorIds
  nodePath: FnNodePath
  isAncestorOf: FnIsAncestorOf
  isDescendantOf: FnIsDescendantOf
  childIds: FnChildIds
  isChildOf: FnIsChildOf
  isParentOf: FnIsParentOf
  siblingIds: FnSiblingIds
  isSiblingOf: FnIsSiblingOf
  commonPath: FnCommonPath
  commonAncestorPath: FnCommonAncestorPath

  [key: string]: TreeModelQueryFn
}

export type QueryProvider<T> = (model: TreeModel) => T
export type QueryProviderList = {
  [key: string]: QueryProvider<TreeModelQueryFn>
}

export type FnFromNodeArray = (nodeArray: Node[]) => TreeState
export type FnNodeIdArray = (state: TreeState) => NodeId[]
export type FnNodeArray = (state: TreeState) => Node[]
export type FnNodeTree = (state: TreeState, nodeId: NodeId) => NodeTree

export type FnIsRoot = (state: TreeState, nodeId: NodeId) => boolean
export type FnRootNodeId = (state: TreeState) => NodeId
export type FnAncestorIds = (state: TreeState, nodeId: NodeId) => NodeId[]
export type FnNodePath = (state: TreeState, nodeId: NodeId) => NodeId[]
export type FnIsAncestorOf = (
  state: TreeState,
  candidateAncestorId: NodeId,
  candidateDescendantId: NodeId
) => boolean
export type FnIsDescendantOf = (
  state: TreeState,
  candidateDescendantId: NodeId,
  candidateAncestorId: NodeId
) => boolean
export type FnChildIds = (state: TreeState, nodeId: NodeId) => NodeId[]
export type FnIsChildOf = (
  state: TreeState,
  nodeId: NodeId,
  candidateParentId: NodeId
) => boolean
export type FnIsParentOf = (
  state: TreeState,
  nodeId: NodeId,
  candidateChildId: NodeId
) => boolean
export type FnSiblingIds = (state: TreeState, nodeId: NodeId) => NodeId[]
export type FnIsSiblingOf = (
  state: TreeState,
  nodeId: NodeId,
  otherNodeId: NodeId
) => boolean
export type FnCommonPath = (state: TreeState, nodeIds: NodeId[]) => NodeId[]
export type FnCommonAncestorPath = (
  state: TreeState,
  nodeIds: NodeId[]
) => NodeId[]
