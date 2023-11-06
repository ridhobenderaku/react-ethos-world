import React, { useState } from "react";
import Select from "react-select";
import ActionButton from "../button/actionButton";

export default function EditMember({
  index,
  imgUrl,
  user,
  handleChangeEditor,
  styles,
  stylesContent,
  optionsEditor,
  handleDelete,
}) {
  const { id, label, editor } = user;

  const [dataEditor, setdataEditor] = useState(
    optionsEditor.filter((data) => data.value === editor.toLowerCase())[0]
  );
  const handleChangeSelectEditor = (selectedOptions) => {
    setdataEditor(selectedOptions);
    handleChangeEditor(
      { id: id, label: label, editor: selectedOptions.value },
      index
    );
  };
  return (
    <div style={{ gap: "5px" }} className={styles}>
      <img
        alt='Avatar'
        className='table-avatar'
        width={36}
        height={36}
        src='https://adminlte.io/themes/v3/dist/img/avatar.png'
      />
      <div className={stylesContent}>
        <p className='p-0 m-0'>{label}</p>
        {editor === "pemilik" ? (
          <p className='p-0 m-0'>{editor}</p>
        ) : (
          <div style={{ gap: "0.5rem" }} className='row mx-1'>
            <Select
              name='Editor'
              placeholder='Editor'
              options={optionsEditor}
              value={dataEditor}
              className='basic-multi-select input-xs'
              classNamePrefix='select'
              onChange={(selectedOptions) =>
                handleChangeSelectEditor(selectedOptions)
              }
            />
            {handleDelete && (
              <ActionButton
                text=''
                onClick={(e) => {
                  e.preventDefault();
                  handleDelete(index);
                }}
                icon='fas fa-trash'
                variant='danger'
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
