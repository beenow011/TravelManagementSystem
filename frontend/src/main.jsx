import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import Home from "./pages/Home.jsx";
import Room from "./pages/Room.jsx";
import Car from "./pages/Car.jsx";
import UserRoom from "./pages/UserRoom.jsx";
import UserCar from "./pages/UserCar.jsx";
import Auth from "./components/Auth.jsx";
import UserBooking from "./pages/UserBooking.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/rooms",
        element: (
          <Auth authentication>
            <Room />
          </Auth>
        ),
      },
      {
        path: "/cars",
        element: (
          <Auth authentication>
            <Car />
          </Auth>
        ),
      },
      {
        path: "/user/room",
        element: (
          <Auth authentication>
            {" "}
            <UserRoom />
          </Auth>
        ),
      },
      {
        path: "/user/car",
        element: (
          <Auth authentication>
            <UserCar />
          </Auth>
        ),
      },
      {
        path: "/user/bookings",
        element: (
          <Auth authentication>
            <UserBooking />
          </Auth>
        ),
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
