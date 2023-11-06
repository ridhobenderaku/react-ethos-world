import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { ReactContext } from "../../../context/AuthProvider";
import {
  addMemoBerbintangById,
  deleteMemoBerbintangById,
  getAllMemoByType,
} from "../../../api/memoApi";
import { Table } from "../../../components/table/table";
import { HeaderTableMemo } from "../../../components/memo/tabel/HeaderTableMemo";
import { BoxControls } from "../../../components/table/boxControls";
import TableIsiMemo from "../../../components/memo/tabel/tableIsiMemo";
import TitleTableMemo from "../../../components/memo/tabel/titleTableMemo";
import { base64ToBytes, bytesToBase64 } from "../../../utils/encodeDecode";

const headerTitle = {
  name: "Disetujui",
  icon: "fas fa-file-signature",
};

const titleTable = [
  { title: "", style: "default" },
  { title: "Status", style: "status" },
  { title: "Disetujui Oleh", style: "aproval" },
  { title: "Perihal Memo", style: "perihal" },
  { title: "Isi Memo", style: "isi" },
  { title: "Tanggal", style: "date" },
];

const DisetujuiMemo = () => {
  const navigate = useNavigate();
  const { user } = useContext(ReactContext);
  const [dataMemoDisetujui, setdataMemoDisetujui] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedIdData, setSelectedIdData] = useState([]);
  const [isAllChecked, setIsAllChecked] = useState(false);
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
              disetujui: { data: data, page: page, totalPage: totalPage },
            })
          )
        )
      );
    } else {
      let memo = JSON.parse(
        new TextDecoder().decode(base64ToBytes(sessionStorage.getItem("memo")))
      );
      memo["disetujui"] = {
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
      "disetujui",
      10,
      0,
      0,
      search
    );
    if (data) {
      setdataMemoDisetujui(data.data);
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
      if (data.disetujui) {
        if (currentPage === 0 || currentPage === data.disetujui.data.page) {
          setdataMemoDisetujui(data.disetujui.data.data);
          setTotalPages(data.disetujui.data.totalPage);
          setCurrentPage(data.disetujui.data.page);
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

  const handleMemoBerbintang = async (index, isBerbintang, id, noDokumen) => {
    let resp;
    if (isBerbintang === 1) {
      resp = await deleteMemoBerbintangById(id, noDokumen);
    } else {
      resp = await addMemoBerbintangById(id, noDokumen);
    }

    if (resp && resp.code === 200) {
      const updatedDataTable = dataMemoDisetujui;
      const updatedPesan = updatedDataTable[index];
      updatedPesan.berbintang = isBerbintang === 1 ? 0 : 1;
      updatedDataTable[index] = updatedPesan;
      setdataMemoDisetujui(updatedDataTable);
      addDataSessionStorage(updatedDataTable, currentPage, totalPages);
    }
  };

  const handleCheckboxChange = (id, isChecked) => {
    if (isChecked) {
      setSelectedIdData([...selectedIdData, id]);
    } else {
      setSelectedIdData(
        selectedIdData.filter((selectedId) => selectedId !== id)
      );
    }
  };

  const handleSelectAll = () => {
    const allIds = dataMemoDisetujui.map((item) => item.id);

    if (isAllChecked) {
      setSelectedIdData([]);
    } else {
      setSelectedIdData(allIds);
    }
    setIsAllChecked(!isAllChecked);
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
                handleSelectAll={handleSelectAll}
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

              {dataMemoDisetujui &&
                dataMemoDisetujui.map((data, idx) => (
                  <TableIsiMemo
                    key={idx}
                    index={idx}
                    data={data}
                    activeTab={"Disetujui"}
                    handleDetail={handleDetail}
                    handleCheckboxChange={handleCheckboxChange}
                    handleMemoBerbintang={handleMemoBerbintang}
                    isAllChecked={isAllChecked}
                  />
                ))}
            </>
          }
          Footer={
            <>
              <BoxControls
                handleSelectAll={handleSelectAll}
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

export default DisetujuiMemo;
