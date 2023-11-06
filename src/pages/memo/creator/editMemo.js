import React, { useState, useContext, useEffect } from "react";
import draftToHtml from "draftjs-to-html";
import {
  EditorState,
  convertToRaw,
  ContentState,
  convertFromHTML,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { getUsers } from "../../../api/pesanApi";
import { ReactContext } from "../../../context/AuthProvider";
import {
  deleteMemoById,
  tambahMemoPengajuan,
  updateMemoDraft,
} from "../../../api/memoApi";
import Card from "../../../components/card/card";
import ItemPreview from "../../../components/attachment/itemPreview";
import Attachment from "../../../components/attachment/attachment";
import ActionButton from "../../../components/button/actionButton";
import { uploadImage, deleteImage } from "../../../api/imageApi";
const defaultMemo = {
  berbintang: 0,
  // cc: "",
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
export default function EditMemo({ data }) {
  const { user } = useContext(ReactContext);
  const navigate = useNavigate();
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [dataUsers, setDataUsers] = useState([]);
  const [description, setDescription] = useState(() =>
    EditorState.createEmpty()
  );
  const [dataMemo, setDataMemo] = useState(defaultMemo);
  const [uploadMessage, setsUploadMessage] = useState("");

  const optionsUser = dataUsers
    ?.map((user) => ({
      value: user.id,
      label: user.nama,
    }))
    .filter((data) => {
      return data.value !== user.id;
    });

  const onEditorStateChange = (editorState) => {
    setDescription(editorState);
    setDataMemo((prevData) => ({
      ...prevData,
      isi: draftToHtml(convertToRaw(editorState.getCurrentContent())),
    }));
  };

  const handlerCreateMessage = (item) => (event) => {
    event.preventDefault();
    setDataMemo({ ...dataMemo, [item]: event.target.value });
  };

  const handleUploadImage = async (event) => {
    event.preventDefault();
    const maxAllowedSize = 6 * 1024 * 1024;
    if (event.target.files[0].size < maxAllowedSize) {
      setsUploadMessage("uploading");
      const data = await uploadImage(event.target.files[0]);
      if (data && data.filename) {
        setsUploadMessage("");
        const nd = dataMemo.filenya ? dataMemo.filenya : [];
        nd.push({ link: data.filename, namafile: data.namafile });
        setDataMemo((prevData) => ({
          ...prevData,
          filenya: nd,
        }));
      } else setsUploadMessage(data);
    } else setsUploadMessage("max file size 6 mb");
  };

  const handleDeleteImage = (index) => async (e) => {
    e.preventDefault();

    const data = await deleteImage(dataMemo.filenya[index].link);
    if (data) {
      setDataMemo((prevData) => ({
        ...prevData,
        filenya: dataMemo.filenya.filter(
          (data) => data !== dataMemo.filenya[index]
        ),
      }));
    }
  };

  const handleChangeSelect = (selectedOptions, type) => {
    setDataMemo((prevData) => ({
      ...prevData,
      [type]: selectedOptions,
    }));
  };

  const handleSubmitMemoPengajuan = async (e) => {
    e.preventDefault();

    setIsSubmiting(true);
    const data = await tambahMemoPengajuan(
      dataMemo.idmemo,
      user.id,
      dataMemo.penerima.map((data) => {
        return { id: data.value, label: data.label };
      }),
      dataMemo.jenismemo,
      dataMemo.nomordok,
      dataMemo.tglefektif,
      dataMemo.tglmemo,
      dataMemo.nomorrevisi,
      "hide",
      dataMemo.perihal,
      dataMemo.nomormemo,
      dataMemo.setuju.map((data) => {
        return { id: data.value, label: data.label };
      }),
      dataMemo.isi,
      dataMemo.filenya
    );
    setIsSubmiting(false);

    if (data && data.data.code === 200) navigate(-1);
  };

  const handleUpdateMemoDraft = async (e) => {
    e.preventDefault();
    const data = await updateMemoDraft(
      dataMemo.idmemo,
      user.id,
      dataMemo.penerima.map((data) => {
        return { id: data.value, label: data.label };
      }),
      dataMemo.jenismemo,
      dataMemo.nomordok,
      dataMemo.tglefektif,
      dataMemo.tglmemo,
      dataMemo.nomorrevisi,
      "hide",
      dataMemo.perihal,
      dataMemo.nomormemo,
      dataMemo.setuju.map((data) => {
        return { id: data.value, label: data.label };
      }),
      dataMemo.isi,
      dataMemo.filenya
    );
    if (data && data.data.code === 200) navigate(-1);
  };

  const handleDeleteMemo = (e) => {
    e.preventDefault();
    e.stopPropagation();
    Swal.fire({
      title: "Apakah anda yakin?",
      text: "ingin menghapus memo draft! ",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Hapus!",
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
        deleteMemo();
      }
    });
  };

  const deleteMemo = async () => {
    const resp = await deleteMemoById([dataMemo.idmemo], user.id);
    if (resp && resp.data.code === 200) {
      navigate(-1);
    }
  };
  const handleBack = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  useEffect(() => {
    getUsers().then((res) => {
      if (res) {
        sessionStorage.setItem("dataUsers", btoa(JSON.stringify(res)));
        setDataUsers(res);
      }
    });
  }, []);

  useEffect(() => {
    if (data) {
      const validTglMemo = data.tglmemo.slice(0, 10);
      const validTglEfektif = data.tglefektif.slice(0, 10);
      const validSetuju = data.setuju.map((data) => {
        return { value: data.id, label: data.label };
      });

      data.setuju = validSetuju;
      data.tglmemo = validTglMemo;
      data.tglefektif = validTglEfektif;

      setDescription(
        EditorState.createWithContent(
          ContentState.createFromBlockArray(convertFromHTML(data.isi))
        )
      );
    }

    setDataMemo(data);
  }, [data]);
  return (
    <>
      {dataMemo && (
        <Card
          title={
            <div
              style={{ gap: "5px", color: "#619a3f" }}
              className='d-flex align-items-center w-100'>
              <i
                style={{ cursor: "pointer" }}
                onClick={handleBack}
                className='fas fa-arrow-left mr-2 nama'
              />

              <i className='fas fa-envelope-open nama' />
              {dataMemo.sts.revisi === "true" ? "Revisi Memo" : "Draft Memo"}
              {dataMemo.sts.revisi !== "true" && (
                <div className='ml-auto'>
                  <button
                    onClick={handleDeleteMemo}
                    className='btn btn-default btn-xs text-center'>
                    <i className='fa fa-trash-alt text-sm ' />
                  </button>
                </div>
              )}
            </div>
          }
          body={
            <>
              {dataMemo.sts.revisi === "true" && (
                <div
                  style={{ color: "red" }}
                  className='d-flex flex-column mb-4'>
                  <h3 style={{ fontSize: "16px", color: "red" }}>
                    Catatan Revisi
                  </h3>
                  <div className='w-100 border p-2'>
                    {data.revisian &&
                      JSON.parse(data.revisian).map((data, index) => (
                        <p key={index}>{data.revisi}</p>
                      ))}
                  </div>
                </div>
              )}
              <div className='row'>
                <div className='col-md-2'>
                  <div className='form-group'>
                    <select
                      onChange={(e) => {
                        setDataMemo((prevData) => ({
                          ...prevData,
                          jenisMemo: e.target.value,
                        }));
                      }}>
                      <option value='komunikasi' key='komunikasi'>
                        Komunikasi
                      </option>
                    </select>
                  </div>
                </div>
                <div className='col-md-3'>
                  <div className='form-group'>
                    <input
                      required
                      type='text'
                      value={dataMemo.nomordok}
                      className='form-control'
                      placeholder='No. Dokumen:'
                      onChange={handlerCreateMessage("nomordok")}
                    />
                  </div>
                </div>
                <div className='col-md-3'>
                  <div className='form-group'>
                    <input
                      required
                      type='date'
                      className='form-control'
                      placeholder='Tanggal Efektif:'
                      onFocus={(e) => (e.target.type = "date")}
                      onBlur={(e) => (e.target.type = "text")}
                      value={dataMemo.tglefektif}
                      onChange={handlerCreateMessage("tglefektif")}
                    />
                  </div>
                </div>
                <div className='col-md-3'>
                  <div className='form-group'>
                    <input
                      required
                      type='text'
                      maxLength='20'
                      value={dataMemo.nomorrevisi}
                      className='form-control'
                      placeholder='No. Revisi:'
                      onChange={handlerCreateMessage("nomorrevisi")}
                    />
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col-md-6'>
                  <div className='form-group'>
                    <Select
                      options={optionsUser}
                      placeholder='Kepada:'
                      isMulti
                      name='colors'
                      className='basic-multi-select'
                      classNamePrefix='select'
                      value={dataMemo.penerima}
                      onChange={(selectedOptions) =>
                        handleChangeSelect(selectedOptions, "penerima")
                      }
                    />
                  </div>
                </div>
                {/* <div className='col-md-6'>
                  <div className='form-group'>
                    <input
                      required
                      type='text'
                      maxLength='20'
                      value={dataMemo.cc}
                      className='form-control'
                      placeholder='CC:'
                      onChange={handlerCreateMessage("cc")}
                    />
                  </div>
                </div> */}
              </div>
              <div className='row'>
                <div className='col-md-4'>
                  <div className='form-group'>
                    <input
                      required
                      type='text'
                      value={dataMemo.perihal}
                      className='form-control'
                      placeholder='Perihal:'
                      onChange={handlerCreateMessage("perihal")}
                    />
                  </div>
                </div>
                <div className='col-md-4'>
                  <div className='form-group'>
                    <input
                      required
                      type='date'
                      value={dataMemo.tglmemo}
                      onFocus={(e) => (e.target.type = "date")}
                      onBlur={(e) => (e.target.type = "text")}
                      className='form-control'
                      placeholder='Tanggal Memo:'
                      onChange={handlerCreateMessage("tglmemo")}
                    />
                  </div>
                </div>
                <div className='col-md-4'>
                  <div className='form-group'>
                    <input
                      required
                      type='text'
                      maxLength='20'
                      value={dataMemo.nomormemo}
                      className='form-control'
                      placeholder='No. Memo:'
                      onChange={handlerCreateMessage("nomormemo")}
                    />
                  </div>
                </div>
              </div>
              <div className='card card-light'>
                <div className='card-header'>
                  <h3 className='card-title nama'>Isi Memo</h3>
                </div>
                <div className='card-body'>
                  <div className='form-group'>
                    <Editor
                      editorState={description}
                      toolbarClassName='toolbarClassName'
                      wrapperClassName='wrapperClassName'
                      editorClassName='editorClassName'
                      onEditorStateChange={onEditorStateChange}
                    />
                  </div>
                </div>
              </div>
              <ItemPreview
                data={dataMemo.filenya}
                handleDeleteImage={handleDeleteImage}
              />
              <Attachment
                isUploading={uploadMessage === "" ? false : true}
                handleUploadImage={handleUploadImage}
              />

              <div className='row'>
                <div className='col-md-12'>
                  <div className='form-group'>
                    <Select
                      options={optionsUser}
                      placeholder='Disetujui oleh:'
                      isMulti
                      name='colors'
                      className='basic-multi-select'
                      classNamePrefix='select'
                      value={dataMemo.setuju}
                      onChange={(selectedOptions) =>
                        handleChangeSelect(selectedOptions, "setuju")
                      }
                    />
                  </div>
                </div>
              </div>
            </>
          }
          footer={
            dataMemo.sts.revisi === "true" ? (
              <div style={{ gap: "15px" }} className='float-right d-flex'>
                <ActionButton
                  disabled={
                    dataMemo.nomordok !== "" &&
                    dataMemo.tglefektif !== "" &&
                    dataMemo.tglmemo !== "" &&
                    dataMemo.nomorrevisi !== "" &&
                    // dataMemo.cc !== "" &&
                    dataMemo.perihal !== "" &&
                    dataMemo.nomormemo !== "" &&
                    dataMemo.isi !== "" &&
                    dataMemo.penerima?.length > 0 &&
                    dataMemo.setuju?.length > 0 &&
                    !isSubmiting
                      ? false
                      : true
                  }
                  type='submit'
                  onClick={handleSubmitMemoPengajuan}
                  icon='fa fa-paper-plane'
                  text=' Ajukan'
                />
              </div>
            ) : (
              <div style={{ gap: "15px" }} className='float-right d-flex'>
                <ActionButton
                  type='submit'
                  onClick={handleUpdateMemoDraft}
                  icon='fas fa-file-alt'
                  text=' Draft'
                />

                <ActionButton
                  disabled={
                    dataMemo.nomordok !== "" &&
                    dataMemo.tglefektif !== "" &&
                    dataMemo.tglmemo !== "" &&
                    dataMemo.nomorrevisi !== "" &&
                    // dataMemo.cc !== "" &&
                    dataMemo.perihal !== "" &&
                    dataMemo.nomormemo !== "" &&
                    dataMemo.isi !== "" &&
                    dataMemo.penerima?.length > 0 &&
                    dataMemo.setuju?.length > 0 &&
                    !isSubmiting
                      ? false
                      : true
                  }
                  type='submit'
                  onClick={handleSubmitMemoPengajuan}
                  variant='success'
                  icon='fa fa-paper-plane'
                  text=' Ajukan'
                />
              </div>
            )
          }
        />
      )}
    </>
  );
}
