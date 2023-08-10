import { Outlet } from 'react-router-dom'
// import { CookieHandler } from "../utils/cookieHandler"
import { Navigate } from 'react-router-dom'

export default function ProtectedRoutes() {
    const auth = localStorage.getItem('accessToken') || localStorage.getItem('googleToken')
    // const data = localStorage.getItem('googleToken')
    // console.log("datapp:", data)
    // console.log("protectRoutes:", auth)

    if (auth) {
        return <Outlet />
    } else {
        // window.location.href = '/signin';
        <Navigate to='/signin' replace />;
    }
    // return auth ? <Outlet /> : <Navigate to='/signin' replace />;
    // return auth ? <Outlet /> :  window.location.href = '/signin';
}
