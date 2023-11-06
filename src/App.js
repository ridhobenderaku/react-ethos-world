import React, { useContext, useEffect } from "react";
import { io } from "socket.io-client";
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import Footer from "./components/footer";
import CeoRouter from "./routes/ceoRouter";
import { ReactContext } from "../src/context/AuthProvider";
import PegawaiRouter from "./routes/pegawaiRouter";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "bootstrap-daterangepicker/daterangepicker.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { getUsers } from "./api/pesanApi";

export const socket = io(process.env.REACT_APP_API_PROD_VIEW);
function App() {
  const { user } = useContext(ReactContext);

  const checkUser = () => {
    if (user.levele === "Admin") return <CeoRouter />;
    else return <PegawaiRouter />;
  };

  useEffect(() => {
    getUsers().then((res) => {
      if (res) {
        sessionStorage.setItem("dataUsers", btoa(JSON.stringify(res)));
      }
    });
  }, []);

  return (
    <>
      <Header />
      {user && checkUser()}
      <Sidebar />
      <Footer />
    </>
  );
}
// }

export default App;
