import React from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box
} from '@mui/material';

const DetailAccount = ({ open, handleClose, account }) => {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Account Detail</DialogTitle>
      <DialogContent dividers>
        {account && (
          <Box>
            <Typography><strong>ID:</strong> {account.id}</Typography>
            <Typography><strong>Name:</strong> {account.name}</Typography>
            <Typography><strong>Email:</strong> {account.email}</Typography>
            <Typography><strong>Role:</strong> {account.role}</Typography>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DetailAccount;
