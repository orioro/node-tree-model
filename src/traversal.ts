import type {
  TreeModel,
  FnIsRoot,
  FnRootNodeId,
  FnAncestorIds,
  FnNodePath,
  FnIsAncestorOf,
  FnIsDescendantOf,
  FnChildIds,
  FnSiblingIds,
  FnIsSiblingOf,
  FnCommonPath,
  FnCommonAncestorPath,
} from './types'

import * as util from './util'

export const isRoot =
  (model: TreeModel): FnIsRoot =>
  (nodesById, nodeId) =>
    nodesById[nodeId].parentId === null

export const rootNodeId =
  (model: TreeModel): FnRootNodeId =>
  (nodesById) => {
    const rootId = model
      .nodeIdArray(nodesById)
      .find((nodeId) => model.isRoot(nodesById, nodeId))

    if (!rootId) {
      throw new Error('No root node found')
    }

    return rootId
  }

export const ancestorIds =
  (model: TreeModel): FnAncestorIds =>
  (nodesById, nodeId) => {
    const node = nodesById[nodeId]

    return node.parentId
      ? [...model.ancestorIds(nodesById, node.parentId), node.parentId]
      : []
  }

export const nodePath =
  (model: TreeModel): FnNodePath =>
  (nodesById, nodeId) =>
    [...model.ancestorIds(nodesById, nodeId), nodeId]

export const isAncestorOf =
  (model: TreeModel): FnIsAncestorOf =>
  (nodesById, candidateAncestorId, candidateDescendantId) =>
    model
      .ancestorIds(nodesById, candidateDescendantId)
      .includes(candidateAncestorId)

export const isDescendantOf =
  (model: TreeModel): FnIsDescendantOf =>
  (nodesById, candidateDescendantId, candidateAncestorId) =>
    model.isAncestorOf(nodesById, candidateAncestorId, candidateDescendantId)

export const childIds =
  (model: TreeModel): FnChildIds =>
  (nodesById, nodeId) =>
    model
      .nodeIdArray(nodesById)
      .filter((otherNodeId) => nodesById[otherNodeId].parentId === nodeId)

export const siblingIds =
  (model: TreeModel): FnSiblingIds =>
  (nodesById, nodeId) =>
    nodesById[nodeId].parentId
      ? model
          .nodeIdArray(nodesById)
          .filter((candidateSiblingId) =>
            model.isSiblingOf(nodesById, nodeId, candidateSiblingId)
          )
      : []

export const isSiblingOf =
  (model: TreeModel): FnIsSiblingOf =>
  (nodesById, nodeId, otherNodeId) =>
    nodeId !== otherNodeId &&
    nodesById[nodeId].parentId === nodesById[otherNodeId].parentId

export const commonPath =
  (model: TreeModel): FnCommonPath =>
  (nodesById, nodeIds) =>
    util.commonPath(nodeIds.map((nodeId) => model.nodePath(nodesById, nodeId)))

export const commonAncestorPath =
  (model: TreeModel): FnCommonAncestorPath =>
  (nodesById, nodeIds) =>
    nodeIds.some((nodeId) => model.isRoot(nodesById, nodeId))
      ? []
      : util.commonPath(
          nodeIds.map((nodeId) =>
            model.nodePath(nodesById, nodesById[nodeId].parentId as string)
          )
        )
