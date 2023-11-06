import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";

import { ReactContext } from "../../context/AuthProvider";
import ActionButton from "../button/actionButton";
import { getUsers } from "../../api/pesanApi";
import { tambahIde, ubahIde } from "../../api/ideApi";
import { Anggota } from "./Anggota";

const optionEditor = [
  { value: "pelihat", label: "Pelihat" },
  { value: "komentar", label: "Komentar" },
];

function BagikanIdeModal({ dataIde, type, handleRefresh }) {
  const { user } = useContext(ReactContext);
  const navigate = useNavigate();
  const [dataTim, setDataTim] = useState([]);
  const [dataNewTim, setdataNewTim] = useState(null);
  const [dataOptionTim, setDataOptionTim] = useState([]);

  const handleChangeSelect = (selectedOptions, type) => {
    if (type === "editor")
      setdataNewTim((prev) => {
        return {
          ...prev,
          editorLabel: selectedOptions.label,
          editorValue: selectedOptions.value,
        };
      });
    else
      setdataNewTim((prev) => {
        return {
          ...prev,
          label: selectedOptions.label,
          value: selectedOptions.value,
        };
      });
  };

  const handleChangeSelectEditorTim = (item, index) => {
    let validDataTim = dataTim;
    validDataTim[index] = item;
    setDataTim(validDataTim);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let resp;
    if (type === "edit") {
      resp = await ubahIde(
        user.id,
        dataIde.idnyaide,
        user.fullname,
        dataIde.judul,
        dataIde.isinya,
        dataIde.filenya,
        dataTim.map((item) => {
          return {
            id: item.id,
            label: item.label,
            editor: item.editor,
            read: "false",
          };
        })
      );
    } else {
      resp = await tambahIde(
        user.id,
        user.fullname,
        dataIde.judul,
        dataIde.isinya,
        dataIde.filenya,
        dataTim.map((item) => {
          return {
            id: item.id,
            label: item.label,
            editor: item.editor,
            read: "false",
          };
        })
      );
    }

    if (resp && resp.data.code === 200) {
      setdataNewTim(null);
      navigate(`/ide/ruangide`);
      if (handleRefresh) handleRefresh();
    }
  };
  const handleAddTim = (e) => {
    e.preventDefault();
    setDataTim((prev) => {
      return [
        ...prev,
        {
          id: dataNewTim.value,
          label: dataNewTim.label,
          editor: dataNewTim.editorValue ? dataNewTim.editorValue : "pelihat",
        },
      ];
    });
    setdataNewTim(null);
  };

  const handleDeleteTim = (index) => {
    setDataTim(dataTim.filter((data) => data.id !== dataTim[index].id));
  };
  useEffect(() => {
    let optionTim;
    if (sessionStorage.getItem("dataUsers")) {
      optionTim = JSON.parse(atob(sessionStorage.getItem("dataUsers")))
        ?.map((user) => ({
          value: user.id,
          label: user.nama,
        }))
        .filter((data) => {
          return data.value !== user.id;
        });
    } else {
      getUsers().then((res) => {
        if (res) {
          sessionStorage.setItem("dataUsers", btoa(JSON.stringify(res)));
          optionTim = res
            .map((user) => ({
              value: user.id,
              label: user.nama,
            }))
            .filter((data) => {
              return data.value !== user.id;
            });
        }
      });
    }
    if (optionTim) {
      if (dataTim) {
        dataTim.forEach((element) => {
          optionTim = optionTim.filter((data) => {
            return data.value !== element.id;
          });
        });
      }

      setDataOptionTim(optionTim);
    }
  }, [dataTim]);

  useEffect(() => {
    if (dataIde) setDataTim(dataIde.tim ? dataIde.tim : []);
  }, [dataIde]);

  useEffect(() => {
    window.$("#bagikanIdeModal").on("hidden.bs.modal", function (e) {
      setDataTim(dataIde && dataIde.tim ? dataIde.tim : []);
    });
  }, []);

  return (
    <div
      className="modal fade"
      id="bagikanIdeModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="bagikanIdeModal"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <p className="w-100 modal-title" id="bagikanIdeModal">
              {`bagikan "${dataIde?.judul}"`}
            </p>

            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-md-9  mb-2 mb-md-0">
                <Select
                  name="Tim Member"
                  placeholder="Tim Member"
                  options={dataOptionTim}
                  value={
                    dataNewTim
                      ? { value: dataNewTim.value, label: dataNewTim.label }
                      : null
                  }
                  className="basic-multi-select input-xs"
                  classNamePrefix="select"
                  onChange={(selectedOptions) =>
                    handleChangeSelect(selectedOptions, "user")
                  }
                />
              </div>
              <div className="col-md-3  mb-2 mb-md-0">
                <Select
                  name="Editor"
                  placeholder="pelihat"
                  options={optionEditor}
                  value={
                    dataNewTim
                      ? {
                          value: dataNewTim.editorValue
                            ? dataNewTim.editorValue
                            : "pelihat",
                          label: dataNewTim.editorLabel
                            ? dataNewTim.editorLabel
                            : "Pelihat",
                        }
                      : null
                  }
                  className="basic-multi-select input-xs"
                  classNamePrefix="select"
                  onChange={(selectedOptions) =>
                    handleChangeSelect(selectedOptions, "editor")
                  }
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-3  my-2 ml-auto">
                <ActionButton
                  text=" Tambah"
                  disabled={dataNewTim === null}
                  onClick={handleAddTim}
                  icon="fas fa-plus"
                  variant="default"
                />
              </div>
            </div>

            <div className="col border-top">
              <p className="mt-2 font-weight-bold">Orang yang memiliki akses</p>
              {dataIde && dataIde.pemilik && (
                <Anggota
                  user={{
                    id: dataIde.pemilik[0].id,
                    label: dataIde.pemilik[0].nama,
                    editor: "pemilik",
                  }}
                  optionsEditor={optionEditor}
                  handleChangeEditor={handleChangeSelectEditorTim}
                />
              )}

              {dataTim &&
                dataTim.map((data, index) => (
                  <Anggota
                    key={index}
                    user={data}
                    index={index}
                    optionsEditor={optionEditor}
                    handleChangeEditor={handleChangeSelectEditorTim}
                    handleDelete={handleDeleteTim}
                  />
                ))}
            </div>
          </div>
          <div className="modal-footer p-0">
            <div
              style={{ gap: "1rem" }}
              className="row d-flex p-2 justify-content-end  "
            >
              {/* <ActionButton
                text=' Kirim Link'
                icon='fas fa-paperclip'
                // onClick={handleSendLink}
                disabled={dataNewTim.length > 0 ? false : true}
                variant='default'
              /> */}

              <ActionButton
                text=" Simpan"
                onClick={handleSubmit}
                dataToggle="modal"
                dataTarget="#bagikanIdeModal"
                icon="fas fa-file"
                variant="success"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BagikanIdeModal;
