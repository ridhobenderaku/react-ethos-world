import React, { useState } from "react";
import {
  addMemoArsipById,
  addMemoBerbintangById,
  deleteMemoBerbintangById,
  deleteMemoById,
} from "../../../../api/memoApi";
import Lampiran from "../../../lampiran";
import { useNavigate } from "react-router-dom";

export default function TabelDetailMemo({
  user,
  tableRef,
  isKontakMasuk,
  idMemo,
  nama,
  jenis,
  noMemo,
  setuju,
  noDokumen,
  tglEfektif,
  noRevisi,
  berbintang,
  arsip,
  status,
  perihal,
  cc,
  isi,
  pengirim,
  penerima,
  bagikan,
  file,
  footer,
  tglMemo,
  type,
}) {
  const navigate = useNavigate();
  const [isBerbintang, setIsBerbintang] = useState(berbintang);

  const handleSetBerbintang = async () => {
    await addMemoBerbintangById(idMemo, noDokumen);
  };
  const handleDelBerbintang = async () => {
    await deleteMemoBerbintangById(idMemo, noDokumen);
  };

  const handleArsipMemo = async (e) => {
    e.preventDefault();
    const resp = await addMemoArsipById(idMemo);
    if (resp.code === 200) {
      navigate(-1);
    }
  };

  const handleHapusMemo = async (e) => {
    e.preventDefault();
    const resp = await deleteMemoById([idMemo], user.id);
    if (resp && resp.data.code === 200) {
      navigate(-1);
    }
  };
  return (
    <>
      <div ref={tableRef} className='table-responsive mailbox-messages'>
        <table className='table table-bordered' name={nama}>
          <tbody>
            <tr>
              <td className='text-lg text-bold'>{jenis}</td>
              <td
                className='text-xs w-25'
                style={{ color: "rgb(85, 84, 84)", whiteSpace: "nowrap" }}>
                No. Dokumen: {noDokumen}
              </td>
              <td
                className='text-xs w-25'
                style={{ color: "rgb(85, 84, 84)", whiteSpace: "nowrap" }}>
                tgl. Efektif: {new Date(tglEfektif).toLocaleDateString()}
              </td>
              <td
                className='text-xs w-25'
                style={{ color: "rgb(85, 84, 84)", whiteSpace: "nowrap" }}>
                No. Revisi: {noRevisi}
              </td>
              {isKontakMasuk ? (
                <td className='w-25'>
                  <div
                    style={{ gap: "5px" }}
                    className='d-flex flex-column align-items-end'>
                    <div className='text-xs ml-3'>
                      {new Date(tglMemo).toLocaleDateString()}
                    </div>
                    {/* <div
                      style={{ gap: "10px", alignItems: "center" }}
                      className='d-flex'>
                      <i
                        onClick={(e) => {
                          e.preventDefault();
                          if (isBerbintang === true) delBerintangHandler();
                          else setBerintangHandler();
                          setIsBerbintang(!isBerbintang);
                        }}
                        className={`fas fa-star text-sm d-print-none ${
                          isBerbintang === true ? "text-warning" : ""
                        }`}
                        style={{ color: "#D4D4D4", cursor: "pointer" }}
                      />
                      <button
                        onClick={handleArsipMemo}
                        className='btn btn-primary btn-xs text-center d-print-none'>
                        <i className='fas fa-archive' />
                      </button>
                    </div> */}
                  </div>
                </td>
              ) : (
                <td className='w-25'>
                  <div
                    style={{ gap: "5px" }}
                    className='d-flex flex-column align-items-end'>
                    <div className='text-xs ml-3'>
                      {new Date(tglMemo).toLocaleDateString()}
                    </div>
                    <div
                      style={{ gap: "10px", alignItems: "center" }}
                      className='d-flex'>
                      {status !== "dihapus" && arsip === false && (
                        <i
                          onClick={(e) => {
                            e.preventDefault();
                            if (isBerbintang === true) handleDelBerbintang();
                            else handleSetBerbintang();
                            setIsBerbintang(!isBerbintang);
                          }}
                          className={`fas fa-star text-sm d-print-none ${
                            isBerbintang === true ? "text-warning" : ""
                          }`}
                          style={{ color: "#D4D4D4", cursor: "pointer" }}
                        />
                      )}
                      {status === "terkirim" &&
                        arsip === false &&
                        type === "creator" && (
                          <button
                            onClick={handleArsipMemo}
                            className='btn btn-primary btn-xs text-center d-print-none'>
                            <i className='fas fa-archive' />
                          </button>
                        )}
                      {status === "disetujui" && type === "aproval" && (
                        <button
                          onClick={handleArsipMemo}
                          className='btn btn-primary btn-xs text-center d-print-none'>
                          <i className='fas fa-archive' />
                        </button>
                      )}

                      <span
                        className={`badge text-xs ${
                          status === "disetujui" || status === "terkirim"
                            ? "text-white "
                            : ""
                        }`}
                        style={
                          status === "disetujui" || status === "terkirim"
                            ? { backgroundColor: "#87BD3D", color: "#ffffff" }
                            : status === "diajukan"
                            ? { backgroundColor: "#D9E021", color: "#ffffff" }
                            : status === "revisi"
                            ? { backgroundColor: "#FE5050", color: "#ffffff" }
                            : { backgroundColor: "#BABABA", color: "#ffffff" }
                        }>
                        {status}
                      </span>
                    </div>
                  </div>
                </td>
              )}
            </tr>
            <tr>
              <td colSpan={3} className=''>
                <div>
                  <div className='row text-sm text-bold'>
                    <div className='col-3'>Perihal:</div>
                    <div className='col-9'>{perihal}</div>
                  </div>

                  <div
                    className='row text-xs'
                    style={{ color: "rgb(85, 84, 84)" }}>
                    <div className='col-3'>No :</div>
                    <div className='col-9'>{noMemo}</div>
                  </div>
                  <div
                    className='row text-xs'
                    style={{ color: "rgb(85, 84, 84)" }}>
                    <div className='col-3'>Lampiran :</div>
                    <div className='col-9'>{file.length}</div>
                  </div>
                </div>
              </td>
              <td colSpan={3}>
                <div>
                  <div className='row text-sm text-bold'>
                    <div className='col-3'>Dari</div>
                    <div className='col-9'>: {pengirim}</div>
                  </div>
                  <div
                    className='row text-xs'
                    style={{ color: "rgb(85, 84, 84)" }}>
                    <div style={{ whiteSpace: "nowrap" }} className='col-3'>
                      Kepada
                    </div>
                    <div className='col-9'> : {penerima}</div>
                  </div>
                  {/* <div
                    className='row text-xs'
                    style={{ color: "rgb(85, 84, 84)" }}>
                    <div className='col-3'>CC </div>
                    <div className='col-9'>: {cc}</div>
                  </div> */}
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan={5}>
                <div style={{ gap: "1rem" }} className='d-flex flex-column'>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: isi,
                    }}
                  />
                  <div style={{ gap: "2rem" }} className='row'>
                    <div className='col-auto'>
                      <p style={{ marginBottom: "6rem" }}>dibuat</p>
                      <p style={{ minWidth: "150px" }}>{`(${pengirim})`}</p>
                    </div>
                    <div className='col-auto'>
                      <p style={{ marginBottom: "6rem" }}>disetujui</p>

                      <div style={{ gap: "2rem" }} className='row'>
                        {setuju?.map((data, idx) => (
                          <p
                            style={{ minWidth: "150px" }}
                            key={idx}>{`(${data.label})`}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                  <Lampiran data={file} />
                </div>
              </td>
            </tr>
            {footer && (
              <tr>
                <td colSpan={5}>
                  <div>{footer}</div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
