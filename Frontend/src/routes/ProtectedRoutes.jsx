import { useState } from 'react'
import { Outlet, Navigate } from 'react-router-dom'

export default function ProtectedRoutes({element}) {
    const [isAuth, setIsAuth] = useState(true);
  return (
    isAuth ? element : <Navigate to="/login" />
  )
}
