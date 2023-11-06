import React from "react";
import { useState } from "react";
export default function BuatAgenda({
  onChangeColor,
  onChangeNama,
  onSubmit,
  disabled,
}) {
  const [selectedColor, setselectedColor] = useState("#619A3F");
  return (
    <>
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Buat Template</h3>
        </div>
        <div className="card-body">
          <div className="btn-group">
            <ul className="fc-color-picker" id="color-chooser">
              <li>
                <button
                  style={{
                    backgroundColor: "#619A3F",
                    border:
                      selectedColor === "#619A3F" ? "solid #C2C2C2 " : "none",
                  }}
                  className="btn p-3"
                  onClick={(e) => {
                    e.preventDefault();
                    setselectedColor("#619A3F");
                    onChangeColor("#619A3F");
                  }}
                ></button>
              </li>
              <li>
                <button
                  style={{
                    backgroundColor: "#87BD3D",
                    border:
                      selectedColor === "#87BD3D" ? "solid #C2C2C2 " : "none",
                  }}
                  className="btn p-3"
                  onClick={(e) => {
                    e.preventDefault();
                    setselectedColor("#87BD3D");
                    onChangeColor("#87BD3D");
                  }}
                ></button>
              </li>
              <li>
                <button
                  style={{
                    backgroundColor: "#ffc107",
                    border:
                      selectedColor === "#ffc107" ? "solid #C2C2C2 " : "none",
                  }}
                  className="btn p-3"
                  onClick={(e) => {
                    e.preventDefault();
                    setselectedColor("#ffc107");
                    onChangeColor("#ffc107");
                  }}
                ></button>
              </li>
              <li>
                <button
                  style={{
                    backgroundColor: "#FF9E1D",
                    border:
                      selectedColor === "#FF9E1D" ? "solid #C2C2C2 " : "none",
                  }}
                  className="btn p-3"
                  onClick={(e) => {
                    e.preventDefault();
                    setselectedColor("#FF9E1D");
                    onChangeColor("#FF9E1D");
                  }}
                ></button>
              </li>
              <li>
                <button
                  style={{
                    backgroundColor: "#06AAFF",
                    border:
                      selectedColor === "#06AAFF" ? "solid #C2C2C2 " : "none",
                  }}
                  className="btn p-3"
                  onClick={(e) => {
                    e.preventDefault();
                    setselectedColor("#06AAFF");
                    onChangeColor("#06AAFF");
                  }}
                ></button>
              </li>
            </ul>
          </div>

          <div className="input-group mt-2">
            <input
              id="new-event"
              type="text"
              maxLength={50}
              className="form-control"
              placeholder="Nama Agenda..."
              onChange={onChangeNama}
            />
            <div className="input-group-append">
              <button
                id="add-new-event"
                type="button"
                className="btn btn-primary"
                onClick={onSubmit}
                disabled={disabled}
              >
                <i className="fas fa-plus" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
