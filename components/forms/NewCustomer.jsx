import React, {useEffect, useState} from 'react';
import {Dialog,DialogTitle,DialogContent,DialogActions,Grid,TextField,MenuItem,Button,Alert,} from '@mui/material';
import { getAllCompanyRecordsAction } from '@/app/api/rfx/actions/rfx';
import { createCompanyRequest } from '@/app/api/rfx/scripts';


const NewCustomer = (props) => {
  const {isOpen,handleClose,handleChangeValues, handleCancel,} = props;
  const [companyList, setCompanyList] = useState(props.companyRecords)
  const [formData, setFormData] = useState({
    company_id: 0, 
    customer_name: '', 
    email: '', 
    phone: '', 
    address: ''
  })

  const handleChange = (e)=> {
    setFormData({...formData, [e.target.name]: e.target.value});   
  }
     

  return (
    <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Customer Details</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}  className='mt-2'>
          <Grid item xs={12}>
            <TextField
              select
              fullWidth
              name="company_id"
              label="Company Name *"
              //value={formData.company_id}
              onChange={handleChange}
            >
              <MenuItem value={''}>Select Company</MenuItem>
              {companyList && companyList.map((item) => (
                <MenuItem key={item.company_id} 
                value={item.company_id}
                >
                  {item.company_name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="customer_name"
              label="Customer Name *"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="email"
              label="Email *"
              type="email"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="phone"
              label="Phone"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="address"
              label="Address"
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogContent>
        <Alert 
          severity="error" 
          id="modalErrorMessageAlert" 
          class="bg-red-100 border border-red-200 text-md text-red-800 rounded-lg p-4 dark:bg-red-800/10 dark:border-red-900 dark:text-red-500"
          style={{ display: 'none' }}>
          Invalid Operation.
        </Alert>
        <Alert 
          severity="success" 
          id="modalSuccessMessageAlert" 
          class="bg-teal-100 border border-teal-200 text-sm text-teal-800 rounded-lg p-4 dark:bg-teal-800/10 dark:border-teal-900 dark:text-teal-500"
          style={{ display: 'none' }}>
          Operation successful.
        </Alert>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="primary" className='rounded-sm' onClick={handleCancel}>
          Cancel
        </Button>
        {props.buttonType && props.buttonType === 'new' ? (
          <button  className='bg-[#26BADA] text-white' onClick={(e) => props.isOpen(false)}>
            Add Info
          </button>
        ) : (
          <button className='bg-[#26BADA] text-white px-2 py-[7px] rounded-sm' onClick={(e) => createCompanyRequest(e, formData)}>
            Add Customer
          </button>
        )}
      </DialogActions>      
    </Dialog>
  );
};

export default NewCustomer;
