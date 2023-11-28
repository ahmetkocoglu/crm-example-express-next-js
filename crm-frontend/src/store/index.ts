import { configureStore } from "@reduxjs/toolkit";

// ** Reducers
import login from '@/store/apps/login'

export const store = configureStore({
    reducer: {
        login
    }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>