import { Box, Paper, TextField, Typography } from "@material-ui/core";
import { useContext, useState } from "react";
import { SocketContext } from "../Context";

const Tweaks = () => {
  const { setUrls, setText } = useContext(SocketContext);

  const [videoText, setVideoText] = useState('');
  const [videoUrls, setVideoUrls] = useState([]);

  const onUrlChange = (value, number) => {
    const urls = [...videoUrls]
    urls[number- 1] = { id: number, value }

    if(!value){
      urls.splice(number-1,1);
    }

    setVideoUrls(urls);
  }

  const getUrlById = (id) => {
    const url = videoUrls.find((url) => url.id === id);
    return url?.value || "";
  }

  return (
    <Paper style={{ padding: '10px', margin: '20px', width: '450px', height: 'fit-content', display: 'grid' }} >
      <Box style={{ display: 'grid' }}>
        <Typography variant="3" gutterBottom>Image Url 1:</Typography>
        <TextField
          variant="outlined"
          value={getUrlById(1)}
          onChange={(e) => onUrlChange(e.target.value, 1)}
          onBlur={(e) => setUrls(videoUrls)}
          style={{ marginBottom: "20px" }}
        />
      </Box>
      <Box style={{ display: 'grid' }}>
        <Typography variant="3" gutterBottom>Image Url 2:</Typography>
        <TextField
          variant="outlined"
          value={getUrlById(2)}
          onChange={(e) => onUrlChange(e.target.value, 2)}
          onBlur={(e) => setUrls(videoUrls)}
          style={{ marginBottom: "20px" }}
        />
      </Box>
      <Box style={{ display: 'grid' }}>
        <Typography variant="3" gutterBottom>Text:</Typography>
        <TextField
          variant="outlined"
          value={videoText}
          onChange={(e) => setVideoText(e.target.value)}
          onBlur={(e) => setText(videoText)}
          style={{ marginBottom: "20px" }}
        />
      </Box>
    </Paper>
  )
}

export default Tweaks;