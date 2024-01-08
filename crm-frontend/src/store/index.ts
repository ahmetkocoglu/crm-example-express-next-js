import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import tokenReducer from "./apps/login/token";
import { loginApi } from "../services/login";
import { userApi } from "../services/user";

export const store = configureStore({
    reducer: {
        tokenState: tokenReducer,
        [loginApi.reducerPath]: loginApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            loginApi.middleware, userApi.middleware
        ),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch




// import { configureStore } from "@reduxjs/toolkit";

// // ** Reducers
// import login from '@/store/apps/login'
// import user from '@/store/apps/user'
// import enums from '@/store/apps/enums'
// import tasks from '@/store/apps/tasks'

// export const store = configureStore({
//     reducer: {
//         login,
//         user,
//         enums,
//         tasks
//     }
// })

// export type AppDispatch = typeof store.dispatch
// export type RootState = ReturnType<typeof store.getState>