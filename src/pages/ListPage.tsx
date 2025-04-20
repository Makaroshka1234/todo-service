import React, { ChangeEvent, useEffect, useState } from 'react'
import { useParams } from 'react-router'

import { Button, TextField } from '@mui/material'
import { PieChart } from '@mui/x-charts'
import { useSnackbar } from 'notistack'

import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks'
import useCheckedTodos from '../hooks/useCheckedTodos'
import { addTodo } from '../store/slices/todoListsSlice'

import TaskList from '../components/TaskList'
import Header from '../components/Header'

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
        <div className='flex flex-col justify-center items-center bg-blue-400 w-full min-h-full'>
            <Header />
            <div className='flex flex-col items-center gap-2 bg-cyan-300 p-4 max-w-xl container'>

                <div className="flex justify-center items-center gap-4 mx-auto" >
                    <TextField label='Todo title' value={inputValue} onChange={handleChange} />
                    <Button variant="outlined" onClick={handleAdd}>Add Todo</Button>
                </div>
                <PieChart
                    series={[
                        {
                            data: [
                                { id: 0, value: checkedTodos, label: 'Complete' },
                                { id: 1, value: uncheckedTodos, label: 'UnComplete' },

                            ],
                            innerRadius: 15,
                            outerRadius: 70,
                            paddingAngle: 2,
                            cornerRadius: 5,
                        },
                    ]}

                />
                <TaskList />
            </div>
        </div>
    )
}

export default ListPage
