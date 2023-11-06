import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";

function Index() {
  return (
    <>
      <div className="content-wrapper">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row ">
              <div className="col-md-4">
                <Link to="">
                  <div className="card card-bbs-green">
                    <div
                      style={{ color: "#FFFFFF" }}
                      className="card-body text-center"
                    >
                      Directorate Commers & Business Development
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col-md-4">
                <Link to="">
                  <div className="card card-bbs-success">
                    <div
                      style={{ color: "#FFFFFF" }}
                      className="card-body text-center"
                    >
                      Directorate F/A Tax & Strategic Support
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col-md-4">
                <Link to="">
                  <div className="card card-bbs-yellow">
                    <div
                      style={{ color: "#414141" }}
                      className="card-body text-center"
                    >
                      Direktorat Operation
                    </div>
                  </div>
                </Link>
              </div>
            </div>
            <div className="row ">
              <div className="col-md-4">
                <Link to="">
                  <div className="card card-bbs-orange">
                    <div
                      style={{ color: "#FFFFFF" }}
                      className="card-body text-center"
                    >
                      Direktorat General Support
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col-md-4">
                <Link to="">
                  <div className="card card-bbs-blue">
                    <div
                      style={{ color: "#FFFFFF" }}
                      className="card-body text-center"
                    >
                      Direktorat Teknologi
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Index;
