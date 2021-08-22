type Path = string[]

export const treePathCommon = paths => {
  const [shortestPath, ...otherPaths]:Path[] = paths.sort((pathA, pathB) => (
    pathA.length < pathB.length ? -1 : 1
  ))

  const commonPath:Path = []
  let currentPathPartIndex = 0

  while (
    currentPathPartIndex < shortestPath.length &&
    otherPaths.every(otherPath => (
      otherPath[currentPathPartIndex] === shortestPath[currentPathPartIndex]
    ))
  ) {
    commonPath.push(shortestPath[currentPathPartIndex])
    currentPathPartIndex++
  }

  return commonPath
}
