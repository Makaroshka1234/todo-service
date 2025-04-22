import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { User } from '../../types/user'








const initialState: User = {
    id: null,
    email: null,
    token: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<User>) {
            state.email = action.payload.email
            state.id = action.payload.id
            state.token = action.payload.token
        },
        removeUser(state) {
            state.email = null
            state.id = null

            state.token = null
        }
    },
})

export const { setUser, removeUser } = userSlice.actions



export default userSlice.reducer