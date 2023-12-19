// ** Redux
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

// ** Config
import {user} from '@/configs/user'

// ** Utils
import request from '@/utils/axios-services'

export const addUser = createAsyncThunk('add/user', async (payload: any) => {
    const response = await request.post(user.newUser, payload)

    return response.data
})

export const getUsers = createAsyncThunk('get/users', async () => {
    const response = await request.get(user.users)

    return response.data
})

export const appUserSlice = createSlice({
    name: 'user',
    initialState: {
        loading: false,
        usersLoading: false,
        users: []
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

        builder.addCase(getUsers.pending, (state: any) => {
            state.usersLoading = true
        })
        builder.addCase(getUsers.fulfilled, (state: any, action: any) => {
            state.usersLoading = false
            state.users = action.payload.data
        })
        builder.addCase(getUsers.rejected, (state: any) => {
            state.usersLoading = false
        })
    }
})

export default appUserSlice.reducer
