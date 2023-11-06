import React, { useState } from "react";
import {
  EditorState,
  convertToRaw,
  ContentState,
  convertFromHTML,
} from "draft-js";
import draftToHtml from "draftjs-to-html";
import { Editor } from "react-draft-wysiwyg";

import Card from "./card";
import { balasPesan } from "../../../api/pesanApi";
import { deleteImage, uploadImage } from "../../../api/imageApi";
import ItemPreview from "../../attachment/itemPreview";
import Attachment from "../../attachment/attachment";
import ActionButton from "../../button/actionButton";

function ReplyForm({ dataPesan, user, setShowBalas, handleRefresh }) {
  const getKepada = (data) => {
    const kepada = data
      .filter((item) => Number(item.id) !== user.id)
      .map((item) => {
        return { id: item.id.toString(), username: item.username };
      });

    if (dataPesan.pemilik[0].id !== user.id)
      kepada.push({
        id: dataPesan.pemilik[0].id.toString(),
        username: dataPesan.pemilik[0].nama,
      });
    return kepada;
  };
  const [dataBalas, setDataBalas] = useState({
    idComment: dataPesan.id,
    idpesan: dataPesan.idpesan,
    kepada: getKepada(dataPesan.kepada),
    file: [],
    isi: "",
  });
  let editorState = EditorState.createEmpty();
  const [description, setDescription] = useState(editorState);
  const [uploadMessage, setsUploadMessage] = useState("");

  const onEditorStateChange = (editorState) => {
    setDescription(editorState);
    setDataBalas((prevData) => ({
      ...prevData,
      isi: draftToHtml(convertToRaw(editorState.getCurrentContent())),
    }));
  };

  const handleBalasPesan = async (e) => {
    const resp = await balasPesan(
      dataBalas.idpesan,
      dataBalas.idComment,
      user.id,
      dataBalas.kepada,
      user.fullname,
      dataBalas.isi,
      dataBalas.file
    );
    if (resp && resp.data.code === 200) {
      setShowBalas(false);
      handleRefresh();
      setDescription(
        EditorState.createWithContent(
          ContentState.createFromBlockArray(convertFromHTML(""))
        )
      );
      setDataBalas((prevData) => ({
        ...prevData,
        file: [],
      }));
    }
  };

  const handleUploadImage = async (event) => {
    event.preventDefault();

    const maxAllowedSize = 6 * 1024 * 1024;
    if (event.target.files[0].size < maxAllowedSize) {
      setsUploadMessage("uploading");
      const data = await uploadImage(event.target.files[0]);
      if (data && data.filename) {
        setsUploadMessage("");
        const nd = dataBalas.file;
        nd.push({ link: data.filename, namafile: data.namafile });
        setDataBalas((prevData) => ({
          ...prevData,
          file: nd,
        }));
      } else setsUploadMessage(data);
    } else setsUploadMessage("max file size 6 mb");
  };

  const handleDeleteImage = (index) => async (e) => {
    e.preventDefault();

    const data = await deleteImage(dataBalas.file[index].link);
    if (data) {
      setDataBalas((prevData) => ({
        ...prevData,
        file: dataBalas.file.filter((data) => data !== dataBalas.file[index]),
      }));
    }
  };
  return (
    <Card
      title={
        <div className='d-flex flex-column-reverse flex-sm-row justify-content-between '>
          <span>Balas Pesan : {dataPesan?.nama}</span>
          <div className='align-self-end'>
            <button
              className='btn btn-default '
              onClick={(e) => {
                e.preventDefault();
                setShowBalas(false);
              }}>
              close
            </button>
          </div>
        </div>
      }
      body={
        <>
          <Editor
            editorState={description}
            toolbarClassName='toolbarClassName'
            wrapperClassName='wrapperClassName'
            editorClassName='editorClassName'
            onEditorStateChange={onEditorStateChange}
          />
          <ItemPreview
            handleDeleteImage={handleDeleteImage}
            data={dataBalas.file ? dataBalas.file : null}
          />
          <Attachment
            isUploading={uploadMessage === "" ? false : true}
            handleUploadImage={handleUploadImage}
          />
        </>
      }
      footer={
        <>
          <div style={{ gap: "1rem" }} className='float-right d-flex'>
            <ActionButton
              disabled={dataBalas.isi && dataPesan.isi !== "" ? false : true}
              variant='primary'
              type='submit'
              onClick={handleBalasPesan}
              icon='fas fa-paper-plane'
              text=' Kirim'
            />
          </div>
        </>
      }
    />
  );
}

export default ReplyForm;
