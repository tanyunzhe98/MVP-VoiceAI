import React, {useState} from 'react';
import './style.css';
import Register from './Register';
import Login from './Login';
import Share from './Share'
import { Box, Typography, Button, Grid } from '@material-ui/core';
import { Person, Lock, Reply } from '@material-ui/icons';
const logo = require('./logo.png').default;
const bg = require('./background.jpg').default;

interface MainpageProps {
  onPageChange: () => void;
}

const Mainpage = ({onPageChange} : MainpageProps): JSX.Element => {
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [user, setUser] = useState('');
  const handleImageLoad = () => {
    setImageLoaded(true);
  }

  const styles = {
    position: 'relative',
    minHeight: '100vh',
  };

  return (
    <Box sx={styles}>
            <Box sx={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, zIndex: -1,
 }}>

<img
  src={bg}
  alt="background"
  onLoad={handleImageLoad}
  style={{
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    objectFit: 'cover',
    opacity: imageLoaded ? 1 : 0,
    transition: 'opacity .5s ease-in-out',
    filter: 'brightness(70%)',
  }}
/>
</Box>

      <Box sx={{ bgcolor: 'transparent', py: 8, minHeight:'inherit' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <img src={logo} alt="VoiceAI Logo" height="200" style={{ filter: "grayscale(100%) brightness(1)" }} />
        </Box>
        <Typography variant="h2" align="center" style={{ background: 'linear-gradient(45deg, #b3d9ff 30%, #e8d2ff 60%, #b2c7ff 90%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontFamily: 'Futura' }}>
          VoiceAI
        </Typography>
        {showContent ? (
  <Typography variant="body1" align="center" style={{ background: 'linear-gradient(45deg, #b3d9ff 30%, #e8d2ff 60%, #b2c7ff 90%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent', fontFamily: 'Helvetica' }}>
    The all-in-one app that will change the way you interact with your device. Our app is designed to revolutionize the way we communicate with technology by using the power of voice recognition and artificial intelligence. With voiceAI, you can use your voice to generate AI responses that can be transformed into spoken words. Plus, our app can recognize emotions in sound, which means you can experience a more personalized and intuitive conversation with your device. What's more, voiceAI also has the ability to generate pictures, making it a comprehensive application of AI.
    <Button color="primary" onClick={() => setShowContent(false)}>
  <span
    style={{
      backgroundImage:
        'linear-gradient(45deg, #b2c7ff 30%, #00c5ff 60%, #ff4b1f 90%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    }}
  >
    Hide
  </span>
</Button>
  </Typography>
      ) : (
        <Grid container justifyContent="center">
  <Typography variant="body1" align="center" style={{ background: 'linear-gradient(45deg, #b3d9ff 30%, #e8d2ff 60%, #b2c7ff 90%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent', fontFamily: 'Helvetica' }}>
    The all-in-one app that will change the way you interact with your device.
    <Button color="primary" onClick={() => setShowContent(true)}>
  <span
    style={{
      backgroundImage:
        'linear-gradient(45deg, #b2c7ff 30%, #00c5ff 60%, #ff4b1f 90%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    }}
  >
    Learn More
  </span>
</Button>
  </Typography>
      </Grid>
      )}
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button
  variant="contained"
  onClick={onPageChange}
  className = 'button'
>
  Try it
</Button>

        </Box>
      </Box>
      <Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, bgcolor: '#2b86c5', py: 4, width: '50%'}}>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4, marginBottom: '3%' }}>
  <Button
    variant="contained"
    startIcon={<Person />}
    onClick={() => setShowLogin(true)}
    className = 'button'
  >
    Login
  </Button>
  <Box sx={{ mx: 2 }} />
  <Button
    variant="contained"
    startIcon={<Lock />}
    onClick={() => setShowRegister(true)}
    className = 'button'
  >
    Register
  </Button>
  <Box sx={{ mx: 2 }} />
  <Button
  variant="contained"
  endIcon={<Reply />}
  onClick={() => setShowShare(true)}
  className = 'button'
>
  Share
</Button>
</Box>
      </Box>
      {showLogin && <Login onClose={() => setShowLogin(false)}/>}
      {showRegister && <Register onClose={() => setShowRegister(false)} setShowLogin={setShowLogin}/>}
      {showShare && <Share onClose={() => setShowShare(false)} />}
    </Box>
  );
};

export default Mainpage;
