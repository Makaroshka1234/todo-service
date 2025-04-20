import React from 'react'
import { useAppSelector } from '../hooks/reduxHooks'
import { TodoListState } from '../types/todo'
import { Link } from 'react-router'

const TodoLists = () => {
    const { lists } = useAppSelector(state => state.todoLists)

    return (
        <ul className='flex flex-col gap-4 max-w-lg'>
            {lists.length === 0 ? <li><span>Немає списків</span></li> : lists.map((item: TodoListState) => (
                <Link to={`/lists/${item.id}`}> <li className='bg-slate-500'>{item.title}</li></Link>
            ))}
        </ul>
    )
}

export default TodoLists
