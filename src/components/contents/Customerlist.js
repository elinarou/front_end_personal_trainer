import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { Typography, Divider, Button, Snackbar } from '@mui/material';
import Addcustomer from './Addcustomer';
import Editcustomer from './Editcustomer';
import Addtraining from './Addtraining';

export default function Customerlist() {
  const [customers, setCustomers] = useState([]);
  const [open, setOpen] = React.useState(false);
    
  useEffect(() => fetchData(), []);

  const fetchData = () => {
    fetch('https://customerrest.herokuapp.com/api/customers')
    .then(response => response.json())
    .then(data => setCustomers(data.content))
  };

  const deleteCustomer = (data) => {
    if (window.confirm('Are you sure?')) {
        fetch(data.links[0].href, {method: 'DELETE'})
        .then(response => fetchData())
        .catch(err => console.error(err))
        
        // Open snackbar
        setOpen(true);
    };
  };

  const saveCustomer = (customer) => {
    fetch('https://customerrest.herokuapp.com/api/customers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(customer)
    })
    .then(response => fetchData())
    .catch(err => console.error(err))
  };

  const updateCustomer = (customer, link) => {
    fetch(link, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(customer)
    })
    .then(response => fetchData())
    .catch(err => console.error(err))
  };

  const saveTraining = (training) => {
    fetch('https://customerrest.herokuapp.com/api/trainings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(training)
    })
  };

  // Snackbar
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
    return;
    }
    setOpen(false);
  };

  const columns = [
    {
      headerName: '', 
      width: 200,
      // Edit
      cellRenderer: row => 
      <Editcustomer 
        updateCustomer={updateCustomer} 
        customer={row.data}/>
    },
    {
      headerName: 'Actions', 
      width: 200, 
      // Delete 
      cellRenderer: row => 
      <Button 
        color="error" 
        size="small" 
        onClick={() => deleteCustomer(row.data)}>Delete</Button>
    },
    {
      headerName: 'Actions', 
      width: 200, 
      // Add training 
      cellRenderer: row => 
      <Addtraining
        saveTraining={saveTraining} 
        customer={row.data}>Add training</Addtraining>
    },
    {
      headerName: 'First name', 
      field: 'firstname', 
      filter: true, 
      sortable: true},
    {
      headerName: 'Last name', 
      field: 'lastname', 
      filter: true, 
      sortable: true},
    {
      headerName: 'Phone', 
      field: 'phone', 
      filter: true, 
      sortable: true},
    {
      headerName: 'Email', 
      field: 'email', 
      filter: true, 
      sortable: true},
    {
      headerName: 'Street address', 
      field: 'streetaddress', 
      filter: true, 
      sortable: true
    },
    {
      headerName: 'Post code', 
      field: 'postcode', 
      filter: true, 
      sortable: true},
    {
      headerName: 'City', 
      field: 'city', 
      filter: true, 
      sortable: true}
  ]

  return (
    <div>
      <Typography variant="h6" sx={{ ml: 19, p: 1 }}>
        Customers
      </Typography>
      <Divider variant="middle" />
      <Addcustomer saveCustomer={saveCustomer}/>
      <div
        className="ag-theme-material" 
        style={{
        width: '80%', 
        height: '700px',
        margin: 'auto'}}>  
        <AgGridReact
        columnDefs={columns}
        rowData={customers}
        paginationAutoPageSize={true}
        pagination={true}
        />
        </div>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          message="Customer deleted"
        />
    </div>
  );
};