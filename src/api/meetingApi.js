import Swal from "sweetalert2";

import { baseURlPost, baseURlView } from "./baseAPI";

export const getDataMeetingById = async (
  authId,
  id,
  page,
  limit,
  startDate,
  endDate,
  search
) => {
  try {
    const data = await baseURlView.get(
      `/meeting/getItem/${id}?page=1&limit=5&search=0&startDate=0&endDate=0`
    );
    const form = new FormData();
    form.append("id", id);
    form.append("authId", authId);
    const respRead = await baseURlPost.post("meeting/read", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return { data: data.data.data[0], read: respRead.data.code };
  } catch (error) {
    console.log(error);
  }
};

export const tambahMeeting = async (
  authId,
  judul,
  tgl,
  anggota,
  jenis,
  alamat,
  deskripsi,
  lampiran
) => {
  try {
    const form = new FormData();
    form.append("judul", judul);
    form.append("tgl", tgl);
    form.append("editor", JSON.stringify([]));
    form.append(
      "anggota",
      JSON.stringify(
        anggota.map((data) => {
          return { ...data, read: "false", delete: "0", arsip: "false" };
        })
      )
    );
    form.append("jenis", jenis);
    form.append("alamat", alamat);
    form.append("deskripsi", deskripsi);
    form.append("lampiran", JSON.stringify(lampiran ? lampiran : []));
    form.append("authId", authId);

    const data = await baseURlPost.post("meeting/create", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    anggota.forEach((data) => {
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

const notif = async (data) => {
  try {
    const resp = await baseURlView.get(
      `send-notifmeeting/{"id":"${data.id}","read":"false"}/${data.id}`
    );
  } catch (error) {
    console.log(error);
  }
};

export const updateMeeting = async (
  authId,
  username,
  idMeeting,
  judul,
  tgl,
  anggota,
  jenis,
  alamat,
  deskripsi,
  lampiran
) => {
  try {
    const form = new FormData();
    form.append("judul", judul);
    form.append("tgl", tgl);
    form.append("anggota", JSON.stringify(anggota ? anggota : []));
    form.append("jenis", jenis);
    form.append("alamat", alamat);
    form.append("deskripsi", deskripsi);
    form.append("lampiran", JSON.stringify(lampiran ? lampiran : []));
    form.append("authId", authId);
    form.append("id", idMeeting);
    form.append(
      "editor",
      JSON.stringify([{ id: authId.toString(), nama: username }])
    );

    const data = await baseURlPost.post("meeting/update", form, {
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
    return data.data;
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
export const getDataAllMeetingSaya = async (
  id,
  page,
  limit,
  startDate,
  endDate,
  search
) => {
  try {
    const data = await baseURlView.get(
      `/meeting/get/${id}/${id}?page=${page}&limit=${limit}&startDate=0&endDate=0&search=${search}`
    );

    return data.data;
  } catch (error) {
    console.log(error);
  }
};
export const getDataAllMeetingSelesai = async (
  id,
  page,
  limit,
  startDate,
  endDate,
  search
) => {
  try {
    const data = await baseURlView.get(
      `/meeting/getselesai/${id}?page=${page}&limit=${limit}&startDate=0&endDate=0&search=${search}`
    );

    return data.data;
  } catch (error) {
    console.log(error);
  }
};
