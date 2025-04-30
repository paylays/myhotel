import React from 'react';
import { Box, Stack } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';

import BookingManagement from './components/BookingManagement';
import RecentBookings from './components/RecentBookings';

const Booking = () => {
  return (
    <PageContainer title="Room Management" description="this is Room Management">
      <Stack direction="row" spacing={2}>
      <Box flex={1}>
        <RecentBookings />
      </Box>
      <Box flex={2}>
        <BookingManagement />
      </Box>
      </Stack>
    </PageContainer>
  );
};

export default Booking;