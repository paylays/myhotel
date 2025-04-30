import React, { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router';

/* ***Layouts**** */
const FullLayout = lazy(() => import('../layouts/full/FullLayout'));
const BlankLayout = lazy(() => import('../layouts/blank/BlankLayout'));

/* ****Pages***** */
const Dashboard = lazy(() => import('../views/dashboard/Dashboard'))
const SamplePage = lazy(() => import('../views/sample-page/SamplePage'))
const Icons = lazy(() => import('../views/icons/Icons'))
const TypographyPage = lazy(() => import('../views/utilities/TypographyPage'))
const Shadow = lazy(() => import('../views/utilities/Shadow'))
const Error = lazy(() => import('../views/authentication/Error'));
const Login = lazy(() => import('../views/authentication/Login'));

// Routes New
const PrivateRoute = lazy(() => import('../components/PrivateRoute'));

// Room Management
const Room = lazy(() => import('../views/rooms/Room') )
const RoomManagement = lazy(() => import('../views/rooms/components/RoomManagement') )
const EditRoom = lazy(() => import('../views/rooms/components/EditRoom') )

// Booking Management
const Booking = lazy(() => import('../views/bookings/Booking'))

const BasicTable = lazy(() => import("../views/tables/BasicTable"));
const ExAutoComplete = lazy(() =>
  import("../views/form-elements/ExAutoComplete")
);
const ExButton = lazy(() => import("../views/form-elements/ExButton"));
const ExCheckbox = lazy(() => import("../views/form-elements/ExCheckbox"));
const ExRadio = lazy(() => import("../views/form-elements/ExRadio"));
const ExSlider = lazy(() => import("../views/form-elements/ExSlider"));
const ExSwitch = lazy(() => import("../views/form-elements/ExSwitch"));
const FormLayouts = lazy(() => import("../views/form-layouts/FormLayouts"));

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
          { path: '/dashboard', exact: true, element: <Dashboard /> },

          { path: '/rooms', exact: true, element: <Room /> },
          { path: '/rooms-management', exact: true, element: <RoomManagement /> },
          { path: '/rooms/:id/edit', exact: true, element: <EditRoom /> },
          
          { path: '/bookings', exact: true, element: <Booking /> },
          
          { path: '/sample-page', exact: true, element: <SamplePage /> },
          { path: '/icons', exact: true, element: <Icons /> },
          { path: '/ui/typography', exact: true, element: <TypographyPage /> },
          { path: '/ui/shadow', exact: true, element: <Shadow /> },
          { path: "/tables/basic-table", element: <BasicTable /> },
          { path: "/form-layouts", element: <FormLayouts /> },
          { path: "/form-elements/autocomplete", element: <ExAutoComplete /> },
          { path: "/form-elements/button", element: <ExButton /> },
          { path: "/form-elements/checkbox", element: <ExCheckbox /> },
          { path: "/form-elements/radio", element: <ExRadio /> },
          { path: "/form-elements/slider", element: <ExSlider /> },
          { path: "/form-elements/switch", element: <ExSwitch /> },
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
      { path: '/login', element: <Login /> },
      { path: '*', element: <Navigate to="/404" /> },
    ],
  },
];

const router = createBrowserRouter(Router);

export default router;
