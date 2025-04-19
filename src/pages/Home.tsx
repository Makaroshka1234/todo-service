import React, { ChangeEvent, useEffect, useRef, useState } from 'react'

import { Alert, Button, TextField } from '@mui/material'
import { SnackbarProvider, VariantType, useSnackbar } from 'notistack';

import TaskList from '../components/TaskList'
import { ITodo } from '../types/todo'
import { PieChart } from '@mui/x-charts';

import useCheckedTodos from '../hooks/useCheckedTodos';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { addTodo } from '../store/slices/todoSlice';



const Home = () => {



    const dispatch = useAppDispatch()

    const [inputValue, setInputValue] = useState<string>('')


    const { inputError, todos } = useAppSelector(state => state.todo)

    const { enqueueSnackbar } = useSnackbar();

    const { checkedTodos, uncheckedTodos } = useCheckedTodos(todos)

    const completedCount = checkedTodos.length
    const unCompletedCount = uncheckedTodos.length

    useEffect(() => {
        console.log('update', todos)
    }, [todos])

    useEffect(() => {
        if (inputError) {
            enqueueSnackbar('Input value error', { variant: 'error', autoHideDuration: 1500, });

        }
    }, [inputError])










    function handleChange(e: ChangeEvent<HTMLInputElement>): void {
        setInputValue(e.target.value)

    }

    const handleAdd = () => {
        dispatch(addTodo(inputValue));
        setInputValue('');
    };







    return (
        <div className="flex justify-center items-center bg-slate-400 w-full h-full">
            <div className='flex flex-col items-center gap-2 bg-cyan-300 mx-auto p-4 max-w-xl container'>
                <div className="flex justify-center items-center gap-4 mx-auto" >
                    <TextField label='Todo title' value={inputValue} onChange={handleChange} />
                    <Button variant="outlined" onClick={handleAdd}>Add Todo</Button>
                </div>
                <PieChart

                    series={[
                        {
                            data: [
                                { id: 0, value: completedCount, label: 'Complete' },
                                { id: 1, value: unCompletedCount, label: 'UnComplete' },

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

export default Home
