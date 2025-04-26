import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { User } from '../../types/user'








const initialState: User = {
    id: '',
    email: null,
    token: null,
    roles: {}
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<User>) {
            const userData = action.payload;
            state.email = userData.email;
            state.id = userData.id;
            state.token = userData.token;
            state.roles = userData.roles;


            localStorage.setItem('user', JSON.stringify(userData));
        },
        removeUser(state) {
            state.email = null;
            state.id = '';
            state.roles = {};
            state.token = null;


            localStorage.removeItem('user');
        },
        setUserRole(state, action: PayloadAction<{ listId: string; role: 'admin' | 'viewer' }>) {
            const { listId, role } = action.payload
            state.roles[listId] = role
        }
    },
})

export const { setUser, removeUser, setUserRole } = userSlice.actions



export default userSlice.reducer