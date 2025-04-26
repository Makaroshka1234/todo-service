import { Box, Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';

interface AuthForm {
    email: string,
    password: string
}

interface AuthFormProps {
    title: string;
    handleClick: (email: string, password: string) => void
}


const AuthForm = ({ title, handleClick }: AuthFormProps) => {

    const { register, handleSubmit, formState } = useForm<AuthForm>(
        {
            mode: 'onChange',
        }
    )

    const emailError = formState.errors.email?.message
    const passError = formState.errors.password?.message

    function onSubmit(data: AuthForm): void {

        handleClick(data.email, data.password)
    }

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                maxWidth: 600,
                justifyContent: 'center',
                padding: 5,
                alignItems: 'center'

            }}
        >
            <p className='mb-1'>{title}</p>
            <div className='flex flex-col justify-center items-center gap-2.5 mb-2'>
                <TextField
                    sx={{
                        maxWidth: 200
                    }}
                    label="Email"
                    type="email"
                    variant="outlined"
                    {...register('email', {
                        required: 'This field required',
                        pattern: {
                            value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                            message: 'Invalid email adresss'
                        }
                    })}

                />
                {emailError && <p className='text-red-600'>{emailError}</p>}
                <TextField
                    sx={{
                        maxWidth: 200
                    }}
                    label="Password"
                    type="text"
                    variant="outlined"
                    {...register('password', {
                        required: 'this field required',
                        pattern: {
                            value: /^.{6,}$/,
                            message: 'Password must be 6 characters long',
                        }
                    })}
                />
                {passError && <p className='text-red-600'>{passError}</p>}
            </div>

            <Button
                type='submit'
                variant="contained" size="medium">
                {title}
            </Button>

        </Box >
    )
}

export default AuthForm
