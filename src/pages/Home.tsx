import React, { ChangeEvent, useEffect, useRef, useState } from 'react'

import { Alert, Button, TextField } from '@mui/material'
import { SnackbarProvider, VariantType, useSnackbar } from 'notistack';


import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';



import AddTaskList from '../components/AddTaskList';
import Header from '../components/Header'




const Home = () => {

    return (
        <div className='flex flex-col justify-center items-center bg-blue-400 w-full min-h-full'>
            <Header />

            <div className='flex flex-col items-center gap-2 bg-cyan-300 p-4 max-w-xl container'>


                <AddTaskList />



            </div>
        </div>

    )
}

export default Home
