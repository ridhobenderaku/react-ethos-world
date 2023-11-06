import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";

import { tambahPesan, tambahPesanDraft } from "../../api/pesanApi";
import { getUsers } from "../../api/pesanApi";
import { ReactContext } from "../../context/AuthProvider";
import { deleteImage, uploadImage } from "../../api/imageApi";
import ItemPreview from "../../components/attachment/itemPreview";
import Attachment from "../../components/attachment/attachment";
import ActionButton from "../../components/button/actionButton";

const BuatPesan = () => {
  const { user } = useContext(ReactContext);
  const navigate = useNavigate();
  const [uploadMessage, setsUploadMessage] = useState("");
  const [dataUsers, setDataUsers] = useState([]);
  let editorState = EditorState.createEmpty();
  const [description, setDescription] = useState(editorState);
  const [form, setForm] = useState({
    kepada: [],
    subjek: "",
    isi: "",
    file: [],
    judul: "",
  });
  const [isSubmiting, setisSubmiting] = useState(false);
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
    setForm((prevData) => ({
      ...prevData,
      isi: draftToHtml(convertToRaw(editorState.getCurrentContent())),
    }));
  };

  const checkisValidDraft = () => {
    let count = 0;
    if (!form.kepada || form.kepada.length === 0) count++;
    if (form.isi === "") count++;
    if (form.subjek === "") count++;
    return count < 3 ? true : false;
  };
  const handleUploadImage = async (event) => {
    event.preventDefault();

    const maxAllowedSize = 6 * 1024 * 1024;
    if (event.target.files[0].size < maxAllowedSize) {
      setsUploadMessage("uploading");
      const data = await uploadImage(event.target.files[0]);
      if (data && data.filename) {
        setsUploadMessage("");
        const nd = form.file;
        nd.push({ link: data.filename, namafile: data.namafile });
        setForm((prevData) => ({
          ...prevData,
          file: nd,
        }));
      } else setsUploadMessage(data);
    } else setsUploadMessage("max file size 6 mb");
  };

  const handleDeleteImage = (index) => async (e) => {
    e.preventDefault();

    const data = await deleteImage(form.file[index].link);
    if (data) {
      setForm((prevData) => ({
        ...prevData,
        file: form.file.filter((data) => data !== form.file[index]),
      }));
    }
  };

  const handlerCreateMessage = (item) => (event) => {
    setForm({ ...form, [item]: event.target.value });
  };
  const handleChangeSelect = (selectedOptions, type) => {
    setForm((prevData) => ({
      ...prevData,
      [type]: selectedOptions,
    }));
  };

  const handleSendPesan = async (e) => {
    e.preventDefault();
    setisSubmiting(true);
    const resp = await tambahPesan(
      user.id,
      user.fullname,
      form.kepada.map((item) => {
        return {
          id: item.value.toString(),
          username: item.label,
          read: "false",
        };
      }),
      form.subjek,
      form.file,
      form.isi
    );

    if (resp && resp.data.code === 200) {
      navigate("/pesan/terkirim");
    }
    setisSubmiting(false);
  };

  const handleDraftPesan = async (e) => {
    e.preventDefault();
    const resp = await tambahPesanDraft(
      "0",
      user.id,
      user.fullname,
      form.kepada.map((item) => {
        return { id: item.value, username: item.label, read: "false" };
      }),
      form.subjek,
      form.file,
      form.isi,
      1
    );
    if (resp && resp.data.code === 200) {
      navigate("/pesan/draft");
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    getUsers().then((res) => {
      if (res) {
        setDataUsers(res);
      }
    });
  }, []);

  return (
    <>
      <div className='col-md-9'>
        <div className='card card-outline'>
          <div className='card-header'>
            <h3
              style={{ gap: "10px" }}
              className='card-title d-flex align-items-center'>
              <div
                style={{ cursor: "pointer" }}
                onClick={handleBack}
                className='fas fa-arrow-left'
              />
              <i className='fas fa-edit'> Pesan Baru</i>
            </h3>
          </div>

          <form>
            <div className='card-body'>
              <div className='row'>
                <div className='form-group col-md-12'>
                  <Select
                    options={optionsUser}
                    placeholder='Kepada:'
                    name='colors'
                    isMulti
                    className='basic-multi-select'
                    classNamePrefix='select'
                    onChange={(selectedOptions) =>
                      handleChangeSelect(selectedOptions, "kepada")
                    }
                  />
                </div>
              </div>
              <div className='row'>
                <div className='form-group col-md-12'>
                  <input
                    className='form-control'
                    placeholder='Subjek:'
                    value={form.subjek}
                    onChange={handlerCreateMessage("subjek")}
                  />
                </div>
              </div>
              <div className='card card-light'>
                <div className='card-header'>
                  <h3 className='card-title nama'>Isi Pesan</h3>
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
                data={form.file}
                handleDeleteImage={handleDeleteImage}
              />
              <Attachment
                isUploading={uploadMessage === "" ? false : true}
                handleUploadImage={handleUploadImage}
              />
            </div>
          </form>

          <div className='card-footer'>
            <div style={{ gap: "15px" }} className='float-right d-flex'>
              <ActionButton
                disabled={checkisValidDraft() ? false : true}
                type='button'
                onClick={handleDraftPesan}
                icon='fas fa-file-alt'
                text=' Draft'
              />
              <ActionButton
                disabled={
                  !isSubmiting &&
                  form.kepada &&
                  form.isi !== "" &&
                  form.subjek !== ""
                    ? false
                    : true
                }
                variant='success'
                type='submit'
                onClick={handleSendPesan}
                icon='fas fa-paper-plane'
                text=' Kirim'
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BuatPesan;
