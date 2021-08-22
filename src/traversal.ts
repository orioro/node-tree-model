import type {
  QueryProvider,
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

export const isRoot: QueryProvider<FnIsRoot> = () => (nodesById, nodeId) =>
  nodesById[nodeId].parentId === null

export const rootNodeId: QueryProvider<FnRootNodeId> =
  (model) => (nodesById) => {
    const rootId = model
      .nodeIdArray(nodesById)
      .find((nodeId) => model.isRoot(nodesById, nodeId))

    if (!rootId) {
      throw new Error('No root node found')
    }

    return rootId
  }

export const ancestorIds: QueryProvider<FnAncestorIds> =
  (model) => (nodesById, nodeId) => {
    const node = nodesById[nodeId]

    return node.parentId
      ? [...model.ancestorIds(nodesById, node.parentId), node.parentId]
      : []
  }

export const nodePath: QueryProvider<FnNodePath> =
  (model) => (nodesById, nodeId) =>
    [...model.ancestorIds(nodesById, nodeId), nodeId]

export const isAncestorOf: QueryProvider<FnIsAncestorOf> =
  (model) => (nodesById, candidateAncestorId, candidateDescendantId) =>
    model
      .ancestorIds(nodesById, candidateDescendantId)
      .includes(candidateAncestorId)

export const isDescendantOf: QueryProvider<FnIsDescendantOf> =
  (model) => (nodesById, candidateDescendantId, candidateAncestorId) =>
    model.isAncestorOf(nodesById, candidateAncestorId, candidateDescendantId)

export const childIds: QueryProvider<FnChildIds> =
  (model) => (nodesById, nodeId) =>
    model
      .nodeIdArray(nodesById)
      .filter((otherNodeId) => nodesById[otherNodeId].parentId === nodeId)

export const siblingIds: QueryProvider<FnSiblingIds> =
  (model) => (nodesById, nodeId) =>
    nodesById[nodeId].parentId
      ? model
          .nodeIdArray(nodesById)
          .filter((candidateSiblingId) =>
            model.isSiblingOf(nodesById, nodeId, candidateSiblingId)
          )
      : []

export const isSiblingOf: QueryProvider<FnIsSiblingOf> =
  () => (nodesById, nodeId, otherNodeId) =>
    nodeId !== otherNodeId &&
    nodesById[nodeId].parentId === nodesById[otherNodeId].parentId

export const commonPath: QueryProvider<FnCommonPath> =
  (model) => (nodesById, nodeIds) =>
    util.commonPath(nodeIds.map((nodeId) => model.nodePath(nodesById, nodeId)))

export const commonAncestorPath: QueryProvider<FnCommonAncestorPath> =
  (model) => (nodesById, nodeIds) =>
    nodeIds.some((nodeId) => model.isRoot(nodesById, nodeId))
      ? []
      : util.commonPath(
          nodeIds.map((nodeId) =>
            model.nodePath(nodesById, nodesById[nodeId].parentId as string)
          )
        )
