import React, { useEffect } from 'react'
import { ITodo } from '../types/todo'
import { Checkbox, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { changeCompletedTodo, deleteTodo } from '../store/slices/todoSlice';

import { AnimatePresence, motion } from "motion/react"
import { listVariants } from '../animation/animation';

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

        <ul className='flex flex-col gap-4 max-w-lg'>
            <AnimatePresence>
                {todos.map((item: ITodo, index: number) => {
                    return <motion.li
                        variants={listVariants}
                        initial='hidden'
                        animate='visible'
                        exit='exit'
                        custom={index}
                        key={item.id} className='flex justify-center items-center gap-4 bg-cyan-400 px-12 py-2'><span>{item.title}</span>
                        <IconButton onClick={() => {


                            dispatch(deleteTodo(item.id));

                        }}> <DeleteIcon /></IconButton>
                        <Checkbox color="success" onChange={() => dispatch(changeCompletedTodo(item.id))} checked={item.completed} />
                    </motion.li>
                })}
            </AnimatePresence>
        </ul>

    )
}

export default TaskList
