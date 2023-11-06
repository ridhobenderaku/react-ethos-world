import React, { useEffect, useState, useContext } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

import {
  getDataAllPesanByType,
  hapusPesanBerbintang,
} from "../../api/pesanApi";
import { deletePesan, setPesanBerbintang, bacaPesan } from "../../api/pesanApi";
import { ReactContext } from "../../context/AuthProvider";
import { Table } from "../../components/table/table";
import { BoxControls } from "../../components/table/boxControls";
import { HeaderTablePesan } from "../../components/pesan/table/headerTablePesan";
import { getAllMemoByType } from "../../api/memoApi";
import TableIsiPesan from "../../components/pesan/table/tableIsiPesan";
import TableIsiMemo from "../../components/memo/tabel/tableIsiMemo";
import { base64ToBytes, bytesToBase64 } from "../../utils/encodeDecode";
import TitleTablePesan from "../../components/pesan/table/titleTablepesan";

const headerMenu = [
  {
    title: "Pesan",
    icon: "fas fa-envelope",
  },
  {
    title: "Memo",
    icon: "fas fa-book",
  },
];

const titleTablePesan = [
  { title: "", style: "default" },
  { title: "", style: "default" },
  { title: "Nama Pengirim", style: "pengirim" },
  { title: "Subjek Pesan", style: "subject" },
  { title: "Isi Pesan", style: "isi" },
  { title: "Tanggal", style: "date" },
];

const titleTableMemo = [
  { title: "Nama Pengirim", style: "author" },
  { title: "Perihal Memo", style: "perihal" },
  { title: "Isi Memo", style: "isi" },
  { title: "Tanggal", style: "date" },
];

export default function KontakMasukPesan() {
  const navigate = useNavigate();
  const { user, setNotifikasi } = useContext(ReactContext);
  const [activeTab, setActiveTab] = useState("Pesan");
  const [dataTable, setDataTable] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedPesan, setSelectedPesan] = useState([]);
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [resetCheck, setResetCheck] = useState(false);
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
    if (!sessionStorage.getItem("pesan")) {
      sessionStorage.setItem(
        "pesan",
        activeTab === "Pesan"
          ? bytesToBase64(
              new TextEncoder().encode(
                JSON.stringify({
                  kontakMasuk: {
                    pesan: {
                      data: { data: data, page: page, totalPage: totalPage },
                    },
                  },
                })
              )
            )
          : bytesToBase64(
              new TextEncoder().encode(
                JSON.stringify({
                  kontakMasuk: {
                    memo: {
                      data: { data: data, page: page, totalPage: totalPage },
                    },
                  },
                })
              )
            )
      );
    } else {
      let pesan = JSON.parse(
        new TextDecoder().decode(base64ToBytes(sessionStorage.getItem("pesan")))
      );
      if (!pesan.kontakMasuk) {
        pesan =
          activeTab === "Pesan"
            ? {
                ...pesan,
                kontakMasuk: {
                  pesan: {
                    data: { data: data, page: page, totalPage: totalPage },
                  },
                },
              }
            : {
                ...pesan,
                kontakMasuk: {
                  memo: {
                    data: { data: data, page: page, totalPage: totalPage },
                  },
                },
              };
      } else
        pesan["kontakMasuk"][activeTab.toLocaleLowerCase()] = {
          data: { data: data, page: page, totalPage: totalPage },
        };

      sessionStorage.setItem(
        "pesan",
        bytesToBase64(new TextEncoder().encode(JSON.stringify(pesan)))
      );
    }
  };

  const sortirPesan = (data) => {
    const newData = data;

    if (data.komentar && data.komentar.length > 0) {
      for (let index = data.komentar.length; index > 0; index--) {
        if (data.komentar[index - 1].nama !== user.fullname) {
          newData.isi = data.komentar[index - 1].isi;
          newData.pemilik[0] = {
            id: data.pemilik[0].id,
            nama: data.komentar[data.komentar.length - 1].nama,
          };
          return newData;
        }
      }
    }

    return newData;
  };

  const getDataPesanServer = async () => {
    let data;
    if (activeTab === "Pesan") {
      data = await getDataAllPesanByType(
        user.id,
        currentPage,
        10,
        0,
        0,
        "kontakmasuk",
        search
      );
    } else {
      data = await getAllMemoByType(
        user.id,
        currentPage,
        "bagikan",
        10,
        0,
        0,
        search
      );
    }
    if (data) {
      const validData = data.data?.filter(
        (item) => item.namapembuat !== user.fullname
      );
      setDataTable(validData);
      setTotalPages(data.totalPage);
      setCurrentPage(data.page === 0 ? 1 : data.page);
      addDataSessionStorage(
        validData,
        data.page === 0 ? 1 : data.page,
        data.totalPage
      );
    }
  };
  const getData = async () => {
    if (activeTab === "Pesan") {
      if (!sessionStorage.getItem("pesan")) {
        getDataPesanServer();
      } else {
        const data = JSON.parse(
          new TextDecoder().decode(
            base64ToBytes(sessionStorage.getItem("pesan"))
          )
        );

        if (data.kontakMasuk && data.kontakMasuk.pesan) {
          if (
            currentPage === 0 ||
            currentPage === data.kontakMasuk.pesan.data.page
          ) {
            setDataTable(data.kontakMasuk.pesan.data.data);
            setTotalPages(data.kontakMasuk.pesan.data.totalPage);
            setCurrentPage(data.kontakMasuk.pesan.data.page);
          } else getDataPesanServer();
        } else getDataPesanServer();
      }
    } else {
      if (!sessionStorage.getItem("pesan")) {
        getDataPesanServer();
      } else {
        const data = JSON.parse(
          new TextDecoder().decode(
            base64ToBytes(sessionStorage.getItem("pesan"))
          )
        );

        if (data.kontakMasuk && data.kontakMasuk.memo) {
          if (
            currentPage === 0 ||
            currentPage === data.kontakMasuk.memo.data.page
          ) {
            setDataTable(data.kontakMasuk.memo.data.data);
            setTotalPages(data.kontakMasuk.memo.data.totalPage);
            setCurrentPage(data.kontakMasuk.memo.data.page);
          } else getDataPesanServer();
        } else getDataPesanServer();
      }
    }
  };

  const handleRefresh = () => {
    getDataPesanServer();
  };

  const handlePesanBerbintang = async (index, idpesan, isBerbintang) => {
    let resp;
    if (isBerbintang)
      resp = await hapusPesanBerbintang(idpesan, user.id, user.fullname);
    else resp = await setPesanBerbintang(idpesan, user.id, user.fullname);
    if (resp && resp.code === 200) {
      const updatedDataTable = dataTable;
      const updatedPesan = updatedDataTable[index];
      updatedPesan.berbintang = isBerbintang ? 0 : 1;
      updatedDataTable[index] = updatedPesan;
      setDataTable(updatedDataTable);
      addDataSessionStorage(dataTable, currentPage, totalPages);
    }
  };

  const handleCheckboxChange = (id, index, isChecked) => {
    const currentPesan = dataTable[index];
    if (isChecked) {
      setSelectedPesan([
        ...selectedPesan,
        { id: currentPesan.idpesan, authId: user.id, username: user.fullname },
      ]);
    } else {
      setSelectedPesan(selectedPesan.filter((selected) => selected.id !== id));
    }
  };
  const handleSelectAll = () => {
    const allPesan = dataTable.map((item, index) => {
      return { id: item.idpesan, authId: user.id, username: user.fullname };
    });

    if (isAllChecked) {
      setSelectedPesan([]);
    } else {
      setSelectedPesan(allPesan);
    }
    setIsAllChecked(!isAllChecked);
  };
  const handleDeletePesan = async () => {
    const res = await deletePesan(selectedPesan);
    if (res && res.code === 200) {
      getData();
      setSelectedPesan([]);
      setResetCheck(!resetCheck);
      getDataPesanServer();
    }
  };
  const handleBacaPesan = async (id) => {
    const res = await bacaPesan(id, user.id);
    if (res && res === 200) {
      setNotifikasi((prev) => {
        return {
          ...prev,
          pesan: prev.pesan === 1 || prev.pesan === 0 ? 0 : prev.pesan - 1,
        };
      });
    }
  };

  const confirmDeletePesan = () => {
    if (selectedPesan.length > 0) {
      Swal.fire({
        title: "Apakah anda yakin?",
        text: "ingin menghapus pesan",
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
          handleDeletePesan();
        }
      });
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: `tidak ada ${activeTab.toLowerCase()} terseleksi`,
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
    if (activeTab === "Pesan") {
      navigate(`./pesan/${id}`);
      handleBacaPesan(id);
    } else {
      navigate(`./memo/${id}`);
    }
  };

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };
  const handleChangeTab = (nextTab) => {
    setDataTable(null);
    setSelectedPesan([]);
    setActiveTab(nextTab);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    getDataPesanServer();
  };
  useEffect(() => {
    getDataPesanServer();
  }, [currentPage, activeTab]);

  return (
    <div className='col-md-9'>
      <Table
        Header={
          <>
            <HeaderTablePesan
              headerMenu={headerMenu}
              setActiveTab={handleChangeTab}
              handleSearch={handleSearch}
              search={search}
              activeTab={activeTab}
              setSearch={setSearch}
            />
            <BoxControls
              handleSelectAll={handleSelectAll}
              handleDeleteItem={
                activeTab === "Pesan" ? confirmDeletePesan : null
              }
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
            {dataTable && (
              <>
                <TitleTablePesan
                  title={
                    activeTab === "Pesan" ? titleTablePesan : titleTableMemo
                  }
                />
                {dataTable.map((data, idx) => {
                  return activeTab === "Pesan" ? (
                    <TableIsiPesan
                      user={user}
                      type='kontakmasuk'
                      key={idx}
                      index={idx}
                      data={sortirPesan(data)}
                      handleCheckboxChange={handleCheckboxChange}
                      isAllChecked={isAllChecked}
                      handleDetail={handleDetail}
                      handlePesanBerbintang={handlePesanBerbintang}
                      resetCheck={resetCheck}
                    />
                  ) : (
                    <TableIsiMemo
                      key={idx}
                      index={idx}
                      data={data}
                      activeTab={"kontakmasuk"}
                      handleDetail={handleDetail}
                      handleCheckboxChange={handleCheckboxChange}
                      isAllChecked={isAllChecked}
                    />
                  );
                })}
              </>
            )}
          </>
        }
        Footer={
          <>
            <BoxControls
              handleSelectAll={handleSelectAll}
              handleDeleteItem={
                activeTab === "Pesan" ? confirmDeletePesan : null
              }
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
