import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout/RootLayout";
import Home from "../pages/Home/Home/Home";
import AuthLayout from "../layouts/AuthLayout/AuthLayout";
import Login from "../pages/Authentication/Login/Login";
import Shop from "../pages/Shop/Shop";
import Register from "../pages/Authentication/Register/Register";
import DashboardHome from "../pages/Dashboard/DashboardHome";
import DashboardLayout from "../layouts/DashboardLayout/DashboardLayout";
import UpdateProfile from "../pages/UserProfile/UpdateProfile";
import PrivateRoute from "../routes/PrivateRoute";
import ViewProfile from "../pages/UserProfile/ViewProfile";
import Forbidden from "../pages/Dashboard/Forbidden";
import VendorRoute from "../routes/VendorRoute";
import PostAItem from "../pages/VendorPages/PostAItem";

const router = createBrowserRouter([
    {
        path: '/',
        Component: RootLayout,
        children: [
            {
                index: true, 
                Component: Home,
            },
            {
                path: 'shop',
                Component: Shop,
            },
            {
                path: 'postAItem',
                element: <VendorRoute> <PostAItem /> </VendorRoute>
            },
            {
                path: 'forbidden',
                Component: Forbidden,
            }
        ]
    },
    {
        path: '/auth',
        Component: AuthLayout,
        children: [
            {
                index: true,
                Component: Login
            },
            {
                path: 'register',
                Component: Register,
            },
            {
                path: 'updateProfile',
                Component: UpdateProfile,
            }, 
            {
                path: 'viewProfile',
                Component: ViewProfile
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute> <DashboardLayout /> </PrivateRoute>,
        children: [
            {
                index: true,
                Component: DashboardHome,
            }, 
            
            

        ]
    }
])

export default router;