import React, { useState, useContext, useEffect } from "react";
import draftToHtml from "draftjs-to-html";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import Select from "react-select";
import { useNavigate } from "react-router-dom";

import { getUsers } from "../../../api/pesanApi";
import { ReactContext } from "../../../context/AuthProvider";
import { tambahMemoDraft, tambahMemoPengajuan } from "../../../api/memoApi";
import Card from "../../../components/card/card";
import ItemPreview from "../../../components/attachment/itemPreview";
import Attachment from "../../../components/attachment/attachment";
import ActionButton from "../../../components/button/actionButton";
import { uploadImage, deleteImage } from "../../../api/imageApi";

export default function TambahMemo() {
  const { user } = useContext(ReactContext);
  const navigate = useNavigate();
  let editorState = EditorState.createEmpty();
  const [dataUsersPenerima, setDataUsersPenerima] = useState([]);
  const [description, setDescription] = useState(editorState);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [dataMemo, setDataMemo] = useState({
    id: 0,
    pengirim: user?.id,
    kepada: [],
    jenisMemo: "Komunikasi",
    noDokumen: "",
    dateEfektif: "",
    dateMemo: "",
    noRevisi: "",
    // cc: "",
    perihal: "",
    noMemo: "",
    isi: "",
    disetujui: [],
    file: [],
  });
  const [uploadMessage, setsUploadMessage] = useState("");

  const optionsUser = dataUsersPenerima
    ?.map((user) => ({
      value: user.id,
      label: user.nama,
    }))
    .filter((data) => {
      return data.value !== user.id;
    });

  const handleOnEditorStateChange = (editorState) => {
    setDescription(editorState);
    setDataMemo((prevData) => ({
      ...prevData,
      isi: draftToHtml(convertToRaw(editorState.getCurrentContent())),
    }));
  };

  const handleCreateMessage = (item) => (event) => {
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
        const nd = dataMemo.file;
        nd.push({ link: data.filename, namafile: data.namafile });
        setDataMemo((prevData) => ({
          ...prevData,
          file: nd,
        }));
      } else setsUploadMessage(data);
    } else setsUploadMessage("max file size 6 mb");
  };

  const handleDeleteImage = (index) => async (e) => {
    e.preventDefault();

    const data = await deleteImage(dataMemo.file[index].link);
    if (data) {
      setDataMemo((prevData) => ({
        ...prevData,
        file: dataMemo.file.filter((data) => data !== dataMemo.file[index]),
      }));
    }
  };

  const handleChangeSelect = (selectedOptions, type) => {
    const selectedValues = selectedOptions.map((option) => {
      return { id: option.value, label: option.label };
    });

    setDataMemo((prevData) => ({
      ...prevData,
      [type]: selectedValues,
    }));
  };

  const handleSubmitMemoPengajuan = async (e) => {
    e.preventDefault();
    setIsSubmiting(true);
    const resp = await tambahMemoPengajuan(
      0,
      dataMemo.pengirim,
      dataMemo.kepada,
      dataMemo.jenisMemo,
      dataMemo.noDokumen,
      dataMemo.dateEfektif,
      dataMemo.dateMemo,
      dataMemo.noRevisi,
      "hide",
      dataMemo.perihal,
      dataMemo.noMemo,
      dataMemo.disetujui,
      dataMemo.isi,
      dataMemo.file
    );
    setIsSubmiting(false);
    if (resp && resp.data.code === 200) navigate(`/memo/pengajuan`);
  };

  const handleSubmitMemoDraft = async (e) => {
    e.preventDefault();

    const resp = await tambahMemoDraft(
      dataMemo.pengirim,
      dataMemo.kepada,
      dataMemo.jenisMemo,
      dataMemo.noDokumen,
      dataMemo.dateEfektif,
      dataMemo.dateMemo,
      dataMemo.noRevisi,
      "hide",
      dataMemo.perihal,
      dataMemo.noMemo,
      dataMemo.disetujui,
      dataMemo.isi,
      dataMemo.file
    );
    if (resp && resp.status === 200) navigate(`/memo/pengajuan`);
  };

  const handleGoBack = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  useEffect(() => {
    getUsers().then((res) => {
      if (res) {
        setDataUsersPenerima(res);
      }
    });
  }, []);

  return (
    <>
      <div className='col-md-9'>
        <Card
          title={
            <>
              <i
                style={{ cursor: "pointer" }}
                onClick={handleGoBack}
                className='fas fa-arrow-left mr-2 nama'
              />
              <i className='fas fa-envelope-open nama'> Memo Baru</i>
            </>
          }
          body={
            <>
              <div className='row'>
                <div className='col-md-2'>
                  <div className='form-group'>
                    <select onChange={handleCreateMessage("jenisMemo")}>
                      <option value='komunikasi' key='komunikasi'>
                        Komunikasi
                      </option>
                    </select>
                  </div>
                </div>
                <div className='col-md-3'>
                  <div className='form-group'>
                    <input
                      maxLength='20'
                      type='text'
                      className='form-control'
                      placeholder='No. Dokumen:'
                      onChange={handleCreateMessage("noDokumen")}
                    />
                  </div>
                </div>
                <div className='col-md-3'>
                  <div className='form-group'>
                    <input
                      type='text'
                      onFocus={(e) => (e.target.type = "date")}
                      onBlur={(e) => (e.target.type = "text")}
                      className='form-control'
                      placeholder='Tanggal Efektif:'
                      onChange={handleCreateMessage("dateEfektif")}
                    />
                  </div>
                </div>
                <div className='col-md-3'>
                  <div className='form-group'>
                    <input
                      maxLength='20'
                      type='text'
                      className='form-control'
                      placeholder='No. Revisi:'
                      onChange={handleCreateMessage("noRevisi")}
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
                      onChange={(selectedOptions) =>
                        handleChangeSelect(selectedOptions, "kepada")
                      }
                    />
                  </div>
                </div>
                {/* <div className='col-md-6'>
                  <div className='form-group'>
                    <input
                      maxLength='20'
                      type='text'
                      className='form-control'
                      placeholder='CC:'
                      onChange={handleCreateMessage("cc")}
                    />
                  </div>
                </div> */}
              </div>
              <div className='row'>
                <div className='col-md-4'>
                  <div className='form-group'>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='Perihal:'
                      onChange={handleCreateMessage("perihal")}
                    />
                  </div>
                </div>
                <div className='col-md-4'>
                  <div className='form-group'>
                    <input
                      type='text'
                      onFocus={(e) => (e.target.type = "date")}
                      onBlur={(e) => (e.target.type = "text")}
                      className='form-control'
                      placeholder='Tanggal Memo:'
                      onChange={handleCreateMessage("dateMemo")}
                    />
                  </div>
                </div>
                <div className='col-md-4'>
                  <div className='form-group'>
                    <input
                      type='text'
                      maxLength='20'
                      className='form-control'
                      placeholder='No. Memo:'
                      onChange={handleCreateMessage("noMemo")}
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
                      onEditorStateChange={handleOnEditorStateChange}
                    />
                  </div>
                </div>
              </div>
              <ItemPreview
                data={dataMemo.file}
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
                      onChange={(selectedOptions) =>
                        handleChangeSelect(selectedOptions, "disetujui")
                      }
                    />
                  </div>
                </div>
              </div>
            </>
          }
          footer={
            <>
              <div style={{ gap: "15px" }} className='float-right d-flex'>
                <ActionButton
                  type='submit'
                  onClick={handleSubmitMemoDraft}
                  icon='fas fa-file-alt'
                  text=' Draft'
                />
                <ActionButton
                  disabled={
                    dataMemo.noDokumen !== "" &&
                    dataMemo.dateEfektif !== "" &&
                    dataMemo.dateMemo !== "" &&
                    dataMemo.noRevisi !== "" &&
                    // dataMemo.cc !== "" &&
                    dataMemo.perihal !== "" &&
                    dataMemo.noMemo !== "" &&
                    dataMemo.isi !== "" &&
                    dataMemo.kepada?.length > 0 &&
                    dataMemo.disetujui?.length > 0 &&
                    !isSubmiting
                      ? false
                      : true
                  }
                  type='submit'
                  onClick={handleSubmitMemoPengajuan}
                  variant='success'
                  icon='far fa-envelope'
                  text=' Ajukan'
                />
              </div>
            </>
          }
        />
      </div>
    </>
  );
}
