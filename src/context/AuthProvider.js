import { createContext, useState } from "react";
import Login from "../pages/login/login";
import App from "../App";

export const ReactContext = createContext(null);

function AuthProvider(props) {
  const [notifikasi, setNotifikasi] = useState({
    pesan: 0,
    meeting: 0,
    project: 0,
    ide: 0,
    agenda: 0,
    memo: 0,
  });
  const user = sessionStorage.getItem("auth")
    ? JSON.parse(atob(sessionStorage.getItem("auth")))
    : null;
  if (user) {
    return (
      <ReactContext.Provider value={{ user, notifikasi, setNotifikasi }}>
        <App {...props} />
      </ReactContext.Provider>
    );
  } else {
    return <Login />;
  }
}

export default AuthProvider;
