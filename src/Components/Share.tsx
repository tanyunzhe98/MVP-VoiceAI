import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Typography,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { Facebook, Twitter, LinkedIn, GitHub } from '@material-ui/icons';

interface ShareProps {
  onClose: () => void;
}

const Share = ({ onClose }: ShareProps): JSX.Element => {
  const [link, setLink] = useState('');

  const handleCopy = () => {
    navigator.clipboard.writeText(link);
  };

  return (
    <Dialog open={true} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Typography variant="h5" align="center" gutterBottom>
          Share this page
        </Typography>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
          <IconButton>
            <Facebook style={{fontSize: 36}}  component="svg" />
          </IconButton>
          <IconButton>
            <Twitter style={{fontSize: 36}} component="svg" />
          </IconButton>
          <IconButton>
            <LinkedIn style={{fontSize: 36}} component="svg" />
          </IconButton>
          <IconButton>
            <GitHub style={{fontSize: 36}} component="svg" />
          </IconButton>
          {/* Add more social media icons here */}
        </div>
        <TextField
          label="Link"
          fullWidth
          value={link}
          onChange={(event) => setLink(event.target.value)}
          InputProps={{
            endAdornment: (
              <IconButton onClick={handleCopy}>
                <Typography variant="subtitle1">Copy</Typography>
              </IconButton>
            ),
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Share;
