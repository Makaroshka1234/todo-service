import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'



import { AllTodoLists, ITodo, TodoListState, } from '../../types/todo'




const initialState: AllTodoLists = {
    title: '',
    lists: [],
    inputError: false
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
        },
        deleteTodoList(state, action: PayloadAction<{ id: number }>) {
            const { id } = action.payload
            state.lists = state.lists.filter(list => list.id !== id)

        },
        addTodo(state, action: PayloadAction<{ listId: number, title: string }>) {
            const { listId, title } = action.payload
            const list = state.lists.find(list => list.id === listId);
            if (title.trim() !== '') {
                if (list) {
                    const newTodo: ITodo = {
                        id: Date.now(),
                        title: title,
                        completed: false
                    };
                    list.todos.push(newTodo);
                    state.inputError = false;
                }
            }
        },
        deleteTodo(state, action: PayloadAction<{ listId: number; todoId: number }>) {
            const { listId, todoId } = action.payload;
            const list = state.lists.find(list => list.id === listId);
            if (list) {
                list.todos = list.todos.filter(todo => todo.id !== todoId);
            }
        },
        changeCompletedTodo(state, action: PayloadAction<{ listId: number; todoId: number }>) {
            const { listId, todoId } = action.payload;
            const list = state.lists.find(list => list.id === listId);
            if (list) {
                const todo = list.todos.find(todo => todo.id === todoId);
                if (todo) {
                    todo.completed = !todo.completed;
                }
            }
        }

    },
})

export const { addTodo, addTodoList, deleteTodoList, deleteTodo, changeCompletedTodo } = todoListsSlice.actions



export default todoListsSlice.reducer