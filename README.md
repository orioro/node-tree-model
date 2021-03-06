# treeModel

```
npm install @orioro/tree-model
yarn add @orioro/tree-model
```

# API Docs


- src/types.ts
  - [`NodeId`](#nodeid)
  - [`NodePath`](#nodepath)
  - [`Node`](#node)
  - [`TreeState`](#treestate)
  - [`NodeTree`](#nodetree)

- src/structure.ts
  - [`tree.nodeIdArray(nodesById)`](#treenodeidarraynodesbyid)
  - [`tree.nodeArray(nodesById)`](#treenodearraynodesbyid)
  - [`tree.nodeTree(nodesById, nodeId)`](#treenodetreenodesbyid-nodeid)

- src/traversal.ts
  - [`tree.isRoot(nodesById, nodeId)`](#treeisrootnodesbyid-nodeid)
  - [`tree.rootNodeId(nodesById)`](#treerootnodeidnodesbyid)
  - [`tree.ancestorIds(nodesById, nodeId)`](#treeancestoridsnodesbyid-nodeid)
  - [`tree.nodePath(nodesById, nodeId)`](#treenodepathnodesbyid-nodeid)
  - [`tree.isAncestorOf(nodesById, candidateAncestorId, candidateDescendantId)`](#treeisancestorofnodesbyid-candidateancestorid-candidatedescendantid)
  - [`tree.isDescendantOf(nodesById, candidateDescendantId, candidateAncestorId)`](#treeisdescendantofnodesbyid-candidatedescendantid-candidateancestorid)
  - [`tree.childIds(nodesById, nodeId)`](#treechildidsnodesbyid-nodeid)
  - [`tree.isChildOf(nodesById, nodeId, candidateChildNodeId)`](#treeischildofnodesbyid-nodeid-candidatechildnodeid)
  - [`tree.siblingIds(nodesById, nodeId)`](#treesiblingidsnodesbyid-nodeid)
  - [`tree.isSiblingOf(nodesById, nodeId, otherNodeId)`](#treeissiblingofnodesbyid-nodeid-othernodeid)
  - [`tree.commonPath(nodesById, nodeIds)`](#treecommonpathnodesbyid-nodeids)
  - [`tree.commonAncestorPath(nodesById, nodeIds)`](#treecommonancestorpathnodesbyid-nodeids)
  - [`tree.commonAncestorId(nodesById, nodeIds)`](#treecommonancestoridnodesbyid-nodeids)

- src/util.ts
  - [`fromNodeArray(nodeArray)`](#fromnodearraynodearray)
  - [`commonPath(paths)`](#commonpathpaths)


##### `stateCache()`

Creates a cache getter that memoizes the last state and returns corresponding
cache object. If the state object changes, the previous cache object
is abandoned and a new cache object is returned.

The cache object itself is a JS Map


- Returns: `getStateCache` {Function} 

##### `memoizeStateQuery(queryFn, keyResolver)`

Memoizes a function that takes as first argument the `state` object.
If the `state` changes (by identity/reference comparison), cache is reset.

Calls to the memoized function attempt to locate a result in the cache object.

- `queryFn` {Function}
- `keyResolver` {Function}

##### `tree.nodeIdArray(nodesById)`

- `nodesById` {[TreeState](#treestate)}
- Returns: {[[Node](#node)Id](#nodeid)[]} 

##### `tree.nodeArray(nodesById)`

- `nodesById` {[TreeState](#treestate)}
- Returns: {[Node](#node)[]} 

##### `tree.nodeTree(nodesById, nodeId)`

- `nodesById` {[TreeState](#treestate)}
- `nodeId` {[[Node](#node)Id](#nodeid)}
- Returns: {[[Node](#node)Tree](#nodetree)} 

##### `tree.isRoot(nodesById, nodeId)`

Returns whether the given node is the root node (parentId === null)

- `nodesById` {[TreeState](#treestate)}
- `nodeId` {[[Node](#node)Id](#nodeid)}
- Returns: {Boolean} 

##### `tree.rootNodeId(nodesById)`

- `nodesById` {[TreeState](#treestate)}
- Returns: {[[Node](#node)Id](#nodeid)} 

##### `tree.ancestorIds(nodesById, nodeId)`

Retrieves the list of node ancestors by walking up the tree
using `node.parentId`

- `nodesById` {[TreeState](#treestate)}
- `nodeId` {[[Node](#node)Id](#nodeid)}
- Returns: {[[Node](#node)Id](#nodeid)[]} 

##### `tree.nodePath(nodesById, nodeId)`

Returns the full path up to the node. A node path is
an array of nodeIds in sequence.

- `nodesById` {[TreeState](#treestate)}
- `nodeId` {[[Node](#node)Id](#nodeid)}
- Returns: {[[Node](#node)Path](#nodepath)} 

##### `tree.isAncestorOf(nodesById, candidateAncestorId, candidateDescendantId)`

- `nodesById` {[TreeState](#treestate)}
- `candidateAncestorId` {[[Node](#node)Id](#nodeid)}
- `candidateDescendantId` {[[Node](#node)Id](#nodeid)}
- Returns: {Boolean} 

##### `tree.isDescendantOf(nodesById, candidateDescendantId, candidateAncestorId)`

- `nodesById` {[TreeState](#treestate)}
- `candidateDescendantId` {[[Node](#node)Id](#nodeid)}
- `candidateAncestorId` {[[Node](#node)Id](#nodeid)}
- Returns: {Boolean} 

##### `tree.childIds(nodesById, nodeId)`

- `nodesById` {[TreeState](#treestate)}
- `nodeId` {[[Node](#node)Id](#nodeid)}
- Returns: {[[Node](#node)Id](#nodeid)[]} 

##### `tree.isChildOf(nodesById, nodeId, candidateParentNodeId)`

- `nodesById` {[TreeState](#treestate)}
- `nodeId` {[[Node](#node)Id](#nodeid)}
- `candidateParentNodeId` {[[Node](#node)Id](#nodeid)}
- Returns: {Boolean} 

##### `tree.isChildOf(nodesById, nodeId, candidateChildNodeId)`

- `nodesById` {[TreeState](#treestate)}
- `nodeId` {[[Node](#node)Id](#nodeid)}
- `candidateChildNodeId` {[[Node](#node)Id](#nodeid)}
- Returns: {Boolean} 

##### `tree.siblingIds(nodesById, nodeId)`

- `nodesById` {[TreeState](#treestate)}
- `nodeId` {[[Node](#node)Id](#nodeid)}
- Returns: {[[Node](#node)Id](#nodeid)[]} 

##### `tree.isSiblingOf(nodesById, nodeId, otherNodeId)`

- `nodesById` {[TreeState](#treestate)}
- `nodeId` {[[Node](#node)Id](#nodeid)}
- `otherNodeId` {[[Node](#node)Id](#nodeid)}
- Returns: {Boolean} 

##### `tree.commonPath(nodesById, nodeIds)`

- `nodesById` {[TreeState](#treestate)}
- `nodeIds` {[[Node](#node)Id](#nodeid)[]}
- Returns: {[[Node](#node)Path](#nodepath)} 

##### `tree.commonAncestorPath(nodesById, nodeIds)`

- `nodesById` {[TreeState](#treestate)}
- `nodeIds` {[[Node](#node)Id](#nodeid)[]}
- Returns: {[[Node](#node)Path](#nodepath)} 

##### `tree.commonAncestorId(nodesById, nodeIds)`

- `nodesById` {[TreeState](#treestate)}
- `nodeIds` {[[Node](#node)Id](#nodeid)[]}
- Returns: {[[Node](#node)Id](#nodeid) | null} 

##### `NodeId`

String



##### `NodePath`

A sequence of nodeIds that lead to the last node



##### `Node`

```
{
  id: NodeId
  parentId: NodeId | null
  [key: string]: any
}
```



##### `TreeState`

Index of all nodes that compose the tree indexed by id:
`{ [key: string]: [Node](#node) }`



##### `NodeTree`

Tree representation of the node
`[Node, NodeTree[] | null]`



##### `fromNodeArray(nodeArray)`

Generates a tree state (nodes indexed by id) from an array of node objects.

- `nodeArray` {[Node](#node)[]}
- Returns: {[TreeState](#treestate)} 

##### `commonPath(paths)`

Given a set of NodePaths, return the longest common path

- `paths` {[[Node](#node)Path](#nodepath)[]}
- Returns: `commonPath` {[[Node](#node)Path](#nodepath)}
