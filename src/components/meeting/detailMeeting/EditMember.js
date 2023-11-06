import React, { useState } from "react";
import Select from "react-select";

export function EditMember({
  imgUrl,
  user,
  handleChangeEditor,
  index,
  isAuthor,
}) {
  const { id, label, editor } = user;
  const optionsEditor = [
    { value: "editor", label: "Editor" },
    { value: "member", label: "Member" },
    { value: "hapusMember", label: "Hapus Member" },
  ];

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
    <div
      style={{ gap: "5px" }}
      className='col col-12 col-md-6 d-flex align-items-center mt-3'>
      <img
        alt='Avatar'
        className='table-avatar'
        width={36}
        height={36}
        src='https://adminlte.io/themes/v3/dist/img/avatar.png'
      />
      <div className='col d-flex flex-column p-0 m-0 '>
        <p className='p-0 m-0'>{label}</p>
        {isAuthor ? (
          <p className='p-0 m-0'>{editor}</p>
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
    </div>
  );
}
