import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// ** Config **
import { task } from '@/configs/task'

// ** Utils **
import axiosService from '@/utils/axios-services'

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
            state.data = action.data
        })
        builder.addCase(setNewTask.rejected, (state) => {
            state.loading = false
        })
    }
})

export default appTaskSlice.reducer