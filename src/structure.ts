export type Node = {
  id: string,
  parentId: (string | null),
  [key: string]: any,
}

export type NodeArray = Node[]

export type NodeIdArray = string[]

export type NodesById = {
  [key: string]: Node
}

export type NodeTree = [
  Node,
  (NodeTree[] | null)
]

export const treeNodesById = (
  nodeArray:NodeArray
):NodesById => nodeArray.reduce((acc, node) => ({
  ...acc,
  [node.id]: node
}), {})

export const treeNodeIdArray = (
  nodesById:NodesById
):NodeIdArray => Object.keys(nodesById)

export const treeNodeArray = (
  nodesById:NodesById,
  memoTreeNodeIdArray = treeNodeIdArray
):NodeArray => memoTreeNodeIdArray(nodesById).map(nodeId => nodesById[nodeId])

export const treeNodeTree = (
  nodesById:NodesById,
  nodeId:string,
  memoTreeNodeArray = treeNodeArray,
  memoTreeNodeTree = treeNodeTree
):NodeTree => {
  const node = nodesById[nodeId]

  const childNodeTrees = memoTreeNodeArray(nodesById)
    .filter(node => node.parentId === nodeId)
    .map(childNode => memoTreeNodeTree(nodesById, childNode.id))

  return [
    node,
    childNodeTrees.length > 0 ? childNodeTrees : null
  ]
}
