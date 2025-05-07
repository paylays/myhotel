import React from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Typography
} from '@mui/material';
import Swal from 'sweetalert2';
import axios from 'axios';

const DeleteAccount = ({ open, handleClose, account, fetchAccounts }) => {
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${import.meta.env.VITE_API_AUTH}/api/auth/user/${account.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      Swal.fire({
        icon: 'success',
        title: 'User deleted successfully',
      });

      handleClose();
      fetchAccounts();
    } catch (error) {
      console.error("Delete error:", error);
      Swal.fire({
        icon: 'error',
        title: 'Failed to delete user',
        text: error.response?.data?.msg || 'An error occurred while deleting user.',
      });
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent dividers>
        <Typography>Are you sure you want to delete the user <strong>{account?.name}</strong>?</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleDelete} color="error" variant="contained">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteAccount;
