import React from 'react';
import {
  Avatar,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  IconButton
} from '@material-ui/core';
import { PlayArrow, Pause } from '@material-ui/icons';
const user = require('./user_default.png').default;
const robot = require('./robot_default.png').default;

interface MessageListProp {
  messages: Message[];
}

interface Message {
  role: string;
  content: string;
  response: string;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  listItem: {
    display: 'flex',
    flexDirection: 'column',
    margin: '10px',
  },
  avatar: {
    marginRight: '10px',
  },
  userBubbleContainer: {
    display: 'flex',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'flex-end', // align to the right
    maxWidth: '80%',
    textAlign: 'right',
    marginLeft: 'auto',
  },
  userBubble: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: '10px',
    padding: '10px',
    color: 'white',
    maxWidth: '100%',
  },
  compBubbleContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start', // align to the left
    maxWidth: '80%',
  },
  compBubble: {
    backgroundColor: theme.palette.grey[300],
    borderRadius: '10px',
    padding: '10px',
    maxWidth: '100%',
  },
  scrollContainer: {
    height: '400px',
    overflow: 'auto',
    width: '700px',
    maxWidth: '700px',
    minWidth: '700px',
  },
  playButton: {
    color: theme.palette.primary.main,
  },
}));

function MessageList({ messages }: MessageListProp) {
  const classes = useStyles();
  const [isSpeaking, setIsSpeaking] = React.useState(false);
  let synthRef = React.useRef<SpeechSynthesis | null>(null);
  let utteranceRef = React.useRef<SpeechSynthesisUtterance | null>(null);

  React.useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && lastMessage.response) {
      speak(lastMessage.response);
    }
  }, [messages]);

  const synth = synthRef.current || window.speechSynthesis;
  const utterance = utteranceRef.current || new SpeechSynthesisUtterance();
  utterance.volume = 1;
  utterance.rate = 1;
  utterance.pitch = 1;
  utterance.lang = 'en-US';
  synth.onvoiceschanged = () => {
    const voices = synth.getVoices();
    utterance.voice = voices[0];
  };

  const speak = (res: string) => {
    synthRef.current = synth;
    utteranceRef.current = utterance;
    utterance.text = res;
    synth.speak(utterance);
    setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
  }

  return (
    <div className={classes.scrollContainer}>
      {messages.map((message, index) => (
        <div key={index}>
          <div className={classes.listItem}>
            <div className={classes.userBubbleContainer}>
              <ListItemAvatar className={classes.avatar}>
                <Avatar alt="user avatar" src={user}  style={{ width: '60px', height: '60px' }}
                />
              </ListItemAvatar>
              <div style={{ marginRight: '5px' }} />
              <ListItemText className={classes.userBubble} primary={message.content} />
            </div>
            <div className={classes.compBubbleContainer}>
              <ListItemAvatar className={classes.avatar}>
                <Avatar alt="computer avatar" src={robot} style={{ width: '70px', height: '70px' }}/>
              </ListItemAvatar>
              <ListItemText className={classes.compBubble} primary={message.response} />
              <IconButton className={classes.playButton} onClick={() => {  if (isSpeaking) {
    synth.cancel(); // 停止语音播放
    setIsSpeaking(!isSpeaking); // 更新isSpeaking状态
  } else {
    speak(message.response); // 播放语音
  }
}}>
  {isSpeaking ? <Pause /> : <PlayArrow />}
</IconButton>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MessageList;
