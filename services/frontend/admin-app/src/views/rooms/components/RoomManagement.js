import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Typography, Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  Tooltip,
  IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import Swal from 'sweetalert2';

import DashboardCard from "../../../components/shared/DashboardCard";

const RoomManagement = ({}) => {
  const [rooms, setRooms] = useState([]);
  const location = useLocation();

  const fetchRooms = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_HOTEL}/rooms`);
      setRooms(res.data);
    } catch (error) {
      console.error('Failed to fetch rooms:', error);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, [location]);;

  // Handle Detail
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [openViewModal, setOpenViewModal] = useState(false);

  const handleView = (room) => {
    setSelectedRoom(room);
    setOpenViewModal(true);
  };
  
  const handleCloseModal = () => {
    setOpenViewModal(false);
    setSelectedRoom(null);
  };

  // Handle Edit
  const navigate = useNavigate();

  // Handle Delete  
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This action will permanently delete the room.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#1976d2',
      cancelButtonColor: '#d32f2f',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    });
  
    if (result.isConfirmed) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_HOTEL}/rooms/${id}`);
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'The room has been deleted.',
          confirmButtonColor: '#1976d2'
        });
        
        fetchRooms();
      } catch (err) {
        console.error('Delete failed', err);
        Swal.fire({
          icon: 'error',
          title: 'Delete Failed',
          text: err.response?.data?.msg || 'Something went wrong.',
          confirmButtonColor: '#d32f2f'
        });
      }
    }
  };
  
  return (

    <DashboardCard title="Room Management">
      <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
        <Table
          aria-label="simple table"
          sx={{
            whiteSpace: "nowrap",
            mt: 2
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell><Typography variant="subtitle2" fontWeight={600}>No</Typography></TableCell>
              <TableCell><Typography variant="subtitle2" fontWeight={600}>Room Number</Typography></TableCell>
              <TableCell><Typography variant="subtitle2" fontWeight={600}>Type</Typography></TableCell>
              <TableCell><Typography variant="subtitle2" fontWeight={600}>Price</Typography></TableCell>
              <TableCell><Typography variant="subtitle2" fontWeight={600}>Status</Typography></TableCell>
              <TableCell><Typography variant="subtitle2" fontWeight={600} align="center">Actions</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rooms.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                    <Typography variant="subtitle1" color="textSecondary">
                    No data available
                    </Typography>
                </TableCell>
              </TableRow>
            ) : (
              rooms.map((room, index) => (
              <TableRow key={room.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{room.room_number}</TableCell>
                <TableCell>{room.type}</TableCell>
                <TableCell>${room.price}</TableCell>
                <TableCell>
                  <Chip
                    label={room.status}
                    color={
                      room.status === 'available'
                        ? 'success'
                        : room.status === 'occupied'
                        ? 'warning'
                        : 'error'
                    }
                    size="small"
                  />
                </TableCell>
                <TableCell align="center">
                  <Tooltip title="View">
                    <IconButton color="primary" onClick={() => handleView(room)}>
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit">
                    <IconButton color="secondary" onClick={() => navigate(`/rooms/${room.id}/edit`)}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton color="error" onClick={() => handleDelete(room.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Box>
      
      {/* Modal Detail */}
      <Dialog open={openViewModal} onClose={handleCloseModal} maxWidth="sm" fullWidth>
        <DialogTitle>Room Detail</DialogTitle>
        <DialogContent dividers>
          {selectedRoom && (
            <Box>
              <Typography><strong>ID:</strong> {selectedRoom.id}</Typography>
              <Typography><strong>Room Number:</strong> {selectedRoom.room_number}</Typography>
              <Typography><strong>Type:</strong> {selectedRoom.type}</Typography>
              <Typography><strong>Price:</strong> ${selectedRoom.price}</Typography>
              <Typography><strong>Status:</strong> {selectedRoom.status}</Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">Close</Button>
        </DialogActions>
      </Dialog>

    </DashboardCard>
  );
};

export default RoomManagement;
