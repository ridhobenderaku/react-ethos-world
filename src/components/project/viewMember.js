import React from "react";

export default function ViewMember({
  imgUrl,
  name,
  title,
  styles,
  styleContent,
}) {
  return (
    <div style={{ gap: "5px" }} className={styles}>
      <img
        alt='Avatar'
        className='table-avatar'
        width={36}
        height={36}
        src='https://adminlte.io/themes/v3/dist/img/avatar.png'
      />
      <div className={styleContent}>
        <p className='p-0 m-0'>{name}</p>
        <p className='p-0 m-0'>{title}</p>
      </div>
    </div>
  );
}
