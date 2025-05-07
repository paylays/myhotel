import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, Select, FormControl, InputLabel, Box
} from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';

const EditAccount = ({ open, handleClose, account, fetchAccounts }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'user',
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (account) {
      setFormData({
        name: account.name,
        email: account.email,
        password: '',
        role: account.role || 'user',
      });
    }
  }, [account]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const updateData = {
        name: formData.name,
        email: formData.email,
        password: formData.password || undefined,
        role: formData.role,
      };

      await axios.put(`${import.meta.env.VITE_API_AUTH}/api/auth/user/${account.id}`, updateData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      Swal.fire({
        icon: 'success',
        title: 'User updated successfully',
      });

      handleClose();
      fetchAccounts();

    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Failed to update user',
        text: error.response?.data?.msg || 'An error occurred while updating user.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Account</DialogTitle>
      <DialogContent dividers>
        {account && (
          <Box>
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Role</InputLabel>
              <Select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
              >
                <MenuItem value="user">User</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </Select>
            </FormControl>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">Cancel</Button>
        <Button onClick={handleSave} color="primary" disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditAccount;
