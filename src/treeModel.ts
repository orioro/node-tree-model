import { TreeModel } from './types'
import { memoizeStateQuery } from './memoizeStateQuery'

import * as structure from './structure'
import * as traversal from './traversal'

const BUILT_IN_QUERIES = {
  ...structure,
  ...traversal,
}

export const treeModel = (customQueries = {}) => {
  const queries = {
    ...BUILT_IN_QUERIES,
    ...customQueries,
  }

  const model: TreeModel = {} as TreeModel

  Object.assign(
    model,
    Object.keys(queries).reduce((acc, queryId) => {
      const query = queries[queryId](model)

      return {
        ...acc,
        [queryId]: Array.isArray(query)
          ? memoizeStateQuery(query[0], query[1])
          : memoizeStateQuery(query),
      }
    }, {})
  )

  return model
}
