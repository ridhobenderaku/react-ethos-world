import React from "react";

function ImagePreview({ url, id, handleDeleteImage, namaFile }) {
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
    <li className=' d-flex flex-column btn btn-default p-1 text-left' key={id}>
      <div
        className='align-self-end'
        style={{ fontSize: "25px", cursor: "pointer" }}>
        <i onClick={handleDeleteImage(id)} className='fas fa-window-close'></i>
      </div>

      <div
        style={{ gap: "0.5rem", width: "200px" }}
        className='d-flex align-items-baseline mt-1'>
        <a
          target='_blank'
          download={true}
          rel='noreferrer'
          href={process.env.REACT_APP_API_PROD_GSTORAGE + url}
          style={{ overflowWrap: "break-word", width: "70%", color: "#000000" }}
          className='m-0'>
          {namaFile}
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

function DokumenPreview({ url }) {
  return (
    <li>
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

export default function ItemPreview({ data, handleDeleteImage }) {
  return (
    <div className='card-footer bg-white p-0 '>
      <ul style={{ gap: "1rem" }} className='row d-flex m-0 p-0'>
        {data &&
          data.map((data, idx) => (
            <ImagePreview
              key={idx}
              id={idx}
              url={data.link}
              namaFile={data.namafile}
              handleDeleteImage={handleDeleteImage}
            />
          ))}
      </ul>
    </div>
  );
}
