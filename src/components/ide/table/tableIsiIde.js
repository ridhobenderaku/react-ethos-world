import React, { useState, useEffect } from "react";

import CheckBox from "../../table/checkbox";
import { convertToDateTimeWithName } from "../../../utils/dateConversion";

export function Member({ url, nama }) {
  return (
    <div className='d-flex align-items-center'>
      <img
        alt='Avatar'
        className='table-avatar'
        width={20}
        height={20}
        src='https://adminlte.io/themes/v3/dist/img/avatar.png'
      />
      <p className='m-0'>{nama}</p>
    </div>
  );
}

function TableIsiIde({
  user,
  type,
  data,
  handleDetail,
  handleCheckboxChange,
  handleIdeBerbintang,
  handleBerbagiIde,
  handleSalinIde,
  isAllChecked,
  index,
  resetCheck,
}) {
  const [isBerbintang, setIsBerbintang] = useState(false);
  const isAuthor = () => {
    if (data && data.pemilik && user.fullname === data.pemilik[0].nama)
      return true;
    else return false;
  };
  const checkboxField = () => {
    if (isAuthor())
      return (
        <td className='checkbox'>
          <div>
            <CheckBox
              id={data.idnyaide}
              onChange={handleCheckboxChange}
              index={index}
              checkedAll={isAllChecked}
              resetCheck={resetCheck}
            />
          </div>

          <label htmlFor='check1' />
        </td>
      );
    else
      return (
        <td className='default'>
          <i className={`fas fa-star`} />
        </td>
      );
  };

  const commentField = () => {
    if (type !== "ruangIde" && data.tim && data.tim.length > 0)
      return (
        <td className='comment'>
          <i
            count={
              data.komentar
                ? data.komentar.length > 99
                  ? "99+"
                  : data.komentar.length
                : 0
            }
            className='fas fa-comment-alt'
          />
        </td>
      );
    else return <td className='default'></td>;
  };
  const authorField = () => {
    if (type !== "berbintang") {
      if (data.pemilik) {
        return <td className='nama text-truncate'>{data.pemilik[0].nama}</td>;
      }
    } else if (
      type === "berbintang" &&
      data.pemilik &&
      data.pemilik[0].id === user.id
    )
      return <td className='nama text-truncate'>{data.pemilik[0].nama}</td>;

    return null;
  };

  const titleField = () => {
    return (
      <td className='judul'>
        <p className='nama text-truncate ' href='#'>
          {data.judul}
        </p>
      </td>
    );
  };
  const descriptionField = () => {
    return (
      <td className=' description text-truncate '>
        <div
          className='text-truncate '
          dangerouslySetInnerHTML={{
            __html: data.isinya,
          }}
        />
      </td>
    );
  };
  useEffect(() => {
    let validasiBintang = false;
    if (data && data.berbintang) {
      data.berbintang.forEach((element) => {
        if (Number(element.id) === user.id) validasiBintang = true;
      });
    }
    if (type === "berbintang") validasiBintang = true;
    setIsBerbintang(validasiBintang);
  }, [data]);
  return (
    <tr
      onClick={(e) => {
        e.preventDefault();
        handleDetail(data.idnyaide);
      }}
      className='bg-light table-ide content-hover'>
      {checkboxField()}
      {handleIdeBerbintang && (
        <td className='star'>
          <i
            className={`fas fa-star ${isBerbintang ? "text-warning" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleIdeBerbintang(isBerbintang, data.idnyaide);
              setIsBerbintang(!isBerbintang);
            }}
          />
        </td>
      )}
      {handleBerbagiIde && (
        <td className='share'>
          <i
            data-toggle='modal'
            data-target='#bagikanIdeModal'
            onClick={handleBerbagiIde(data)}
            className='fas fa-user-plus'
          />
        </td>
      )}
      {handleSalinIde && (
        <td className='forward'>
          <i onClick={handleSalinIde} className='fas fa-paperclip' />
        </td>
      )}
      {titleField()}
      {descriptionField()}
      {authorField()}
      {commentField()}
      <td style={{ whiteSpace: "nowrap" }} className='date'>
        {convertToDateTimeWithName(new Date(data.tgl))}
      </td>
    </tr>
  );
}

export default TableIsiIde;
