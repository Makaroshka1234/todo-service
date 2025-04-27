import { Button } from '@mui/material'
import React from 'react'

const AboutProjectSection = () => {
    return (
        <div className='justify-center items-center mx-auto max-w-6xl h-screen container'>
            <div className='flex justify-between items-end inner'>
                <div className="p-1 text">
                    <h2 className='mb-5 font-bold text-xl'> About Project</h2>
                    <p className="max-w-sm font-normal text-xl about">With this service, users can create task lists, tasks in lists, which helps users to plan their tasks, and users can also form teams to complete tasks together </p>
                </div>
                <Button variant='outlined'>Create List</Button>
            </div>
        </div>
    )
}

export default AboutProjectSection
