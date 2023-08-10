import { Navigate, Outlet } from 'react-router-dom'

export default function IsLoginAccess() {
    const auth = localStorage.getItem('accessToken') || localStorage.getItem('googleToken')
    return !auth ? <Outlet /> : <Navigate to='/' />
}

