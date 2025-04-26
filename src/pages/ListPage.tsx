import React, { ChangeEvent, useState } from 'react'
import { useParams } from 'react-router'
import { Button, MenuItem, TextField } from '@mui/material'
import { useSnackbar } from 'notistack'

import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks'
import useCheckedTodos from '../hooks/useCheckedTodos'
import { addTodoToFirestore, changeTodoTitleFireStore, inviteUserToList } from '../store/slices/todoListsSlice'

import TaskList from '../components/List/TaskList'
import Header from '../components/Header'
import Chart from '../components/Chart'
import MemberList from '../components/List/MemberList'
import InviteUser from '../components/InviteUser'

const ListPage = () => {
    const dispatch = useAppDispatch()
    const { enqueueSnackbar } = useSnackbar()



    const { id } = useParams()
    const [inputValue, setInputValue] = useState<string>('')
    const [inviteEmail, setInviteEmail] = useState<string>('')
    const [inviteRole, setInviteRole] = useState<'admin' | 'viewer'>('viewer')


    const [editTodoValue, setEditTodoValue] = useState<string>('')
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [currentEditingTodoId, setCurrentEditingTodoId] = useState<string>('')

    const userId = useAppSelector(state => state.user.id)
    const list = useAppSelector(state => state.todoLists.lists.find((l) => l.id === id))

    const userRole = list?.member.find((m) => m.userId === userId)?.role

    const { checkedTodos, uncheckedTodos } = useCheckedTodos(list?.todos)

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {

        setInputValue(e.target.value)

    }

    const handleAdd = () => {
        if (userId !== null && inputValue.trim() !== '') {
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

    const handleChangeBtn = (): void => {
        dispatch(changeTodoTitleFireStore({
            userId: String(userId),
            listId: String(id),
            todoId: currentEditingTodoId,
            newTitle: inputValue,
        }));
        setIsEdit(false)
        setInputValue('')
        setCurrentEditingTodoId('')
    }



    return (
        <>
            <Header />
            <div className='flex flex-col gap-6 px-8 container'>
                <div className='flex items-center gap-2 mb-5'>
                    <h3>Назва списку</h3>
                    <p>{list?.title}</p>
                </div>

                <div className='flex justify-around px-3'>
                    <div className='flex flex-col gap-3'>
                        <div className='flex items-center gap-3 mb-3 max-h-8'>
                            <TextField
                                variant='outlined'
                                sx={{
                                    background: '#414141',
                                    color: '#fff',
                                    borderColor: '#303030',
                                    borderRadius: 2,
                                    '& .MuiInputBase-input': {
                                        color: '#fff',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#414141',
                                    },

                                    '& .MuiInputLabel-root': {
                                        color: '#fff',
                                    },
                                }
                                }
                                label='Todo title' value={inputValue} onChange={handleChange} />
                            {
                                isEdit ? <Button
                                    sx={{
                                        border: '#303030'
                                    }}
                                    variant="outlined" onClick={handleChangeBtn} >Change Todo</Button>
                                    : <Button
                                        sx={{
                                            color: '#fff',
                                            borderColor: '#303030',


                                            '&:hover': {
                                                background: '#414141'
                                            }
                                        }}
                                        variant="outlined" onClick={handleAdd}>Add Todo</Button>
                            }

                        </div>
                        <p>Задачі для виконання</p>
                        <TaskList editTodoValue={inputValue} setEditTodoValue={setInputValue} isEdit={isEdit} setIsEdit={setIsEdit} currentEditingTodoId={currentEditingTodoId} setCurrentEditingTodoId={setCurrentEditingTodoId} />
                    </div>

                    <div className='flex flex-col justify-center gap-3 max-h-40'>
                        <p>Діаграмма завдань</p>
                        <Chart checkedTodos={checkedTodos} uncheckedTodos={uncheckedTodos} />
                    </div>
                </div>
                <div className="bottom flex justify-between">
                    {list?.member && <MemberList members={list.member} />}
                    {/* 🛡️ Лише для ADMIN користувача */}
                    {userRole === 'admin' &&
                        <InviteUser inviteEmail={inviteEmail} inviteRole={inviteRole} setInviteEmail={setInviteEmail} setInviteRole={setInviteRole} handleInvite={handleInvite} />
                    }
                </div>


            </div>
        </>
    )
}

export default ListPage
