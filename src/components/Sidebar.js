import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";

import datasidebar from "../data/datasidebar";
import { ReactContext } from "../context/AuthProvider";

const Sidebar = ({ setModal }) => {
  const { user } = useContext(ReactContext);
  const [redirectOut, setRedirectOut] = useState(false);
  const onLogout = (event) => {
    event.preventDefault();

    sessionStorage.removeItem("auth");
    window.location.href = "/";
  };

  if (redirectOut === true) {
    window.location.href = "/";
  }
  return (
    <>
      <aside className='main-sidebar sidebar-light-primary elevation-4'>
        <a href='#' className='brand-link'>
          <img
            src='/img/logo/logoEthosWorldVertical.png'
            alt='Ethos World'
            className='brand-image img-circle'
            style={{ opacity: ".8" }}
          />
          <span className='brand-text nama'>Ethos World</span>
        </a>

        <div className='sidebar'>
          <div className='user-panel mt-3 pb-3 mb-3 d-flex align-items-center'>
            <div className='image'>
              <img
                src='/img/logo/person-icon.png'
                className='img-circle elevation-2'
                alt='User Image'
              />
            </div>
            <div className='info'>
              <a href='#' className='d-block namapeg'>
                <p className='text-wrap text-left m-0 p-0'>
                  {user?.fullname ?? "User"}
                </p>
              </a>
            </div>
          </div>
          <nav className='mt-2'>
            <ul
              className='nav nav-pills nav-sidebar flex-column'
              data-widget='treeview'
              role='menu'
              data-accordion='false'>
              <li className='nav-item navbars'>
                <Link to='/' className='nav-link' data-widget='pushmenu'>
                  <i className='nav-icon fas fa-home' />
                  <p>Home</p>
                </Link>
              </li>
              {datasidebar.map((menuItem, idx) => (
                <li key={idx} className='nav-item navbars'>
                  <Link
                    to={menuItem.to}
                    className='nav-link'
                    data-widget='pushmenu'>
                    <i className={menuItem.icon} />
                    <p>{menuItem.title}</p>
                  </Link>
                </li>
              ))}
              <li className='nav-item navbars  d-md-none d-lg-none d-xl-none ml-auto'>
                <Link
                  to=''
                  onClick={(event) => onLogout(event)}
                  className='nav-link'
                  data-widget='pushmenu'>
                  <i className='nav-icon fas fa-sign-out-alt' />
                  <p>Logout</p>
                </Link>
              </li>
            </ul>
          </nav>
          {/* /.sidebar-menu */}
        </div>
        {/* /.sidebar */}
      </aside>
    </>
  );
};

export default Sidebar;
