import React, { useState, useContext } from 'react';
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
import UserContext from "../UserContext";

interface LoginProps {
  onClose: () => void;
}

const Login = ({ onClose }: LoginProps): JSX.Element => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useContext(UserContext);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle register logic here
    axios.get('/users/login', {
      auth: {
          username: username,
          password: password
      },
      headers: {
          'Content-Type': 'application/json'
      }
  })
  .then(response => {
      setUser(username);
      console.log(response); // 返回用户的所有主题和主题内的所有消息
      onClose();
  })
  .catch(error => {
      console.log(error);
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
              Login
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Login;