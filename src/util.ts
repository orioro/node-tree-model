import type { NodePath, Node, TreeState } from './types'

export const fromNodeArray = (nodeArray: Node[]): TreeState =>
  nodeArray.reduce(
    (acc, node) => ({
      ...acc,
      [node.id]: node,
    }),
    {}
  )

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
