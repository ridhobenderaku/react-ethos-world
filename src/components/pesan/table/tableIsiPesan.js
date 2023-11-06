import React, { useState, useEffect } from "react";
import CheckBox from "../../table/checkbox";
import { convertToDateTimeWithName } from "../../../utils/dateConversion";

function TableIsiPesan({
  user,
  data,
  handleCheckboxChange,
  isAllChecked,
  handleDetail,
  handlePesanBerbintang,
  type,
  index,
  resetCheck,
}) {
  const [berbintang, setBerbintang] = useState(false);

  const isKontakMasuk = (data) => {
    let validasi = false;
    if (Number(data.pemilik[0].id) === user.id) validasi = false;
    else if (data && data.kepada) {
      data.kepada.forEach((element) => {
        if (Number(element.id) === user.id) {
          if (element.read === "false") validasi = true;
        }
      });
    }

    return validasi;
  };
  const penerimaField = () => {
    if (type === "terkirim" || type === "draft")
      return (
        <td className='pengirim  '>
          <div className='d-flex w-100'>
            <p className=' text-truncate'>
              {data.kepada.length > 0
                ? data.kepada[0].username
                : "(belum ada penerima)"}
            </p>
            {data.kepada.length > 1 && (
              <span className=' text-left '>{data.kepada.length}</span>
            )}
          </div>
        </td>
      );
  };
  const pengirimField = () => {
    if (type !== "terkirim" && type !== "draft")
      return (
        <td className='pengirim text-nowrap text-truncate'>
          {data.pemilik[0].nama}
        </td>
      );
  };
  useEffect(() => {
    if (data && data.berbintang)
      data.berbintang.forEach((element) => {
        if (Number(element.id) === user.id) setBerbintang(true);
      });
  }, [data]);

  return (
    <tr
      onClick={() => handleDetail(data.idpesan)}
      className={`table-pesan content-hover ${
        !isKontakMasuk(data) ||
        type === "draft" ||
        type === "arsip" ||
        type === "sampah" ||
        type === "terkirim"
          ? "bg-pesan-dark"
          : "bg-light"
      }`}>
      <td className='checkbox'>
        <CheckBox
          id={data.idpesan}
          index={index}
          onChange={handleCheckboxChange}
          checkedAll={isAllChecked}
          resetCheck={resetCheck}
        />
      </td>
      {handlePesanBerbintang && (
        <td className='star'>
          <i
            className={`fas fa-star ${
              berbintang || type === "berbintang" ? "text-warning" : ""
            }`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setBerbintang(!berbintang);
              type !== "berbintang"
                ? handlePesanBerbintang(index, data.idpesan, berbintang)
                : handlePesanBerbintang(
                    index,
                    data.idpesan,
                    data.idpengirim,
                    data.idkepada
                  );
            }}
          />
        </td>
      )}
      {penerimaField()}
      {pengirimField()}

      <td className='subject text-nowrap text-truncate '>
        <b className='text-truncate'>
          {data.subjek ? data.subjek : "(belum ada subjek)"}
        </b>
      </td>

      <td className='isi text-nowrap'>
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
      <td className='date text-nowrap'>
        {convertToDateTimeWithName(new Date(data.tgl))}
      </td>
    </tr>
  );
}

export default TableIsiPesan;
