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
// import Swal from 'sweetalert2';

import DashboardCard from "../../../components/shared/DashboardCard";

const BookingManagement = ({}) => {
  const [bookings, setBookings] = useState([]);
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:5003/booking');
      setBookings(res.data);
    } catch (error) {
      console.error('Failed to fetch rooms:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [location]);;

  
  return (
    <DashboardCard title="Booking Management">
      {loading ? (
        <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
          <Typography variant="subtitle1" color="textSecondary">
            Wait for booking data...
          </Typography>
        </Box>
      ) : (
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
              <TableCell><Typography variant="subtitle2" fontWeight={600}>User Name</Typography></TableCell>
              <TableCell><Typography variant="subtitle2" fontWeight={600}>Room Number</Typography></TableCell>
              <TableCell><Typography variant="subtitle2" fontWeight={600}>Check-in</Typography></TableCell>
              <TableCell><Typography variant="subtitle2" fontWeight={600}>Check-out</Typography></TableCell>
              <TableCell><Typography variant="subtitle2" fontWeight={600}>Status</Typography></TableCell>
              <TableCell><Typography variant="subtitle2" fontWeight={600}>Created At</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} align="center">
                    <Typography variant="subtitle1" color="textSecondary">
                    No data available
                    </Typography>
                </TableCell>
              </TableRow>
            ) : (
              bookings.map((booking, index) => (
              <TableRow key={booking.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{booking.user_name}</TableCell>
                <TableCell>{booking.room_number}</TableCell>
                <TableCell>{booking.check_in_date}</TableCell>
                <TableCell>{booking.check_out_date}</TableCell>
                <TableCell>
                  <Chip
                    label={booking.status}
                    color={
                      booking.status === 'confirmed'
                        ? 'success'
                        : booking.status === 'pending'
                        ? 'warning'
                        : 'error'
                    }
                    size="small"
                  />
                </TableCell>
                <TableCell>{booking.created_at}</TableCell>
              </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      )}


    </DashboardCard>
  );
};

export default BookingManagement;
