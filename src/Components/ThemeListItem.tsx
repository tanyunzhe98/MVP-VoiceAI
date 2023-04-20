import React from 'react';
import { Button, IconButton, Box, TextField, ButtonGroup, Typography } from '@material-ui/core';
import { Edit, Delete, Check, Clear, ChatBubble } from '@material-ui/icons';

interface ThemeListItemProps {
  themeName: string;
  onSelect: () => void;
  onEdit: (oldThemeName: string, newThemeName: string) => void;
  onDelete: () => void;
  selectedTheme: string;
}

function ThemeListItem({ themeName, onSelect, onEdit, onDelete, selectedTheme }: ThemeListItemProps) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [newThemeName, setNewThemeName] = React.useState(themeName);

  function handleEditClick() {
    setIsEditing(true);
  }

  function handleSaveClick() {
    onEdit(themeName, newThemeName);
    setIsEditing(false);
  }

  function handleCancelClick() {
    setIsEditing(false);
    setNewThemeName(themeName);
  }

  return (
    <div>
      {isEditing ? (
        <>
<Box
  display="flex"
  alignItems="center"
  ml={1}
  style={{
    borderRadius: '4px',
    backgroundColor: themeName === selectedTheme ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
    height: '57px',
    width: '90%',
    margin: '0',
    paddingLeft: '16px',
    paddingRight: '13px',
    paddingTop: 0,
    paddingBottom: 0
  }}
>
  <ChatBubble style={{ fontSize: '24px', transform: 'scale(0.8)', color: 'white' }} />
  <TextField
    variant="standard"
    value={newThemeName}
    onChange={(e) => setNewThemeName(e.target.value)}
    inputProps={{
      style: { color: 'white', borderColor: 'transparent' },
      endAdornment: (
        <React.Fragment>
          <IconButton onClick={handleSaveClick} style={{ color: 'white' }}>
            <Check />
          </IconButton>
          <IconButton onClick={handleCancelClick} style={{ color: 'white' }}>
            <Clear />
          </IconButton>
        </React.Fragment>
      )
    }}
    style={{ width: '95%', height: '25px', border: 'none', outline: 'none', marginTop: '-23px' }}
    />
</Box>





</>
      ) : (
        <>
          {/* <button onClick={onSelect}>{themeName}</button>
          <button onClick={handleEditClick}>Edit</button>
          <button onClick={onDelete}>Delete</button> */}
<IconButton
  style={{
    borderRadius: '4px',
    height: '57px',
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: themeName === selectedTheme ? 'rgba(255, 255, 255, 0.1)' : 'transparent'
  }}
  onClick={onSelect}
>
  <Box
    display="flex"
    alignItems="center"
    justifyContent="space-between"
    position="absolute"
    left="0"
    right="0"
    top="0"
    bottom="0"
    padding="0 16px"
  >
<Box display="flex" alignItems="center">
<ChatBubble style={{ fontSize: '24px', transform: 'scale(0.8)', color: 'white' }} />
  <Typography
    style={{
      color: 'white',
      textTransform: 'none',
      maxWidth: '110px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    }}
  >
    {themeName}
  </Typography>
</Box>
    <Box display="flex" alignItems="center">
      <IconButton onClick={handleEditClick} style={{ color: 'white' }}>
        <Edit />
      </IconButton>
      <IconButton onClick={onDelete} style={{ color: 'white' }}>
        <Delete />
      </IconButton>
    </Box>
  </Box>
</IconButton>
        </>
      )}
    </div>
  );
}

export default ThemeListItem;