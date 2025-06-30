import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const AdminRoutes = () => {
    const role = localStorage.getItem("token")
    return (
        localStorage.getItem("token") ?
            role == "68604c3ffd47cbd70c73b98b" ?
                <Outlet /> :
                <Navigate to="blogs" />
            : <Navigate to="login" />
    )
}

export default AdminRoutes