import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import request from '@/utils/axios-services'

export const getEnum = createAsyncThunk('get/enum', async (url: string) => { 
    const response = await request.get(url)

    return response.data
})

export const appEnumSlice = createSlice({
    name: 'enums',
    initialState: {
        data: {
            calender: [],
            contact: [],
            log: [],
            taskStatus: [],
            confirm: [],
            usersRole: []
        },
        loading: false
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getEnum.pending, (state: any)=> {
            state.loading = true
        })
        builder.addCase(getEnum.fulfilled, (state: any, action: any) => {
            state.loading = false
        })
        builder.addCase(getEnum.rejected, (state:any)=>{
            state.loading = false
        })
    },
})

export default appEnumSlice.reducer
