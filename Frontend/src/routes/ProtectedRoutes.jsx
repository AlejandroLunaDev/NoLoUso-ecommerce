import { useState } from 'react'
import {  Navigate } from 'react-router-dom'
import { useAuth } from '../auth/context/AuthProvider';

export default function ProtectedRoutes({element}) {
    const auth = useAuth()
  return (
    auth.isAuth ? element : <Navigate to="/login" />
  )
}
