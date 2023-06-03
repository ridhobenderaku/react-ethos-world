import { createContext } from 'react';
import Login from '../login/login';
import App from '../App';
const AuthContex = createContext({});

export function AuthProvider (props) {
    if (sessionStorage.getItem("auth")) {
        return(
<>
    <App {...props} />;
</>
        ) 
      } else {
        return (
        <>
        <Login/> 
        </> 
        )
      }

}

export default AuthContex
