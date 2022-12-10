import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DateToISO from '../functions/DateToISO';

export default function Addtraining(props) {
  const [open, setOpen] = useState(false);
  const [training, setTraining] = useState(
    {
      date: '', 
      activity: '', 
      duration: '', 
      customer: String(props.customer.links[0].href) 
    });

  const handleClickOpen = () => {
    setOpen(true);
  };
    
  const handleClose = () => {
    setOpen(false);
  };
  
  const handleInputChange = (event) => {
    setTraining({...training, [event.target.name]: event.target.value})
  };

  const addTraining = () => {
    const dateISO = DateToISO(training.date); 
    setTraining({...training, date: dateISO})
    props.saveTraining(training);
    handleClose();
  };

  return(
    <div>
      <Button 
        style={{margin: 10}} 
        variant="outlined" 
        onClick={handleClickOpen}>Add training</Button>
      <Dialog 
        open={open} 
        onClose={handleClose}>
        <DialogTitle>New training</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="date"
            value={training.date}
            onChange={e => handleInputChange(e)}
            label="Date and time"
            placeholder="DD.MM.YYYY HH:mm"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            name="activity"
            value={training.activity}
            onChange={e => handleInputChange(e)}
            label="Activity"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            name="duration"
            value={training.duration}
            onChange={e => handleInputChange(e)}
            label="Duration"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={addTraining}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};