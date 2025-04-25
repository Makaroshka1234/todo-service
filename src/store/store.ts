import { configureStore } from '@reduxjs/toolkit'
import todoLists from './slices/todoListsSlice'
import user from './slices/userSlice'

const savedUser = localStorage.getItem('user');
const parsedUser = savedUser ? JSON.parse(savedUser) : undefined;

export const store = configureStore({
    reducer: {
        todoLists,
        user,
    },
    preloadedState: {
        user: parsedUser || undefined,
    },
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch