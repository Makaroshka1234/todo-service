import React, { ChangeEvent, useEffect, useState } from 'react'
import { useParams } from 'react-router'

import { Button, TextField } from '@mui/material'
import { PieChart } from '@mui/x-charts'
import { useSnackbar } from 'notistack'

import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks'
import useCheckedTodos from '../hooks/useCheckedTodos'
import { addTodo } from '../store/slices/todoListsSlice'

import TaskList from '../components/List/TaskList'
import Header from '../components/Header'
import Chart from '../components/Chart'

const ListPage = () => {

    const dispatch = useAppDispatch()

    const { id } = useParams()
    const [inputValue, setInputValue] = useState<string>('')

    const list = useAppSelector(state => state.todoLists.lists.find((l) => l.id === Number(id)))


    const { checkedTodos, uncheckedTodos } = useCheckedTodos(list?.todos)

    function handleChange(e: ChangeEvent<HTMLInputElement>): void {
        setInputValue(e.target.value)

    }
    const handleAdd = () => {
        dispatch(addTodo({ listId: Number(id), title: inputValue }));
        setInputValue('');
    };

    return (
        <>
            <Header />

            <div className='flex flex-col gap-6 px-8 py-11 container'>
                <div className='flex items-center gap-2 mb-5'>
                    <h3>Назва списку</h3>
                    <p>{list?.title}</p>
                </div>
                <div className="flex justify-around px-3"  >
                    <div className='flex flex-col gap-3'>
                        <div className='flex items-center gap-3 mb-3 max-h-8'>
                            <TextField label='Todo title' value={inputValue} onChange={handleChange} />
                            <Button variant="outlined" onClick={handleAdd}>Add Todo</Button>
                        </div>
                        <TaskList />
                    </div>
                    <div className='flex flex-col justify-center gap-3 max-h-40'>
                        <p>Діаграмма завдань</p>
                        <Chart checkedTodos={checkedTodos} uncheckedTodos={uncheckedTodos} />
                    </div>
                </div>
            </div>



        </>
    )
}

export default ListPage
