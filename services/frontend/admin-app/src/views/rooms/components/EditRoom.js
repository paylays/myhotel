import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Typography,
  TextField,
  MenuItem,
  Paper
} from '@mui/material';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const EditRoom = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState({
    room_number: '',
    type: '',
    price: '',
    status: ''
  });

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_HOTEL}/rooms/${id}`);
        setRoom(res.data);
      } catch (err) {
        console.error('Failed to fetch room', err);
      }
    };

    fetchRoom();
  }, [id]);

  const handleChange = (e) => {
    setRoom({ ...room, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${import.meta.env.VITE_API_HOTEL}/rooms/${id}`, room);
      Swal.fire({
        icon: 'success',
        title: 'Room Updated',
        text: 'The room information has been successfully updated.',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK'
      }).then(() => {
        navigate('/dashboard');
      });
    } catch (err) {
      console.error('Update failed', err);
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: err.response?.data?.msg || 'Something went wrong. Please try again later.',
        confirmButtonColor: '#d33',
        confirmButtonText: 'Close'
      });
    }
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 600, mx: 'auto', mt: 5 }}>
      <Typography variant="h5" mb={2}>Edit Room</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          name="room_number"
          label="Room Number"
          value={room.room_number}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          name="type"
          label="Room Type"
          value={room.type}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          name="price"
          label="Price"
          type="number"
          value={room.price}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          select
          name="status"
          label="Status"
          value={room.status}
          onChange={handleChange}
        >
          <MenuItem value="available">Available</MenuItem>
          <MenuItem value="occupied">Occupied</MenuItem>
          <MenuItem value="maintenance">Maintenance</MenuItem>
        </TextField>
        <Box mt={2}>
          <Button type="submit" variant="contained" color="primary">
            Update Room
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default EditRoom;
