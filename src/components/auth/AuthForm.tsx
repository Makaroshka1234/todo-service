import { Box, Button, TextField } from '@mui/material'
import React, { useState } from 'react'


interface AuthFormProps {
    title: string;
    handleClick: (email: string, password: string) => void
}

const AuthForm = ({ title, handleClick }: AuthFormProps) => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')


    return (
        <Box
            component="div"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 4
            }}
        >
            <p>{title}</p>
            <TextField
                label="Email"
                type="email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <TextField
                label="Password"
                type="text"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <Button
                onClick={() => handleClick(email, password)}
                variant="contained" size="medium">
                {title}
            </Button>

        </Box>
    )
}

export default AuthForm
