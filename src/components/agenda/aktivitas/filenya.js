import React from "react";

function ImageLampiran({ url, id, nama }) {
  const handleDownload = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const link = document.createElement("a");
    link.setAttribute("target", "_blank");
    link.setAttribute("download", true);
    link.href = process.env.REACT_APP_API_PROD_GSTORAGE + url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <li className='col-5 col-sm-12' key={id}>
      <img
        className='w-100'
        src={process.env.REACT_APP_API_PROD_GSTORAGE + url}
        alt='lampiran'
      />
      <div className='mailbox-attachment-info'>
        <a href='#' className='mailbox-attachment-name'>
          <i className='fas fa-camera'></i> {nama}
        </a>
        <span
          onClick={handleDownload}
          className='mailbox-attachment-size clearfix mt-1 btn btn-default btn-sm float-right'>
          <i className='fas fa-cloud-download-alt'></i>
        </span>
      </div>
    </li>
  );
}

function DokumenLampiran({ url }) {
  return (
    <li className='col-5 col-sm-3'>
      <span className='mailbox-attachment-icon'>
        <i className='far fa-file-pdf'></i>
      </span>
      <div className='mailbox-attachment-info'>
        <a href='#' className='mailbox-attachment-name'>
          <i className='fas fa-paperclip'></i> {url}
        </a>
        <span className='mailbox-attachment-size clearfix mt-1'>
          <span>1,245 KB</span>
          <a href='#' className='btn btn-default btn-sm float-right'>
            <i className='fas fa-cloud-download-alt'></i>
          </a>
        </span>
      </div>
    </li>
  );
}

export default function Filenya({ data, style }) {
  return (
    <>
      <div className={`${style ? style : "bg-white"} card-footer  p-0 `}>
        <ul className='mailbox-attachments d-flex align-items-stretch clearfix'>
          {data &&
            data.map((data, idx) => (
              <ImageLampiran
                key={idx}
                id={idx}
                url={data.link}
                nama={data.namafile}
              />
            ))}
        </ul>
      </div>
    </>
  );
}
