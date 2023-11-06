import React, { useEffect, useState } from "react";

import CheckBox from "../../table/checkbox";
import { convertToDateTimeWithName } from "../../../utils/dateConversion";

function TableIsiMemo({
  data,
  activeTab,
  index,
  handleDetail,
  handleCheckboxChange,
  handleMemoBerbintang,
  isAllChecked,
  resetCheck,
}) {
  const [berbintang, setBerbintang] = useState(data.berbintang);
  useEffect(() => {
    setBerbintang(data.berbintang);
  }, [data]);

  const checkboxField = () => {
    if (activeTab === "Sampah" || activeTab === "Draft") {
      return (
        <td className='checkbox'>
          <div>
            <CheckBox
              resetCheck={resetCheck}
              id={data.idmemo}
              index={index}
              onChange={handleCheckboxChange}
              checkedAll={isAllChecked}
            />
            <label htmlFor='check1' />
          </div>
        </td>
      );
    } else return null;
  };

  const starField = () => {
    if (data.sts.draft !== "true" && handleMemoBerbintang)
      return (
        <td className='star'>
          <i
            className={`fas fa-star ${berbintang === 1 ? "text-warning" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setBerbintang(berbintang === 1 ? 0 : 1);
              handleMemoBerbintang(
                index,
                berbintang,
                data.idmemo,
                data.nomordok
              );
            }}
          />
        </td>
      );
    else if (activeTab === "Semua")
      return (
        <td className='default'>
          <i className={`fas fa-star`} />
        </td>
      );
  };
  const statusField = () => {
    if (activeTab !== "kontakmasuk" && activeTab !== "Sampah")
      return (
        <td className='status'>
          <span
            className='d-block text-white text-center p-2  text-nowrap rounded'
            style={{
              fontSize: "16px",

              backgroundColor:
                activeTab === "arsipAproval"
                  ? "rgb(186, 186, 186)"
                  : data.sts.disetujui !== undefined
                  ? "#87BD3D"
                  : data.sts.revisi === "true"
                  ? "#FE5050"
                  : data.sts.diajukan === "true"
                  ? "#D9E021"
                  : "#BABABA",
            }}>
            {activeTab === "arsipAproval"
              ? "Arsip"
              : data.bagikan !== undefined
              ? "Dikirim"
              : data.sts.disetujui !== undefined
              ? "Disetujui"
              : data.sts.revisi === "true"
              ? "Revisi"
              : data.sts.draft === "true"
              ? "draft"
              : "Diajukan"}
          </span>
        </td>
      );
    else return null;
  };

  const authorField = () => {
    if (
      activeTab === "kontakmasuk" ||
      activeTab === "persetujuan" ||
      activeTab === "berbintangAproval" ||
      activeTab === "arsipAproval"
    )
      return (
        <td className=' text-nowrap author'>
          <h2 className='text-truncate'>{data.namapembuat}</h2>
        </td>
      );
  };
  const aprovalField = () => {
    if (
      activeTab !== "kontakmasuk" &&
      activeTab !== "persetujuan" &&
      activeTab !== "berbintangAproval" &&
      activeTab !== "arsipAproval"
    )
      return (
        <td className='mailbox-name nama  text-nowrap aproval'>
          <div className='d-flex min-tim'>
            {data.setuju.length > 2 ? (
              <>
                <h2 className='text-truncate'>
                  {data.setuju[0].label},{data.setuju[1].label}
                </h2>
                <p style={{ marginTop: "-5px" }}>{data.setuju.length}</p>
              </>
            ) : (
              <div className='d-flex pl-2 max-tim '>
                {data.setuju.map((name, idx) => (
                  <h2 key={idx}>
                    {name.label}
                    {data.setuju.length - 1 !== idx && ", "}
                  </h2>
                ))}
                {data.setuju.length === 0 && <h2>(belum ada penyetuju)</h2>}
              </div>
            )}
          </div>
        </td>
      );
  };
  return (
    <tr
      onClick={(e) => {
        e.preventDefault();
        handleDetail(data.idmemo);
      }}
      className={`table-memo content-hover ${
        data.baca === "true" ? "bg-light" : ""
      } `}>
      {checkboxField()}
      {starField()}
      {statusField()}
      {aprovalField()}
      {authorField()}
      <td className='text-nowrap perihal'>
        <p className='text-truncate'>
          {data.perihal ? data.perihal : "(belum ada perihal)"}
        </p>
      </td>
      <td className='text-nowrap isi '>
        {data.isi ? (
          <div
            className='text-truncate'
            dangerouslySetInnerHTML={{
              __html: data.isi,
            }}
          />
        ) : (
          <p className='text-truncate'>(belum ada isi)</p>
        )}
      </td>
      <td className='text-nowrap date'>
        {convertToDateTimeWithName(new Date(data.tgldibagikan))}
      </td>
    </tr>
  );
}

export default TableIsiMemo;
