import React from "react";

export default function HeaderAktifitas(props) {
  return (
    <>
      <div className="row" onClick={props.onClick}>
        <div className="col-md-10">
          <div className="form-group">
            <input
              className="form-control"
              placeholder="Tambah aktifitas"
              readOnly
            />
          </div>
        </div>
        <div className="col-md-2">
          <div className="form-group">
            <button className="btn btn-default btn-file w-100">
              <i className="fas fa-paperclip"></i> Attachment
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
