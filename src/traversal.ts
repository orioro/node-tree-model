import type {
  QueryProvider,
  FnIsRoot,
  FnRootNodeId,
  FnAncestorIds,
  FnNodePath,
  FnIsAncestorOf,
  FnIsDescendantOf,
  FnChildIds,
  FnIsChildOf,
  FnIsParentOf,
  FnSiblingIds,
  FnIsSiblingOf,
  FnCommonPath,
  FnCommonAncestorPath,
  FnCommonAncestorId,
} from './types'

import * as util from './util'

/**
 * Returns whether the given node is the root node (parentId === null)
 *
 * @function tree#isRoot
 * @param {TreeState} nodesById
 * @param {NodeId} nodeId
 * @returns {Boolean}
 */
export const isRoot: QueryProvider<FnIsRoot> = () => (nodesById, nodeId) =>
  nodesById[nodeId].parentId === null

/**
 * @function tree#rootNodeId
 * @param {TreeState} nodesById
 * @returns {NodeId}
 */
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

/**
 * Retrieves the list of node ancestors by walking up the tree
 * using `node.parentId`
 *
 * @function tree#ancestorIds
 * @param {TreeState} nodesById
 * @param {NodeId} nodeId
 * @returns {NodeId[]}
 */
export const ancestorIds: QueryProvider<FnAncestorIds> =
  (model) => (nodesById, nodeId) => {
    const node = nodesById[nodeId]

    return node.parentId
      ? [...model.ancestorIds(nodesById, node.parentId), node.parentId]
      : []
  }

/**
 * Returns the full path up to the node. A node path is
 * an array of nodeIds in sequence.
 *
 * @function tree#nodePath
 * @param {TreeState} nodesById
 * @param {NodeId} nodeId
 * @returns {NodePath}
 */
export const nodePath: QueryProvider<FnNodePath> =
  (model) => (nodesById, nodeId) =>
    [...model.ancestorIds(nodesById, nodeId), nodeId]

/**
 * @function tree#isAncestorOf
 * @param {TreeState} nodesById
 * @param {NodeId} candidateAncestorId
 * @param {NodeId} candidateDescendantId
 * @returns {Boolean}
 */
export const isAncestorOf: QueryProvider<FnIsAncestorOf> =
  (model) => (nodesById, candidateAncestorId, candidateDescendantId) =>
    model
      .ancestorIds(nodesById, candidateDescendantId)
      .includes(candidateAncestorId)

/**
 * @function tree#isDescendantOf
 * @param {TreeState} nodesById
 * @param {NodeId} candidateDescendantId
 * @param {NodeId} candidateAncestorId
 * @returns {Boolean}
 */
export const isDescendantOf: QueryProvider<FnIsDescendantOf> =
  (model) => (nodesById, candidateDescendantId, candidateAncestorId) =>
    model.isAncestorOf(nodesById, candidateAncestorId, candidateDescendantId)

/**
 * @function tree#childIds
 * @param {TreeState} nodesById
 * @param {NodeId} nodeId
 * @returns {NodeId[]}
 */
export const childIds: QueryProvider<FnChildIds> =
  (model) => (nodesById, nodeId) =>
    model
      .nodeIdArray(nodesById)
      .filter((otherNodeId) => nodesById[otherNodeId].parentId === nodeId)

/**
 * @function tree#isChildOf
 * @param {TreeState} nodesById
 * @param {NodeId} nodeId
 * @param {NodeId} candidateParentNodeId
 * @returns {Boolean}
 */
export const isChildOf: QueryProvider<FnIsChildOf> =
  () => (nodesById, nodeId, candidateParentNodeId) =>
    nodesById[nodeId].parentId === candidateParentNodeId

/**
 * @function tree#isChildOf
 * @param {TreeState} nodesById
 * @param {NodeId} nodeId
 * @param {NodeId} candidateChildNodeId
 * @returns {Boolean}
 */
export const isParentOf: QueryProvider<FnIsParentOf> =
  (model) => (nodesById, nodeId, candidateChildNodeId) =>
    model.isChildOf(nodesById, candidateChildNodeId, nodeId)

/**
 * @function tree#siblingIds
 * @param {TreeState} nodesById
 * @param {NodeId} nodeId
 * @returns {NodeId[]}
 */
export const siblingIds: QueryProvider<FnSiblingIds> =
  (model) => (nodesById, nodeId) =>
    nodesById[nodeId].parentId
      ? model
          .nodeIdArray(nodesById)
          .filter((candidateSiblingId) =>
            model.isSiblingOf(nodesById, nodeId, candidateSiblingId)
          )
      : []

/**
 * @function tree#isSiblingOf
 * @param {TreeState} nodesById
 * @param {NodeId} nodeId
 * @param {NodeId} otherNodeId
 * @returns {Boolean}
 */
export const isSiblingOf: QueryProvider<FnIsSiblingOf> =
  () => (nodesById, nodeId, otherNodeId) =>
    nodeId !== otherNodeId &&
    nodesById[nodeId].parentId === nodesById[otherNodeId].parentId

/**
 * @function tree#commonPath
 * @param {TreeState} nodesById
 * @param {NodeId[]} nodeIds
 * @returns {NodePath}
 */
export const commonPath: QueryProvider<FnCommonPath> =
  (model) => (nodesById, nodeIds) =>
    util.commonPath(nodeIds.map((nodeId) => model.nodePath(nodesById, nodeId)))

/**
 * @function tree#commonAncestorPath
 * @param {TreeState} nodesById
 * @param {NodeId[]} nodeIds
 * @returns {NodePath}
 */
export const commonAncestorPath: QueryProvider<FnCommonAncestorPath> =
  (model) => (nodesById, nodeIds) =>
    nodeIds.some((nodeId) => model.isRoot(nodesById, nodeId))
      ? []
      : util.commonPath(
          nodeIds.map((nodeId) =>
            model.nodePath(nodesById, nodesById[nodeId].parentId as string)
          )
        )
/**
 * @function tree#commonAncestorId
 * @param {TreeState} nodesById
 * @param {NodeId[]} nodeIds
 * @returns {NodeId | null}
 */
export const commonAncestorId: QueryProvider<FnCommonAncestorId> =
  (model) => (nodesById, nodeIds) => {
    const path = model.commonAncestorPath(nodesById, nodeIds)

    return path.length > 0 ? path[path.length - 1] : null
  }
