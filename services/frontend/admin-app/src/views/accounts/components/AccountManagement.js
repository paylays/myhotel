import React, { useEffect, useState } from 'react';
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

import DashboardCard from "../../../components/shared/DashboardCard";
import DetailAccount from './DetailAccount';
import EditAccount from './EditAccount';
import DeleteAccount from './DeleteAccount';

const AccountManagement = ({}) => {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const handleView = (account) => {
    setSelectedAccount(account);
    setOpenViewModal(true);
  };

  const handleEdit = (account) => {
    setSelectedAccount(account);
    setOpenViewModal(false);
    setOpenEditModal(true);
  };

  const handleDelete = (account) => {
    setSelectedAccount(account);
    setOpenDeleteModal(true);
  };

  const handleCloseViewModal = () => {
    setOpenViewModal(false);
    setSelectedAccount(null);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setSelectedAccount(null);
  };
  
  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
    setSelectedAccount(null);
  };

  const fetchAccounts = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${import.meta.env.VITE_API_AUTH}/api/auth/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAccounts(res.data);
    } catch (error) {
      console.error('Failed to fetch accounts:', error);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);;


  return (

    <DashboardCard title="Account Management">
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
              <TableCell><Typography variant="subtitle2" fontWeight={600}>ID</Typography></TableCell>
              <TableCell><Typography variant="subtitle2" fontWeight={600}>Name</Typography></TableCell>
              <TableCell><Typography variant="subtitle2" fontWeight={600}>Email</Typography></TableCell>
              <TableCell><Typography variant="subtitle2" fontWeight={600}>Role</Typography></TableCell>
              <TableCell><Typography variant="subtitle2" fontWeight={600} align="center">Actions</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {accounts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                    <Typography variant="subtitle1" color="textSecondary">
                    No data available
                    </Typography>
                </TableCell>
              </TableRow>
            ) : (
              accounts.map((account, index) => (
              <TableRow key={account.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{account.id}</TableCell>
                <TableCell>{account.name}</TableCell>
                <TableCell>{account.email}</TableCell>
                <TableCell>
                  <Chip
                    label={account.role}
                    color={
                      account.role === 'user'
                        ? 'success'
                        : 'error'
                    }
                    size="small"
                  />
                </TableCell>
                <TableCell align="center">
                  <Tooltip title="View">
                    <IconButton color="primary" onClick={() => handleView(account)}>
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit">
                    <IconButton color="secondary" onClick={() => handleEdit(account)}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton color="error" onClick={() => handleDelete(account)}>
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

      {openViewModal && (
        <DetailAccount
          open={openViewModal} 
          handleClose={handleCloseViewModal} 
          account={selectedAccount} 
        />
      )}

      {openEditModal && (
        <EditAccount
          open={openEditModal} 
          handleClose={handleCloseEditModal} 
          account={selectedAccount} 
          fetchAccounts={fetchAccounts}
        />
      )}
     
      {openDeleteModal && (
        <DeleteAccount
          open={openDeleteModal} 
          handleClose={handleCloseDeleteModal} 
          account={selectedAccount} 
          fetchAccounts={fetchAccounts}
        />
      )}

    </DashboardCard>
  )
}

export default AccountManagement;