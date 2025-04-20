import { configureStore } from '@reduxjs/toolkit'

import todoLists from './slices/todoListsSlice'

export const store = configureStore({
    reducer: {
        todoLists,
    },
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch