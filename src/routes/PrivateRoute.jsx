import React, { useContext } from 'react'
import { LoginContext } from '../contexts/LoginContext'
import { Navigate, Outlet } from 'react-router-dom';

export default function PrivateRoute() {
    const {isLogin} = useContext(LoginContext);
    
    return ( isLogin ? <Outlet/> : <Navigate replace to="/"/> );
};