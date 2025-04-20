import React, { useEffect } from 'react'

import { ITodo } from '../types/todo'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { useParams } from 'react-router';
import { listVariants } from '../animation/animation';



import { Checkbox, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import { AnimatePresence, motion } from "motion/react"



import { changeCompletedTodo, deleteTodo } from '../store/slices/todoListsSlice';









const TaskList = () => {
    const { id } = useParams()

    const dispatch = useAppDispatch()
    const list = useAppSelector(state => state.todoLists.lists.find((l) => l.id === Number(id)))


    return (

        <ul className='flex flex-col gap-4 max-w-lg'>
            <AnimatePresence>
                {list?.todos.map((item: ITodo, index: number) => {
                    return <motion.li
                        variants={listVariants}
                        initial='hidden'
                        animate='visible'
                        exit='exit'
                        custom={index}
                        key={item.id} className='flex justify-center items-center gap-4 bg-cyan-400 px-12 py-2'><span>{item.title}</span>
                        <IconButton onClick={() => {


                            dispatch(deleteTodo({ listId: Number(id), todoId: item.id }));

                        }}> <DeleteIcon /></IconButton>
                        <Checkbox color="success" onChange={() => dispatch(changeCompletedTodo({ listId: Number(id), todoId: item.id }))} checked={item.completed} />
                    </motion.li>
                })}
            </AnimatePresence>
        </ul>

    )
}

export default TaskList
