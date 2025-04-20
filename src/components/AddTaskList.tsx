import { Button, Fab, TextField } from '@mui/material'
import React, { ChangeEvent, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import { useAppDispatch } from '../hooks/reduxHooks';
import { addTodoList } from '../store/slices/todoListsSlice';
import TodoLists from './TodoLists';



const AddTaskList = () => {

    const dispatch = useAppDispatch()

    const [inputValue, setInputValue] = useState<string>('')

    function handleChange(e: ChangeEvent<HTMLInputElement>): void {
        setInputValue(e.target.value)
    }


    return (
        <>
            <div className="flex justify-center items-center gap-4 mx-auto" >
                <TextField label='TodoList title' value={inputValue} onChange={handleChange} />
                <Button variant="outlined" onClick={() => { dispatch(addTodoList(inputValue)) }}>Add Todo</Button>
            </div>
            <TodoLists />
        </>
    )
}

export default AddTaskList
