import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

import "../../components/pesan/table/tablePesan.css";

const Index = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("kontakMasuk");

  const handleChangeTab = (tab) => (e) => {
    e.preventDefault();
    setActiveTab(tab);
  };

  useEffect(() => {
    if (location.pathname.includes("/pesan/kontakmasuk"))
      setActiveTab("kontakmasuk");
    else if (location.pathname.includes("/pesan/berbintang"))
      setActiveTab("berbintang");
    else if (location.pathname.includes("/pesan/terkirim"))
      setActiveTab("terkirim");
    else if (location.pathname.includes("/pesan/draft")) setActiveTab("draft");
    else if (location.pathname.includes("/pesan/arsip")) setActiveTab("arsip");
    else if (location.pathname.includes("/pesan/sampah"))
      setActiveTab("sampah");
  }, [location.pathname]);

  return (
    <>
      <div className='content-wrapper'>
        <section className='content-header'>
          <div className='container-fluid'>
            <div className='row mb-2'>
              <div className='col-sm-6'>
                <h1 className='nama'>Ruang Pesan</h1>
              </div>
            </div>
          </div>
        </section>

        <section className='content'>
          <div className='row'>
            <div className='col-md-3'>
              <Link
                to='/pesan/buatpesan'
                className='btn btn-primary btn-block mb-3'>
                <i className='fas fa-plus mr-1' />
                Buat Pesan
              </Link>
              <div className='card'>
                <div className='card-body p-0'>
                  <ul className='nav nav-pills flex-column'>
                    <li
                      style={{
                        backgroundColor:
                          activeTab === "kontakmasuk" ? "#87BD3D" : "white",
                      }}
                      className='nav-item'
                      onClick={handleChangeTab("kontakmasuk")}>
                      <Link to='/pesan/kontakmasuk' className='nav-link '>
                        <i className='fas fa-inbox' /> Kotak Masuk
                      </Link>
                    </li>

                    <li
                      style={{
                        backgroundColor:
                          activeTab === "berbintang" ? "#87BD3D" : "white",
                      }}
                      className='nav-item'
                      onClick={handleChangeTab("berbintang")}>
                      <Link to='/pesan/berbintang' className='nav-link '>
                        <i className='fas fa-star' /> Berbintang
                      </Link>
                    </li>
                    <li
                      style={{
                        backgroundColor:
                          activeTab === "terkirim" ? "#87BD3D" : "white",
                      }}
                      className='nav-item'
                      onClick={handleChangeTab("terkirim")}>
                      <Link to='/pesan/terkirim' className='nav-link'>
                        <i className='fas fa-paper-plane' /> Terkirim
                      </Link>
                    </li>
                    <li
                      style={{
                        backgroundColor:
                          activeTab === "draft" ? "#87BD3D" : "white",
                      }}
                      className='nav-item'
                      onClick={handleChangeTab("draft")}>
                      <Link to='/pesan/draft' className='nav-link'>
                        <i className='fas fa-file-alt' /> Draft
                      </Link>
                    </li>
                    <li
                      style={{
                        backgroundColor:
                          activeTab === "arsip" ? "#87BD3D" : "white",
                      }}
                      className='nav-item'
                      onClick={handleChangeTab("arsip")}>
                      <Link to='/pesan/arsip' className='nav-link'>
                        <i className='fas fa-archive' /> Arsip
                      </Link>
                    </li>
                    <li
                      style={{
                        backgroundColor:
                          activeTab === "sampah" ? "#87BD3D" : "white",
                      }}
                      className='nav-item'
                      onClick={handleChangeTab("sampah")}>
                      <Link to='/pesan/sampah' className='nav-link'>
                        <i className='fas fa-trash-alt' /> Sampah
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

export default Index;
