import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import EventNoteIcon from '@mui/icons-material/EventNote';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

export default function Addtraining(props) {
  const [open, setOpen] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [dateTime, setDateTime] = useState('');
  const [training, setTraining] = useState(
    {
      date: '', 
      activity: '', 
      duration: '', 
      customer: String(props.customer.links[0].href) 
    });
  
  // Save new training
  useEffect(() => {
    if (isReady) {
      props.saveTraining(training);
      setIsReady(false);
    };
  }, [isReady]);

  const handleClickOpen = () => {
    setOpen(true);
  };
    
  const handleClose = () => {
    setOpen(false);
  };
  
  const handleInputChange = (event) => {
    setTraining({...training, [event.target.name]: event.target.value})
  };

  const handleDateChange = (dateTime) => {
    setDateTime(dateTime);
  };

  const addTraining = () => { 
    setTraining({...training, date: dateTime.$d});
    setIsReady(true);
    handleClose();
  };

  return(
    <div>
      <Button 
        onClick={handleClickOpen}><EventNoteIcon /></Button>
      <Dialog 
        open={open} 
        onClose={handleClose}>
        <DialogTitle>New training</DialogTitle>
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label="Date & Time"
              inputFormat="DD/MM/YYYY"
              value={dateTime}
              onChange={handleDateChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
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