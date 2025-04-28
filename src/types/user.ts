
export type Role = 'admin' | 'viewer'

export interface User {
    id: string | null,
    email: null | string,
    token: null | string,
    roles: {
        [listId: string]: 'admin' | 'viewer'
    }
}

export interface UserListRole {
    email: string,
    id: string,
    role: Role,
    userId: string
}

export interface InviteUserParams {
    listId: string;
    userId: string; // той хто запрошує
    email: string;
    role: Role;
}