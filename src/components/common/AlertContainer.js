import { Alert, InputLabel } from "@mui/material";
import AlertTitle from "@mui/material/AlertTitle";
const AlertContainer = ({ type, show, message, onClose }) => {
    return (
      show && (
        <Alert severity={type} onClose={onClose} sx={{ marginTop: 3, width: "25%", float:"right", zIndex:"2" }}>
          <AlertTitle>{type === "success" ? "Success" : "Error"}</AlertTitle>
          {message}
        </Alert>
      )
    );
  };

export default AlertContainer
  