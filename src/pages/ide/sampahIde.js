import React, { useEffect, useState, useContext } from "react";
import { deletePermanenIde, getAllDataIde } from "../../api/ideApi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { ReactContext } from "../../context/AuthProvider";
import { Table } from "../../components/table/table";
import { BoxControls } from "../../components/table/boxControls";
import { HeaderTableIde } from "../../components/ide/table/headerTableIde";
import TableIsiIde from "../../components/ide/table/tableIsiIde";
import TitleTableIde from "../../components/ide/table/titleTableIde";
import { base64ToBytes, bytesToBase64 } from "../../utils/encodeDecode";

const headerMenu = [
  {
    title: "Sampah",
    icon: "fas fa-trash-alt",
  },
];

const titleTable = [
  { title: "", style: "default" },
  { title: "Judul Ide", style: "title" },
  { title: "Isi Ide", style: "description" },
  { title: "Pemilik Ide", style: "author" },
  { title: "", style: "default" },
  { title: "Tanggal", style: "date" },
];

export default function SampahIde() {
  const navigate = useNavigate();
  const { user } = useContext(ReactContext);
  const [activeTab, setActiveTab] = useState("Sampah");
  const [dataTable, setDataTable] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedIde, setSelectedIde] = useState([]);
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [resetCheck, setResetCheck] = useState(false);

  const handleIncrementPages = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleDecrementPages = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const addDataSessionStorage = (data, page, totalPage) => {
    if (!sessionStorage.getItem("ide")) {
      sessionStorage.setItem(
        "ide",
        bytesToBase64(
          new TextEncoder().encode(
            JSON.stringify({
              sampahIde: { data: data, page: page, totalPage: totalPage },
            })
          )
        )
      );
    } else {
      let ide = JSON.parse(
        new TextDecoder().decode(base64ToBytes(sessionStorage.getItem("ide")))
      );
      ide["sampahIde"] = {
        data: { data: data, page: page, totalPage: totalPage },
      };
      sessionStorage.setItem(
        "ide",
        bytesToBase64(new TextEncoder().encode(JSON.stringify(ide)))
      );
    }
  };
  const getDataIdeServer = async () => {
    if (activeTab === "Sampah") {
      const data = await getAllDataIde(
        user.id,
        currentPage,
        10,
        0,
        0,
        "sampah",
        search
      );
      if (data) {
        setDataTable(data.data);
        setTotalPages(data.totalPages);
        setCurrentPage(data.page === 0 ? 1 : data.page);
        addDataSessionStorage(
          data.data,
          data.page === 0 ? 1 : data.page,
          data.totalPages
        );
      }
    }
  };
  const getData = async () => {
    if (!sessionStorage.getItem("ide")) {
      getDataIdeServer();
    } else {
      const data = JSON.parse(
        new TextDecoder().decode(base64ToBytes(sessionStorage.getItem("ide")))
      );
      if (data.sampahIde) {
        if (currentPage === 0 || currentPage === data.sampahIde.data.page) {
          setDataTable(data.sampahIde.data.data);
          setTotalPages(data.sampahIde.data.totalPage);
          setCurrentPage(data.sampahIde.data.page);
        } else getDataIdeServer();
      } else getDataIdeServer();
    }
  };

  const handleRefresh = () => {
    getDataIdeServer();
  };

  const handleCheckboxChange = (id, index, isChecked) => {
    const currentIde = dataTable[index];
    if (isChecked) {
      setSelectedIde([
        ...selectedIde,
        {
          id: currentIde.idnyaide,
          authId: user.id,
        },
      ]);
    } else {
      setSelectedIde(selectedIde.filter((selectedId) => selectedId.id !== id));
    }
  };
  const handleSelectAll = () => {
    const allIde = dataTable.map((item) => {
      return { id: item.idnyaide, authId: user.id };
    });

    if (isAllChecked) {
      setSelectedIde([]);
    } else {
      setSelectedIde(allIde);
    }
    setIsAllChecked(!isAllChecked);
  };

  const handleDeleteIde = async () => {
    const res = await deletePermanenIde(selectedIde);
    if (res && res.data.code === 200) {
      getDataIdeServer();
      setSelectedIde([]);
      setResetCheck(!resetCheck);
    }
  };

  const confirmDeleteIde = () => {
    if (selectedIde.length > 0) {
      Swal.fire({
        title: "Apakah anda yakin?",
        text: "ingin menghapus ide selamanya",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, Hapus Selamanya!",
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
          handleDeleteIde();
        }
      });
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "tidak ada ide terseleksi",
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: "popup-alert-small",
          icon: "icon",
          title: "title",
          htmlContainer: "htmlContainer",
          confirmButton: "btn",
          denyButton: "btn",
          cancelButton: "btn",
        },
      });
    }
  };

  const handleDetail = (id) => {
    navigate(`./${id}`);
  };

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    getDataIdeServer();
  };

  useEffect(() => {
    getDataIdeServer();
  }, [currentPage, activeTab]);

  return (
    <div className='col-md-9'>
      <Table
        Header={
          <>
            <HeaderTableIde
              headerMenu={headerMenu}
              setActiveTab={setActiveTab}
              handleSearch={handleSearch}
              search={search}
              setSearch={setSearch}
            />
            <BoxControls
              handleSelectAll={handleSelectAll}
              handleDeleteItem={confirmDeleteIde}
              handleRefresh={handleRefresh}
              handleIncrementPages={handleIncrementPages}
              handleDecrementPages={handleDecrementPages}
              handleChangePage={handleChangePage}
              currentPage={currentPage}
              totalPages={totalPages}
            />
            {/* <div
              className='d-flex p-2 justify-content-center'
              style={{ backgroundColor: "#D8E6CF", gap: "15px" }}>
              <div>
                <p>
                  Sampah yang ada di sampah selama lebih dari 30 hari akan di
                  hapus secara otomatis
                </p>
              </div>
              <div>
                <button className='btn btn-block btn-primary btn-xs p-2'>
                  <i className='fa fa-trash-alt' /> kosongkan Sampah
                </button>
              </div>
            </div> */}
          </>
        }
        Content={
          <>
            <TitleTableIde title={titleTable} />
            {dataTable &&
              dataTable.map((data, idx) => (
                <TableIsiIde
                  key={idx}
                  data={data}
                  isAllChecked={isAllChecked}
                  handleDetail={handleDetail}
                  handleCheckboxChange={handleCheckboxChange}
                  index={idx}
                  type='sampah'
                  user={user}
                  resetCheck={resetCheck}
                />
              ))}
          </>
        }
        Footer={
          <>
            <BoxControls
              handleSelectAll={handleSelectAll}
              handleDeleteItem={confirmDeleteIde}
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
  );
}
