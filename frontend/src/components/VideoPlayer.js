import React, { useCallback, useContext, useEffect } from 'react';
import { Grid, Typography, makeStyles } from '@material-ui/core';

import { SocketContext } from '../Context';

import './styles.css';

const useStyles = makeStyles((theme) => ({
  video: {
    width: '450px',
    [theme.breakpoints.down('xs')]: {
      width: '450px',
    },
  },
  paper: {
    padding: '10px',
    margin: '10px',
    display: 'grid',
    border: '1px solid #ffffffdb',
    borderRadius: '1%'
  },
}));

let canvasInterval = null;

const VideoPlayer = () => {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call, setUserStream, text, urls } = useContext(SocketContext);
  const classes = useStyles();

  useEffect(() => {
    if (stream) {
      createCanvas();
    }
  }, [stream, setUserStream])

  useEffect(() => {
    if (stream && (text || urls?.length > 0)) {
      updateCanvas();
    }
  }, [stream, text, urls]);

  const drawCanvas = useCallback((video, images = []) => {
    let canvas = document.getElementsByClassName('canvas-stream')[0];
    let context = canvas.getContext('2d');

    canvas.width = video.clientWidth
    canvas.height = video.clientHeight

    context.drawImage(video, 0, 0, video.clientWidth, video.clientHeight)

    if (text) {
      context.fillText(text, 20, 20);
    }

    if (urls.length > 0 && images.length > 0) {
      context.drawImage(images[0], 20, 40, 50, 50);

      if (images[1]) {
        context.drawImage(images[1], 350, 250, 50, 50);
      }
    }
  }, [text, urls])

  const loadImages = (sources, callback) => {
    let loadedImages = 1;
    let numImages = 1;

    // get num of sources
    for(let item in sources) {
      numImages++;
    }

    for(let img of sources) {
      img.onload = () => {
        if(++loadedImages >= numImages) {
          callback(sources);
        }
      };
    }
  }

  const updateCanvas = () => {
    const myVideo = document?.getElementById("my-video");

    if (urls.length > 0) {
      let sources = [];

      let img1 = new Image();
      img1.crossOrigin = "Anonymous";
      img1.src = urls[0].value;
      sources.push(img1);

      if (urls[1]) {
        let img2 = new Image();
        img2.crossOrigin = "Anonymous";
        img2.src = urls[1].value;

        sources.push(img2);
      }

      loadImages(sources, function(images) {
        clearInterval(canvasInterval);
        canvasInterval = setInterval(() => drawCanvas(myVideo, images), 1000 / 60);
      });
    } else {
      clearInterval(canvasInterval);
      canvasInterval = setInterval(() => drawCanvas(myVideo), 1000 / 60);
    }
  }

  const createCanvas = () => {
    let canvas = document.getElementsByClassName('canvas-stream')[0];

    let userStream = canvas.captureStream(60);
    setUserStream(userStream);
  }

  return (
    <Grid container >
      {stream && (
        <div className={classes.paper + ' video-container'} >
          <Typography variant="3" gutterBottom>{'Local-Stream'}</Typography>
          <video id="my-video" playsInline muted ref={myVideo} onPlay={updateCanvas} autoPlay className={classes.video + " my-video"} />
          <canvas className="canvas-stream"></canvas>
        </div>
      )}
      {
        callAccepted && !callEnded && (
          <div className={classes.paper}>
            <Typography variant="3" gutterBottom>{`${call.name} (Remote)`}</Typography>
            <video playsInline ref={userVideo} autoPlay className={classes.video} />
          </div>
        )}
    </Grid >
  );
};

export default VideoPlayer;
