import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AllTodoLists, ITodo, TodoListState } from '../../types/todo';
import { InviteUserParams, UserListRole } from '../../types/user';
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    query,
    updateDoc,
    where,
} from 'firebase/firestore';
import { db } from '../../firebase';
import { RootState } from '../store';

const initialState: AllTodoLists = {
    userId: '',
    title: '',
    lists: [],
};

export const addTodoListToFirestore = createAsyncThunk(
    'todolists/addTodoListToFirestore',
    async (
        { titleList, userId, userEmail }: { titleList: string; userId: string; userEmail: string },
        thunkAPI
    ) => {
        if (!userId) throw new Error("userId is required");

        try {
            const newList = {
                title: titleList,
                userId,
                todos: [],
                createdAt: new Date(),
                member: [
                    {
                        id: Date.now().toString(), // або Date.now().toString()
                        userId,
                        email: userEmail,
                        role: 'admin',
                    }
                ],
            };

            const docRef = await addDoc(collection(db, 'users', userId, 'todoLists'), newList);

            return {
                id: docRef.id,
                ...newList,
            };
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const deleteTodoListFromFirestore = createAsyncThunk(
    'todolists/deleteTodoListFromFirestore',
    async ({ userId, listId }: { userId: string; listId: string }) => {
        await deleteDoc(doc(db, 'users', userId, 'todoLists', listId));
        return { listId };
    }
);

export const fetchTodoListsFromFirestore = createAsyncThunk<
    TodoListState[],
    string
>('todoLists/fetchTodoLists', async (currentUserId, thunkAPI) => {
    try {
        const allLists: TodoListState[] = [];

        const usersSnapshot = await getDocs(collection(db, 'users'));
        for (const userDoc of usersSnapshot.docs) {
            const userId = userDoc.id;
            const todoListsRef = collection(db, 'users', userId, 'todoLists');
            const listsSnapshot = await getDocs(todoListsRef);

            listsSnapshot.forEach((doc) => {
                const data = doc.data();
                const members: UserListRole[] = data.member || [];

                const isOwner = data.userId === currentUserId;
                const isViewer = members.some((m) => m.userId === currentUserId);

                if (isOwner || isViewer) {
                    allLists.push({
                        id: doc.id,
                        title: data.title,
                        userId: data.userId,
                        todos: data.todos || [],
                        inputError: false,
                        member: members,
                    });
                }
            });
        }

        return allLists;
    } catch (error) {
        return thunkAPI.rejectWithValue('Не вдалося отримати тудулісти');
    }
});


export const addTodoToFirestore = createAsyncThunk(
    'todolists/addTodoToFirestore',
    async ({ userId, listId, title }: { userId: string; listId: string; title: string }) => {
        const listRef = doc(db, 'users', userId, 'todoLists', listId);
        const listSnap = await getDoc(listRef);

        if (!listSnap.exists()) throw new Error('List not found');

        const data = listSnap.data();
        const todos = data.todos || [];

        const newTodo: ITodo = {
            id: Date.now(),
            title,
            completed: false,
        };

        await updateDoc(listRef, {
            todos: [...todos, newTodo],
        });

        return { listId, newTodo };
    }
);

export const deleteTodoFromFirestore = createAsyncThunk(
    'todoLists/deleteTodoFromFirestore',
    async ({ userId, listId, todoId }: { userId: string; listId: string; todoId: number }, thunkAPI) => {
        try {
            const listRef = doc(db, 'users', userId, 'todoLists', listId);
            const listSnap = await getDoc(listRef);

            if (!listSnap.exists()) throw new Error('List does not exist');

            const listData = listSnap.data();
            const updatedTodos = (listData.todos || []).filter((todo: ITodo) => todo.id !== todoId);

            await updateDoc(listRef, { todos: updatedTodos });

            return { listId, todoId };
        } catch (error) {
            console.error('Failed to delete todo:', error);
            return thunkAPI.rejectWithValue('Failed to delete todo');
        }
    }
);

export const toggleTodoCompletedInFirestore = createAsyncThunk<
    { listId: string; todoId: string; completed: boolean },
    { userId: string; listId: string; todoId: string },
    { rejectValue: string }
>(
    'todoLists/toggleTodoCompletedInFirestore',
    async ({ userId, listId, todoId }, { rejectWithValue, getState }) => {
        const state = getState() as RootState;
        const list = state.todoLists.lists.find((l) => l.id === listId);

        if (!list) {
            return rejectWithValue('List does not exist');
        }

        const todo = list.todos.find((t) => String(t.id) === String(todoId));

        if (!todo) {
            return rejectWithValue('Todo not found');
        }

        const newCompleted = !todo.completed;

        try {
            const listRef = doc(db, `users/${list.userId}/todoLists/${listId}`); // <-- тут !!!

            const listSnap = await getDoc(listRef);
            if (!listSnap.exists()) {
                return rejectWithValue('List document does not exist');
            }

            const listData = listSnap.data();
            const todos = listData?.todos || [];

            const updatedTodos = todos.map((t: any) =>
                String(t.id) === String(todoId) ? { ...t, completed: newCompleted } : t
            );

            await updateDoc(listRef, {
                todos: updatedTodos,
            });

            console.log('Successfully updated todo:', {
                userId: list.userId,
                listId,
                todoId,
                newCompleted
            });

            return { listId, todoId, completed: newCompleted };
        } catch (error) {
            console.error('Failed to update todo:', error);
            return rejectWithValue('Failed to update todo');
        }
    }
);
export const inviteUserToList = createAsyncThunk<void, InviteUserParams>(
    'todoLists/inviteUserToList',
    async ({ listId, userId, email, role }, thunkAPI) => {
        try {
            // 1. Знаходимо користувача за email
            const usersRef = collection(db, 'users');
            const q = query(usersRef, where('email', '==', email));
            const snapshot = await getDocs(q);

            if (snapshot.empty) {
                throw new Error('Користувача з таким email не знайдено');
            }

            const userDoc = snapshot.docs[0];
            const invitedUserId = userDoc.id;

            // 2. Готуємо нового member
            const newMember: UserListRole = {
                id: crypto.randomUUID(),
                userId: invitedUserId,
                email: email,
                role: role,
            };

            // 3. Оновлюємо member масив у списку
            const listRef = doc(db, 'users', userId, 'todoLists', listId);
            const listSnapshot = await getDoc(listRef);
            const existingData = listSnapshot.exists() ? listSnapshot.data() : {};
            const prevMembers: UserListRole[] = existingData.member || [];

            const updatedMembers = [...prevMembers, newMember];

            await updateDoc(listRef, {
                member: updatedMembers,
            });

            // 🎯 Можна також оновити roles для користувача (наприклад, в Firestore окремо або локально)
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const todoListsSlice = createSlice({
    name: 'todolists',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(inviteUserToList.fulfilled, (state, action) => {
                // Нічого не треба, бо onSuccess ми просто показуємо snackbar
            })
            .addCase(addTodoListToFirestore.fulfilled, (state, action) => {
                state.lists.push({
                    id: action.payload.id,
                    title: action.payload.title,
                    userId: action.payload.userId,
                    todos: [],
                    inputError: false,
                    member: action.payload.member.map((m) => ({
                        ...m,
                        role: m.role as 'admin' | 'viewer',
                    })),
                });
            })
            .addCase(deleteTodoListFromFirestore.fulfilled, (state, action) => {
                state.lists = state.lists.filter((list) => list.id !== action.payload.listId);
            })
            .addCase(fetchTodoListsFromFirestore.fulfilled, (state, action) => {
                state.lists = action.payload;
            })
            .addCase(addTodoToFirestore.fulfilled, (state, action) => {
                const list = state.lists.find((list) => list.id === action.payload.listId);
                if (list) list.todos.push(action.payload.newTodo);
            })
            .addCase(deleteTodoFromFirestore.fulfilled, (state, action) => {
                const { listId, todoId } = action.payload;
                const list = state.lists.find((l) => l.id === listId);
                if (list) list.todos = list.todos.filter((t) => t.id !== todoId);
            })
            .addCase(toggleTodoCompletedInFirestore.fulfilled, (
                state,
                action: PayloadAction<{ listId: string; todoId: string; completed: boolean }>
            ) => {
                const { listId, todoId, completed } = action.payload;
                const list = state.lists.find((l) => l.id === listId);
                if (list) {
                    const todo = list.todos.find((t) => String(t.id) === String(todoId));
                    if (todo) todo.completed = completed;
                }
            })
    }

});

export default todoListsSlice.reducer;
