import React, { useEffect, useState, useContext } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";

import "../../components/agenda/calendar.css";
import Aktifitas from "../../components/agenda/aktivitas/aktivitas";
import BuatAgenda from "../../components/agenda/buatAgenda";
import {
  buatAgenda,
  getDataTemplateAgenda,
  getDataCalender,
  tambahAgenda,
  updateAgenda,
} from "../../api/agendaApi";
import { ReactContext } from "../../context/AuthProvider";
import ActionButton from "../../components/button/actionButton";
import TambahAktivitasModal from "../../components/agenda/aktivitas/tambahAktivitasModal";
import DetailCalendarModal from "../../components/agenda/detailCalendarModal";

const Index = () => {
  const { user } = useContext(ReactContext);
  const [dataTemplateAgenda, setDataTemplateAgenda] = useState([]);
  const [isTemplateDelete, setIsTemplateDelete] = useState(0);
  const [dataDragAgenda, setDataDragAgenda] = useState({
    nama: "",
    authId: user.id,
    color: "#619A3F",
  });
  const [currentTabCalendar, setcurrentTabCalendar] = useState("dayGridMonth");
  const [calendarEvent, setCalendarEvents] = useState(null);
  const [toggleRefreshAktifitas, setToggleRefreshAktifitas] = useState(false);
  const [eventClickCalendar, setEventClickCalendar] = useState(null);

  const handleGetDataTemplateAgenda = async () => {
    const data = await getDataTemplateAgenda(user.id);
    if (data) setDataTemplateAgenda(data);
  };

  const handleCheckboxChange = (event) => {
    if (event.target.checked) {
      setIsTemplateDelete(1);
    } else {
      setIsTemplateDelete(0);
    }
  };

  const handleRefreshAgenda = () => {
    getDataCalender(user.id).then((res) => {
      if (res) {
        const data = res.map((item) => {
          let validEndMonth = new Date(item.end);
          validEndMonth.setDate(validEndMonth.getDate() + 1);

          let validEndWeekAndDay = new Date(item.end);
          validEndWeekAndDay.setHours(validEndWeekAndDay.getHours() + 1);
          return {
            id: item.id,
            title: item.title,
            start: new Date(item.start),
            end: new Date(
              currentTabCalendar === "dayGridMonth"
                ? validEndMonth
                : new Date(item.start).getDate() ===
                  new Date(item.end).getDate()
                ? item.end
                : validEndWeekAndDay.getHours() === 1
                ? validEndWeekAndDay
                : item.end
            ),
            color: item.color,
            allDay:
              currentTabCalendar === "dayGridMonth"
                ? true
                : new Date(item.start).getTime() ===
                  new Date(item.end).getTime()
                ? true
                : false,
          };
        });
        setCalendarEvents(data ? data : []);
      }
    });
  };

  const handleCalendarEventReceive = async (info) => {
    let endWStart = new Date(info.event.start);
    endWStart.setHours(endWStart.getHours() + 1);
    await buatAgenda(
      user.id,
      info.event.title,
      info.event.start?.toLocaleString("zh-Hans-CN"),
      currentTabCalendar === "dayGridMonth"
        ? info.event.start?.toLocaleString("zh-Hans-CN")
        : endWStart.toLocaleString("zh-Hans-CN"),
      info.event.backgroundColor,
      isTemplateDelete,
      info.event.id,
      info.event.allDay
    );
    if (isTemplateDelete === 1) {
      handleGetDataTemplateAgenda();
    }

    getDataCalender(user.id).then((res) => {
      if (res) {
        const data = res.map((item) => {
          let validEndMonth = new Date(item.end);
          validEndMonth.setDate(validEndMonth.getDate() + 1);
          let validEndWeekAndDay = new Date(item.end);
          validEndWeekAndDay.setHours(validEndWeekAndDay.getHours() + 1);
          return {
            id: item.id,
            title: item.title,
            start: new Date(item.start),
            end: new Date(
              currentTabCalendar === "dayGridMonth"
                ? validEndMonth
                : new Date(item.start).getDate() ===
                  new Date(item.end).getDate()
                ? item.end
                : validEndWeekAndDay.getHours() === 1
                ? validEndWeekAndDay
                : item.end
            ),
            color: item.color,
            allDay:
              currentTabCalendar === "dayGridMonth"
                ? true
                : new Date(item.start).getTime() ===
                  new Date(item.end).getTime()
                ? true
                : false,
          };
        });
        setCalendarEvents(data ? data : []);
      }
    });
  };

  const handleCalendarEventUpdate = async (info) => {
    let validEndDayGridMonth = new Date(info.event.end);
    validEndDayGridMonth.setDate(validEndDayGridMonth.getDate() - 1);

    let endWStart = new Date(info.event.start);
    endWStart.setHours(endWStart.getHours() + 1);

    await updateAgenda(
      user.id,
      info.event.id,
      info.event.start?.toLocaleString("zh-Hans-CN"),
      info.event.end && currentTabCalendar === "dayGridMonth"
        ? validEndDayGridMonth.toLocaleString("zh-Hans-CN")
        : currentTabCalendar === "dayGridMonth"
        ? info.event.start.toLocaleString("zh-Hans-CN")
        : currentTabCalendar !== "dayGridMonth" && info.event.end
        ? info.event.end.toLocaleString("zh-Hans-CN")
        : endWStart.toLocaleString("zh-Hans-CN")
    ).then(() => {
      getDataCalender(user.id).then((res) => {
        if (res) {
          const data = res.map((item) => {
            let validEndDayGridMonth = new Date(item.end);
            validEndDayGridMonth.setDate(validEndDayGridMonth.getDate() + 1);
            let validEndWeekAndDay = new Date(item.end);
            validEndWeekAndDay.setHours(validEndWeekAndDay.getHours() + 1);
            return {
              id: item.id,
              title: item.title,
              start: new Date(item.start),
              end: new Date(
                currentTabCalendar === "dayGridMonth"
                  ? validEndDayGridMonth
                  : new Date(item.start).getDate() ===
                    new Date(item.end).getDate()
                  ? item.end
                  : validEndWeekAndDay.getHours() === 1
                  ? validEndWeekAndDay
                  : item.end
              ),
              color: item.color,
              allDay:
                currentTabCalendar === "dayGridMonth"
                  ? true
                  : new Date(item.start).getTime() ===
                    new Date(item.end).getTime()
                  ? true
                  : false,
            };
          });
          setCalendarEvents(data ? data : []);
        }
      });
    });
  };

  const handleCalendarEventClick = async (eventClick) => {
    setEventClickCalendar(eventClick);
    window.$("#detailCalendarModal").modal("show");
  };

  const handleCreateAgenda = (item) => (event) => {
    setDataDragAgenda({ ...dataDragAgenda, [item]: event.target.value });
  };

  const handleSetColor = (item) => {
    setDataDragAgenda({
      ...dataDragAgenda,
      color: item,
    });
  };

  const handleChangeTabCalendar = (dateInfo) => {
    setcurrentTabCalendar(dateInfo.view.type);
  };

  const handleSubmitTemplateAgenda = async (e) => {
    e.preventDefault();

    const resp = await tambahAgenda(dataDragAgenda);

    if (resp.data.code === 200) {
      handleGetDataTemplateAgenda();
    }
  };

  useEffect(() => {
    let draggableEl = document.getElementById("external-events");
    let draggable = new Draggable(draggableEl, {
      itemSelector: ".fc-event",
      eventData: function (eventEl) {
        let title = eventEl.getAttribute("title");
        let id = eventEl.getAttribute("data");
        let color = eventEl.getAttribute("color");
        return {
          title: title,
          id: id,
          color: color,
        };
      },
    });

    return () => {
      draggable.destroy();
    };
  }, []);

  useEffect(() => {
    handleGetDataTemplateAgenda();
    if (currentTabCalendar !== "dayGridMonth") {
      getDataCalender(user.id).then((res) => {
        if (res) {
          const data = res.map((item) => {
            let validEnd = new Date(item.end);
            validEnd.setHours(validEnd.getHours() + 1);
            return {
              id: item.id,
              title: item.title,
              start: new Date(item.start),
              end: new Date(
                new Date(item.start).getDate() === new Date(item.end).getDate()
                  ? item.end
                  : validEnd.getHours() === 1
                  ? validEnd
                  : item.end
              ),
              color: item.color,
              allDay:
                new Date(item.start).getTime() === new Date(item.end).getTime()
                  ? true
                  : false,
            };
          });
          setCalendarEvents(data ? data : []);
        }
      });
    } else {
      getDataCalender(user.id).then((res) => {
        if (res) {
          const data = res.map((item) => {
            let validEnd = new Date(item.end);
            validEnd.setDate(validEnd.getDate() + 1);

            return {
              id: item.id,
              title: item.title,
              start: new Date(item.start),
              end: new Date(validEnd),
              color: item.color,
              allDay: true,
            };
          });
          setCalendarEvents(data ? data : []);
        }
      });
    }
  }, [currentTabCalendar]);

  return (
    <div>
      <TambahAktivitasModal
        handleRefresh={() => {
          setToggleRefreshAktifitas(!toggleRefreshAktifitas);
        }}
      />
      <DetailCalendarModal
        handleRefresh={handleRefreshAgenda}
        user={user}
        eventClick={eventClickCalendar}
      />
      <div className="wrapper">
        <div className="content-wrapper">
          <section className="content-header">
            <div className="container-fluid">
              <div style={{ gap: "1rem" }} className="row mb-2 p-2">
                <div className="">
                  <h1 className="judul-menu nama">Ruang Agenda</h1>
                </div>
                <div className="p-0">
                  <ActionButton
                    className="btn-block nama"
                    text=" Buat Aktivitas Hari Ini
                    "
                    icon="fas fa-plus"
                    dataToggle="modal"
                    dataTarget="#modal-tambah-aktivitas"
                  />
                </div>
              </div>
            </div>
          </section>
          <section className="content mb-2">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-3">
                  <div className="sticky-top mb-3">
                    <BuatAgenda
                      onChangeNama={handleCreateAgenda("nama")}
                      onSubmit={handleSubmitTemplateAgenda}
                      disabled={
                        dataDragAgenda.color === "" ||
                        dataDragAgenda.nama === ""
                          ? true
                          : false
                      }
                      onChangeColor={handleSetColor}
                    />
                    <div className="card">
                      <div className="card-header">
                        <h4 className="card-title">Template Agenda</h4>
                      </div>
                      <div className="card-body">
                        <div
                          id="external-events"
                          style={{
                            width: "100%",
                            height: "auto",
                            maxHeight: "200px",
                            overflow: "hidden",
                            overflowY: "scroll",
                          }}
                        >
                          {dataTemplateAgenda?.map((event, i) => (
                            <div
                              style={{
                                backgroundColor: event.color,
                                color: "#ffffff",
                              }}
                              className={`fc-event external-event `}
                              title={event.nama}
                              data={event.id}
                              color={event.color}
                              key={i}
                            >
                              {event.nama}
                            </div>
                          ))}
                        </div>
                        <div className="d-flex flex-row mt-2">
                          <input
                            type="checkbox"
                            onChange={handleCheckboxChange}
                          />
                          <label className="text-xs ml-1">
                            hapus yang didrag?
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-9">
                  <div className="card card-primary">
                    <div className="card-body p-0">
                      <div className="demo-app-calendar" id="mycalendartest">
                        {calendarEvent && (
                          <FullCalendar
                            datesSet={handleChangeTabCalendar}
                            plugins={[
                              dayGridPlugin,
                              timeGridPlugin,
                              interactionPlugin,
                            ]}
                            initialView={"dayGridMonth"}
                            headerToolbar={{
                              start: "today prev,next",
                              center: "title",
                              end: "dayGridMonth,timeGridWeek,timeGridDay",
                            }}
                            height={"90vh"}
                            rerenderDelay={10}
                            eventDurationEditable={true}
                            editable={true}
                            eventStartEditable={true}
                            droppable={true}
                            eventResizableFromStart={true}
                            events={calendarEvent}
                            eventClick={handleCalendarEventClick}
                            eventReceive={handleCalendarEventReceive}
                            eventResize={handleCalendarEventUpdate}
                            eventDrop={handleCalendarEventUpdate}
                            dateClick={handleCalendarEventClick}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="content">
            <Aktifitas user={user} toggleRefresh={toggleRefreshAktifitas} />
          </section>
        </div>
      </div>
    </div>
  );
};

export default Index;
