import React from 'react';
import './App.css';
import Chatroom from './components/Chatroom/Chatroom';
import Header from './components/Header/Header';
// for redux
import { useSelector } from 'react-redux'

function App() {

  const username = useSelector((state: State) => state.username)
  console.log('redux state username', username)

  return (
    <div className="app">
      <Header />
      <Chatroom />
    </div>
  );
}

export default App;
