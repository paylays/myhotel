import React from 'react';
import { Box, Stack } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';

import RoomManagement from './components/RoomManagement';
import AddRoom from './components/AddRoom';

const Room = () => {
  return (
    <PageContainer title="Room Management" description="this is Room Management">

      <Box sx={{ px: 2, py: 3 }}>
        <Stack spacing={3}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', lg: 'row' },
              gap: 3,
            }}
          >
            <Box sx={{ flex: 2 }}>
              <RoomManagement />
            </Box>
            <Box sx={{ flex: 1 }}>
              <AddRoom />
            </Box>
          </Box>
        </Stack>
      </Box>
    </PageContainer>
  );
};

export default Room;