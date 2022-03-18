import { Button, CircularProgress, IconButton, TextField } from "@material-ui/core";
import { useContext } from "react";
import { SocketContext } from "../Context";
import PhoneIcon from "@material-ui/icons/Phone"

import './styles.css';

const CallUser = ({ children }) => {

  const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } = useContext(SocketContext);

  return (
    <div className="myId">
      <TextField
        label="Name"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ marginBottom: "20px" }}
        helperText="Enter the name to Call!"
        disabled={callAccepted}
      />

      <div className="call-button">
        {callAccepted && !callEnded ? (
          <Button variant="contained" color="secondary" onClick={leaveCall}>
            End Call
          </Button>
        ) : (
          <IconButton color="primary" onClick={() => callUser(me)}>
            <PhoneIcon fontSize="large" />
          </IconButton>
        )}
      </div>

      {children}
    </div >
  )
}

export default CallUser;