
import {
    createBrowserRouter,
    Navigate,
} from "react-router";
import { HomePage } from "./pages/home/HomePage";
import { GenderPage } from "./pages/Gender/GenderPage";

import { AuthLayout } from "./auth/layouts/AuthLayout";
import { LoginPage } from "./auth/pages/login/LoginPage";
import { RegisterPage } from "./auth/pages/register/RegisterPage";

import { DashboardPage } from "./admin/pages/dashboard/DashboardPage";
import { AdminProductPage } from "./admin/pages/product/AdminProductPage";
import { AdminProducts } from "./admin/pages/products/AdminProducts";
import { lazy } from "react";
import { ProductPage } from "./pages/product/ProductPage";
import { AdminRoute, NotAuthenticatedRoute } from "./components/routes/ProtectedRoutes";



const ShopLayOut = lazy(() => import('./pages/layouts/shop/ShopLayOut'))

const AdminLayout = lazy(() => import("./admin/layout/AdminLayout"))

export const appRouter = createBrowserRouter([
    //Main Routes
    {
        path: '/',
        element: <ShopLayOut />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: 'products/:idSlug',
                element: <ProductPage />
            },
            {
                path: 'gender/:gender',
                element: <GenderPage />
            }
        ]

    },
    //Auth Routes
    {
        path: '/auth',
        element: (<NotAuthenticatedRoute>
            <AuthLayout />
        </NotAuthenticatedRoute>),
        children: [
            {
                index: true,
                element: <Navigate to={'/auth/login'} />
            },
            {
                path: 'login',
                element: <LoginPage />
            },
            {
                path: 'register',
                element: <RegisterPage />
            }
        ]
    },

    //Admin Routes
    {
        path: '/admin',
        element: (
            <AdminRoute>
                <AdminLayout />
            </AdminRoute>
        ),
        children: [
            {
                index: true,
                element: <DashboardPage />
            },
            {
                path: 'products',
                element: <AdminProductPage />
            },
            {
                path: 'products/:id',
                element: <AdminProducts />
            }
        ]
    },
    {
        path: '*',
        element: <Navigate to={'/'} />

    }

]);