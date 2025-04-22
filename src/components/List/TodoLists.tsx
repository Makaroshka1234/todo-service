import React from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { TodoListState } from '../../types/todo'
import { Link } from 'react-router'
import { AnimatePresence, motion } from "motion/react"
import { TodoListVariants } from '../../animation/animation'
import { deleteTodoList } from '../../store/slices/todoListsSlice'
import { IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import Icon from '@mui/material/Icon';
const TodoLists = () => {
    const { lists } = useAppSelector(state => state.todoLists)
    const dispatch = useAppDispatch()
    return (
        <ul className='flex gap-4 pb-5 pl-5'>
            {lists.length === 0 ? <li><span>Немає списків</span></li> : lists.map((item: TodoListState) => (
                <motion.li
                    initial='hidden'
                    animate='visible'
                    variants={TodoListVariants}
                    className='flex flex-col bg-slate-500 p-4 rounded-lg'>
                    <div className="inner">
                        <p className=''>Назва списку:<span className=''>{item.title} </span></p>
                        <div className="bottom">
                            <IconButton onClick={() => dispatch(deleteTodoList({ id: item.id }))} aria-label="delete">
                                <DeleteIcon />
                            </IconButton>
                            <Link to={`/lists/${item.id}`}>
                                <Icon color="primary">add_circle</Icon>
                            </Link>
                        </div>
                    </div>



                </motion.li>
            ))
            }
        </ul >
    )
}

export default TodoLists
