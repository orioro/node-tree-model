import type { NodePath, Node, TreeState } from './types'

/**
 * Generates a tree state (nodes indexed by id) from an array of node objects.
 *
 * @function fromNodeArray
 * @param {Node[]} nodeArray
 * @returns {TreeState}
 */
export const fromNodeArray = (nodeArray: Node[]): TreeState =>
  nodeArray.reduce(
    (acc, node) => ({
      ...acc,
      [node.id]: node,
    }),
    {}
  )

/**
 * Given a set of NodePaths, return the longest common path
 *
 * @function commonPath
 * @param {NodePath[]} paths
 * @returns {NodePath} commonPath
 */
export const commonPath = (paths: NodePath[]): NodePath => {
  const [shortestPath, ...otherPaths]: NodePath[] = paths.sort((pathA, pathB) =>
    pathA.length < pathB.length ? -1 : 1
  )

  const common: NodePath = []
  let currentPathPartIndex = 0

  while (
    currentPathPartIndex < shortestPath.length &&
    otherPaths.every(
      (otherPath) =>
        otherPath[currentPathPartIndex] === shortestPath[currentPathPartIndex]
    )
  ) {
    common.push(shortestPath[currentPathPartIndex])
    currentPathPartIndex++
  }

  return common
}
