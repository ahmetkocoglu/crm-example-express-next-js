import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// ** Config **
import { task } from '@/configs/task'

// ** Utils **
import axiosService from '@/utils/axios-services'

export const getTask = createAsyncThunk('getTask', async() => {
    const response = await axiosService.get(task.allTask)

    return response.data
})

export const setNewTask = createAsyncThunk('setTask', async (payload: any) => {
    const response = await axiosService.post(task.newTask, payload)

    return response.data
})

export const appTaskSlice = createSlice({
    name: 'task',
    initialState: {
        data: [],
        loading: false,
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(setNewTask.pending, (state) => {
            state.loading = true
        })
        builder.addCase(setNewTask.fulfilled, (state, action: any) => {
            state.loading = false
        })
        builder.addCase(setNewTask.rejected, (state) => {
            state.loading = false
        })
        
        builder.addCase(getTask.fulfilled, (state, action: any) => {
            state.data = action.payload.data
        })
    }
})

export default appTaskSlice.reducer