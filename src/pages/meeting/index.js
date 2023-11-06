import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { ReactContext } from "../../context/AuthProvider";
import { Table } from "../../components/table/table";
import { HeaderTableMeeting } from "../../components/meeting/headerTableMeeting";
import {
  getDataAllMeetingSaya,
  getDataAllMeetingSelesai,
} from "../../api/meetingApi";
import Pagination from "../../components/pagination";
import { convertToDateTimeWithName } from "../../utils/dateConversion";
import "../../components/meeting/tableMeeting.css";
import { base64ToBytes, bytesToBase64 } from "../../utils/encodeDecode";
import { getUsers } from "../../api/pesanApi";

const headerMenu = [
  {
    title: "Meeting Saya",
    icon: "fas fa-list-alt",
  },
  {
    title: "Meeting Selesai",
    icon: "fas fa-book",
  },
  // {
  //   title: "Arsip",
  //   icon: "fas fa-archive",
  // },
];

const titleTable = [
  { title: "Judul Meeting", style: "judul" },
  { title: "Anggota Meeting", style: "anggota" },
  { title: "Lokasi/Link", style: "address" },
  { title: "Status", style: "status" },
  { title: "Jadwal", style: "date" },
];
const Meeting = () => {
  const { user } = useContext(ReactContext);

  const [activeTab, setActiveTab] = useState("Meeting Saya");
  const [dataMeeting, setDataMeeting] = useState([]);
  const navigate = useNavigate();
  const [totalPage, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const statusField = (tglAwal, tglAkhir) => {
    let dateAwalMeeting = new Date(tglAwal).getTime();
    let dateAkhirMeeting = new Date(tglAkhir).getTime();
    let currentDate = new Date().getTime();

    if (dateAwalMeeting < currentDate) {
      if (dateAkhirMeeting < currentDate) {
        return (
          <p
            style={{
              color: "#ffffff",
              backgroundColor: "#619a3f",
              textAlign: "center",
              width: "100%",
            }}
            className='p-1 rounded'>
            Selesai
          </p>
        );
      } else {
        return (
          <p
            style={{
              color: "#ffffff",
              backgroundColor: "rgb(97, 154, 63)",
              textAlign: "center",
              width: "100%",
            }}
            className='p-1 rounded'>
            Berlangsung
          </p>
        );
      }
    } else
      return (
        <p
          style={{
            backgroundColor: "#D9E021",
            textAlign: "center",
            width: "100%",
          }}
          className='p-1 rounded'>
          Akan datang
        </p>
      );
  };

  const isKontakMasuk = (data) => {
    let validasi = false;
    if (Number(data.idpembuat) === user.id) validasi = false;
    else if (data && data.Penerima) {
      data.Penerima.forEach((element) => {
        if (Number(element.id) === user.id) {
          if (element.read === "false") validasi = true;
        }
      });
    }

    return validasi;
  };
  const addDataSessionStorage = (data, page, totalPage) => {
    let dataMeetingTab = {};
    dataMeetingTab[activeTab.toLowerCase()] = {
      data: { data: data, page: page, totalPage: totalPage },
    };

    if (!sessionStorage.getItem("meeting")) {
      sessionStorage.setItem(
        "meeting",
        bytesToBase64(new TextEncoder().encode(JSON.stringify(dataMeetingTab)))
      );
    } else {
      let meeting = JSON.parse(
        new TextDecoder().decode(
          base64ToBytes(sessionStorage.getItem("meeting"))
        )
      );
      meeting[activeTab.toLowerCase()] = {
        data: { data: data, page: page, totalPage: totalPage },
      };
      sessionStorage.setItem(
        "meeting",
        bytesToBase64(new TextEncoder().encode(JSON.stringify(meeting)))
      );
    }
  };

  const getDataMeetingServer = async () => {
    let data;
    if (activeTab === "Meeting Saya")
      data = await getDataAllMeetingSaya(
        user.id,
        currentPage,
        10,
        0,
        0,
        search
      );
    else if (activeTab === "Meeting Selesai") {
      data = await getDataAllMeetingSelesai(
        user.id,
        currentPage,
        10,
        0,
        0,
        search
      );
    }
    if (data) {
      setDataMeeting(data.data);
      setTotalPages(data.totalPage);
      setCurrentPage(data.page === 0 ? 1 : data.page);
      addDataSessionStorage(
        data.data,
        data.page === 0 ? 1 : data.page,
        data.totalPage
      );
    }
  };

  const getData = async () => {
    if (!sessionStorage.getItem("meeting")) {
      getDataMeetingServer();
    } else {
      const data = JSON.parse(
        new TextDecoder().decode(
          base64ToBytes(sessionStorage.getItem("meeting"))
        )
      );
      if (data && data[activeTab.toLowerCase()]) {
        if (
          currentPage === 0 ||
          currentPage === data[activeTab.toLowerCase()].data.page
        ) {
          setDataMeeting(data[activeTab.toLowerCase()].data.data);
          setTotalPages(data[activeTab.toLowerCase()].data.totalPage);
          setCurrentPage(data[activeTab.toLowerCase()].data.page);
        } else {
          getDataMeetingServer();
        }
      } else getDataMeetingServer();
    }
  };

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  const handleDetail = (id) => {
    navigate(`/meeting/${id}`);
  };
  const handleRefresh = () => {
    getDataMeetingServer();
    getUsers().then((res) => {
      if (res) {
        sessionStorage.setItem("dataUsers", btoa(JSON.stringify(res)));
      }
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    getDataMeetingServer();
  };

  useEffect(() => {
    if (activeTab !== null) getDataMeetingServer();
  }, [currentPage, activeTab]);

  return (
    <>
      <div className='content-wrapper px-2 py-0'>
        <section className='content-header'>
          <h1 className='nama'>Ruang Meeting</h1>
        </section>

        <Table
          Header={
            <>
              <HeaderTableMeeting
                handleRefresh={handleRefresh}
                headerMenu={headerMenu}
                setActiveTab={setActiveTab}
                search={search}
                handleSearch={handleSearch}
                setSearch={setSearch}
              />
            </>
          }
          Content={
            <>
              <tr className='table-meeting header'>
                {titleTable.map((item, index) => (
                  <th key={index} className={item.style}>
                    {item.title}
                  </th>
                ))}
              </tr>
              {dataMeeting &&
                dataMeeting.map((data, index) => (
                  <tr
                    className={`table-meeting content-hover ${
                      isKontakMasuk(data) ? "bg-light" : "bg-pesan-dark"
                    }`}
                    key={index}
                    onClick={(e) => {
                      e.preventDefault();
                      handleDetail(data.id);
                    }}>
                    <td className='text-truncate judul '>{data.judul}</td>
                    <td className='anggota'>
                      <ul className='list-inline  d-flex align-items-center'>
                        <li key={index} className='list-inline-item'>
                          <img
                            className='direct-chat-img'
                            src='https://adminlte.io/themes/v3/dist/img/avatar.png'
                            alt='A'
                          />
                        </li>
                        {data.Penerima &&
                          data.Penerima.length > 0 &&
                          data.Penerima.map((element, index) =>
                            index < 3 ? (
                              <li key={index} className='list-inline-item'>
                                <img
                                  className='direct-chat-img'
                                  src='https://adminlte.io/themes/v3/dist/img/avatar.png'
                                  alt='A'
                                />
                              </li>
                            ) : (
                              index === data.Penerima.length - 1 && (
                                <li
                                  style={{
                                    backgroundColor: "#619a3f",
                                    color: "white",
                                  }}
                                  key={index}
                                  className='list-inline-item rounded-circle px-3 py-2'>
                                  {data.Penerima.length + 1}
                                </li>
                              )
                            )
                          )}
                      </ul>
                    </td>
                    <td className='text-truncate address '>
                      {data.atribut[0].alamat}
                    </td>
                    <td className=' text-nowrap status'>
                      {statusField(data.tglAwal, data.tglAkhir)}
                    </td>
                    <td className=' text-nowrap date'>
                      {`${convertToDateTimeWithName(
                        new Date(data.tglAwal)
                      )} || ${new Date(
                        data.tglAwal
                      ).toLocaleTimeString()} - ${new Date(
                        data.tglAkhir
                      ).toLocaleTimeString()} `}
                    </td>
                  </tr>
                ))}
            </>
          }
          Footer={
            <div className='mb-5 mt-2 mx-2'>
              <Pagination
                total={totalPage}
                current={currentPage}
                pagination={(crPage) => handleChangePage(crPage)}
              />
            </div>
          }
        />
      </div>
    </>
  );
};

export default Meeting;
