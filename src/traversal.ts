import {
  NodesById,
  Node,
  treeNodeIdArray
} from './structure'

import {
  treePathCommon
} from './path'

export const treeNodeIsRoot = (
  nodesById:NodesById,
  nodeId:string
):boolean => (
  nodesById[nodeId].parentId === null ||
  nodesById[nodeId].parentId === undefined
)

export const treeRootNodeId = (
  nodesById:NodesById,
  memoNodeIdArray = treeNodeIdArray
):(string | null) => (
  memoNodeIdArray(nodesById)
    .find(nodeId => treeNodeIsRoot(nodesById, nodeId)) || null
)

export const treeNodeAncestorIds = (
  nodesById:NodesById,
  nodeId:string,
  memoTreeNodeAncestorIds = treeNodeAncestorIds
) => {
  const node = nodesById[nodeId]

  return node.parentId
    ? [
        ...memoTreeNodeAncestorIds(nodesById, node.parentId),
        node.parentId
      ]
    : []
}

export const treeNodePath = (
  nodesById:NodesById,
  nodeId:string,
  memoTreeNodeAncestorIds = treeNodeAncestorIds
) => ([
  ...memoTreeNodeAncestorIds(nodesById, nodeId),
  nodeId
])

export const treeNodeIsAncestorOf = (
  nodesById:NodesById,
  candidateAncestorId:string,
  candidateDescendantId:string,
  memoTreeNodeAncestorIds = treeNodeAncestorIds
):boolean => (
  memoTreeNodeAncestorIds(nodesById, candidateDescendantId)
    .includes(candidateAncestorId)
)

export const treeNodeIsDescendantOf = (
  nodesById:NodesById,
  candidateDescendantId:string,
  candidateAncestorId:string,
  memoTreeNodeAncestorIds = treeNodeAncestorIds
):boolean => (
  memoTreeNodeAncestorIds(nodesById, candidateDescendantId)
    .includes(candidateAncestorId)
)

export const treeNodeChildNodeIds = (
  nodesById:NodesById,
  nodeId:string,
  memoNodeIdArray = treeNodeIdArray
) => (
  memoNodeIdArray(nodesById)
    .filter(otherNodeId => nodesById[otherNodeId].parentId === nodeId)
)

export const treeNodeSiblingIds = (
  nodesById:NodesById,
  nodeId:string,
  memoNodeIdArray = treeNodeIdArray
) => (
  nodesById[nodeId].parentId
    ? memoNodeIdArray(nodesById)
        .filter(candidateSiblingId => treeNodeIsSiblingOf(
          nodesById,
          nodeId,
          candidateSiblingId
        ))
    : []
)

export const treeNodeIsSiblingOf = (
  nodesById:NodesById,
  nodeId:string,
  otherNodeId:string,
):boolean => (
  nodeId !== otherNodeId &&
  nodesById[nodeId].parentId === nodesById[otherNodeId].parentId
)

export const treeNodesCommonPath = (
  nodesById:NodesById,
  nodeIds:string[],
  memoTreeNodePath = treeNodePath
) => treePathCommon(
  nodeIds.map(nodeId => memoTreeNodePath(nodesById, nodeId))
)

export const treeNodesCommonAncestorPath = (
  nodesById:NodesById,
  nodeIds:string[],
  memoTreeNodePath = treeNodePath
) => (
  nodeIds.some(nodeId => treeNodeIsRoot(nodesById, nodeId))
    ? null
    : treePathCommon(
        nodeIds.map(nodeId => memoTreeNodePath(nodesById, nodesById[nodeId].parentId as string))
      )
)
