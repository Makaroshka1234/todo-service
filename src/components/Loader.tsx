import { CircularProgress } from '@mui/material'
import React from 'react'

const Loader = () => {
    return (
        <div className='flex justify-center items-center h-screen'><CircularProgress size={60} /></div>
    )
}

export default Loader
