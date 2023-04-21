import React from 'react';
import { Container, Navbar, Button } from 'react-bootstrap';
import './style.css';

interface MainpageProps {
  onPageChange: () => void;
}

const Mainpage = ({onPageChange} : MainpageProps): JSX.Element => {
  return (
    <Container fluid className="main-page-container">
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand>VoiceAI</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav" className="justify-content-end">
          <Button variant="outline-light">Share</Button>
        </Navbar.Collapse>
      </Navbar>
      <div className="jumbotron">
        <div className="center-area">
        <h1>A brief introduction</h1>
        <p className="app-intro">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <Button variant="primary" size="lg" onClick={onPageChange}>Try it</Button>
        </div>
      </div>
      <div className="bottom-area">
        <Button variant="secondary">Login</Button>
        <Button variant="dark">Register</Button>
      </div>
    </Container>
  );
};

export default Mainpage;
