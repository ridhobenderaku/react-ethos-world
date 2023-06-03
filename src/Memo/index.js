import React from "react";
import DataMemo from "./DataMemo";
const index = () => {
  return (
    <>
      {/* Content Wrapper. Contains page content */}
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Memo</h1>
              </div>
            </div>
          </div>
          {/* /.container-fluid */}
        </section>
        {/* Main content */}
        <section className="content">
          <div className="row">
            <div className="col-md-3">
              <a href="compose.html" className="btn btn-primary btn-block mb-3">
                Buat Memo
              </a>
              <div className="card">
                <div className="card-header-green p-1">
                  {/* <i className="fas fa-inbox" /> Pengajuan */}
                  <ul className="nav nav-pills2 flex-column">
                    <li className="nav-item active">
                      <a href="#" className="nav-link">
                        <i className="fas fa-inbox" /> Pengajuan
                        <span className="badge bg-primary float-right">12</span>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="card-body p-0">
                  <ul className="nav nav-pills flex-column">
                    <li className="nav-item active">
                      <a href="#" className="nav-link">
                        <i className="fas fa-inbox" /> Kontak Masuk
                        <span className="badge bg-primary float-right">12</span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="#" className="nav-link">
                        <i className="far fa-star" /> Berbintang
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="#" className="nav-link">
                        <i className="far fa-envelope" /> Terkirim
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="#" className="nav-link">
                        <i className="far fa-file-alt" /> Arsip
                      </a>
                    </li>
                    {/* <li className="nav-item">
                <a href="#" className="nav-link">
                  <i className="fas fa-filter" /> Arsip
                  <span className="badge bg-warning float-right">65</span>
                </a>
              </li> */}
                    <li className="nav-item">
                      <a href="#" className="nav-link">
                        <i className="far fa-trash-alt" /> Sampah
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* /.col */}
            <div className="col-md-9">
              <div className="card card-outline-tabs">
                <div className="card-header">
                  {/* <h3 className="card-title">Pengajuan</h3> */}
                  <ul
                    className="nav nav-tabs"
                    id="custom-tabs-four-tab"
                    role="tablist">
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        id="custom-tabs-four-tf-tab"
                        data-toggle="pill"
                        href="#custom-tabs-four-tf"
                        role="tab"
                        aria-controls="custom-tabs-four-tf"
                        aria-selected="true">
                        {" "}
                        <i className="fas fa-inbox" /> Pengajuan
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        id="custom-tabs-four-tf-tab"
                        data-toggle="pill"
                        href="#custom-tabs-four-tf"
                        role="tab"
                        aria-controls="custom-tabs-four-tf"
                        aria-selected="true">
                        Semua
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        id="custom-tabs-four-manual-tab"
                        data-toggle="pill"
                        href="#custom-tabs-four-manual"
                        role="tab"
                        aria-controls="custom-tabs-four-manual"
                        aria-selected="false">
                        Draft
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        id="custom-tabs-four-manual-tab"
                        data-toggle="pill"
                        href="#custom-tabs-four-manual"
                        role="tab"
                        aria-controls="custom-tabs-four-manual"
                        aria-selected="false">
                        Pending
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        id="custom-tabs-four-manual-tab"
                        data-toggle="pill"
                        href="#custom-tabs-four-manual"
                        role="tab"
                        aria-controls="custom-tabs-four-manual"
                        aria-selected="false">
                        Revisi
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        id="custom-tabs-four-manual-tab"
                        data-toggle="pill"
                        href="#custom-tabs-four-manual"
                        role="tab"
                        aria-controls="custom-tabs-four-manual"
                        aria-selected="false">
                        Disetujui
                      </a>
                    </li>

                    <div className="card-tools">
                      <div className="input-group input-group-sm">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search Mail"
                        />
                        <div className="input-group-append">
                          <div className="btn btn-primary">
                            <i className="fas fa-search" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </ul>
                  {/* /.card-tools */}
                </div>

                {/* <div className="tab-content" id="custom-tabs-four-tabContent">
            <div className="tab-pane fade show active" id="custom-tabs-four-tf" role="tabpanel"
                aria-labelledby="custom-tabs-four-tf-tab"> */}
                {/* /.card-header
                  <div className="tab-pane fade" id="custom-tabs-four-manual" role="tabpanel"
                aria-labelledby="custom-tabs-four-manual-tab"> */}

                <div className="card-body p-0">
                  <div className="mailbox-controls">
                    {/* Check all button */}
                    <button
                      type="button"
                      className="btn btn-default btn-sm checkbox-toggle">
                      <i className="far fa-square" />
                    </button>
                    <div className="btn-group">
                      <button type="button" className="btn btn-default btn-sm">
                        <i className="far fa-trash-alt" />
                      </button>
                      <button type="button" className="btn btn-default btn-sm">
                        <i className="fas fa-reply" />
                      </button>
                      <button type="button" className="btn btn-default btn-sm">
                        <i className="fas fa-share" />
                      </button>
                    </div>
                    {/* /.btn-group */}
                    <button type="button" className="btn btn-default btn-sm">
                      <i className="fas fa-sync-alt" />
                    </button>
                    <div className="float-right">
                      1-50/200
                      <div className="btn-group">
                        <button
                          type="button"
                          className="btn btn-default btn-sm">
                          <i className="fas fa-chevron-left" />
                        </button>
                        <button
                          type="button"
                          className="btn btn-default btn-sm">
                          <i className="fas fa-chevron-right" />
                        </button>
                      </div>
                      {/* /.btn-group */}
                    </div>
                    {/* /.float-right */}
                  </div>
                  <div className="table-responsive mailbox-messages">
                    <table className="table table-hover table-striped">
                      <tbody>
                        {DataMemo.map((DataMemo, idx) => (
                          <tr key={idx} >
                            <td>
                              <div className="icheck-primary">
                                <input
                                  type="checkbox"
                                  defaultValue
                                  id="check1"
                                />
                                <label htmlFor="check1" />
                              </div>
                            </td>
                            <td className="mailbox-star">
                              <a href="#">
                                <i className="fas fa-star text-warning" />
                              </a>
                            </td>
                            <td className="mailbox-name">
                              <a href="read-mail.html">{DataMemo.nama}</a>
                            </td>
                            <td className="mailbox-subject">
                              <b>{DataMemo.nama}</b> - {DataMemo.isipesan}
                            </td>
                            <td className="mailbox-attachment" />
                            <td className="mailbox-date">{DataMemo.time}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {/* /.table */}
                  </div>
                  {/* /.mail-box-messages */}
                </div>

                {/* /.card-body */}
                <div className="card-footer p-0">
                  <div className="mailbox-controls">
                    {/* Check all button */}
                    <button
                      type="button"
                      className="btn btn-default btn-sm checkbox-toggle">
                      <i className="far fa-square" />
                    </button>
                    <div className="btn-group">
                      <button type="button" className="btn btn-default btn-sm">
                        <i className="far fa-trash-alt" />
                      </button>
                      <button type="button" className="btn btn-default btn-sm">
                        <i className="fas fa-reply" />
                      </button>
                      <button type="button" className="btn btn-default btn-sm">
                        <i className="fas fa-share" />
                      </button>
                    </div>
                    {/* /.btn-group */}
                    <button type="button" className="btn btn-default btn-sm">
                      <i className="fas fa-sync-alt" />
                    </button>
                    <div className="float-right">
                      1-50/200
                      <div className="btn-group">
                        <button
                          type="button"
                          className="btn btn-default btn-sm">
                          <i className="fas fa-chevron-left" />
                        </button>
                        <button
                          type="button"
                          className="btn btn-default btn-sm">
                          <i className="fas fa-chevron-right" />
                        </button>
                      </div>
                      {/* /.btn-group */}
                    </div>
                    {/* /.float-right */}
                  </div>
                </div>
              </div>
              {/* /.card */}
            </div>
            {/* /.col */}
          </div>
          {/* /.row */}
          {/* </div> */}
        </section>
        {/* /.content */}
      </div>
    </>
  );
};

export default index;
