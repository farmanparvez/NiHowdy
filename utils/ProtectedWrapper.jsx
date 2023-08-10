// import { CookieHandler } from "../utils/cookieHandler"
import { Navigate } from "react-router-dom";

export default function ProtectedWrapper({ children }) {
  const auth = localStorage.getItem('accessToken') || localStorage.getItem('googleToken')
  // const data = localStorage.getItem( 'googleToken')
  // console.log(("datapp:", data))
  // console.log(("protectWrapper:", auth))
  
  if (auth) {
    return children
  } else {
    <Navigate to='/signin' replace />;
    // window.location.href = '/signin';
  }
  // return auth ? children : <Navigate to='/signin' replace />;
  // return auth ? children : window.location.href = '/signin';
}
