import React, { useEffect, useState, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { ReactContext } from "../../../context/AuthProvider";
import {
  getMemoById,
  pulihkanMemoById,
  removeMemoArsipById,
  setAprovalMemoById,
  setRevisiMemoById,
} from "../../../api/memoApi";
import Card from "../../../components/card/card";
import TabelDetailMemo from "../../../components/memo/detailMemo/table/tabelDetailMemo";
import ActionButton from "../../../components/button/actionButton";

export default function DetailMemoAproval({ type }) {
  const navigate = useNavigate();
  const { user } = useContext(ReactContext);
  const table = useRef(null);
  const [data, setData] = useState(null);
  const { id } = useParams();
  const [isRevision, setIsRevision] = useState(false);
  const [revisi, setRevisi] = useState("");

  const getData = async () => {
    const res = await getMemoById(id, type);
    if (res) {
      setData(res);
    }
  };

  const aprovMemoHandler = async (e) => {
    e.preventDefault();
    await setAprovalMemoById(id);
    navigate(`/memo/pengajuan`);
  };

  const revisiMemoHandler = async (e) => {
    e.preventDefault();
    const resp = await setRevisiMemoById(id, [{ revisi: revisi }]);
    if (resp && resp.code === 200) {
      navigate(`/memo/pengajuan`);
    }
  };

  const handlePrintMemo = (e) => {
    e.preventDefault();
    let cloned = table.current.cloneNode(true);
    document.body.appendChild(cloned);
    cloned.classList.add("printable");
    window.print();
    document.body.removeChild(cloned);
  };

  const handleOnChangeRevisi = (e) => {
    setRevisi(e.target.value);
  };

  const handlePulihkanArsipMemo = async (e) => {
    e.preventDefault();
    const resp = await removeMemoArsipById(id, user.id);
    if (resp && resp.code === 200) {
      navigate(-1);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className='col-md-9'>
        {data && (
          <Card
            name='nama'
            title={
              <>
                <i
                  style={{ cursor: "pointer" }}
                  className='fas fa-arrow-left mr-2 nama'
                  onClick={() => navigate(-1)}
                />
                <i className='far fa-comments nama' />{" "}
                <span className='nama'> Isi Memo</span>
              </>
            }
            body={
              <>
                <TabelDetailMemo
                  user={user}
                  arsip={data.sts.arsip === "true" ? true : false}
                  tableRef={table}
                  type='aproval'
                  idMemo={id}
                  tglEfektif={data.tglefektif}
                  noDokumen={data.nomordok}
                  jenis={data.jenismemo}
                  noRevisi={data.nomorrevisi}
                  perihal={data.perihal}
                  cc={data.cc}
                  tglMemo={data.tglmemo}
                  berbintang={data.berbintang === 1 ? true : false}
                  nama='tabel'
                  bagikan={data.bagikan}
                  penerima={data.penerima.map((item) => item.label)}
                  pengirim={data.namapembuat}
                  noMemo={data.nomormemo}
                  setuju={data.setuju}
                  status={
                    data.sts.disetujui !== undefined &&
                    data.sts.arsip !== "true" &&
                    data.hapus !== 1
                      ? "disetujui"
                      : data.sts.diajukan === "true"
                      ? "diajukan"
                      : data.sts.terkirim === "true"
                      ? "terkirim"
                      : data.sts.arsip === "true" && data.hapus !== 1
                      ? "diarsipkan"
                      : data.sts.revisi === "true"
                      ? "revisi"
                      : "dihapus"
                  }
                  isi={data.isi}
                  file={data.filenya ? data.filenya : []}
                  footer={
                    isRevision ? (
                      <div
                        style={{ gap: "10px" }}
                        className='d-flex flex-column'>
                        <div
                          style={{
                            gap: "10px",
                            fontSize: "16px",
                            color: "#619A3F",
                          }}
                          className='d-flex align-items-center'>
                          <i className='fas fa-print' />
                          <p className='p-0 m-0'>Pengajuan Revisi</p>
                        </div>
                        <textarea
                          id='revisi'
                          name='revisi'
                          rows='8'
                          cols='50'
                          value={revisi}
                          onChange={handleOnChangeRevisi}
                          placeholder=' Catatan Revisi'
                        />
                      </div>
                    ) : null
                  }
                />
              </>
            }
            footer={
              <>
                {isRevision && (
                  <div style={{ gap: "5px" }} className='float-right d-flex'>
                    <ActionButton
                      type='submit'
                      onClick={(e) => {
                        e.preventDefault();
                        setIsRevision(false);
                      }}
                      variant='danger'
                      icon='fas fa-times'
                      text=' Batal'
                    />
                    <ActionButton
                      type='submit'
                      onClick={revisiMemoHandler}
                      variant='success'
                      icon='fa fa-paper-plane'
                      text=' Kirim Revisi'
                    />
                  </div>
                )}
                {!isRevision &&
                  data.sts.disetujui === undefined &&
                  data.hapus !== 1 && (
                    <div style={{ gap: "5px" }} className='float-right d-flex'>
                      <ActionButton
                        type='submit'
                        onClick={(e) => {
                          e.preventDefault();
                          setIsRevision(true);
                        }}
                        icon='fas fa-print'
                        text=' Revisi'
                      />
                      <ActionButton
                        type='submit'
                        onClick={aprovMemoHandler}
                        variant='success'
                        icon='fas fa-file-signature'
                        text=' Disetujui'
                      />
                    </div>
                  )}

                {data.sts.arsip === "true" && (
                  <div style={{ gap: "5px" }} className='float-right d-flex'>
                    <ActionButton
                      type='submit'
                      icon='fas fa-file-upload'
                      text=' Pulihkan'
                      onClick={handlePulihkanArsipMemo}
                      variant='success'
                    />
                  </div>
                )}
              </>
            }
          />
        )}
      </div>
    </>
  );
}
