import React, { useState, useContext, useEffect } from "react";

import { ReactContext } from "../../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
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
  name: "Berbintang",
  icon: "fas fa-star",
};

const titleTable = [
  { title: "", style: "default" },
  { title: "Status", style: "status" },
  { title: "Dibuat Oleh", style: "aproval" },
  { title: "Perihal Memo", style: "perihal" },
  { title: "Isi Memo", style: "isi" },
  { title: "Tanggal", style: "date" },
];

const BerbintangMemo = () => {
  const navigate = useNavigate();
  const { user } = useContext(ReactContext);
  const [dataMemoBerbintang, setdataMemoBerbintang] = useState(null);
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
              berbintang: { data: data, page: page, totalPage: totalPage },
            })
          )
        )
      );
    } else {
      let memo = JSON.parse(atob(sessionStorage.getItem("memo")));
      memo["berbintang"] = {
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
      "bintang",
      10,
      0,
      0,
      search
    );
    if (data) {
      setdataMemoBerbintang(data.data);
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
      if (data.berbintang) {
        if (currentPage === 0 || currentPage === data.berbintang.data.page) {
          setdataMemoBerbintang(data.berbintang.data.data);
          setTotalPages(data.berbintang.data.totalPage);
          setCurrentPage(data.berbintang.data.page);
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

  const HandleMemoBerbintang = async (index, isBerbintang, id, noDokumen) => {
    let resp;
    if (isBerbintang === 1) {
      resp = await deleteMemoBerbintangById(id, noDokumen);
    } else {
      resp = await addMemoBerbintangById(id, noDokumen);
    }
    if (resp && resp.code === 200) {
      getDataMemoServer();
    }
  };

  const handleCheckboxChange = (id, index, isChecked) => {
    if (isChecked) {
      setSelectedIdData([...selectedIdData, id]);
    } else {
      setSelectedIdData(
        selectedIdData.filter((selectedId) => selectedId !== id)
      );
    }
  };

  const handleSelectAll = () => {
    const allIds = dataMemoBerbintang.map((item) => item.id);

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
              {dataMemoBerbintang &&
                dataMemoBerbintang.map((data, idx) => (
                  <TableIsiMemo
                    key={idx}
                    index={idx}
                    data={data}
                    activeTab={"berbintangAproval"}
                    handleDetail={handleDetail}
                    handleCheckboxChange={handleCheckboxChange}
                    isAllChecked={isAllChecked}
                    handleMemoBerbintang={HandleMemoBerbintang}
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

export default BerbintangMemo;
