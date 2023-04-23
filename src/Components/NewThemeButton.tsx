import React, { useState } from 'react';
import { Button, IconButton, TextField, makeStyles } from '@material-ui/core';
import { Check, Clear } from '@material-ui/icons';

interface NewThemeButtonProps {
  onAddTheme: (themeName:string) => void;
}

function NewThemeButton({ onAddTheme }: NewThemeButtonProps) {
  const [themeName, setThemeName] = useState('');
  const [showInput, setShowInput] = useState(false);

  const handleAddTheme = () => {
    if (themeName.trim()) {
      onAddTheme(themeName.trim());
      setShowInput(false);
      setThemeName('');
    }
  };

  const handleShowInput = () => {
    setShowInput(true);
  };

  const handleCancelInput = () => {
    setShowInput(false);
    setThemeName('');
  };

const useStyles = makeStyles((theme) => ({
  whiteBorder: {
    borderColor: 'white !important',
    borderWidth: 1,
    borderRadius: 4
  }
}));

const classes = useStyles();

  return (
<div style={{ display: 'flex', alignItems: 'center' }}>
  {showInput ? (
    <div style={{ flex: 1 }}>
<TextField
  variant="outlined"
  value={themeName}
  onChange={(event) => setThemeName(event.target.value)}
  InputLabelProps={{
    style: {
      color: 'white'
    }
  }}
  InputProps={{
    style: {
      color: 'white',
      borderColor: 'white'
    },
    endAdornment: (
      <React.Fragment>
        <IconButton style={{ color: 'white' }} onClick={handleAddTheme}>
          <Check />
        </IconButton>
        <IconButton style={{ color: 'white' }} onClick={handleCancelInput}>
          <Clear />
        </IconButton>
      </React.Fragment>
    ),
    classes: {
      notchedOutline: classes.whiteBorder // 使用自定义类名
    }
  }}
  className="custom-text-field"
  style={{ width: '100%', borderColor: 'white' }}
/>
    </div>
  ) : (
    <div style={{ flex: 1 }}>
      <Button
        className="new-theme-button"
        onClick={handleShowInput}
        variant="outlined"
        style={{ borderColor: 'white', color: 'white', height: '100%', width: '100%' }}
      >
        + New theme
      </Button>
    </div>
  )}
</div>


  );
}


export default NewThemeButton;
