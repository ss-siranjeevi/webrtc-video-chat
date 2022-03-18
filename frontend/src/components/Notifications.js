import React, { useContext, useEffect, useState } from 'react';
import { Button, CircularProgress } from '@material-ui/core';

import { SocketContext } from '../Context';

import './styles.css';

const Notifications = () => {
  const { answerCall, call, callAccepted } = useContext(SocketContext);

  return (
    call.isReceivingCall && !callAccepted ? (
      <div className='myId notification'>
        <div className='call'>
          <h3>{call.name} is calling:</h3>
          <Button variant="contained" color="primary" style={{ height: '30px' }} onClick={answerCall}>
            Answer
          </Button>
        </div>
      </div>
    ) : null
  );

};

export default Notifications;
