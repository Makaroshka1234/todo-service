import { configureStore } from '@reduxjs/toolkit'
import todo from './slices/todoSlice'
import todoLists from './slices/todoListsSlice'

export const store = configureStore({
    reducer: {
        todo,
        todoLists,
    },
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch