type NodeSpecFull = [string, { [key: string]: any }]
type NodeId = string
type NodeSpec = NodeId | NodeSpecFull

const parseSpec = (spec:NodeSpec):NodeSpecFull => (
  typeof spec === 'string'
    ? [spec, {}]
    : spec
)

export const makeTreeNodes = (
  nodeSpecs:NodeSpec[]
) => nodeSpecs.reduce((acc, spec) => {
  const [id, data] = parseSpec(spec)

  const path = id.split('_')

  const parentId = nodeSpecs.find(candidateParent => {
    const [candidateParentId] = parseSpec(candidateParent)

    const candidateParentPath = candidateParentId.split('_')

    return (
      id !== candidateParentId &&
      id.startsWith(candidateParentId) &&
      path.length === candidateParentPath.length + 1
    )
  }) || null

  return {
    ...acc,
    [id]: {
      id,
      parentId,
      ...data
    }
  }
}, {})

const i0_9 = (new Array(10)).fill(null).map((v, index) => '' + index)

export const TREE_1 = makeTreeNodes([
  'root',
  'root/0',
  'root/0/0',
  'root/0/0/0',
  'root/0/0/1',
  'root/0/0/1/0',
  'root/0/0/1/1',
  'root/0/0/1/2',
  'root/0/0/1/2/0',
  'root/0/0/1/2/0/0',
  'root/0/0/1/2/0/0',
  'root/0/0/1/2/0/1',
  'root/0/0/1/2/0/1/0',
  'root/0/0/1/2/0/1/0/0',
  'root/0/0/1/2/0/1/0/0/0',
  'root/0/0/1/2/0/1/0/0/0/0',
  'root/0/0/1/2/0/1/0/0/0/1',
  'root/0/0/1/2/0/1/0/0/0/1/0',
  'root/0/0/1/2/0/2',
  'root/0/0/1/2/1',
  'root/0/0/1/2/2',
  'root/0/0/2',
  'root/0/1',
  'root/0/1/0',
  'root/0/1/1',
  'root/0/1/2',
  'root/1',
  'root/1/0',
  'root/1/1',
  'root/1/1/0',
  'root/1/1/0/0',
  'root/1/1/0/1',
  'root/1/1/0/1/0',
  'root/1/1/0/1/1',
  'root/1/1/0/1/1/0',
  'root/1/1/0/1/1/1',
  'root/1/1/0/1/1/1/0',
  'root/1/1/0/1/1/1/1',
  'root/1/1/0/2',
  'root/1/1/1',
  'root/1/1/2',
  'root/1/2',
  'root/2',
  'root/2/0',
  'root/2/0/0',
  'root/2/0/0/0',
])
