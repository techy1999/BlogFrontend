import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Box from  "@mui/material/Box"
import CloseIcon from '@mui/icons-material/Close';


export default function ConfirmationModel({ message,confirmationModelOpen, setConfirmationModelOpen,handleDelete,blogId }) {
 
  const handleClose = () => {
    setConfirmationModelOpen(!confirmationModelOpen);
  };

  return (
    <>

      <Dialog
        open={confirmationModelOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"

      >
        <Box  p={4} sx={{  boxShadow: "5px 5px 5px #ccc",
          ":hover": {
            boxShadow: "10px 10px 10px #ccc",
          },}}>
          <CloseIcon sx={{float:"right", marginBottom:"10px", fontSize:"20px", cursor:"pointer"}}  onClick={handleClose}/>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {message}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant='contained' onClick={
              ()=>{
                handleDelete(blogId);
                handleClose();
              }
            } autoFocus>Yes</Button>
            <Button variant='contained' onClick={handleClose} >No</Button>
          </DialogActions>
        </Box>

      </Dialog>
    </>
  );
}
