import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    Box,
    Typography,
    FormGroup,
    FormControlLabel,
    Button,
    Stack,
    Checkbox
} from '@mui/material';
import Swal from 'sweetalert2';

import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';

const AuthLogin = ({ title, subtitle, subtext }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_AUTH}/api/auth/admin/login`, {
        email,
        password,
      });

      const token = res.data.access_token;

      localStorage.setItem("token", token);

      const profileRes = await axios.get(`${import.meta.env.VITE_API_AUTH}/api/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Admin profile:', profileRes.data);

      Swal.fire({
        icon: 'success',
        title: 'Login Successful!',
        text: 'Welcome Admin',
      }).then((result) => {
        navigate('/dashboard');
      });
    } catch (err) {
      console.error('Login gagal:', err);
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: err.response?.data?.msg || 'An error occurred while logging in.',
      });
      
    }
  };

  return (
    <>
      {title && (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      )}

      {subtext}

      <form onSubmit={handleLogin}>
        <Stack>
          <Box>
            <Typography variant="subtitle1"
              fontWeight={600} component="label" htmlFor='email' mb="5px">Email</Typography>
            <CustomTextField id="email" type="email" variant="outlined" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
          </Box>
          <Box mt="25px">
            <Typography variant="subtitle1"
              fontWeight={600} component="label" htmlFor='password' mb="5px" >Password</Typography>
            <CustomTextField id="password" type="password" variant="outlined" fullWidth onChange={(e) => setPassword(e.target.value)} />
          </Box>
          <Stack justifyContent="space-between" direction="row" alignItems="center" my={2}>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Remember this Account"
              />
            </FormGroup>
          </Stack>
        </Stack>
        <Box>
          <Button
            color="primary"
            variant="contained"
            size="large"
            fullWidth
            type="submit"
          >
            Sign In
          </Button>
        </Box>

      </form>
      {subtitle}
    </>
  )
};

export default AuthLogin;
