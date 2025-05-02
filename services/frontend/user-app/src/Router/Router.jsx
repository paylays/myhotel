import { createBrowserRouter } from "react-router-dom";

// Home And Main Home
import Main from "../Main/Main";
import Home from "../Pages/Home/Home";
import History from "../Pages/History/History";
import Booking from "../Pages/Booking/Booking";

// All InnerPage
import RoomDetails from "../Pages/InnerPage/RoomDetails";
import ErrorPage from "../Shared/ErrorPage";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";

// Starting React Router.
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/find_room",
        element: <Booking />,
      },
      {
        path: "/room_details",
        element: <RoomDetails />,
      },
      {
        path: "/booking-history",
        element: <History />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default router;
