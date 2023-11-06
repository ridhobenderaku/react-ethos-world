import React from "react";

const tabsheader = (props) => {
  return (
    <div className="form-group">
      <div className="row">
        <div className="col-md-3">
          <div className="card card-success">
            <div className="card-header">
              <div className="card-bbs-header">
                <p className="card-title text-center">{props.titleCard1}</p>
              </div>
            </div>
            <div className="card-body">
              <p className="text-center">77,55 M</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card card-success">
            <div className="card-header">
              <div className="card-bbs-header">
                <p className="card-title text-center">{props.titleCard2}</p>
              </div>
            </div>
            <div className="card-body">
              <p className="text-center">7 M</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card card-success">
            <div className="card-header">
              <div className="card-bbs-header">
                <p className="card-title text-center">{props.titleCard3}</p>
              </div>
            </div>
            <div className="card-body">
              <p className="text-center"> (+) 3,6 M</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card card-success">
            <div className="card-header">
              <div className="card-bbs-header">
                <p className="card-title text-center">{props.titleCard4}</p>
              </div>
            </div>
            <div className="card-body">
              <p className="text-center"> - 13,08 M</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default tabsheader;
