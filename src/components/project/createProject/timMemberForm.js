import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";

import { ReactContext } from "../../../context/AuthProvider";
import { getUsers } from "../../../api/pesanApi";
import ActionButton from "../../button/actionButton";

export default function TimMemberForm({ setForm, form, setOpenModal }) {
  const { user } = useContext(ReactContext);

  const [dataUsersTim, setDataUsersTim] = useState([]);
  const [dataEditor, setdataEditor] = useState(null);
  const [dataTim, setdataTim] = useState([]);

  const optionsUser = () => {
    let usersTim = dataUsersTim
      ?.map((user) => ({
        value: user.id,
        label: user.nama,
      }))
      .filter((data) => {
        return data.value !== user.id;
      });
    if (form && form.tim) {
      form.tim.forEach((element) => {
        usersTim = usersTim.filter((data) => {
          return data.value !== element.id;
        });
      });
    }
    return usersTim;
  };

  const optionsEditor = [
    { value: "editor", label: "Editor" },
    { value: "pelihat", label: "Pelihat" },
  ];
  const handleChangeSelect = (selectedOptions) => {
    setdataTim(selectedOptions);
  };

  const handleChangeSelectEditor = (selectedOptions) => {
    setdataEditor(selectedOptions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validTim = dataTim.map((data) => {
      return { id: data.value, label: data.label, editor: dataEditor.value };
    });

    setForm((prevData) => ({
      ...prevData,
      ["tim"]: validTim.concat(form.tim),
    }));
    setdataTim([]);
  };
  const handleSendLink = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (sessionStorage.getItem("dataUsers")) {
      setDataUsersTim(JSON.parse(atob(sessionStorage.getItem("dataUsers"))));
    } else {
      getUsers().then((res) => {
        if (res) {
          sessionStorage.setItem("dataUsers", btoa(JSON.stringify(res)));
          setDataUsersTim(res);
        }
      });
    }
  }, []);

  return (
    <>
      <div className='row mt-3 border-top pt-3'>
        <div className='col-md-9 mb-2 mb-md-0'>
          <Select
            isMulti
            name='Tim Member'
            placeholder='Tim Member'
            options={optionsUser()}
            value={dataTim}
            className='basic-multi-select input-xs'
            classNamePrefix='select'
            onChange={(selectedOptions) => handleChangeSelect(selectedOptions)}
          />
        </div>
        <div className='col-md-3'>
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
        </div>
      </div>
      <div className='row d-flex p-3 justify-content-end'>
        {/* <ActionButton
          text=' Kirim Link'
          icon='fas fa-paperclip'
          onClick={handleSendLink}
          disabled={dataEditor && dataTim.length > 0 ? false : true}
          variant='default'
        /> */}

        <ActionButton
          text=' Tambah'
          onClick={handleSubmit}
          icon='fas fa-plus'
          disabled={dataEditor && dataTim.length > 0 ? false : true}
          variant='primary'
        />
      </div>
    </>
  );
}
