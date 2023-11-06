import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { ReactContext } from "../../context/AuthProvider";
import {
  getDataProjectSaya,
  getDataProjectSelesai,
} from "../../api/projectApi";
import { Table } from "../../components/table/table";
import { HeaderTableProject } from "../../components/project/headerTableProject";
import ProgesBar from "../../components/project/progesBar";
import Pagination from "../../components/pagination";
import { convertToDateTimeWithName } from "../../utils/dateConversion";
import "../../components/project/tableProject.css";
import { base64ToBytes, bytesToBase64 } from "../../utils/encodeDecode";
import { getUsers } from "../../api/pesanApi";
const headerMenu = [
  {
    title: "Project Saya",
    icon: "fas fa-list-alt",
  },
  {
    title: "Project Selesai",
    icon: "fas fa-book",
  },
  // {
  //   title: "Arsip",
  //   icon: "fas fa-archive",
  // },
];

const titleTable = [
  { title: "Nama Project", style: "judul" },
  { title: "Tim Member", style: "anggota" },
  { title: "Progress", style: "progges" },
  { title: "Status", style: "status" },
  { title: "Timeline", style: "date" },
];
const Index = () => {
  const { user } = useContext(ReactContext);
  const [activeTab, setActiveTab] = useState("Project Saya");
  const [dataProject, setDataProject] = useState([]);
  const [totalPage, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleDetail = (id) => {
    navigate(`/project/${id}`);
  };

  const addDataSessionStorage = (data, page, totalPage) => {
    let dataProjectTab = {};
    dataProjectTab[activeTab.toLowerCase()] = {
      data: { data: data, page: page, totalPage: totalPage },
    };

    if (!sessionStorage.getItem("project")) {
      sessionStorage.setItem(
        "project",
        bytesToBase64(new TextEncoder().encode(JSON.stringify(dataProjectTab)))
      );
    } else {
      let project = JSON.parse(
        new TextDecoder().decode(
          base64ToBytes(sessionStorage.getItem("project"))
        )
      );
      project[activeTab.toLowerCase()] = {
        data: { data: data, page: page, totalPage: totalPage },
      };
      sessionStorage.setItem(
        "project",
        bytesToBase64(new TextEncoder().encode(JSON.stringify(dataProjectTab)))
      );
    }
  };

  const getDataProjectServer = async () => {
    let data;
    if (activeTab === "Project Saya")
      data = await getDataProjectSaya(currentPage, user.id, 10, 0, 0, search);
    else if (activeTab === "Project Selesai") {
      data = await getDataProjectSelesai(
        currentPage,
        user.id,
        10,
        0,
        0,
        search
      );
    }
    if (data) {
      setDataProject(data.data);
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
    if (!sessionStorage.getItem("project")) {
      getDataProjectServer();
    } else {
      const data = JSON.parse(
        new TextDecoder().decode(
          base64ToBytes(sessionStorage.getItem("project"))
        )
      );
      if (data && data[activeTab.toLowerCase()]) {
        if (
          currentPage === 0 ||
          currentPage === data[activeTab.toLowerCase()].data.page
        ) {
          setDataProject(data[activeTab.toLowerCase()].data.data);
          setTotalPages(data[activeTab.toLowerCase()].data.totalPage);
          setCurrentPage(data[activeTab.toLowerCase()].data.page);
        } else {
          getDataProjectServer();
        }
      } else getDataProjectServer();
    }
  };

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  const handleRefresh = (page) => {
    getDataProjectServer();
    getUsers().then((res) => {
      if (res) {
        sessionStorage.setItem("dataUsers", btoa(JSON.stringify(res)));
      }
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    getDataProjectServer();
  };

  const isKontakMasuk = (data) => {
    let validasi = false;
    if (data.pembuat === user.fullname) validasi = false;
    else {
      data.anggota.forEach((element) => {
        if (Number(element.id) === user.id) {
          if (element.read === "false") {
            validasi = true;
          }
        }
      });
    }
    return validasi;
  };

  useEffect(() => {
    if (activeTab !== null) getDataProjectServer();
  }, [currentPage, activeTab]);

  return (
    <>
      <div className='content-wrapper px-2 py-0'>
        <section className='content-header'>
          <h1 className='nama'>Ruang Project</h1>
        </section>
        <Table
          Header={
            <>
              <HeaderTableProject
                handleRefresh={handleRefresh}
                headerMenu={headerMenu}
                setActiveTab={setActiveTab}
                search={search}
                handleSearch={handleSearch}
                setSearch={setSearch}
              />
            </>
          }
          Title={
            <tr className='table-project header'>
              {titleTable.map((item, i) => (
                <th key={i} className={item.style}>
                  {item.title}
                </th>
              ))}
            </tr>
          }
          Content={
            <>
              {dataProject &&
                dataProject.map((item, i) => (
                  <tr
                    className={`table-project content-hover ${
                      isKontakMasuk(item) ? "bg-light" : "bg-pesan-dark"
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleDetail(item.id);
                    }}
                    key={i}>
                    <td className='nama  text-truncate judul'>{item.judul}</td>
                    <td className='anggota'>
                      <ul className='list-inline d-flex align-items-center'>
                        <li className='list-inline-item '>
                          <img
                            className='direct-chat-img'
                            src='https://adminlte.io/themes/v3/dist/img/avatar.png'
                            alt='A'
                          />
                        </li>
                        {item.anggota.map((data, index) =>
                          index < 3 ? (
                            <li key={index} className='list-inline-item '>
                              <img
                                className='direct-chat-img'
                                src='https://adminlte.io/themes/v3/dist/img/avatar.png'
                                alt='A'
                              />
                            </li>
                          ) : (
                            index === item.anggota.length - 1 && (
                              <li
                                style={{
                                  backgroundColor: "#619a3f",
                                  color: "white",
                                }}
                                key={index}
                                className='list-inline-item rounded-circle px-3 py-2'>
                                {item.anggota.length + 1}
                              </li>
                            )
                          )
                        )}
                      </ul>
                    </td>
                    <td className='progges'>
                      <ProgesBar value={item.progres} />
                    </td>
                    <td className='status'>
                      <p
                        style={{
                          width: "100%",
                          textAlign: "center",
                          color:
                            item.sts === "ditugaskan" ? "#000000" : "#ffffff",
                          backgroundColor:
                            item.sts === "ditugaskan"
                              ? "#D9E021"
                              : item.sts === "dikerjakan"
                              ? "#87BD3D"
                              : item.sts === "revisi"
                              ? "#FE5050"
                              : "#28a745",
                        }}
                        className=' p-2 rounded'>
                        {item.sts}
                      </p>
                    </td>
                    <td className='date text-nowrap'>
                      {convertToDateTimeWithName(new Date(item.tglawal)) +
                        " - " +
                        convertToDateTimeWithName(new Date(item.tglakhir))}
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

export default Index;
