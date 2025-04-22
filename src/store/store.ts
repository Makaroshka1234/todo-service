import { configureStore } from '@reduxjs/toolkit'
import todoLists from './slices/todoListsSlice'
import user from './slices/userSlice'

export const store = configureStore({
    reducer: {
        todoLists,
        user,
    },
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch