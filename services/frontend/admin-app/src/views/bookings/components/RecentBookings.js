import React, { useEffect, useState } from 'react';
import DashboardCard from '../../../components/shared/DashboardCard';
import {
  Timeline,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
  timelineOppositeContentClasses,
} from '@mui/lab';
import { Typography, Box } from '@mui/material';
import axios from 'axios';

const RecentBookings = () => {
  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRecentBookings = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_API_BOOKING}/booking`);
      const sorted = res.data
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, 5);
      setRecentBookings(sorted);
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
    } finally {
      setLoading(false);
    }
  };

    useEffect(() => {
      fetchRecentBookings();
    }, []);;

  return (
    <DashboardCard title="Recent Bookings">
      {loading ? (
        <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
          <Typography variant="subtitle1" color="textSecondary">
            Wait for recent bookings...
          </Typography>
        </Box>
      ) : (
        <Timeline
          className="theme-timeline"
          sx={{
            p: 0,
            mb: '-20px',
            '& .MuiTimelineConnector-root': {
              width: '1px',
              backgroundColor: '#efefef',
            },
            [`& .${timelineOppositeContentClasses.root}`]: {
              flex: 0.5,
              paddingLeft: 0,
            },
          }}
        >
          {recentBookings.map((booking, index) => (
            <TimelineItem key={booking.id}>
              <TimelineOppositeContent>
                {new Date(booking.created_at).toLocaleDateString()} - {new Date(booking.created_at).toLocaleTimeString()}
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot
                  color={
                    booking.status === 'confirmed'
                      ? 'success'
                      : booking.status === 'pending'
                      ? 'warning'
                      : 'error'
                  }
                  variant="outlined"
                />
                {index < recentBookings.length - 1 && <TimelineConnector />}
              </TimelineSeparator>
              <TimelineContent>
                <Typography fontWeight="600">
                  {booking.user_name} booked room {booking.room_number}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {booking.check_in_date} to {booking.check_out_date}
                </Typography>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      )}
    </DashboardCard>
  );
};

export default RecentBookings;
