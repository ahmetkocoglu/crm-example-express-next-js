import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
// ** Config
import { auth } from '@/configs/auth'

// ** Utils
import request from '@/utils/request'
import { getToken } from '@/utils/get-token'

export const login = createAsyncThunk('login', async (payload: any) => {
    const response = await request.post(auth.login, payload)

    return response.data
})

export const appLoginSlice = createSlice({
    name: 'getPosts',
    initialState: {
        data: {},
        loading: false,
        isToken: false
    },
    reducers: {
        handleToken: (state: any, action: PayloadAction<string>) => {
            console.log(action.payload);
            
            if (getToken())
                state.isToken = true
        }
    },
    extraReducers: builder => {
        builder.addCase(login.pending, (state: any) => {
            state.loading = true
        })
        builder.addCase(login.fulfilled, (state: any, action: any) => {
            state.data = action.payload
            localStorage.setItem('token', action.payload.token)
            state.isToken = true

            state.loading = false
        })
        builder.addCase(login.rejected, (state: any, action: any) => {
            state.loading = false
        })
    }
})

export const { handleToken } = appLoginSlice.actions
export default appLoginSlice.reducer