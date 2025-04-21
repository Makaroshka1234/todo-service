import React, { ChangeEvent, useEffect, useRef, useState } from 'react'

import { Alert, Button, TextField } from '@mui/material'
import { SnackbarProvider, VariantType, useSnackbar } from 'notistack';


import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';



import AddTaskList from '../components/List/AddTaskList';
import Header from '../components/Header'




const Home = () => {

    return (
        <>
            <Header />
            <p>home</p>
        </>
    )
}

export default Home
