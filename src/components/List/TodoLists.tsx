import React from 'react'
import { useAppSelector } from '../../hooks/reduxHooks'
import { TodoListState } from '../../types/todo'
import { Link } from 'react-router'
import { AnimatePresence, motion } from "motion/react"
import { TodoListVariants } from '../../animation/animation'

const TodoLists = () => {
    const { lists } = useAppSelector(state => state.todoLists)

    return (
        <ul className='flex gap-4 pb-5 pl-5 max-w-lg'>
            {lists.length === 0 ? <li><span>Немає списків</span></li> : lists.map((item: TodoListState) => (
                <Link to={`/lists/${item.id}`}> <motion.li
                    initial='hidden'
                    animate='visible'
                    variants={TodoListVariants}
                    className='flex justify-center items-center bg-slate-500 rounded-lg w-24 h-24'>{item.title}</motion.li></Link>
            ))}
        </ul>
    )
}

export default TodoLists
