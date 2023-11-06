import draftToHtml from "draftjs-to-html";
import {
  ContentState,
  EditorState,
  convertFromHTML,
  convertToRaw,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { useState } from "react";

import { commentIde } from "../../../api/ideApi";
import ActionButton from "../../button/actionButton";
import { convertToDateTimeWithName } from "../../../utils/dateConversion";

export default function Discussion({
  ideId,
  userId,
  commentId,
  userName,
  editor,
  type,
  dataAllComment,
  handleRefresh,
}) {
  let editorState = EditorState.createEmpty();
  const [description, setDescription] = useState(editorState);

  const [dataComment, setDataComment] = useState({
    isi: "",
    userId: userId,
    idIde: ideId,
    userName: userName,
  });

  const handleOnEditorStateChange = (editorState) => {
    setDescription(editorState);
    setDataComment((prevData) => ({
      ...prevData,
      isi: draftToHtml(convertToRaw(editorState.getCurrentContent())),
    }));
  };

  const handleSubmitComment = async () => {
    const resp = await commentIde(
      commentId.toString(),
      dataComment.userId,
      userName,
      dataComment.idIde,
      dataComment.isi
    );
    if (resp && resp.data.code === 200) {
      handleRefresh();
      setDescription(
        EditorState.createWithContent(
          ContentState.createFromBlockArray(convertFromHTML(""))
        )
      );
    }
  };
  return (
    <div className='card'>
      <div className='card-body'>
        <h4 className='mb-5'>{`Komentar (${
          dataAllComment ? dataAllComment.length : 0
        })`}</h4>

        {type === "berbagiIde" && editor !== "pelihat" && (
          <>
            <div style={{ gap: "1rem" }} className=' d-flex '>
              <img
                alt='Avatar'
                className='table-avatar'
                width={36}
                height={36}
                src='https://adminlte.io/themes/v3/dist/img/avatar.png'
              />

              <div style={{ width: "96%" }} className=' form-group border'>
                <Editor
                  placeholder='tambah komentar'
                  editorState={description}
                  toolbarClassName='toolbarClassName'
                  wrapperClassName='wrapperClassName'
                  editorClassName='editorClassName'
                  onEditorStateChange={handleOnEditorStateChange}
                />
              </div>
            </div>
            <div className='d-flex justify-content-end'>
              <ActionButton
                disabled={dataComment.isi !== "" ? false : true}
                variant='primary'
                type='submit'
                onClick={handleSubmitComment}
                icon='fas fa-paper-plane'
                text=' Kirim'
              />
            </div>
          </>
        )}

        {dataAllComment &&
          dataAllComment.map((data, index) => (
            <div
              key={index}
              style={{ gap: "1rem" }}
              className=' d-flex flex-row mt-5 '>
              <img
                alt='Avatar'
                className='table-avatar'
                width={36}
                height={36}
                src='https://adminlte.io/themes/v3/dist/img/avatar.png'
              />
              <div
                style={{ gap: "1rem", width: "96%" }}
                className=' d-flex flex-column'>
                <div className='d-flex flex-column border p-2'>
                  <div
                    style={{ gap: "1rem", color: "grey" }}
                    className='d-flex align-items-center'>
                    <p>{data.nama}</p>
                    <p>.</p>
                    <p>{convertToDateTimeWithName(new Date(data.tgl))}</p>
                  </div>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: data.isi,
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
