import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { Typography, Divider } from '@mui/material';

export default function Customerlist() {
  const [customers, setCustomers] = useState([]);
    
  useEffect(() => fetchData(), []);

  const fetchData = () => {
    fetch('https://customerrest.herokuapp.com/api/customers')
    .then(response => response.json())
    .then(data => setCustomers(data.content))
  };

  const columns = [
    {headerName: 'First name', field: 'firstname', filter: true, sortable: true},
    {headerName: 'Last name', field: 'lastname', filter: true, sortable: true},
    {headerName: 'Phone', field: 'phone', filter: true, sortable: true},
    {headerName: 'Email', field: 'email', filter: true, sortable: true},
    {headerName: 'Street address', field: 'streetaddress', filter: true, sortable: true},
    {headerName: 'Post code', field: 'postcode', filter: true, sortable: true},
    {headerName: 'City', field: 'city', filter: true, sortable: true}
  ]

  return (
    <div>
      <Typography variant="h6" sx={{ ml: 19, p: 1 }}>
        Customers
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
        rowData={customers}
        paginationAutoPageSize={true}
        pagination={true}
        />
        </div>
    </div>
  );
};