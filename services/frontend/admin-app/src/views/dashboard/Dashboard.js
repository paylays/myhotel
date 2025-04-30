import React from 'react';
import { Box, Stack } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';

// components
import RoomManagement from '../rooms/components/RoomManagement';
import BookingManagement from '../bookings/components/BookingManagement';

const Dashboard = () => {
  return (
    <PageContainer title="Dashboard New" description="this is Dashboard New">

      <Box sx={{ px: 2, py: 3 }}>
        <Stack spacing={3}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 3,
            }}
          >
            <Box sx={{ flex: 1 }}>
              <BookingManagement />
            </Box>
            <Box sx={{ flex: 2 }}>
              <RoomManagement />
            </Box>
          </Box>
        </Stack>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
