import React from 'react';
import logo from './logo.svg';
import './App.css';
import Chatroom from './components/Chatroom/Chatroom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="app">
      <Header />
      <Chatroom />
      <Footer />
    </div>
  );
}

export default App;
