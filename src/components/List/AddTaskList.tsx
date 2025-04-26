import { Button, TextField } from '@mui/material'
import React, { ChangeEvent, useState } from 'react'

import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { addTodoListToFirestore } from '../../store/slices/todoListsSlice';
import TodoLists from './TodoLists';



const AddTaskList = () => {

    const dispatch = useAppDispatch()
    const { id, email } = useAppSelector(state => state.user)

    const [inputValue, setInputValue] = useState<string>('')

    function handleChange(e: ChangeEvent<HTMLInputElement>): void {
        setInputValue(e.target.value)
    }

    function handleAdd(): void {
        if (id !== null) {
            dispatch(addTodoListToFirestore({ titleList: inputValue, userId: id, userEmail: String(email) }));
            setInputValue('')
        }
    }

    return (
        <>
            <div className="flex flex-col gap-6 container" >

                <div className='flex items-center gap-2 p-3'>
                    <TextField label='TodoList title' value={inputValue} onChange={handleChange} />
                    <Button variant="outlined" onClick={() => handleAdd()}>Add TodoList</Button>
                </div>
                <TodoLists />
            </div>

        </>
    )
}

export default AddTaskList
