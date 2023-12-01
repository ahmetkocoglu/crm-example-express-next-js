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

export const getIsLogin = createAsyncThunk('getIsLogin', async () => {
    const response = await request.get(auth.isLogin)

    return response.data
})

export const appLoginSlice = createSlice({
    name: 'auth',
    initialState: {
        data: {},
        loading: false,
        isToken: false,
        isLogin: false
    },
    reducers: {
        handleToken: (state: any, action: PayloadAction<string>) => {
            if (getToken())
                state.isToken = true
        },
        logout: (state: any) => {
            state.isLogin = false
            localStorage.removeItem('token')
        }
    },
    extraReducers: builder => {
        builder.addCase(login.pending, (state: any) => {
            state.loading = true
        })
        builder.addCase(login.fulfilled, (state: any, action: any) => {
            localStorage.setItem('token', action.payload.token)
           
            state.data = action.payload
            state.isLogin = true
            state.isToken = true
            state.loading = false
        })
        builder.addCase(login.rejected, (state: any, action: any) => {
            state.loading = false
        })

        builder.addCase(getIsLogin.pending, (state: any) => {
            //state.isLogin = false
        })
        builder.addCase(getIsLogin.fulfilled, (state: any) => {
            state.isLogin = true
        })
        builder.addCase(getIsLogin.rejected, (state: any) => {
            localStorage.removeItem('token')
            state.isLogin = false
        })
    }
})

export const { handleToken, logout } = appLoginSlice.actions
export default appLoginSlice.reducer