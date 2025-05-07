import React, { useState, useEffect } from 'react';
import { Box, Stack } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import AccountManagement from './components/AccountManagement';
import AddAccount from './components/AddAccount';
import axios from 'axios'

const Account = () => {
  const [accounts, setAccounts] = useState([]);

  const fetchAccounts = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${import.meta.env.VITE_API_AUTH}/api/auth/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAccounts(response.data);
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  return (
    <PageContainer title="Room Management" description="this is Room Management">

      <Box sx={{ px: 2, py: 3 }}>
        <Stack spacing={3}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 3,
            }}
          >
            <Box sx={{ flex: 2 }}>
              <AddAccount fetchAccounts={fetchAccounts} />
            </Box>
            <Box sx={{ flex: 1 }}>
              <AccountManagement accounts={accounts}/>
            </Box>
          </Box>
        </Stack>
      </Box>
    </PageContainer>
  );
};

export default Account;