import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Typography, Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  Tooltip,
  IconButton
} from '@mui/material';
import axios from 'axios';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import Swal from 'sweetalert2';

import DashboardCard from "../../../components/shared/DashboardCard";

const BookingManagement = ({}) => {
  const [bookings, setBookings] = useState([]);
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_API_BOOKING}/booking`);
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

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      if (newStatus === "confirmed") {
        await axios.put(`${import.meta.env.VITE_API_BOOKING}/booking/confirm/${bookingId}`);
        Swal.fire({
          icon: "success",
          title: "Booking Confirmed",
          text: `Booking ID:${bookingId} Name:${booking.user_name} has been confirmed.`,
        });
      } else if (newStatus === "canceled") {
        await axios.delete(`${import.meta.env.VITE_API_BOOKING}/booking/cancel/${bookingId}`);
        Swal.fire({
          icon: "success",
          title: "Booking Canceled",
          text: `Booking ID ${bookingId} has been canceled.`,
        });
      }

      fetchBookings(); // refresh the table
    } catch (error) {
      console.error("Failed to update booking status:", error);
      Swal.fire({
        icon: "error",
        title: "Action Failed",
        text: error.response?.data?.error || "An unexpected error occurred.",
      });
    }
  };


  
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
              <TableCell><Typography variant="subtitle2" fontWeight={600}>Actions</Typography></TableCell>
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
                <TableCell>
                  <>
                    <Tooltip title="Confirm Booking">
                      <span>
                        <IconButton
                          onClick={() => handleStatusChange(booking.id, 'confirmed')}
                          disabled={booking.status !== "pending"}
                          color="success"
                        >
                          <CheckCircleIcon />
                        </IconButton>
                      </span>
                    </Tooltip>
                    <Tooltip title="Cancel Booking">
                      <span>
                        <IconButton
                          onClick={() => handleStatusChange(booking.id, 'canceled')}
                          disabled={booking.status !== "pending"}
                          color="error"
                        >
                          <CancelIcon />
                        </IconButton>
                      </span>
                    </Tooltip>
                  </>
                </TableCell>
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
