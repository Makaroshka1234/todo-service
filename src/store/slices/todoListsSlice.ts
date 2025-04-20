import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'


import { AllTodoLists, TodoListState, } from '../../types/todo'



const initialState: AllTodoLists = {
    title: '',
    lists: [],
}

export const todoListsSlice = createSlice({
    name: 'todolists',
    initialState,
    reducers: {
        addTodoList(state, action: PayloadAction<string>) {
            if (action.payload !== '') {
                const newList: TodoListState = {
                    id: Date.now(),
                    title: action.payload,
                    todos: [],
                    inputError: false
                }
                state.lists?.push(newList)
            }
        }
    },
})

export const { addTodoList } = todoListsSlice.actions



export default todoListsSlice.reducer