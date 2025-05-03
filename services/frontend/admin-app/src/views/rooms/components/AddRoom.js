import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Stack, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const AddRoom = () => {
  const [roomData, setRoomData] = useState({
    room_number: '',
    type: '',
    price: '',
    status: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setRoomData({ ...roomData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${import.meta.env.VITE_API_HOTEL}/rooms`, roomData);
      Swal.fire({
        icon: 'success',
        title: 'Room Added!',
        text: 'New room has been successfully added.',
        confirmButtonColor: '#1976d2'
      }).then(() => {
        navigate('/rooms');
      });
    } catch (error) {
      console.error('Error adding room:', error);
      Swal.fire({
        icon: 'error',
        title: 'Add Failed',
        text: error.response?.data?.msg || 'Something went wrong.',
        confirmButtonColor: '#d32f2f'
      });
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 2, boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h6" mb={2}>Add New Room</Typography>
      <Stack spacing={2}>
        <TextField
          label="Room Number"
          name="room_number"
          value={roomData.room_number}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Type"
          name="type"
          value={roomData.type}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Price"
          name="price"
          type="number"
          value={roomData.price}
          onChange={handleChange}
          fullWidth
          required
        />
        <FormControl fullWidth required>
          <InputLabel>Status</InputLabel>
          <Select
            name="status"
            value={roomData.status}
            label="Status"
            onChange={handleChange}
          >
            <MenuItem value="available">Available</MenuItem>
            <MenuItem value="occupied">Occupied</MenuItem>
            <MenuItem value="maintenance">Maintenance</MenuItem>
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary">
          Add Room
        </Button>
      </Stack>
    </Box>
  );
};

export default AddRoom;
