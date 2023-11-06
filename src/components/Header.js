import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

import menuData from "../data/menuData";
import { socket } from "../App";
import { ReactContext } from "../context/AuthProvider";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [redirectOut, setRedirectOut] = useState(false);
  const { user, notifikasi, setNotifikasi } = useContext(ReactContext);
  const [activeTab, setActiveTab] = useState("Home");

  const onLogout = (event) => {
    event.preventDefault();

    sessionStorage.removeItem("auth");
    window.location.href = "/";
  };

  if (redirectOut === true) {
    window.location.href = "/";
  }
  useEffect(() => {
    if (location.pathname.includes("/ide")) setActiveTab("Ide");
    else if (location.pathname.includes("/project")) setActiveTab("Project");
    else if (location.pathname.includes("/agenda")) setActiveTab("Agenda");
    else if (location.pathname.includes("/meeting")) setActiveTab("Meeting");
    else if (location.pathname.includes("/memo")) setActiveTab("Memo");
    else if (location.pathname.includes("/pesan")) setActiveTab("Pesan");
  }, [location.pathname]);
  useEffect(() => {
    function notif(label, value) {
      setNotifikasi((prevData) => ({
        ...prevData,
        [label]: value.length,
      }));
    }
    socket.on("cekuser", (arg, callback) => {
      const rr = {
        id: `{"id":"${user.id}","read":"false"}`,
        userid: user.id,
      };
      callback(rr);
    });
    socket.on(`notifikasimeeting${user.id}`, (value) => {
      notif("meeting", value);
    });

    socket.on(`notifikasiprojek${user.id}`, (value) => {
      notif("project", value);
    });
    socket.on(`notifikasipesan${user.id}`, (value) => {
      notif("pesan", value);
    });
    return () => {
      socket.off("notifikasipesan", notif);
      socket.off("notifikasimeeting", notif);
      socket.off("notifikasiprojek", notif);
    };
  }, []);
  return (
    <>
      <nav className='main-header navbar navbar-expand navbar-green navbar-light'>
        <ul className='navbar-nav'>
          <li className='nav-item'>
            <Link
              className='nav-link'
              data-widget='pushmenu'
              href='#'
              role='button'>
              <i className='fas fa-bars' />
            </Link>
          </li>
        </ul>
        <ul className='navbar-nav ml-auto'>
          {menuData.map((menuItem, idx) => (
            <li key={idx} className='nav-item d-none d-sm-inline-block'>
              <Link
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab(menuItem.title);
                  navigate(menuItem.to);
                }}
                style={{
                  color: activeTab === menuItem.title ? "#D9E021" : "#ffffff",
                }}
                className='nav-link'>
                {menuItem.title}
                {notifikasi[menuItem.notif] !== 0 && (
                  <span className='badge badge-danger navbar-badge'>
                    {notifikasi[menuItem.notif]}
                  </span>
                )}
              </Link>
            </li>
          ))}
          <li className='nav-item d-none d-sm-inline-block'>
            <Link
              to=''
              onClick={(event) => onLogout(event)}
              className='nav-link '>
              <i className='nav-icon fas fa-sign-out-alt' />
            </Link>
          </li>
          <li className='navbar-item dropdown navbar-expand d-md-none d-lg-none d-xl-none ml-auto'>
            <a
              className='nav-link '
              href='#'
              id='navbarDropdown'
              role='button'
              data-toggle='dropdown'
              aria-haspopup='true'
              aria-expanded='false'>
              <i className='fas fa-ellipsis-v' />
            </a>
            <div
              className='dropdown-menu dropdown-menu-lg dropdown-menu-right'
              aria-labelledby='navbarDropdown'>
              {menuData.map((menuItem, idx) => (
                <Link
                  key={idx}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab(menuItem.title);
                    navigate(menuItem.to);
                  }}
                  style={{
                    color: activeTab === menuItem.title ? "#D9E021" : "#619A3F",
                  }}
                  className='nav-link dropdown-item'>
                  {menuItem.title}
                  {notifikasi[menuItem.notif] !== 0 && (
                    <span className='badge badge-danger navbar-badge'>
                      {notifikasi[menuItem.notif]}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Header;
