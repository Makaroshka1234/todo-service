import { Button, MenuItem, TextField } from '@mui/material'
import React from 'react'


type Role = 'admin' | 'viewer'

interface InviteUserProps {
    inviteEmail: string,
    inviteRole: Role,
    setInviteRole: (role: Role) => void,
    setInviteEmail: (inviteEmail: string) => void,
    handleInvite: () => void
}

const InviteUser = ({ inviteEmail, inviteRole, setInviteEmail, setInviteRole, handleInvite }: InviteUserProps) => {
    return (
        <div className='flex flex-col gap-3 mt-6 w-full max-w-md'>
            <h4>Запросити користувача</h4>
            <TextField
                sx={{
                    background: '#414141',
                    color: '#fff',
                    borderColor: '#303030',
                    borderRadius: 2,
                    '& .MuiInputBase-input': {
                        color: '#fff',
                    },
                    '&:hover fieldset': {
                        borderColor: '#414141',
                    },

                    '& .MuiInputLabel-root': {
                        color: '#fff',
                    },
                }
                }
                label='Email користувача'
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
            />
            <TextField
                sx={{
                    background: '#414141',
                    color: '#fff',
                    borderColor: '#303030',
                    borderRadius: 2,
                    '& .MuiInputBase-input': {
                        color: '#fff',
                    },
                    '&:hover fieldset': {
                        borderColor: '#414141',
                    },

                    '& .MuiInputLabel-root': {
                        color: '#fff',
                    },

                }
                }
                SelectProps={{
                    MenuProps: {
                        PaperProps: {
                            sx: {
                                backgroundColor: '#414141', // колір бекграунда випадаючого меню
                                color: '#fff',               // колір тексту у меню

                            },
                        },
                    },
                }}
                select
                label='Роль'
                value={inviteRole}
                onChange={(e) => setInviteRole(e.target.value as Role)}
            >
                <MenuItem
                    sx={{
                        '&.Mui-selected': {
                            backgroundColor: '#616161',
                            color: '#fff',
                        },
                    }}
                    value='admin'>Admin</MenuItem>
                <MenuItem
                    sx={{
                        '&.Mui-selected': {
                            backgroundColor: '#616161',
                            color: '#fff',
                        },
                    }}
                    value='viewer'>Viewer</MenuItem>
            </TextField>
            <Button variant='contained' onClick={handleInvite}>Запросити</Button>
        </div>
    )
}

export default InviteUser
