export interface ITodo {
    id: number,
    title: string,
    completed: boolean,
}

export interface TodoListState {
    id: number,
    title: string,
    todos: ITodo[],
    inputError: boolean,
}

export interface AllTodoLists {
    title: string,
    lists: TodoListState[],
}