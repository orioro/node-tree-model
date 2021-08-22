import { TreeModel, QueryProviderList } from './types'
import { memoizeStateQuery } from './memoizeStateQuery'

import * as structure from './structure'
import * as traversal from './traversal'

const BUILT_IN_QUERY_PROVIDERS = {
  ...structure,
  ...traversal,
}

export const treeModel = (
  customQueryProviders: QueryProviderList = {}
): TreeModel => {
  const queryProviders = {
    ...BUILT_IN_QUERY_PROVIDERS,
    ...customQueryProviders,
  }

  const model: TreeModel = {} as TreeModel

  Object.assign(
    model,
    Object.keys(queryProviders).reduce((acc, queryId) => {
      const query = queryProviders[queryId](model)

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
