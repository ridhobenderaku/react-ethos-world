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
    <li className='d-flex flex-column btn btn-default p-1 text-left' key={id}>
      <div
        style={{ gap: "0.5rem", width: "200px" }}
        className='d-flex align-items-baseline '>
        <a
          target='_blank'
          download={true}
          rel='noreferrer'
          href={process.env.REACT_APP_API_PROD_GSTORAGE + url}
          style={{ overflowWrap: "break-word", width: "70%", color: "#000000" }}
          className='m-0'>
          {nama}
        </a>
        <span
          style={{ marginLeft: "auto" }}
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

export default function Lampiran({ data, style }) {
  return (
    <>
      <div className=' p-0 '>
        <ul style={{ gap: "1rem" }} className='row d-flex m-0 p-0'>
          {data &&
            data.length > 0 &&
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
