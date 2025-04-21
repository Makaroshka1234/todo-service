import { Button, TextField } from '@mui/material'
import React, { ChangeEvent, useState } from 'react'

import { useAppDispatch } from '../../hooks/reduxHooks';
import { addTodoList } from '../../store/slices/todoListsSlice';
import TodoLists from './TodoLists';



const AddTaskList = () => {

    const dispatch = useAppDispatch()

    const [inputValue, setInputValue] = useState<string>('')

    function handleChange(e: ChangeEvent<HTMLInputElement>): void {
        setInputValue(e.target.value)
    }

    function handleAdd(): void {
        dispatch(addTodoList(inputValue));
        setInputValue('')

    }

    return (
        <>
            <div className="flex flex-col gap-6 bg-slate-50 container" >
                
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
