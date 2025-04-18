import React from 'react'
import { ITodo } from '../types/todo'
import { Checkbox, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';

interface TaskListProps {
    todos: ITodo[],
    completeTask: boolean,
    deleteTodo: (id: number) => void,
    handleComplete: (id: number) => void,
}


const TaskList = ({ todos, deleteTodo, handleComplete, completeTask }: TaskListProps) => {


    return (
        <ul className='bg-slate-50 max-w-lg'>

            {todos.map((item: ITodo) => {
                console.log(item.completed, item.title)
                return <li key={item.id} className='flex justify-center items-center gap-4 px-12 py-2'><span>{item.title}</span>
                    <IconButton onClick={() => deleteTodo(item.id)}> <DeleteIcon /></IconButton>
                    <Checkbox color="success" onChange={() => handleComplete(item.id)} checked={item.completed} />
                </li>
            })}

        </ul>
    )
}

export default TaskList
