import React, { useEffect, useState, useContext, useRef } from "react";
import Select from "react-select";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import {
  DeletePermanenMemoById,
  getMemoById,
  kirimMemo,
  pulihkanMemoById,
  removeMemoArsipById,
} from "../../../api/memoApi";
import EditMemo from "./editMemo";
import { ReactContext } from "../../../context/AuthProvider";
import { getUsers } from "../../../api/pesanApi";
import Card from "../../../components/card/card";
import TabelDetailMemo from "../../../components/memo/detailMemo/table/tabelDetailMemo";
import ActionButton from "../../../components/button/actionButton";

const defaultMemo = {
  berbintang: 0,
  cc: "",
  fNoRevisi: "",
  filenya: [],
  hapus: 0,
  idmemo: 0,
  isi: "",
  jenismemo: "",
  namapembuat: "",
  nomordok: "",
  nomormemo: "",
  nomorrevisi: "",
  penerima: [],
  perihal: "",
  setuju: [],
  sts: {},
  tglefektif: "",
  tglmemo: "",
};
export default function DetailMemoCreator({ type }) {
  const navigate = useNavigate();
  const [dataMemo, setDataMemo] = useState(null);
  const { user } = useContext(ReactContext);
  const { id } = useParams();
  const [dataUsers, setDataUsers] = useState([]);
  const table = useRef(null);
  const optionsUser = dataUsers
    ?.map((user) => ({
      value: user.id,
      label: user.nama,
    }))
    .filter((data) => {
      return data.value !== user.id;
    });

  const getData = async () => {
    const res = await getMemoById(id, type);
    if (res) {
      const validPenerima = res.penerima.map((data) => {
        return { value: data.id, label: data.label };
      });
      res.penerima = validPenerima;
      setDataMemo(res);
    }
  };

  const isEditMemo = () => {
    if (dataMemo.hapus !== "1") {
      if (dataMemo.sts.draft !== "true" && dataMemo.sts.revisi !== "true")
        return false;
      else return true;
    } else return false;
  };

  const handlePulihkanMemo = async (e) => {
    e.preventDefault();
    const resp = await pulihkanMemoById(id, user.id);
    if (resp && resp.data.code === 200) {
      navigate(-1);
    }
  };
  const handlePulihkanArsipMemo = async (e) => {
    e.preventDefault();
    const resp = await removeMemoArsipById(id, user.id);
    if (resp && resp.code === 200) {
      navigate(-1);
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
  const handleKirimMemo = async (e) => {
    e.preventDefault();
    const resp = await kirimMemo(
      id,
      dataMemo.setuju,
      dataMemo.penerima.map((data) => {
        return { id: data.value, label: data.label };
      }),
      "hide"
    );
    if (resp && resp.data.code === 200) {
      navigate(-1);
    }
  };
  const deletePermanenkanMemo = async () => {
    const resp = await DeletePermanenMemoById([id], user.id);
    if (resp && resp.data.code === 200) {
      navigate(-1);
    }
  };

  const handleDeletePermanenMemo = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Apakah anda yakin?",
      text: "ingin menghapus memo Selamanya",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Hapus Selamanya!",
      cancelButtonText: "Batal",
      customClass: {
        popup: "popup-alert-small",
        icon: "icon",
        title: "title",
        htmlContainer: "htmlContainer",
        confirmButton: "btn-delete",
        denyButton: "btn-cancel",
        cancelButton: "btn-cancel",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        deletePermanenkanMemo();
      }
    });
  };

  const handleChangeSelect = (selectedOptions, type) => {
    setDataMemo((prevData) => ({
      ...prevData,
      [type]: selectedOptions,
    }));
  };

  const isKontakMasukMemo = () => {
    let validasi = false;
    if (dataMemo.bagikan) {
      dataMemo.bagikan.forEach((element) => {
        if (element.label === user.fullname && type !== "aproval")
          validasi = true;
      });
    }
    return validasi;
  };
  const handlerCreateMessage = (item) => (event) => {
    event.preventDefault();
    setDataMemo({ ...dataMemo, [item]: event.target.value });
  };
  useEffect(() => {
    getData();
    if (sessionStorage.getItem("dataUsers")) {
      setDataUsers(JSON.parse(atob(sessionStorage.getItem("dataUsers"))));
    } else {
      getUsers().then((res) => {
        if (res) {
          sessionStorage.setItem("dataUsers", btoa(JSON.stringify(res)));
          setDataUsers(res);
        }
      });
    }
  }, []);

  return (
    <>
      <div className='col-md-9'>
        {dataMemo && !isEditMemo() ? (
          <Card
            name='nama'
            title={
              <>
                <i
                  style={{ cursor: "pointer" }}
                  className='fas fa-arrow-left mr-2 nama'
                  onClick={() => navigate(-1)}
                />
                <i className='far fa-comments nama' />
                <span className='nama'> Isi Memo</span>
              </>
            }
            body={
              <>
                <TabelDetailMemo
                  tableRef={table}
                  user={user}
                  type='creator'
                  idMemo={id}
                  bagikan={dataMemo.bagikan}
                  tglEfektif={dataMemo.tglefektif}
                  tglMemo={dataMemo.tglmemo}
                  noDokumen={dataMemo.nomordok}
                  jenis={dataMemo.jenismemo}
                  noRevisi={dataMemo.nomorrevisi}
                  noMemo={dataMemo.nomormemo}
                  perihal={dataMemo.perihal}
                  cc={dataMemo.cc}
                  berbintang={dataMemo.berbintang === 1 ? true : false}
                  arsip={dataMemo.sts.arsip === "true" ? true : false}
                  nama='tabel'
                  penerima={dataMemo.penerima.map((item) => item.label + ", ")}
                  pengirim={dataMemo.namapembuat}
                  setuju={dataMemo.setuju}
                  isKontakMasuk={isKontakMasukMemo()}
                  status={
                    dataMemo.sts.disetujui !== undefined &&
                    dataMemo.bagikan === null &&
                    dataMemo.sts.arsip !== "true"
                      ? "disetujui"
                      : dataMemo.sts.diajukan === "true" &&
                        dataMemo.hapus !== "1"
                      ? "diajukan"
                      : dataMemo.sts.arsip === "true"
                      ? "diarsipkan"
                      : dataMemo.penerima !== undefined &&
                        dataMemo.hapus !== "1"
                      ? "terkirim"
                      : "dihapus"
                  }
                  isi={dataMemo.isi}
                  file={dataMemo.filenya ? dataMemo.filenya : []}
                  footer={
                    dataMemo.sts.diajukan === "true" ? (
                      <div
                        style={{ gap: "5px", alignItems: "center" }}
                        className='d-flex'>
                        <p className=' m-0'>Diajukan ke: </p>
                        {dataMemo.setuju.map((aproval, index) => (
                          <p
                            key={index}
                            className='p-2 rounded m-0'
                            style={{ backgroundColor: "#87BD3D" }}>
                            {aproval.label}
                          </p>
                        ))}
                      </div>
                    ) : null
                  }
                />
              </>
            }
            footer={
              <>
                {dataMemo &&
                  dataMemo.sts.disetujui !== undefined &&
                  dataMemo.sts.arsip !== "true" &&
                  !isKontakMasukMemo() && (
                    <>
                      <h6
                        style={{ gap: "10px", alignItems: "center" }}
                        className='nama d-flex'>
                        <i
                          className='fa fa-paper-plane'
                          style={{ color: "#619A3F" }}
                        />
                        Kirim Memo
                      </h6>
                      <form>
                        <div className='form-group'>
                          <Select
                            options={optionsUser}
                            placeholder='Kepada:'
                            isMulti
                            value={dataMemo.penerima}
                            name='colors'
                            className='basic-multi-select'
                            classNamePrefix='select'
                            onChange={(selectedOptions) =>
                              handleChangeSelect(selectedOptions, "penerima")
                            }
                          />
                        </div>
                        {/* <div className='form-group'>
                          <input
                            value={dataMemo.cc}
                            onChange={handlerCreateMessage("cc")}
                            className='form-control'
                            placeholder='cc:'
                          />
                        </div> */}
                      </form>

                      <div
                        style={{ gap: "5px" }}
                        className='float-right d-flex'>
                        {/* <ActionButton
                          type='submit'
                          icon='fas fa-print'
                          text=' Print'
                          onClick={handlePrintMemo}
                        /> */}
                        <ActionButton
                          type='submit'
                          icon='fa fa-paper-plane'
                          text=' Kirim'
                          onClick={handleKirimMemo}
                          variant='success'
                        />
                      </div>
                    </>
                  )}

                {/* {dataMemo &&
                  dataMemo.bagikan !== null &&
                  dataMemo.hapus !== 1 && (
                    <div style={{ gap: "5px" }} className='float-right d-flex'>
                      <ActionButton
                        type='submit'
                        icon='fas fa-print'
                        text=' Print'
                        onClick={handlePrintMemo}
                      />
                    </div>
                  )} */}
                {dataMemo.sts.arsip === "true" &&
                  dataMemo.namapembuat === user.fullname && (
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
                {dataMemo && dataMemo.hapus === "1" && (
                  <div style={{ gap: "5px" }} className='float-right d-flex'>
                    <ActionButton
                      type='submit'
                      icon='fas fa-file-upload'
                      text=' Pulihkan'
                      onClick={handlePulihkanMemo}
                      variant='success'
                    />
                    <ActionButton
                      type='submit'
                      icon='fas fa-trash-alt'
                      onClick={handleDeletePermanenMemo}
                      text=' Hapus Selamanya'
                      variant='danger'
                    />
                  </div>
                )}
              </>
            }
          />
        ) : (
          <EditMemo data={dataMemo} />
        )}
      </div>
    </>
  );
}
