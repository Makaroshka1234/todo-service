import { Button, TextField } from '@mui/material'
import { PieChart } from '@mui/x-charts'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks'
import { useSnackbar } from 'notistack'
import useCheckedTodos from '../hooks/useCheckedTodos'
import { addTodo } from '../store/slices/todoSlice'
import TaskList from '../components/TaskList'
import { useParams } from 'react-router'

const ListPage = () => {

    const dispatch = useAppDispatch()

    const [inputValue, setInputValue] = useState<string>('')


    const { inputError, todos } = useAppSelector(state => state.todo)

    const { enqueueSnackbar } = useSnackbar();

    const { checkedTodos, uncheckedTodos } = useCheckedTodos(todos)

    const completedCount = checkedTodos.length
    const unCompletedCount = uncheckedTodos.length
    useEffect(() => {
        if (inputError) {
            enqueueSnackbar('Input value error', { variant: 'error', autoHideDuration: 1500, });

        }
    }, [inputError])



    const { id } = useParams()






    function handleChange(e: ChangeEvent<HTMLInputElement>): void {
        setInputValue(e.target.value)

    }

    const handleAdd = () => {
        dispatch(addTodo(inputValue));
        setInputValue('');
    };

    return (
        <div className='flex flex-col justify-center items-center bg-blue-400 w-full min-h-full'>
            <div className='flex flex-col items-center gap-2 bg-cyan-300 p-4 max-w-xl container'>

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

export default ListPage
