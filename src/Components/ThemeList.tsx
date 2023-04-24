import React, { Dispatch, SetStateAction, useContext, useState } from 'react';
import ThemeListItem from './ThemeListItem';
import { Button, IconButton, Menu, MenuItem } from '@material-ui/core';
import { MoreVert as MoreVertIcon, Home as HomeIcon, AccountCircle as AccountCircleIcon, ExitToApp as ExitToAppIcon, ClearAll as ClearAllIcon } from '@material-ui/icons';
import UserContext from "../UserContext";
import axios from 'axios';

interface Props {
  themes: Theme[];
  onThemeSelect: (themeName: string) => void;
  onThemeidSelect: (themeId: string) => void;
  onThemeEdit: (oldThemeName: string, newThemeName: string) => void;
  onThemeDelete: (themeName: string, themeId: string) => void;
  selectedTheme: string;
  onClearConversation: () => void;
  onPageChange: () => void;
  setMessages: Dispatch<SetStateAction<Message[]>>
}

interface Theme {
  name: string;
  messages: Message[];
  _id: string;
}

interface Message {
  role: string;
  content: string;
  response: string;
}

const ThemeList =({ themes, onThemeSelect, onThemeidSelect, onThemeEdit, onThemeDelete, selectedTheme, onClearConversation, onPageChange, setMessages }: Props): JSX.Element =>  {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { user, setUser, userid, setUserid } = useContext(UserContext);

  function handleMenuOpen(event: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleMenuClose() {
    setAnchorEl(null);
  }

  function handleThemeEdit(oldThemeName: string, newThemeName: string) {
    if (oldThemeName !== newThemeName) {
      onThemeEdit(oldThemeName, newThemeName);
    }
  }

  function onSelect(name: string, id: string) {
    onThemeSelect(name);
    onThemeidSelect(id);
    axios.get(`/user/theme/message/${userid}/${id}`)
    .then(response => {
      console.log(response.data); // 返回的消息数据
      var temp = response.data.map((data: { content: any; response: any; })=>{
        var message = {
          role: 'user',
          content: data.content,
          response: data.response
        }
        return message;
      })
      setMessages(temp);
    })
    .catch(error => {
      console.log(error);
    });
  }

  return (
    <div>
      {themes.map((theme) => (
        <ThemeListItem
          key={theme.name}
          themeName={theme.name}
          themeid={theme._id}
          onSelect={()=>{onSelect(theme.name, theme._id)}}
          onEdit={handleThemeEdit}
          onDelete={() => onThemeDelete(theme.name, theme._id)}
          selectedTheme={selectedTheme}
        />
      ))}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
        <Button style={{ width: '100%' }} startIcon={<HomeIcon />} onClick={onPageChange} className='button'>Home</Button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
      <Button style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', width: '100%' }} className='button' onClick={handleMenuOpen}>
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
    <AccountCircleIcon />
    <span style={{ marginLeft: '0.5rem' }}>{user}</span>
  </div>
  <MoreVertIcon />
</Button>

      </div>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={()=> {setUser(''); setUserid(''); handleMenuClose()}}>
          <ExitToAppIcon style={{ marginRight: '0.5rem' }} />
          Log out
        </MenuItem>
        <MenuItem onClick={onClearConversation}>
          <ClearAllIcon style={{ marginRight: '0.5rem' }} />
          Clear conversation
        </MenuItem>
      </Menu>
    </div>
  );
}

export default ThemeList;
