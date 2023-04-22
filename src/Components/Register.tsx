import React, { Dispatch, SetStateAction, useState } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Typography,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import axios from 'axios';

interface RegisterProps {
  onClose: () => void;
  setShowLogin: Dispatch<SetStateAction<boolean>>
}

const Register = ({ onClose, setShowLogin }: RegisterProps): JSX.Element => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle register logic here
    axios.post('/rsvps',{
      username:username,
      password:password
    })
    .then(()=>{
    }).catch((err)=> {
      console.log(err);
    });
  };

  return (
    <Dialog open onClose={onClose} maxWidth="xs" style={{ height: 999, top: '-20vh' }}>
      <Typography component="h5" style={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton aria-label="close" onClick={onClose}>
            <Close />
          </IconButton>
        </Typography>
      <DialogContent style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
            autoFocus
            margin="dense"
            fullWidth
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            margin="dense"
            fullWidth
          />
          <DialogActions>
            <Button type="submit" variant="contained" style={{ width: '100%' }}>
              Register
            </Button>
          </DialogActions>
        </form>
        <Typography align="center">
          Already a user?{' '}
          <Button color="primary" onClick={() => {onClose();setShowLogin(true);}}>
            Login
          </Button>
        </Typography>
      </DialogContent>
    </Dialog>
  );
};

export default Register;
