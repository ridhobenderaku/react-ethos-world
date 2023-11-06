import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { ReactContext } from "../../../context/AuthProvider";
import { getAllMemoByType } from "../../../api/memoApi";
import { Table } from "../../../components/table/table";
import { HeaderTableMemo } from "../../../components/memo/tabel/HeaderTableMemo";
import { BoxControls } from "../../../components/table/boxControls";
import TableIsiMemo from "../../../components/memo/tabel/tableIsiMemo";
import TitleTableMemo from "../../../components/memo/tabel/titleTableMemo";
import { base64ToBytes, bytesToBase64 } from "../../../utils/encodeDecode";

const headerTitle = {
  name: "Arsip",
  icon: "fas fa-archive",
};

const titleTable = [
  { title: "Status", style: "status" },
  { title: "Dibuat Oleh", style: "aproval" },
  { title: "Perihal Memo", style: "perihal" },
  { title: "Isi Memo", style: "isi" },
  { title: "Tanggal", style: "date" },
];

const ArsipMemo = () => {
  const navigate = useNavigate();
  const { user } = useContext(ReactContext);
  const [dataMemoArsip, setdataMemoArsip] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const handleIncrementPages = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleDecrementPages = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const addDataSessionStorage = (data, page, totalPage) => {
    if (!sessionStorage.getItem("memo")) {
      sessionStorage.setItem(
        "memo",
        bytesToBase64(
          new TextEncoder().encode(
            JSON.stringify({
              arsip: { data: data, page: page, totalPage: totalPage },
            })
          )
        )
      );
    } else {
      let memo = JSON.parse(
        new TextDecoder().decode(base64ToBytes(sessionStorage.getItem("memo")))
      );
      memo["arsip"] = {
        data: { data: data, page: page, totalPage: totalPage },
      };
      sessionStorage.setItem(
        "memo",
        bytesToBase64(new TextEncoder().encode(JSON.stringify(memo)))
      );
    }
  };
  const getDataMemoServer = async () => {
    const data = await getAllMemoByType(
      user.id,
      currentPage,
      "arsip",
      10,
      0,
      0,
      search
    );
    if (data) {
      setdataMemoArsip(data.data);
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
    if (!sessionStorage.getItem("memo")) {
      getDataMemoServer();
    } else {
      const data = JSON.parse(
        new TextDecoder().decode(base64ToBytes(sessionStorage.getItem("memo")))
      );
      if (data.arsip) {
        if (currentPage === 0 || currentPage === data.arsip.data.page) {
          setdataMemoArsip(data.arsip.data.data);
          setTotalPages(data.arsip.data.totalPage);
          setCurrentPage(data.arsip.data.page);
        } else getDataMemoServer();
      } else getDataMemoServer();
    }
  };

  const handleRefresh = () => {
    getDataMemoServer();
  };

  const handleDetail = (id) => {
    navigate(`./${id}`);
  };

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    getDataMemoServer();
  };

  useEffect(() => {
    getDataMemoServer();
  }, [currentPage]);

  return (
    <>
      <div className='col-md-9'>
        <Table
          Header={
            <>
              <HeaderTableMemo
                title={headerTitle}
                handleSearch={handleSearch}
                search={search}
                setSearch={setSearch}
              />
              <BoxControls
                handleRefresh={handleRefresh}
                handleIncrementPages={handleIncrementPages}
                handleDecrementPages={handleDecrementPages}
                handleChangePage={handleChangePage}
                currentPage={currentPage}
                totalPages={totalPages}
              />
            </>
          }
          Content={
            <>
              <TitleTableMemo title={titleTable} />

              {dataMemoArsip &&
                dataMemoArsip.map((data, idx) => (
                  <TableIsiMemo
                    key={idx}
                    index={idx}
                    data={data}
                    activeTab={"arsipAproval"}
                    handleDetail={handleDetail}
                  />
                ))}
            </>
          }
          Footer={
            <>
              <BoxControls
                handleRefresh={handleRefresh}
                handleIncrementPages={handleIncrementPages}
                handleDecrementPages={handleDecrementPages}
                handleChangePage={handleChangePage}
                currentPage={currentPage}
                totalPages={totalPages}
              />
            </>
          }
        />
      </div>
    </>
  );
};

export default ArsipMemo;
