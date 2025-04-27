import React from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { TodoListState } from '../../types/todo'
import { Link } from 'react-router'
import { AnimatePresence, motion } from "motion/react"
import { TodoListVariants } from '../../animation/animation'
import { deleteTodoListFromFirestore } from '../../store/slices/todoListsSlice'
import { IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

const TodoLists = () => {
    const { lists } = useAppSelector(state => state.todoLists)
    const dispatch = useAppDispatch()
    const { id } = useAppSelector(state => state.user)

    const myLists = lists.filter(list => list.userId === id)
    const sharedLists = lists.filter(
        list => list.userId !== id && list.member.some(m => m.userId === id)
    )
    const pendingLists = useAppSelector(state => state.todoLists.fetchPending)

    const renderList = (items: TodoListState[]) => (
        <ul className='flex flex-wrap gap-4' >
            {
                pendingLists ? <p>Loading....</p> : items.length === 0 ? (
                    <li><span>Немає списків</span></li>
                ) : (
                    items.map((item: TodoListState) => (
                        <motion.li
                            key={item.id}
                            initial='hidden'
                            animate='visible'
                            variants={TodoListVariants}
                            className='flex flex-col bg-customGray p-4 rounded-lg min-w-[250px]'
                        >
                            <div className="inner">
                                <p>Назва списку: <span>{item.title}</span></p>
                                <div className="bottom flex gap-2 mt-2">
                                    {item.userId === id && (
                                        <IconButton
                                            onClick={() =>
                                                dispatch(deleteTodoListFromFirestore({
                                                    userId: id!,
                                                    listId: item.id
                                                }))
                                            }
                                            aria-label="delete"
                                        >
                                            <DeleteIcon
                                                sx={{
                                                    fill: '#fff'
                                                }}
                                            />
                                        </IconButton>
                                    )}
                                    <Link to={`/lists/${item.id}`}>
                                        <IconButton>
                                            <ArrowForwardIcon
                                                sx={{
                                                    fill: '#fff'
                                                }} />
                                        </IconButton>
                                    </Link>
                                </div>
                            </div>
                        </motion.li>
                    ))
                )
            }
        </ul >
    )

    return (
        <div className='flex flex-col gap-10 px-4 pb-10'>
            <div>
                <h2 className='mb-2 font-semibold text-lg'>Мої списки</h2>
                {renderList(myLists)}
            </div>
            <div>
                <h2 className='mb-2 font-semibold text-lg'>Списки, де мене додали</h2>
                {renderList(sharedLists)}
            </div>
        </div>
    )
}

export default TodoLists
