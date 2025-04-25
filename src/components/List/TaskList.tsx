import React from 'react'
import { ITodo } from '../../types/todo'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { useParams } from 'react-router'
import { listVariants } from '../../animation/animation'

import { Checkbox, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { AnimatePresence, motion } from "motion/react"

import {
    deleteTodoFromFirestore,
    toggleTodoCompletedInFirestore
} from '../../store/slices/todoListsSlice'

const TaskList = () => {
    const { id } = useParams()
    const dispatch = useAppDispatch()

    const userId = useAppSelector(state => state.user.id)
    const role = useAppSelector(state => state.user.roles[id || ''])
    const list = useAppSelector(state => state.todoLists.lists.find((l) => String(l.id) === id))

    return (
        <ul className='flex flex-col gap-4 mb-3 max-w-lg'>
            <AnimatePresence>
                {list?.todos.map((item: ITodo, index: number) => (
                    <motion.li
                        variants={listVariants}
                        initial='hidden'
                        animate='visible'
                        exit='exit'
                        custom={index}
                        key={item.id}
                        className='flex justify-center items-center gap-4 bg-cyan-400 px-12 py-2'
                    >
                        <span>{item.title}</span>

                        {/* Видалення лише для admin */}
                        {role === 'admin' && (
                            <IconButton
                                onClick={() => {
                                    if (id && userId) {
                                        dispatch(deleteTodoFromFirestore({
                                            userId: String(userId),
                                            listId: String(list.id),
                                            todoId: item.id
                                        }))
                                    }
                                }}
                            >
                                <DeleteIcon />
                            </IconButton>
                        )}

                        {/* Зміна статусу доступна всім */}
                        <Checkbox
                            color="success"
                            onChange={() => {
                                if (id && userId) {
                                    dispatch(toggleTodoCompletedInFirestore({
                                        userId: String(userId),
                                        listId: String(list.id),
                                        todoId: String(item.id)
                                    }))
                                }
                            }}
                            checked={item.completed}
                        />
                    </motion.li>
                ))}
            </AnimatePresence>
        </ul>
    )
}

export default TaskList
