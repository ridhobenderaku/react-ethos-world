import Swal from "sweetalert2";

import { baseURlPost, baseURlView } from "./baseAPI";

export const getDataAgenda = async (id) => {
  try {
    const data = await baseURlView.get(
      `agenda/all/${id}?page=1&limit=100&search=`
    );

    return data.data.data;
  } catch (error) {}
};

export const getDataAgendaById = async (id) => {
  try {
    const data = await baseURlView.get(
      `agenda/getitem/${id}?page=1&limit=100&search=`
    );

    return data.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const tambahAgenda = async (body) => {
  try {
    const form = new FormData();
    form.append("nama", body.nama);
    form.append("authId", body.authId);
    form.append("color", body.color);

    const data = await baseURlPost.post("agenda/create", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    Swal.fire({
      position: "center",
      icon: data.data.status === "success" ? "success" : "error",
      title: data.data.message,
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
    return data;
  } catch (error) {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Oops...",
      text: error,
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

export const updateAgenda = async (authId, id, tglAwal, tglAkhir) => {
  try {
    const validTgl = tglAkhir === undefined ? tglAwal : tglAkhir;
    const form = new FormData();
    form.append("authId", authId);
    form.append("id", id);
    form.append("tglAwal", tglAwal);
    form.append("tglAkhir", validTgl);

    const data = await baseURlPost.post("agenda/update", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const getDataCalender = async (id) => {
  try {
    const data = await baseURlView.get(
      `/agenda/all/${id}?page=1?&limit=1000&search=`
    );

    return data.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const getDataTemplateAgenda = async (id) => {
  try {
    const hasil = await baseURlView.get(
      `agenda/alltemplate/${id}page=1?&limit=1000&search=`
    );
    return hasil.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const buatAgenda = async (
  authId,
  nama,
  tglAwal,
  tglAkhir,
  color,
  deleted,
  id,
  mode
) => {
  try {
    const validTgl = tglAkhir === undefined ? tglAwal : tglAkhir;
    const form = new FormData();
    form.append("authId", authId);
    form.append("nama", nama);
    form.append("tglAwal", tglAwal);
    form.append("tglAkhir", validTgl);
    form.append("color", color);
    form.append("delete", deleted);
    form.append("id", id);
    form.append("mode", mode);

    const data = await baseURlPost.post("agenda/agenda", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteAgenda = async (id) => {
  try {
    const form = new FormData();
    form.append("id", id);
    const data = await baseURlPost.post("agenda/delete", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    Swal.fire({
      position: "center",
      icon: data.data.status === "success" ? "success" : "error",
      title: data.data.message,
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
    return data;
  } catch (error) {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Oops...",
      text: error,
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

export const tambahAktifitas = async (authId, nama, tgl, deskripsi, file) => {
  try {
    const form = new FormData();
    form.append("authId", authId);
    form.append("nama", nama);
    form.append("tgl", tgl);
    form.append("deskripsi", deskripsi);
    form.append("file", JSON.stringify(file ? file : []));

    const data = await baseURlPost.post("agenda/aktifitas", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    Swal.fire({
      position: "center",
      icon: data.data.status === "success" ? "success" : "error",
      title: data.data.message,
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
    return data;
  } catch (error) {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Oops...",
      text: error,
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

export const editAktifitas = async (id, nama, tgl, deskripsi, file) => {
  try {
    const form = new FormData();
    form.append("id", id);
    form.append("nama", nama);
    form.append("tgl", tgl);
    form.append("deskripsi", deskripsi);
    form.append("file", JSON.stringify(file ? file : []));

    const data = await baseURlPost.post("agenda/editaktifitas", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    Swal.fire({
      position: "center",
      icon: data.data.status === "success" ? "success" : "error",
      title: data.data.message,
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
    return data;
  } catch (error) {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Oops...",
      text: error,
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

export const getDataAktivitas = async (
  type,
  page,
  id,
  limit,
  startDate,
  endDate,
  search
) => {
  try {
    const data = await baseURlView.get(
      `aktivitas/getall/${type}/${id}?page=${page}&limit=${limit}&search=${search}`
    );
    return data.data;
  } catch (error) {
    console.log(error);
  }
};

export const getDataAktivitasById = async (id) => {
  try {
    const data = await baseURlView.get(`aktivitas/getdetail/${id}`);
    return data.data;
  } catch (error) {
    console.log(error);
  }
};
export const deleteDataAktivitas = async (id) => {
  try {
    const form = new FormData();
    form.append("id", id);

    const data = await baseURlPost.post("agenda/delete", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    Swal.fire({
      position: "center",
      icon: data.data.status === "success" ? "success" : "error",
      title: data.data.message,
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
    return data;
  } catch (error) {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Oops...",
      text: error,
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
