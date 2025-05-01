import React from 'react'
import { ITodo } from '../../types/todo'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { useParams } from 'react-router'
import { listVariants } from '../../animation/animation'

import { Checkbox, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit';
import { AnimatePresence, motion } from "motion/react"

import {
    deleteTodoFromFirestore,
    toggleTodoCompletedInFirestore
} from '../../store/slices/todoListsSlice'

interface TaskListProps {
    editTodoValue: string,
    setEditTodoValue: (value: string) => void,
    isEdit: boolean,
    setIsEdit: (value: boolean) => void,
    currentEditingTodoId: string,
    setCurrentEditingTodoId: (value: string) => void,
}

const TaskList = ({ editTodoValue, setEditTodoValue, isEdit, setIsEdit, currentEditingTodoId, setCurrentEditingTodoId }: TaskListProps) => {
    const { id } = useParams()
    const dispatch = useAppDispatch()

    const userId = useAppSelector(state => state.user.id)
    const role = useAppSelector(state => state.user.roles[id || ''])
    const list = useAppSelector(state => state.todoLists.lists.find((l) => String(l.id) === id))
    const fetching = useAppSelector(state => state.todoLists.fetchPending)


    function handleChange(title: string, id: number) {

        setEditTodoValue(title)
        setIsEdit(!isEdit)

        setCurrentEditingTodoId(id.toString())
    }


    return (
        <ul className='flex flex-col gap-4 bg-customGray mb-3 rounded-md min-w-[600px] max-w-[700px] min-h-[300px] max-h-[301px] overflow-x-hidden overflow-y-auto'>
            {list?.todos.length ? <AnimatePresence>
                {list?.todos.map((item: ITodo, index: number) => (
                    <motion.li
                        variants={listVariants}
                        initial='hidden'
                        animate='visible'
                        exit='exit'
                        custom={index}
                        key={item.id}
                        className='flex justify-center items-center gap-4 px-12 py-2 border-customBorder border-b'
                    >
                        <span>{item.title}</span>


                        {role === 'admin' && (<IconButton

                            onClick={() => {
                                if (id) {
                                    dispatch(deleteTodoFromFirestore({
                                        userId: String(userId),
                                        listId: String(list.id),
                                        todoId: item.id
                                    }))
                                }
                            }}
                        >
                            <DeleteIcon sx={{
                                fill: '#fff'
                            }} />
                        </IconButton>)
                        }
                        <IconButton onClick={() => handleChange(item.title, item.id)}>
                            <EditIcon sx={{
                                fill: '#fff'
                            }} />
                        </IconButton>
                        {/* Зміна статусу доступна всім */}
                        <Checkbox
                            sx={{
                                color: '#fff',

                            }}
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
            </AnimatePresence> : 'no tasks'}
        </ul>
    )
}

export default TaskList
