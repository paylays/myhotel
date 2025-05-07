import React, { useState } from 'react';
import {
  Box, TextField, MenuItem,
  Button, CircularProgress, Grid
} from '@mui/material';
import Swal from 'sweetalert2';
import axios from 'axios';

import BaseCard from '../../../components/BaseCard/BaseCard';

const AddAccount = ({ fetchAccounts }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user'
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.post(`${import.meta.env.VITE_API_AUTH}/api/auth/register`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      Swal.fire({
        icon: 'success',
        title: 'User created successfully',
      });

      fetchAccounts();

      setFormData({
        name: '',
        email: '',
        password: '',
        role: 'user'
      });

    } catch (error) {
      console.error("Create error:", error);
      Swal.fire({
        icon: 'error',
        title: 'Failed to create user',
        text: error.response?.data?.msg || 'An error occurred while creating user.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BaseCard title="Add New Account">
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              select
              fullWidth
              label="Role"
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <MenuItem value="user">User</MenuItem>
            </TextField>
          </Grid>
        </Grid>
        <Box mt={3} textAlign="right">
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : 'Add Account'}
          </Button>
        </Box>
      </form>
    </BaseCard>
  );
};

export default AddAccount;
