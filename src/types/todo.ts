export interface ITodo {
    id: number,
    title: string,
    completed: boolean,
}

export interface TodoListState {
    id: number,
    title: string,
    completed: boolean,
    todos: ITodo[],
    inputError: boolean,
}