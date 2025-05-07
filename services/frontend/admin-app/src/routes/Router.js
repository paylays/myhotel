import React, { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router';

// Layouts
const FullLayout = lazy(() => import('../layouts/full/FullLayout'));
const BlankLayout = lazy(() => import('../layouts/blank/BlankLayout'));

// Pages
const Dashboard = lazy(() => import('../views/dashboard/Dashboard'))
const Error = lazy(() => import('../views/authentication/Error'));
const Login = lazy(() => import('../views/authentication/Login'));

// Private Route
const PrivateRoute = lazy(() => import('../components/PrivateRoute'));

// Room Management
const Room = lazy(() => import('../views/rooms/Room') )
const RoomManagement = lazy(() => import('../views/rooms/components/RoomManagement') )
const EditRoom = lazy(() => import('../views/rooms/components/EditRoom') )

// Booking Management
const Booking = lazy(() => import('../views/bookings/Booking'))

// Account Management
const Account = lazy(() => import('../views/accounts/Account'))

const Router = [
  {
    path: '/',
    element: <PrivateRoute />,
    children: [
      {
        path: '/',
        element: <FullLayout />,
        children: [
          { path: '/', element: <Navigate to="/login" /> },
          { path: '/dashboard', element: <Dashboard /> },

          { path: '/rooms', element: <Room /> },
          { path: '/rooms-management', element: <RoomManagement /> },
          { path: '/rooms/:id/edit', element: <EditRoom /> },
          
          { path: '/bookings', element: <Booking /> },

          { path: '/accounts', element: <Account /> },

          { path: '*', element: <Navigate to="/404" /> },
        ],
      },
    ],
  },

  {
    path: '/',
    element: <BlankLayout />,
    children: [
      { path: '404', element: <Error /> },
      { path: 'login', element: <Login /> },
      { path: '*', element: <Navigate to="/404" /> },
    ],
  },
];

const router = createBrowserRouter(Router);

export default router;
