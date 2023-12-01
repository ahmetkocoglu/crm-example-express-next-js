import { configureStore } from "@reduxjs/toolkit";

// ** Reducers
import login from '@/store/apps/login'
import user from '@/store/apps/user'

export const store = configureStore({
    reducer: {
        login,
        user
    }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>