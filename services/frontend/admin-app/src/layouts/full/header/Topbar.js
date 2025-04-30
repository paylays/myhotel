import React from 'react';
import { Box, AppBar, Toolbar, styled, Stack, Button } from '@mui/material';
import { Typography} from '@mui/material';


const Topbar = (props) => {


  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: 'none',
    background: theme.palette.grey[600],
    zIndex:"50",
    justifyContent: 'center',
    backdropFilter: 'blur(4px)',
    [theme.breakpoints.up('lg')]: {
      minHeight: '61px',
    },
  }));
  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: '100%',
    color: theme.palette.text.secondary,
  }));

  const GhostButton = styled(Button)(({ theme }) => ({
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.transparent,
    boxShadow:"none",
    borderRadius: "7px",
    fontWeight:600,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
    "& .MuiButton-startIcon": {
      marginRight: "4px",
    }
  }));

  return (
    <AppBarStyled position="sticky" color="default">
      <ToolbarStyled sx={{flexWrap:"wrap"}} >
        <Box
          sx={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          <Typography
            variant="h5"
            sx={{ color: (theme) => theme.palette.primary.contrastText }}
          >
            Dashboard Admin MyHotel
          </Typography>
        </Box>
      </ToolbarStyled>
    </AppBarStyled>
  );
};


export default Topbar;
