import React, { useState } from 'react';

import VideoPlayer from './components/VideoPlayer';
import Notifications from './components/Notifications';
import CallUser from './components/CallUser';

import './App.css';
import Tweaks from './components/Tweaks';

const App = () => {
  return (
    <div>
      <h1 className='header'>Video Chat</h1>
      <div className='container'>
        <VideoPlayer />
        <div>
          <CallUser />
          <Notifications />
        </div>
      </div>
      <Tweaks />
    </div>
  );
};

export default App;
