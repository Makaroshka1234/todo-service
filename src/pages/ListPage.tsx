import React, { ChangeEvent, useState } from 'react'
import { useParams } from 'react-router'
import { Button, MenuItem, TextField } from '@mui/material'
import { useSnackbar } from 'notistack'

import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks'
import useCheckedTodos from '../hooks/useCheckedTodos'
import { addTodoToFirestore, inviteUserToList } from '../store/slices/todoListsSlice'

import TaskList from '../components/List/TaskList'
import Header from '../components/Header'
import Chart from '../components/Chart'

const ListPage = () => {
    const dispatch = useAppDispatch()
    const { enqueueSnackbar } = useSnackbar()

    const { id } = useParams()
    const [inputValue, setInputValue] = useState<string>('')
    const [inviteEmail, setInviteEmail] = useState<string>('')
    const [inviteRole, setInviteRole] = useState<'admin' | 'viewer'>('viewer')

    const userId = useAppSelector(state => state.user.id)
    const list = useAppSelector(state => state.todoLists.lists.find((l) => l.id === id))

    const { checkedTodos, uncheckedTodos } = useCheckedTodos(list?.todos)

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setInputValue(e.target.value)
    }

    const handleAdd = () => {
        if (userId !== null) {
            dispatch(addTodoToFirestore({ userId: userId, listId: String(id), title: inputValue }))
            setInputValue('')
        }
    }

    const handleInvite = () => {
        if (!inviteEmail || !id || !userId) return

        dispatch(inviteUserToList({
            listId: id,
            userId: userId,
            email: inviteEmail,
            role: inviteRole,
        }))
            .unwrap()
            .then(() => {
                enqueueSnackbar(`Користувач ${inviteEmail} запрошений як ${inviteRole}`, { variant: 'success' })
                setInviteEmail('')
                setInviteRole('viewer')
            })
            .catch(() => {
                enqueueSnackbar('Не вдалося запросити користувача', { variant: 'error' })
            })
    }

    // 🎯 Отримуємо роль поточного користувача
    const userRole = list?.member.find((m) => m.userId === userId)?.role

    return (
        <>
            <Header />

            <div className='flex flex-col gap-6 px-8 py-11 container'>
                <div className='flex items-center gap-2 mb-5'>
                    <h3>Назва списку</h3>
                    <p>{list?.title}</p>
                </div>

                <div className='flex justify-around px-3'>
                    <div className='flex flex-col gap-3'>
                        <div className='flex items-center gap-3 mb-3 max-h-8'>
                            <TextField label='Todo title' value={inputValue} onChange={handleChange} />
                            <Button variant="outlined" onClick={handleAdd}>Add Todo</Button>
                        </div>
                        <TaskList />
                    </div>

                    <div className='flex flex-col justify-center gap-3 max-h-40'>
                        <p>Діаграмма завдань</p>
                        <Chart checkedTodos={checkedTodos} uncheckedTodos={uncheckedTodos} />
                    </div>
                </div>

                {/* 🛡️ Лише для ADMIN користувача */}
                {userRole === 'admin' && (
                    <div className='flex flex-col gap-3 mt-6 w-full max-w-md'>
                        <h4>Запросити користувача</h4>
                        <TextField
                            label='Email користувача'
                            value={inviteEmail}
                            onChange={(e) => setInviteEmail(e.target.value)}
                        />
                        <TextField
                            select
                            label='Роль'
                            value={inviteRole}
                            onChange={(e) => setInviteRole(e.target.value as 'admin' | 'viewer')}
                        >
                            <MenuItem value='admin'>Admin</MenuItem>
                            <MenuItem value='viewer'>Viewer</MenuItem>
                        </TextField>
                        <Button variant='contained' onClick={handleInvite}>Запросити</Button>
                    </div>
                )}
            </div>
        </>
    )
}

export default ListPage
