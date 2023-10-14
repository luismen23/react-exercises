// import React from 'react';
import './App.css';
import { TwitterFollowCard } from './TwitterFollowCard';

function App() {


  return (
    <div className="App">
      <TwitterFollowCard name='miguel jose angel duran' userName='midudev' initialIsFollowing/>
      <TwitterFollowCard name='Elon Musk' userName='elonmusk' initialIsFollowing={false}/>
    </div>
  )
}

export default App
