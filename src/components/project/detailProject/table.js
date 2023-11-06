import React from "react";

export default function Table({ Header, Content, Footer }) {
  return (
    <div className='card card-success card-outline card-outline-tabs'>
      {Header}
      <div className='card-body p-0'>{Content}</div>
      <div className='card-footer p-0'>{Footer}</div>
    </div>
  );
}
