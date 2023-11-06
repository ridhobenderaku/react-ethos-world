import React, { useState } from "react";
import Lampiran from "../../lampiran";
import { convertToDateTimeWithName } from "../../../utils/dateConversion";

export default function ReplyMessageCard({
  pengirim,
  tgl,
  isi,
  file,
  kepada,
  footer,
  isUser,
  berbintang,
}) {
  const [showAll, setshowAll] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setshowAll(!showAll);
  };
  return (
    <div
      style={{ cursor: "pointer" }}
      onClick={handleClick}
      className={`card ${isUser ? "bg-pesan-dark" : ""}`}
      name={pengirim}>
      <div style={{ gap: "1rem" }} className='d-flex align-items-center p-3'>
        <img
          alt='Avatar'
          className='table-avatar'
          width={36}
          height={36}
          src='https://adminlte.io/themes/v3/dist/img/avatar.png'
        />
        <div className='d-flex flex-column justify-content-center'>
          <div style={{ gap: "1rem" }} className='d-flex '>
            <h5 className='m-0'>{pengirim}</h5>
            <p className='m-0 mb-0'>
              {convertToDateTimeWithName(new Date(tgl))}
            </p>
          </div>
          {!showAll && !footer ? (
            <div
              className='text-max-25'
              dangerouslySetInnerHTML={{ __html: isi }}
            />
          ) : (
            <p>{`kepada ${kepada.map((item) => " " + item.username)}`}</p>
          )}
        </div>
        {/* 
        <i
          className={`fas fa-star text-sm ml-auto ${
            berbintang === 1 ? "text-warning" : ""
          }`}
        /> */}
      </div>
      {showAll && !footer && (
        <div className='d-flex flex-column p-3'>
          <div dangerouslySetInnerHTML={{ __html: isi }} />
          <Lampiran style={isUser ? "bg-pesan-dark" : ""} data={file} />
        </div>
      )}
      {footer && (
        <div className='d-flex flex-column p-3 '>
          <div dangerouslySetInnerHTML={{ __html: isi }} />
          <Lampiran style={isUser ? "bg-pesan-dark" : ""} data={file} />
          {footer}
        </div>
      )}
    </div>
  );
}
