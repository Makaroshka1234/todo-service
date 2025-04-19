import React, { useEffect } from 'react'
import { ITodo } from '../types/todo'
import { Checkbox, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { changeCompletedTodo, deleteTodo } from '../store/slices/todoSlice';


interface TaskListProps {
    todos: ITodo[],
    completeTask: boolean,
    deleteTodo: (id: number) => void,
    handleComplete: (id: number) => void,
}


const TaskList = () => {
    const dispatch = useAppDispatch()
    const { inputError, todos, } = useAppSelector(state => state.todo)


    return (
        <ul className='bg-slate-50 max-w-lg'>

            {todos.map((item: ITodo) => {
                console.log(item.completed, item.title)
                return <li key={item.id} className='flex justify-center items-center gap-4 px-12 py-2'><span>{item.title}</span>
                    <IconButton onClick={() => dispatch(deleteTodo(item.id))}> <DeleteIcon /></IconButton>
                    <Checkbox color="success" onChange={() => dispatch(changeCompletedTodo(item.id))} checked={item.completed} />
                </li>
            })}

        </ul>
    )
}

export default TaskList
