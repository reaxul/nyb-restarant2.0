import { createBrowserRouter } from "react-router-dom";
import OrderDetails from "../components/shared/OrderDetails";
import StripeCheckoutForm from "../components/ui/CheckoutForm";
import DashboardLayout from "../layout/DashboardLayout";
import MainLayout from "../layout/MainLayout";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";
import Info from "../pages/Info";
import Login from "../pages/Login";
import Menu from "../pages/Menu";
import MenuItem from "../pages/MenuItem";
import MyProfile from "../pages/MyProfile";
import Orders from "../pages/Orders";
import Settings from "../pages/Settings";
import Signup from "../pages/Signup";
import Users from "../pages/Users";
import PrivateRoute from "./PrivateRoute";
import ScrollToTop from "../components/ScrollToTop";
import Kitchen from "../pages/Kitchen";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <MainLayout />,
        <ScrollToTop />
      </>
    ),
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
        path: "/info",
        element: <Info />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/menu",
        element: <Menu />,
      },
      {
        path: "/menu/:id",
        element: <MenuItem />,
      },
      {
        path: "/order",
        element: <OrderDetails />,
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <MyProfile />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/checkout/:orderId",
    element: (
      <PrivateRoute>
        <StripeCheckoutForm />
      </PrivateRoute>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "kitchen",
        element: <Kitchen />,
      }
    ],
  },
]);

export default router;
