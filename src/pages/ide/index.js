import React from "react";
import { Link, Outlet } from "react-router-dom";
import SidebarIde from "../../components/ide/sidebarIde";
import "../../components/ide/table/tableIde.css";

function Index() {
  return (
    <>
      <div className='content-wrapper'>
        <section className='content-header'>
          <div className='container-fluid'>
            <div className='row mb-2'>
              <div className='col-sm-6'>
                <h1 className='nama'>Ruang Ide</h1>
              </div>
            </div>
          </div>
        </section>
        <section className='content'>
          <div className='row'>
            <div className='col-md-3'>
              <Link
                to='/Ide/buatide'
                className='btn btn-primary btn-block mb-3'>
                <i className='fas fa-plus mr-1' />
                Buat Ide
              </Link>

              <SidebarIde />
            </div>
            <Outlet />
          </div>
        </section>
      </div>
    </>
  );
}

export default Index;
