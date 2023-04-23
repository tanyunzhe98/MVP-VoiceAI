import React, { useState, useContext, useEffect } from 'react';
import ChatBox from './ChatBox';
import MessageList from './MessageList';
import ThemeList from './ThemeList';
import NewThemeButton from './NewThemeButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { IconButton } from '@material-ui/core';
import UserContext from "../UserContext";
import axios from 'axios';

interface ChatPageProps {
  onPageChange: () => void;
}

interface Message {
  role: string;
  content: string;
  response: string;
}

interface Theme {
  name: string;
  messages: Message[];
  _id: string;
}

function ChatPage({onPageChange}:ChatPageProps) {
  const [themes, setThemes] = useState<Theme[]>([]);
  const [selectedTheme, setSelectedTheme] = useState<string>('');
  const { user, setUser, userid, setUserid } = useContext(UserContext);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        // 发送 Axios 请求，获取当前用户的所有话题
        const response = await axios.get(`/user/theme/${userid}`);
        // TODO: 处理请求返回的数据
        console.log('successfully get the data',response.data);
        setThemes(response.data);
      } catch (err) {
        // TODO: 处理请求错误
        console.error(err);
      }
    };

    // 仅在 user 属性变化时发送请求
    if (user) {
      fetchTopics();
    }
  }, [userid]);

  function addTheme(themeName: string, message?:string, res?:string) {
    if (themes.some(theme => theme.name === themeName)) {
      alert(`Cannot add ${themeName}, name already exists`);
      return;
    }
    var newTheme;
    if (!message || !res) {
      axios.post('/user/theme', {
        name: themeName,
        owner: userid
      }).then(response => {
        console.log(response);
        newTheme = {
          name: themeName,
          messages: [],
          _id:response.data._id,
        };
        setThemes([...themes, newTheme]);
    }).catch(error => {
      console.log(error);
  });
    } else {
      axios.post('/user/theme', {
        name: themeName,
        owner: userid
      }).then(response => {
        console.log(response);
        newTheme = {
          name: themeName,
          messages: [{role: 'user', content: message, response: res}],
          _id:response.data._id,
        };
        setThemes([...themes, newTheme]);
    }).catch(error => {
      console.log(error);
  });
    }
    // const newTheme = {
    //   name: themeName,
    //   messages: [{role: 'user', content: message}]??[]
    // };
    setSelectedTheme(themeName);
  }

  function addMessage(role: string, content: string, response: string) {
    if (selectedTheme) {
      const updatedThemes = themes.map(theme => {
        if (theme.name === selectedTheme) {
          return {
            ...theme,
            messages: [...theme.messages, { role, content, response }]
          };
        } else {
          return theme;
        }
      });
      setThemes(updatedThemes);
    }
  }

  function changeThemeName(oldThemeName: string, newThemeName: string) {
    if (newThemeName === oldThemeName) {
      return;
    }
    if (themes.some(theme => theme.name === newThemeName)) {
      alert(`Cannot change theme name to ${newThemeName}, name already exists`);
      return;
    }
    axios.put(`/user/theme/${oldThemeName}`, {
      name: newThemeName
    }).then(response => {
      console.log(response);
    }).catch(error => {
      console.log(error);
    });
    const updatedThemes = themes.map(theme => {
      if (theme.name === oldThemeName) {
        return { ...theme, name: newThemeName };
      } else {
        return theme;
      }
    });
    setThemes(updatedThemes);
    if (selectedTheme === oldThemeName) {
      setSelectedTheme(newThemeName);
    }
  }

  function deleteTheme(themeName: string, themeid: string) {
    if(selectedTheme === themeName) {
      alert(`Cannot delete theme ${themeName}, theme using`);
      return;
    }
    axios.delete(`/user/theme/${themeid}`)
  .then(response => {
    console.log(response);
  }).catch(error => {
    console.log(error);
  });
    const updatedThemes = themes.filter(theme => theme.name !== themeName);
    setThemes(updatedThemes);
  }



  return (
      <div className='chatpage'>
        <div className="menu">
      <NewThemeButton onAddTheme={addTheme} />
      <ThemeList
          themes={themes}
          onThemeSelect={setSelectedTheme}
          onThemeEdit={changeThemeName}
          onThemeDelete={deleteTheme}
          onPageChange={onPageChange}
          selectedTheme={selectedTheme}
          onClearConversation={function (): void {
            throw new Error('Function not implemented.');
          } } />
    </div>
    <div className="mainchat">
    <IconButton style={{ color: '#187ce0' }} onClick={() => setSelectedTheme('')}>
  <ChevronLeftIcon />
</IconButton>
      <MessageList
        messages={themes.find(theme => theme.name === selectedTheme)?.messages ?? []}
        />
        <ChatBox
        onAddMessage={addMessage}
        selectedTheme={selectedTheme}
        setSelectedTheme={setSelectedTheme}
        addTheme={addTheme}
        themes={themes} />
        </div>
        </div>

  );
}

export default ChatPage;

