import { lazy } from 'react';

// project imports
import MinimalLayout from 'layout/MinimalLayout';


import Loadable from 'ui-component/Loadable';

// login routing
const AuthLogin = Loadable(lazy(() => import('views/pages/authentication/authentication/Login')));
const AuthRegister = Loadable(lazy(() => import('views/pages/authentication/authentication/Register')));
// const AuthForgotPassword = Loadable(lazy(() => import('views/pages/authentication/authentication3/ForgotPassword3')));


// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: '',
            element: <AuthLogin />
        },
        {
            path: 'login',
            element: <AuthLogin />
        },
        {
            path: 'register',
            element: <AuthRegister />
        },
        // {
        //     path: '/forgot',
        //     element: <AuthForgotPassword />
        // }
    ]
};

export default LoginRoutes;