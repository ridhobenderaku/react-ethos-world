import Swal from "sweetalert2";

import { baseURlPost, baseURlView } from "./baseAPI";

export const tambahProject = async (
  nama,
  deskripsi,
  tglAwal,
  tglAkhir,
  authId,
  tim,
  file
) => {
  try {
    const form = new FormData();
    form.append("nama", nama);
    form.append("deskripsi", deskripsi);
    form.append("tglawal", tglAwal);
    form.append("tglakhir", tglAkhir);
    form.append("sts", "ditugaskan");
    form.append("progress", "0");
    form.append("authId", authId);
    form.append("tim", JSON.stringify(tim));
    form.append("file", JSON.stringify(file ? file : []));
    form.append("editor", JSON.stringify([]));
    const data = await baseURlPost.post("project/create", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    tim.forEach((data) => {
      notif(data);
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

export const updateProject = async (
  id,
  authId,
  username,
  judul,
  deskripsi,
  tglAwal,
  tglAkhir,
  tim,
  file,
  status,
  proggress
) => {
  try {
    const form = new FormData();
    form.append("id", id);
    form.append("nama", judul);
    form.append(
      "editor",
      JSON.stringify([{ id: authId.toString(), nama: username }])
    );
    form.append("deskripsi", deskripsi);
    form.append("tglawal", tglAwal);
    form.append("tglakhir", tglAkhir);

    form.append("sts", status);
    form.append("progress", proggress);
    form.append("authId", authId);
    form.append("tim", JSON.stringify(tim));
    form.append("file", JSON.stringify(file ? file : []));

    const data = await baseURlPost.post("project/update", form, {
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

const notif = async (data) => {
  try {
    const resp = await baseURlView.get(
      `send-notifprojek/{"id":"${data.id}","read":"false"}/${data.id}`
    );
  } catch (error) {
    console.log(error);
  }
};

export const getDataProjectSaya = async (
  page,
  id,
  limit,
  startDate,
  endDate,
  search
) => {
  try {
    const data = await baseURlView.get(
      `projek/all/${id}?page=${page}&limit=${limit}&startDate=0&endDate=0&search=${search}`
    );
    return data.data;
  } catch (error) {
    console.log(error);
  }
};

export const getDataProjectSelesai = async (
  page,
  id,
  limit,
  startDate,
  endDate,
  search
) => {
  try {
    const data = await baseURlView.get(
      `projek/allselesai/${id}?page=${page}&limit=${limit}&startDate=0&endDate=0&search=${search}`
    );
    return data.data;
  } catch (error) {
    console.log(error);
  }
};

export const getProjectById = async (idProjek, idUser) => {
  try {
    const resp = await baseURlView.get(
      `projek/detail/${idProjek}?page=1&limit=10&search=&startDate=0&endDate=0`
    );
    const form = new FormData();
    form.append("id", idProjek);
    form.append("authId", idUser);

    const respRead = await baseURlPost.post("project/read", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return { data: resp.data.data[0], read: respRead.data.code };
  } catch (error) {
    console.log(error);
  }
};
