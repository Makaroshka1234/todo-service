import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'


import { ITodo, TodoListState } from '../../types/todo'



const initialState: TodoListState = {
    id: 0,
    title: '',
    todos: [],
    inputError: false
}

export const todoSlice = createSlice({
    name: 'todo',

    initialState,
    reducers: {


        addTodo(state, action: PayloadAction<string>) {
            if (action.payload !== '') {
                const newTodo: ITodo = {
                    id: Date.now(),
                    title: action.payload,
                    completed: false
                }
                state.todos.push(newTodo)
                state.inputError = false
            } else {
                if (state.inputError) {
                    state.inputError = false; // тригер на оновлення
                } else {
                    state.inputError = true;
                }
            }
        },
        deleteTodo(state, action: PayloadAction<number>) {
            state.todos = state.todos.filter(todo => todo.id !== action.payload)
        },
        changeCompletedTodo(state, action: PayloadAction<number>) {
            const todo = state.todos.find(todo => todo.id === action.payload)
            if (todo) {
                todo.completed = !todo.completed
            }
        }
    },
})

export const { addTodo, deleteTodo, changeCompletedTodo, } = todoSlice.actions



export default todoSlice.reducer