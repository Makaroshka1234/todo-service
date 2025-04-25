import { UserListRole } from "./user";

export interface ITodo {
    id: number,
    title: string,
    completed: boolean,
}

export interface TodoListState {
    id: string,
    title: string,
    todos: ITodo[],
    inputError: boolean,
    userId: string | null,
    member: UserListRole[],
}

export interface AllTodoLists {
    userId: string,
    title: string,
    lists: TodoListState[],

}

