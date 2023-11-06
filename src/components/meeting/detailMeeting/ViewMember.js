import React from "react";

export function ViewMember({ imgUrl, name, title }) {
  return (
    <div
      style={{ gap: "5px" }}
      className='col col-12 col-md-6 d-flex align-items-center mt-3'>
      <img
        alt='Avatar'
        className='table-avatar'
        width={36}
        height={36}
        src='https://adminlte.io/themes/v3/dist/img/avatar.png'
      />
      <div className='col d-flex flex-column p-0 m-0 '>
        <p className='p-0 m-0'>{name}</p>
        <p className='p-0 m-0'>{title}</p>
      </div>
    </div>
  );
}
