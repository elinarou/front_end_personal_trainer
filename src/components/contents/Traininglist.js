import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import Dateformat from '../functions/Dateformat';
import { Typography, Divider } from '@mui/material';

export default function Traininglist() {
  const [trainings, setTrainings] = useState([]);
    
  useEffect(() => fetchData(), []);

  const fetchData = () => {
      fetch('https://customerrest.herokuapp.com/gettrainings')
      .then(response => response.json())
      .then(data => setTrainings(data))
  };

  const customerName = (params) => {
      return params.data.customer.firstname + ' ' + params.data.customer.lastname;
  };

  const columns = [
      {
        headerName: 'Customer', 
        field: 'fullname', 
        filter: true, 
        sortable: true,
        valueGetter: customerName
      },
      {
        headerName: 'Date', 
        field: 'date', 
        filter: true, 
        sortable: true,
        cellRenderer: ({value}) => <Dateformat date={value} />
      },
      {headerName: 'Duration', field: 'duration', filter: true, sortable: true},
      {headerName: 'Activity', field: 'activity', filter: true, sortable: true}  
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
        width: '80%', 
        height: '700px',
        margin: 'auto'}}>  
        <AgGridReact
        columnDefs={columns}
        rowData={trainings}
        paginationAutoPageSize={true}
        pagination={true}
        />
        </div>
      </div>
  );
};