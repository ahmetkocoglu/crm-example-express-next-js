// ** Redux
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

// ** Config
import {user} from '@/configs/user'

// ** Utils
import request from '@/utils/request'

export const addUser = createAsyncThunk('add/user', async (payload: any) => {
    const response = await request.post(user.newUser, payload)

    return response.data
})

export const appUserSlice = createSlice({
    name: 'user',
    initialState: {
        loading: false
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(addUser.pending, (state: any) => {
            state.loading = true
        })
        builder.addCase(addUser.fulfilled, (state: any) => {
            state.loading = false
        })
        builder.addCase(addUser.rejected, (state: any) => {
            state.loading = false
        })
    }
})

export default appUserSlice.reducer
