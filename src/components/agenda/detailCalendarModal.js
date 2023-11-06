import React, { useEffect, useState } from "react";
import DateRangePicker from "react-bootstrap-daterangepicker";
import Swal from "sweetalert2";

import {
  buatAgenda,
  deleteAgenda,
  getDataAgendaById,
} from "../../api/agendaApi";
import ActionButton from "../button/actionButton";

function NewAgenda({ form, handleCreateForm }) {
  const [selectedColor, setselectedColor] = useState("#619A3F");

  return (
    <form>
      <div className="d-flex flex-column">
        <span>Nama Agenda</span>
        <div className="form-group">
          <input
            maxLength={100}
            type="text"
            className="form-control"
            value={form.title}
            onChange={(e) => {
              handleCreateForm(e.target.value, "title");
            }}
          />
        </div>
        {form.startDate && (
          <div className="col m-0 p-0">
            <span>Jadwal Agenda</span>
            <div className="form-group">
              <DateRangePicker
                initialSettings={{
                  locale: {
                    format: "DD/M/YY hh:mm A",
                  },
                  startDate: new Date(form.startDate),
                  endDate: new Date(form.endDate),
                  timePicker: true,
                }}
                onApply={(event, picker) => {
                  handleCreateForm(new Date(picker.startDate), "startDate");
                  handleCreateForm(new Date(picker.endDate), "endDate");
                }}
              >
                <input className="form-control" type="text" />
              </DateRangePicker>
            </div>
          </div>
        )}
        <span>Warna Agenda</span>
        <div className="btn-group">
          <ul className="fc-color-picker" id="color-chooser">
            <li>
              <button
                style={{
                  backgroundColor: "#619A3F",
                  border:
                    selectedColor === "#619A3F" ? "solid #C2C2C2 " : "none",
                }}
                className="btn p-3"
                onClick={(e) => {
                  e.preventDefault();
                  setselectedColor("#619A3F");

                  handleCreateForm("#619A3F", "color");
                }}
              ></button>
            </li>
            <li>
              <button
                style={{
                  backgroundColor: "#87BD3D",
                  border:
                    selectedColor === "#87BD3D" ? "solid #C2C2C2 " : "none",
                }}
                className="btn p-3"
                onClick={(e) => {
                  e.preventDefault();
                  setselectedColor("#87BD3D");

                  handleCreateForm("#87BD3D", "color");
                }}
              ></button>
            </li>
            <li>
              <button
                style={{
                  backgroundColor: "#ffc107",
                  border:
                    selectedColor === "#ffc107" ? "solid #C2C2C2 " : "none",
                }}
                className="btn p-3"
                onClick={(e) => {
                  e.preventDefault();
                  setselectedColor("#ffc107");

                  handleCreateForm("#ffc107", "color");
                }}
              ></button>
            </li>
            <li>
              <button
                style={{
                  backgroundColor: "#FF9E1D",
                  border:
                    selectedColor === "#FF9E1D" ? "solid #C2C2C2 " : "none",
                }}
                className="btn p-3"
                onClick={(e) => {
                  e.preventDefault();
                  setselectedColor("#FF9E1D");

                  handleCreateForm("#FF9E1D", "color");
                }}
              ></button>
            </li>
            <li>
              <button
                style={{
                  backgroundColor: "#06AAFF",
                  border:
                    selectedColor === "#06AAFF" ? "solid #C2C2C2 " : "none",
                }}
                className="btn p-3"
                onClick={(e) => {
                  e.preventDefault();
                  setselectedColor("#06AAFF");

                  handleCreateForm("#06AAFF", "color");
                }}
              ></button>
            </li>
          </ul>
        </div>
      </div>
    </form>
  );
}

function DetailAgenda({ dataEvent }) {
  return (
    <div className="col">
      <div className="row">
        <p style={{ minWidth: "12ch" }}>Deskripsi</p>
        {dataEvent.deskripsi ? (
          <div
            className="text-break"
            dangerouslySetInnerHTML={{
              __html: dataEvent.deskripsi,
            }}
          />
        ) : (
          <p className="text-break">(belum ada deskripsi)</p>
        )}
      </div>

      <div className="row">
        <p style={{ minWidth: "12ch" }}>Start Time</p>
        <p>
          <strong>
            {`${new Date(dataEvent.start).getDate()}/${
              new Date(dataEvent.start).getMonth() + 1
            }/${new Date(dataEvent.start).getFullYear()}, ${new Date(
              dataEvent.start
            ).toLocaleTimeString()}`}
          </strong>
        </p>
      </div>
      <div className="row">
        <p style={{ minWidth: "12ch" }}>End Time</p>
        <p>
          <strong>
            {`${new Date(dataEvent.end).getDate()}/${
              new Date(dataEvent.end).getMonth() + 1
            }/${new Date(dataEvent.end).getFullYear()}, ${new Date(
              dataEvent.end
            ).toLocaleTimeString()}`}
          </strong>
        </p>
      </div>
      <div className="col "></div>
    </div>
  );
}

const defaultForm = {
  title: "",
  startDate: null,
  endDate: null,
  color: "#619A3F",
};
function DetailCalendarModal({ eventClick, user, handleRefresh }) {
  const [dataEvent, setdataEvent] = useState(undefined);
  const [form, setForm] = useState(defaultForm);

  const confirmDelete = (event) => {
    event.preventDefault();
    Swal.fire({
      title: "Apakah anda yakin?",
      text: "ingin menghapus agenda",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal",
      customClass: {
        popup: "popup-alert-small",
        icon: "icon",
        title: "title",
        htmlContainer: "htmlContainer",
        confirmButton: "btn-delete",
        denyButton: "btn-cancel",
        cancelButton: "btn-cancel",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteAgenda();
      }
    });
  };
  const handleDeleteAgenda = async () => {
    const resp = await deleteAgenda(dataEvent.id);
    if (resp && resp.data.code === 200) {
      window.$("#detailCalendarModal").modal("hide");
      eventClick.event.remove();
      handleRefresh();
    }
  };
  const handleTambahAgenda = async () => {
    const resp = await buatAgenda(
      user.id,
      form.title,
      form.startDate?.toLocaleString("zh-Hans-CN"),
      form.endDate?.toLocaleString("zh-Hans-CN"),
      form.color,
      0,
      Math.random(),
      true
    );
    if (resp && resp.data.code === 200) handleRefresh();
  };

  const handleCreateForm = (value, type) => {
    setForm((prev) => {
      return { ...prev, [type]: value };
    });
  };
  useEffect(() => {
    const getData = async (id) => {
      const resp = await getDataAgendaById(id);
      if (resp) setdataEvent(resp[0]);
    };

    if (eventClick && eventClick.event) getData(eventClick.event.id);
    else setdataEvent(null);
    if (eventClick) {
      let endDate = new Date(eventClick.dateStr);
      endDate.setHours(endDate.getHours() + 1);
      handleCreateForm(eventClick.dateStr, "startDate");
      handleCreateForm(endDate, "endDate");
    }
  }, [eventClick]);

  useEffect(() => {
    window.$("#detailCalendarModal").on("hidden.bs.modal", function (e) {
      setForm(defaultForm);
      setdataEvent(undefined);
    });
  }, []);

  return (
    <div className="modal fade" id="detailCalendarModal">
      <div className="modal-dialog modal-dialog-centered ">
        <div className="modal-content">
          {dataEvent !== undefined ? (
            <>
              <div className="modal-header mx-auto">
                {dataEvent && eventClick && eventClick.event ? (
                  <h3 className="modal-title text-center text-break">
                    {dataEvent.title}
                  </h3>
                ) : (
                  <h3>Agenda Baru</h3>
                )}
              </div>
              <div className="modal-body">
                {dataEvent && eventClick && eventClick.event ? (
                  <DetailAgenda dataEvent={dataEvent} />
                ) : (
                  <NewAgenda
                    form={form}
                    setForm={setForm}
                    handleCreateForm={handleCreateForm}
                  />
                )}
              </div>
              <div className="modal-footer row justify-content-end mx-auto w-100">
                <ActionButton
                  text=" Batal"
                  icon="fas fa-times"
                  dataDismis="modal"
                  variant="default"
                  // onClick={handleCancel}
                />
                {dataEvent && eventClick && eventClick.event ? (
                  <ActionButton
                    text=" Hapus Agenda"
                    icon="fas fa-trash"
                    variant="danger"
                    onClick={confirmDelete}
                  />
                ) : (
                  <ActionButton
                    text=" Simpan"
                    icon="fas fa-file"
                    dataDismis="modal"
                    variant="success"
                    disabled={
                      form.title === "" || form.color === "" ? true : false
                    }
                    onClick={handleTambahAgenda}
                  />
                )}
              </div>
            </>
          ) : (
            <div className="w-100 p-5 row justify-items-center">
              <div className="spinner-border m-auto" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DetailCalendarModal;
