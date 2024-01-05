import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import {  loginApi  } from "../services/login";

export const store = configureStore({
    reducer: {
        [loginApi.reducerPath]: loginApi.reducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(loginApi.middleware),
})

setupListeners(store.dispatch)






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