import { Button, TextField } from '@mui/material'
import React, { ChangeEvent, useState } from 'react'

import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { addTodoListToFirestore } from '../../store/slices/todoListsSlice';
import TodoLists from './TodoLists';
import { setUserRole } from '../../store/slices/userSlice';



const AddTaskList = () => {



    const dispatch = useAppDispatch()
    const { id, email } = useAppSelector(state => state.user)

    const [inputValue, setInputValue] = useState<string>('')

    function changeListTitle(e: ChangeEvent<HTMLInputElement>): void {
        setInputValue(e.target.value)
    }

    async function handleAdd(): Promise<void> {
        if (inputValue.trim() !== '' && id !== null) {
            const resultAction = await dispatch(addTodoListToFirestore({ titleList: inputValue, userId: id, userEmail: String(email) }));


            const payload = resultAction.payload as { id: string }
            if (payload?.id) {
                dispatch(setUserRole({ listId: payload.id, role: 'admin' }));
            }
            setInputValue('')
        }
    }

    return (
        <>
            <div className="flex flex-col gap-6 container" >

                <div className='flex items-center gap-2 p-3'>
                    <TextField
                        sx={{
                            maxWidth: 200,
                            background: '#414141',
                            color: '#fff',
                            borderColor: '#303030',
                            borderRadius: 2,
                            '& .MuiInputBase-input': {
                                color: '#fff',
                                '&:-webkit-autofill': {
                                    WebkitBoxShadow: '0 0 0 1000px #414141 inset',
                                    WebkitTextFillColor: '#fff',
                                },

                            },
                            '&:hover fieldset': {
                                borderColor: '#414141',
                            },

                            '& .MuiInputLabel-root': {
                                color: '#fff',

                            },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: '#303030',
                                },
                                '&:hover fieldset': {
                                    borderColor: '#414141',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#414141',
                                },

                            }
                        }
                        }
                        label='TodoList title' value={inputValue} onChange={changeListTitle} />
                    <Button
                        sx={{
                            background: '#212121',
                            borderColor: '#ffffff26',
                            color: '#fff',
                            '&:hover': {
                                background: '#414141'
                            }
                        }}
                        variant="outlined" onClick={() => handleAdd()}>Add TodoList</Button>
                </div>
                <TodoLists />
            </div>

        </>
    )
}

export default AddTaskList
