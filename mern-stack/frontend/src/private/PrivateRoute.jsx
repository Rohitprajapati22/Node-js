import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ allowedRoles }) => {
    const [auth, setAuth] = useAuth();
    if (!auth?.token) {
        return <Navigate to="/" />
    }
    const userRole = auth?.token?.user?.role;
    if (allowedRoles && !allowedRoles.includes(userRole)) {
        return <Navigate to="/" />
    }
    return <Outlet />
}
export default PrivateRoute