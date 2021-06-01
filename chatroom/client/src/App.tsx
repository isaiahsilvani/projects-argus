import React from 'react';
import logo from './logo.svg';
import './App.css';
import Chatroom from './components/Chatroom/Chatroom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
// for redux
import { actionCreators } from './state/';
import { useSelector } from 'react-redux'

function App() {

  const username = useSelector((state: State) => state.username)
  console.log('redux state username', username)

  return (
    <div className="app">
      <Header />
      {username}
      <Chatroom />
      <Footer />
    </div>
  );
}

export default App;
