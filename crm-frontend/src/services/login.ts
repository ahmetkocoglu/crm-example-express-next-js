import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// import type { Login } from './types'
import { base } from '@/configs/base'

export const loginApi = createApi({
    reducerPath: 'loginApi',
    baseQuery: fetchBaseQuery({ baseUrl: base.base }),

    endpoints: (builder) => ({
        getIsLogin: builder.query<any, string>({
            query: (url) => `${url}`
        }),
        login: builder.mutation({
            query: (body) => ({
                url: '/login',
                method: 'POST',
                body,
            }),
        }),
    }),
})

export const { useGetIsLoginQuery, useLoginMutation } = loginApi