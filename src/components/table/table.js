import React from "react";
import "./table.css";

export function Table({ Header, Content, Footer, Title }) {
  return (
    <div className='card card-success card-outline card-outline-tabs'>
      {Header}
      <div className='card-body p-0'>
        <div className='tab-content table-responsive'>
          <table
            className='table table-hover table-custom'
            style={{ width: "100%" }}>
            <thead>{Title}</thead>
            <tbody>{Content}</tbody>
          </table>
        </div>
      </div>
      <div className='card-footer p-0'>{Footer}</div>
    </div>
  );
}
