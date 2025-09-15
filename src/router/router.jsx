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
import AddProduct from "../pages/VendorPages/AddProduct/AddProduct";
import AddAdvertisement from "../pages/VendorPages/AddAdvertisement/AddAdvertisement";
import MyProducts from "../pages/VendorPages/MyProducts/MyProducts";
import MyAds from "../pages/VendorPages/MyAds/MyAds";
import AllUsers from "../pages/AdminPages/AllUsers/AllUsers";
import AllProducts from "../pages/AdminPages/AllProducts/AllProducts";
import AllAds from "../pages/AdminPages/AllAds/AllAds";
import AllOrders from "../pages/AdminPages/AllOrders/AllOrders";
import AdminRoute from "../routes/AdminRoute";
import ProductDetails from "../pages/Shop/ProductDetails";
import Payment from "../pages/Dashboard/Payment/Payment";
import MyCart from "../pages/UserPages/MyCart/MyCart";
import MyOrders from "../pages/UserPages/MyOrders/MyOrders";
import MyWishList from "../pages/UserPages/MyWishList/MyWishList";
import EditProduct from "../pages/VendorPages/MyProducts/EditProduct/EditProduct";
import EditAd from "../pages/VendorPages/MyAds/EditAd";


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
                path: 'products/:id',
                element: <PrivateRoute> <ProductDetails /> </PrivateRoute>
            },
            

            // vendor routes
            {
                path: 'addProduct',
                element: <VendorRoute> <AddProduct /> </VendorRoute>
            },
            {
                path: 'addAd',
                element: <VendorRoute> <AddAdvertisement /> </VendorRoute>
            },

            // admin routes
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
            {
                path: 'myWishList',
                Component: MyWishList,
            },
            {
                path: 'myCart',
                Component: MyCart,
            },
            {
                path: 'myOrders',
                Component: MyOrders,
            },
            {
                path: 'payment/:cartId',
                Component: Payment,
            },
            
            // vendor routes 
            {
                path: 'myProducts',
                Component: MyProducts,
            },
            {
                path: 'editProduct/:id',
                Component: EditProduct,
            },
            {
                path: 'myAds',
                Component: MyAds,
            },
            {
                path: 'editAd/:id',
                Component: EditAd,
            },
            
            // admin routes
            {
                path: 'allUsers',
                element: <AdminRoute> <AllUsers /> </AdminRoute>,
            },
            {
                path: 'allProducts',
                element: <AdminRoute> <AllProducts /> </AdminRoute>,
            },
            {
                path: 'allAds',
                element: <AdminRoute> <AllAds /> </AdminRoute>,
            },
            {
                path: 'allOrders',
                element: <AdminRoute> <AllOrders /> </AdminRoute>,
            }

        ]
    }
])

export default router;