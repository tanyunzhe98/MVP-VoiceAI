import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import ChatBox from './ChatBox';
import MessageList from './MessageList';
import ThemeList from './ThemeList';
import NewThemeButton from './NewThemeButton';

interface Message {
  role: string;
  content: string;
  response: string;
}

interface Theme {
  name: string;
  messages: Message[];
}

function ChatPage() {
  const [themes, setThemes] = useState<Theme[]>([]);
  const [selectedTheme, setSelectedTheme] = useState<string>('');

  function addTheme(themeName: string, message?:string, res?:string) {
    if (themes.some(theme => theme.name === themeName)) {
      alert(`Cannot add ${themeName}, name already exists`);
      return;
    }
    var newTheme;
    if (!message || !res) {
      newTheme = {
        name: themeName,
        messages: []
      };
    } else {
      newTheme = {
        name: themeName,
        messages: [{role: 'user', content: message, response: res}]
      };
    }
    // const newTheme = {
    //   name: themeName,
    //   messages: [{role: 'user', content: message}]??[]
    // };
    setThemes([...themes, newTheme]);
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

  function deleteTheme(themeName: string) {
    if(selectedTheme === themeName) {
      alert(`Cannot delete theme ${themeName}, theme using`);
      return;
    }
    const updatedThemes = themes.filter(theme => theme.name !== themeName);
    setThemes(updatedThemes);
  }

  return (
    <Container>
      <Row className="mt-5">
        <Col>
          <h1>ChatGPT</h1>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col>
            <div>
              <ThemeList
                themes={themes.map(theme => theme.name)}
                onThemeSelect={setSelectedTheme}
                onThemeEdit={changeThemeName}
                onThemeDelete={deleteTheme}
              />
              <NewThemeButton onAddTheme={addTheme} />
            </div>
            <div>
              <Button variant="secondary" onClick={() => setSelectedTheme('')}>
                Back
              </Button>
              <h2>{selectedTheme}</h2>
              <MessageList
                messages={
                  themes.find(theme => theme.name === selectedTheme)?.messages ?? []
                }
              />
              <ChatBox onAddMessage={addMessage} selectedTheme={selectedTheme} setSelectedTheme={setSelectedTheme} addTheme={addTheme} themes = {themes}/>
            </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ChatPage;

