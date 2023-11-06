import React from "react";

export default function ProgesBar({ value }) {
  return (
    <>
      <div className="progress rounded">
        <div
          className="progress-bar rounded"
          style={{
            width: value + "%",
            backgroundColor: "#87BD3D",
          }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={100}
        ></div>
      </div>
      <p className="nama">{`${value} % Selesai`}</p>
    </>
  );
}
