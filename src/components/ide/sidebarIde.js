import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const SidebarIde = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("pengajuan");

  const handleChangeTab = (tab) => (e) => {
    e.preventDefault();
    setActiveTab(tab);
  };

  useEffect(() => {
    if (location.pathname.includes("/ide/ruangide")) setActiveTab("ruangide");
    else if (location.pathname.includes("/ide/berbintang"))
      setActiveTab("berbintang");
    else if (location.pathname.includes("/ide/berbagiide"))
      setActiveTab("berbagiide");
    else if (location.pathname.includes("/ide/arsip")) setActiveTab("arsip");
    else if (location.pathname.includes("/ide/sampah")) setActiveTab("sampah");
  }, [location.pathname]);
  return (
    <div className='card'>
      <div className='card-body p-0'>
        <ul className='nav nav-pills flex-column'>
          <li
            style={{
              backgroundColor: activeTab === "ruangide" ? "#87BD3D" : "white",
            }}
            className='nav-item'>
            <Link to='/ide/ruangide' className='nav-link'>
              <i className='fas fa-lightbulb' /> Ide Saya
              <span className='badge bg-primary float-right'></span>
            </Link>
          </li>
          <li
            style={{
              backgroundColor: activeTab === "berbintang" ? "#87BD3D" : "white",
            }}
            className='nav-item'>
            <Link to='/ide/berbintang' className='nav-link'>
              <i className='fas fa-star' /> Berbintang
            </Link>
          </li>
          <li
            style={{
              backgroundColor: activeTab === "berbagiide" ? "#87BD3D" : "white",
            }}
            className='nav-item'>
            <Link to='/ide/berbagiide' className='nav-link'>
              <i className='fas fa-users' /> Berbagi Ide
            </Link>
          </li>
          <li
            style={{
              backgroundColor: activeTab === "arsip" ? "#87BD3D" : "white",
            }}
            className='nav-item'>
            <Link to='/ide/arsip' className='nav-link'>
              <i className='fas fa-archive' /> Arsip
              <span className='badge bg-primary float-right'></span>
            </Link>
          </li>
          <li
            style={{
              backgroundColor: activeTab === "sampah" ? "#87BD3D" : "white",
            }}
            className='nav-item'>
            <Link to='/ide/sampah' className='nav-link'>
              <i className='fas fa-trash-alt' /> Sampah
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SidebarIde;
