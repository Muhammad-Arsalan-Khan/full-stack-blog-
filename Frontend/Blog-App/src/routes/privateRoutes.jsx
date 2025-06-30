import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = ({ authCheck }) => {

  const role = localStorage.getItem("token")
  return (
    authCheck ?
      role !== "68604c3ffd47cbd70c73b98b" ?
        <Outlet />
        : <Navigate to="/admin" /> :
        <Navigate to="/login" />


  )
}

export default PrivateRoute