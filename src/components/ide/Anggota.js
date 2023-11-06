import React, { useState, useEffect } from "react";
import Select from "react-select";
import ActionButton from "../button/actionButton";

export function Anggota({
  user,
  optionsEditor,
  handleChangeEditor,
  index,
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
  useEffect(() => {
    setdataEditor(
      optionsEditor.filter((data) => data.value === editor.toLowerCase())
    );
  }, [user]);

  return (
    <div style={{ gap: "5px" }} className='col d-flex align-items-center mt-2 '>
      <img
        alt='Avatar'
        className='table-avatar'
        width={36}
        height={36}
        src='https://adminlte.io/themes/v3/dist/img/avatar.png'
      />
      <div className='col d-flex flex-column p-0 m-0 '>
        <p className='p-0 m-0'>{label}</p>
        <p className='p-0 m-0'>{dataEditor ? dataEditor.label : ""}</p>
      </div>
      <div style={{ marginLeft: "auto" }}>
        {editor === "pemilik" ? (
          <p className='p-0 m-0'> {editor}</p>
        ) : (
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
        )}
      </div>
      {handleDelete && (
        <div>
          <ActionButton
            text=''
            onClick={(e) => {
              e.preventDefault();
              handleDelete(index);
            }}
            icon='fas fa-trash'
            variant='danger'
          />
        </div>
      )}
    </div>
  );
}
