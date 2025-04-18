import React, { ChangeEvent, useEffect, useRef, useState } from 'react'

import { Alert, Button, TextField } from '@mui/material'
import { SnackbarProvider, VariantType, useSnackbar } from 'notistack';

import TaskList from '../components/TaskList'
import { ITodo } from '../types/todo'




const Home = () => {
    const [todos, setTodos] = useState<ITodo[]>([])
    const [inputValue, setInputValue] = useState<string>('')
    const [inputErr, setInputErr] = useState<boolean>(false)
    const [completeTask, setCompleteTask] = useState<boolean>(false)

    const { enqueueSnackbar } = useSnackbar();

    const nextId = useRef(0)

    useEffect(() => {
        console.log('update', todos)
    }, [todos])

    useEffect(() => {
        if (inputErr) {
            enqueueSnackbar('Input value error', { variant: 'error', autoHideDuration: 1500, });
            setInputErr(false)
        }
    }, [inputErr])





    function handleChange(e: ChangeEvent<HTMLInputElement>): void {
        setInputValue(e.target.value)

    }

    function handleClick(): void {

        const newTodo: ITodo = {
            id: nextId.current++,
            title: inputValue,
            completed: false,
        }


        if (typeof (inputValue) !== 'undefined' && inputValue.trim() !== '') {
            setTodos(prev => [...prev, newTodo])
            setInputValue('')
            setInputErr(false)

        } else {
            setInputErr(true)
        }
    }


    function deleteTodo(id: number): void {
        const newArr = todos.filter(item => item.id !== id)
        setTodos(newArr)
        setCompleteTask(false)
    }

    function handleComplete(id: number): void {
        const updatedTodos = todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        setTodos(updatedTodos);
    }

    return (
        <div className="flex justify-center items-center bg-slate-400 w-full h-full">
            <div className='flex flex-col items-center gap-2 bg-cyan-300 mx-auto p-4 max-w-xl container'>
                <div className="flex justify-center items-center gap-4 mx-auto" >
                    <TextField label='Todo title' value={inputValue} onChange={handleChange} />
                    <Button variant="outlined" onClick={handleClick}>Add Todo</Button>
                </div>

                <TaskList todos={todos} deleteTodo={deleteTodo} handleComplete={handleComplete} completeTask={completeTask} />
            </div>

        </div>
    )
}

export default Home
