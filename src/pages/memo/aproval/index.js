import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

import "../../../components/memo/tabel/tableMemo.css";

const AprovalMemo = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("pengajuan");

  const handleChangeTab = (tab) => (e) => {
    e.preventDefault();
    setActiveTab(tab);
  };

  useEffect(() => {
    if (location.pathname.includes("/memo/pengajuan"))
      setActiveTab("persetujuan");
    else if (location.pathname.includes("/memo/disetujui"))
      setActiveTab("disetujui");
    else if (location.pathname.includes("/memo/berbintang"))
      setActiveTab("berbintang");
    else if (location.pathname.includes("/memo/arsip")) setActiveTab("arsip");
  }, [location.pathname]);
  return (
    <>
      <div className='content-wrapper'>
        <section className='content-header'>
          <div className='container-fluid'>
            <div className='row mb-2'>
              <div className='col-sm-6'>
                <h1 className='nama'>Ruang Memo</h1>
              </div>
            </div>
          </div>
        </section>

        <section className='content'>
          <div className='row'>
            <div className='col-md-3'>
              <button
                disabled
                to='/memo/buatmemo'
                className='btn btn-primary btn-block mb-3'>
                <i className='fas fa-plus mr-1' />
                Buat Memo
              </button>
              <div className='card'>
                <div className='card-body p-0'>
                  <ul className='nav nav-pills flex-column'>
                    <li
                      style={{
                        backgroundColor:
                          activeTab === "persetujuan" ? "#87BD3D" : "white",
                      }}
                      className='nav-item'>
                      <Link to='/memo/pengajuan' className='nav-link '>
                        <i className='fas fa-inbox' /> Persetujuan
                      </Link>
                    </li>
                    <li
                      style={{
                        backgroundColor:
                          activeTab === "berbintang" ? "#87BD3D" : "white",
                      }}
                      className='nav-item'>
                      <Link to='/memo/berbintang' className='nav-link '>
                        <i className='fas fa-star' /> Berbintang
                      </Link>
                    </li>
                    <li
                      style={{
                        backgroundColor:
                          activeTab === "disetujui" ? "#87BD3D" : "white",
                      }}
                      className='nav-item'>
                      <Link to='/memo/disetujui' className='nav-link '>
                        <i className='fas fa-inbox' /> Disetujui
                      </Link>
                    </li>

                    <li
                      style={{
                        backgroundColor:
                          activeTab === "arsip" ? "#87BD3D" : "white",
                      }}
                      className='nav-item'>
                      <Link to='/memo/arsip' className='nav-link'>
                        <i className='fas fa-archive' /> Arsip
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <Outlet />
          </div>
        </section>
      </div>
    </>
  );
};

export default AprovalMemo;
