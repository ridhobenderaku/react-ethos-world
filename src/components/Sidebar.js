
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import datasidebar from '../data/datasidebar'
const Sidebar = () => {

  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const login = JSON.parse(sessionStorage.getItem("auth"));
    setAuth(login);
  }, []);

  const history = useNavigate();
  const [modal, setModal] = useState(true);
  const [redirectOut, setRedirectOut] = useState(false);

  const onLogout = event => {

    event.preventDefault();

    sessionStorage.removeItem('auth')
    // setIsLoggedin(false);
    if (sessionStorage.getItem('auth') === null) {
      window.location.href = '/';
    }

  }

  if (redirectOut === true) {
    window.location.href = '/';
  }

  return (
    <>
      {/* Main Sidebar Container */}
      <aside className="main-sidebar sidebar-light-primary elevation-4">
        <a href="i" className="brand-link">
          <img src="logo/logoethosWord.png" alt="Ethos world Logo" className="brand-image brand-text font-weight-light" /><br />

          {/* <span className="brand-text font-weight-light"></span> */}
        </a>
        {/* Sidebar */}
        <div className="sidebar">
          {/* Sidebar user panel (optional) */}
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              <img src="dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
              <a href="#" className="d-block namapeg"><p>{auth?.data?.firstname ?? "User"}</p> </a>

            </div>
            {/* <div className="info"> */}
            {/* </div> */}
          </div>
          {/* Sidebar Menu */}
          <nav className="mt-2">
            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
              <li className="nav-item">
                <Link to="/" className="nav-link ">
                  <i className="nav-icon fas fa-home" />
                  <p>
                    Home
                  </p>
                </Link>
              </li>
              {datasidebar.map((menuItem, idx) => (
                <li key={idx}  className="nav-item">
                  {/* <a href="pages/calendar.html" className="nav-link"> */}
                  <Link to={menuItem.to} className="nav-link">
                    <i className={menuItem.icon} />
                    <p>
                      {menuItem.title}
                    </p>
                  </Link>
                </li>
              ))}
              <li className="nav-item">
                <Link to="" onClick={(event) => onLogout(event)} className="nav-link ">
                  <i className="nav-icon fas fa-sign-out-alt" />
                  <p className="nav-pills">
                    Logout
                  </p>
                </Link>
              </li>
            </ul>
          </nav>
          {/* /.sidebar-menu */}
        </div>
        {/* /.sidebar */}
      </aside>



    </>
  )
}

export default Sidebar