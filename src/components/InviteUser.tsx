import { Button, MenuItem, TextField } from '@mui/material';
import React from 'react';
import { Role } from '../types/user';

interface InviteUserProps {
  inviteEmail: string;
  inviteRole: Role;
  setInviteRole: (role: Role) => void;
  setInviteEmail: (inviteEmail: string) => void;
  handleInvite: () => void;
}

const InviteUser = ({
  inviteEmail,
  inviteRole,
  setInviteEmail,
  setInviteRole,
  handleInvite,
}: InviteUserProps) => {
  return (
    <div className="flex gap-3 pb-2 w-full max-w-2xl">
      <h4>Запросити користувача</h4>
      <div className="flex gap-3 pb-2 w-full max-w-2xl">
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
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#303030', // стандартний бордер
              },
              '&:hover fieldset': {
                borderColor: '#414141', // бордер при наведенні
              },
              '&.Mui-focused fieldset': {
                borderColor: '#414141', // бордер коли фокус
              },
            },
          }}
          label="Email користувача"
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
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#303030', // стандартний бордер
              },
              '&:hover fieldset': {
                borderColor: '#414141', // бордер при наведенні
              },
              '&.Mui-focused fieldset': {
                borderColor: '#414141', // бордер коли фокус
              },
            },
          }}
          SelectProps={{
            MenuProps: {
              PaperProps: {
                sx: {
                  backgroundColor: '#414141', // колір бекграунда випадаючого меню
                  color: '#fff', // колір тексту у меню
                },
              },
            },
          }}
          select
          label="Роль"
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
            value="admin"
          >
            Admin
          </MenuItem>
          <MenuItem
            sx={{
              '&.Mui-selected': {
                backgroundColor: '#616161',
                color: '#fff',
              },
            }}
            value="viewer"
          >
            Viewer
          </MenuItem>
        </TextField>
        <Button
          sx={{
            background: '#212121',
            borderColor: '#ffffff26',
            '&:hover': {
              background: '#414141',
            },
          }}
          variant="contained"
          onClick={handleInvite}
        >
          Запросити
        </Button>
      </div>
    </div>
  );
};

export default InviteUser;
