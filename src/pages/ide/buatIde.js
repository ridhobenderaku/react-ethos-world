import React, { useState, useContext, useEffect } from "react";
import draftToHtml from "draftjs-to-html";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { useNavigate } from "react-router-dom";

import { ReactContext } from "../../context/AuthProvider";
import Card from "../../components/card/card";
import ItemPreview from "../../components/attachment/itemPreview";
import Attachment from "../../components/attachment/attachment";
import ActionButton from "../../components/button/actionButton";
import { uploadImage, deleteImage } from "../../api/imageApi";
import { tambahIde } from "../../api/ideApi";
import BagikanIdeModal from "../../components/ide/bagikanIdeModal";

const BuatIde = () => {
  const { user } = useContext(ReactContext);
  const navigate = useNavigate();
  let editorState = EditorState.createEmpty();
  const [description, setDescription] = useState(editorState);
  const [form, setForm] = useState({
    judul: "",
    isinya: "",
    authId: user.id,
    filenya: [],
    tim: [],
    pemilik: [{ id: user.id, nama: user.fullname }],
  });
  const [uploadMessage, setsUploadMessage] = useState("");
  const [isSubmiting, setIsSubmiting] = useState(false);

  const handleOnEditorStateChange = (editorState) => {
    setDescription(editorState);
    setForm((prevData) => ({
      ...prevData,
      isinya: draftToHtml(convertToRaw(editorState.getCurrentContent())),
    }));
  };

  const handleCreateMessage = (item) => (event) => {
    event.preventDefault();
    setForm({ ...form, [item]: event.target.value });
  };

  const handleUploadImage = async (event) => {
    event.preventDefault();
    const maxAllowedSize = 6 * 1024 * 1024;
    if (event.target.files[0].size < maxAllowedSize) {
      setsUploadMessage("uploading");
      const data = await uploadImage(event.target.files[0]);
      if (data && data.filename) {
        setsUploadMessage("");
        const nd = form.filenya;
        nd.push({ link: data.filename, namafile: data.namafile });
        setForm((prevData) => ({
          ...prevData,
          filenya: nd,
        }));
      } else setsUploadMessage(data);
    } else setsUploadMessage("max file size 6 mb");
  };

  const handleDeleteImage = (index) => async (e) => {
    e.preventDefault();

    const data = await deleteImage(form.filenya[index].link);
    if (data) {
      setForm((prevData) => ({
        ...prevData,
        filenya: form.filenya.filter((data) => data !== form.filenya[index]),
      }));
    }
  };

  const handleSubmitIde = async (e) => {
    e.preventDefault();
    setIsSubmiting(true);
    const resp = await tambahIde(
      form.authId,
      user.fullname,
      form.judul,
      form.isinya,
      form.filenya
    );
    if (resp && resp.data.code === 200) navigate(`/ide/ruangide`);
    setIsSubmiting(false);
  };

  const handleGoBack = (e) => {
    e.preventDefault();
    navigate(-1);
  };

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
              <i className='fas fa-edit nama'> Ide Baru</i>
            </>
          }
          body={
            <>
              <BagikanIdeModal dataIde={form} />
              <div className='row'>
                <div className='form-group col-md-12'>
                  <input
                    className='form-control'
                    placeholder='Judul:'
                    value={form.judul}
                    onChange={handleCreateMessage("judul")}
                  />
                </div>
              </div>
              <div className='card card-light'>
                <div className='card-header'>
                  <h3 className='card-title nama'>Isi Ide</h3>
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
                data={form.filenya}
                handleDeleteImage={handleDeleteImage}
              />
              <Attachment
                isUploading={uploadMessage === "" ? false : true}
                handleUploadImage={handleUploadImage}
              />
            </>
          }
          footer={
            <>
              <div style={{ gap: "15px" }} className='float-right d-flex'>
                <ActionButton
                  disabled={
                    form.judul !== "" && form.isinya !== "" ? false : true
                  }
                  type='submit'
                  dataToggle='modal'
                  dataTarget='#bagikanIdeModal'
                  icon='fas fa-users'
                  text=' Bagikan'
                />
                <ActionButton
                  disabled={
                    form.judul !== "" && form.isinya !== "" && !isSubmiting
                      ? false
                      : true
                  }
                  type='submit'
                  onClick={handleSubmitIde}
                  variant='success'
                  icon='fas fa-file'
                  text=' Simpan'
                />
              </div>
            </>
          }
        />
      </div>
    </>
  );
};

export default BuatIde;
