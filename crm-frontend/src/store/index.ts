import { configureStore } from "@reduxjs/toolkit";

// ** Reducers
import login from '@/store/apps/login'
import user from '@/store/apps/user'
import enums from '@/store/apps/enums'

export const store = configureStore({
    reducer: {
        login,
        user,
        enums
    }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>