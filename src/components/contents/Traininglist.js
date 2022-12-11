import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import DeleteIcon from '@mui/icons-material/Delete';
import ISOToDate from '../functions/ISOToDate';
import { Typography, Divider, Button, Snackbar } from '@mui/material';

export default function Traininglist() {
  const [trainings, setTrainings] = useState([]);
  const [open, setOpen] = React.useState(false);
    
  useEffect(() => fetchData(), []);

  const fetchData = () => {
      fetch("https://customerrest.herokuapp.com/gettrainings")
      .then(response => response.json())
      .then(data => setTrainings(data))
  };

  const deleteTraining = (id) => {
    if (window.confirm("Are you sure?")) {
      fetch(`https://customerrest.herokuapp.com/api/trainings/${id}`, {method: "DELETE"})
      .then(response => fetchData())
      .catch(err => console.error(err))
        
      // Open snackbar
      setOpen(true);
    };
  };

  // Snackbar
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
    return;
    }
    setOpen(false);
  };

  // Combine first and last name
  const customerName = (params) => {
      return params.data.customer.firstname + ' ' + params.data.customer.lastname;
  };

  const columns = [
    {
      headerName: "Actions", 
      width: 115, 
      field: "id",
      // Delete 
      cellRenderer: ({value}) => 
      <Button 
        onClick={() => deleteTraining(value)}><DeleteIcon /></Button>
    },
    {
      headerName: "Customer", 
      field: "fullname", 
      filter: true, 
      sortable: true,
      valueGetter: customerName
    },
    {
      headerName: "Date", 
      field: "date", 
      filter: true, 
      sortable: true,
      cellRenderer: ({value}) => <ISOToDate date={value} />
    },
    {
      headerName: "Duration (min)", 
      field: "duration", 
      filter: true, 
      sortable: true
    },
    {
      headerName: "Activity", 
      field: "activity", 
      filter: true, 
      sortable: true
    }  
  ]

  return (
    <div>
      <Typography variant="h6" sx={{ ml: 19, p: 1 }}>
        Trainings
      </Typography>
      <Divider variant="middle" />
      <div 
      className="ag-theme-material" 
      style={{
        width: "80%", 
        height: "700px",
        margin: "auto"
        }}>  
      <AgGridReact
      columnDefs={columns}
      rowData={trainings}
      paginationAutoPageSize={true}
      pagination={true}
      />
      </div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Training deleted"
      />
    </div>
  );
};