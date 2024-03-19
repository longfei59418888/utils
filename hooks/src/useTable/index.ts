import { DependencyList, useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import {
  AsyncAction,
  PageReturn,
  Pagination,
  QueryPagination,
  UseTableParams,
} from './type'

export const useData = <D>(
  fetch: AsyncAction<PageReturn<D>, undefined>,
  deps?: DependencyList,
) => {
  const [data, setData] = useState<D[]>()
  const [pagination, setPagination] = useState<Pagination>()
  useEffect(() => {
    void fetch().then(({ data, ...rest }) => {
      setData(data)
      setPagination(rest)
    })
  }, deps)
  return {
    pagination,
    dataSource: data,
  }
}

export const useTable = <D, Q = undefined>(
  useTableParams: UseTableParams<D, Q>,
) => {
  const { listFetch, listApi, query } = useTableParams
  const [search, setSearch] = useSearchParams()
  const [loading, setLoading] = useState<boolean>(false)
  const [params, setParams] = useState<Q & QueryPagination>()
  const setQuery = useCallback(
    async (query?: Partial<QueryPagination> & Partial<Q>) => {
      if (!query) query = params
      else query = { ...params, current: 1, pageSize: 15, ...query }
      const searchParams = new URLSearchParams()
      Object.entries(query || {}).forEach(
        ([key, value]) => value && searchParams.append(key, String(value)),
      )
      history.pushState(
        {},
        '',
        `${location.pathname}?${searchParams.toString()}`,
      )
      setParams(query as Q & QueryPagination)
    },
    [params, setSearch],
  )

  const { dataSource, pagination } = useData<D>(async () => {
    if (!params?.current) return {} as PageReturn<D>
    setLoading(true)
    console.log(params)
    if (listFetch)
      return listFetch(params).finally(() => {
        setLoading(false)
      })
    else if (listApi)
      return get<IReturnData<PageReturn<D>>>(listApi, params)
        .then<PageReturn<D>>(data, toastMessage)
        .finally(() => setLoading(false))

    setLoading(false)
    throw '必须传入 listApi or listFetch'
  }, [params, listApi, listFetch])

  useEffect(() => {
    setQuery(
      Object.keys(query ?? {}).reduce(
        (p, n) => {
          return search.get(n)
            ? {
                ...p,
                [n]: search.get(n) ?? '',
              }
            : p
        },
        {
          ...query,
          current: search.get('current') ? Number(search.get('current')) : 1,
          pageSize: search.get('pageSize')
            ? Number(search.get('pageSize'))
            : 15,
        },
      ) as Q & QueryPagination,
    )
  }, [query])

  return {
    loading,
    params,
    setQuery,
    dataSource,
    pagination,
  }
}

export default useTable
