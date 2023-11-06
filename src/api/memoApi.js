import Swal from "sweetalert2";

import { baseURlPost, baseURlView } from "./baseAPI";
import { convertToDateLocalString } from "../utils/dateConversion";

export const tambahMemoPengajuan = async (
  id,
  pengirim,
  kepada,
  jenisMemo,
  noDokumen,
  tglEfektif,
  tglMemo,
  noRevisi,
  cc,
  perihal,
  noMemo,
  disetujui,
  isi,
  file
) => {
  try {
    const form = new FormData();
    form.append("id", id);
    form.append("authId", parseInt(pengirim));
    form.append("penerima", JSON.stringify(kepada));
    form.append("jenisMemo", jenisMemo);
    form.append("tglEfektif", tglEfektif);
    form.append("tglMemo", tglMemo);
    form.append("noRef", noRevisi);
    form.append("cc", cc);
    form.append("perihal", perihal);
    form.append("noMemo", noMemo);
    form.append("nodoc", noDokumen);
    form.append("isiMemo", isi);
    form.append("file", JSON.stringify(file ? file : []));
    form.append("disetujui", JSON.stringify(disetujui));

    const data = await baseURlPost.post("memo/create", form, {
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
      text: "Something went wrong!",
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

export const tambahMemoDraft = async (
  pengirim,
  kepada,
  jenisMemo,
  noDokumen,
  tglEfektif,
  tglMemo,
  noRevisi,
  cc,
  perihal,
  noMemo,
  disetujui,
  isi,
  file
) => {
  try {
    const form = new FormData();
    form.append("id", 0);
    form.append("authId", parseInt(pengirim));
    form.append("penerima", JSON.stringify(kepada));
    form.append("jenisMemo", jenisMemo);
    form.append(
      "tglEfektif",
      tglEfektif ? tglEfektif : convertToDateLocalString(new Date())
    );
    form.append(
      "tglMemo",
      tglMemo ? tglMemo : convertToDateLocalString(new Date())
    );
    form.append("noRef", noRevisi);
    form.append("cc", cc);
    form.append("perihal", perihal);
    form.append("noMemo", noMemo);
    form.append("nodoc", noDokumen);
    form.append("isiMemo", isi);
    form.append("file", JSON.stringify(file ? file : []));
    form.append("disetujui", JSON.stringify(disetujui));

    const data = await baseURlPost.post("memo/draft", form, {
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
      text: "Something went wrong!",
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

export const updateMemoDraft = async (
  idMemo,
  pengirim,
  kepada,
  jenisMemo,
  noDokumen,
  tglEfektif,
  tglMemo,
  noRevisi,
  cc,
  perihal,
  noMemo,
  disetujui,
  isi,
  file
) => {
  try {
    const form = new FormData();
    form.append("id", idMemo);
    form.append("authId", parseInt(pengirim));
    form.append("penerima", JSON.stringify(kepada));
    form.append("jenisMemo", jenisMemo);
    form.append("tglEfektif", tglEfektif);
    form.append("tglMemo", tglMemo);
    form.append("noRef", noRevisi);
    form.append("cc", cc);
    form.append("perihal", perihal);
    form.append("noMemo", noMemo);
    form.append("nodoc", noDokumen);
    form.append("isiMemo", isi);
    form.append("file", JSON.stringify(file ? file : []));
    form.append("disetujui", JSON.stringify(disetujui));

    const data = await baseURlPost.post("memo/draft", form, {
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
      text: "Something went wrong!",
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

export const getAllMemoByType = async (
  idUser,
  page,
  type,
  limit,
  startDate,
  endDate,
  search
) => {
  try {
    const resp = await baseURlView.get(
      `memo/all/${type}/${idUser}?page=${page}&limit=${limit}&startDate=0&endDate=0&search=${search}`
    );

    return resp.data;
  } catch (error) {
    console.log(error);
  }
};

export const getMemoById = async (id, type) => {
  try {
    const resp = await baseURlView.get(`memo/getById/${id}/${type}`);
    return resp.data.data[0];
  } catch (error) {
    console.log(error);
  }
};

export const deleteMemoById = async (id, authId) => {
  try {
    const validId = id.map((data) => {
      return { id: data, authId: authId };
    });
    const form = new FormData();
    form.append("id", JSON.stringify(validId));
    const resp = await baseURlPost.post(`memo/delete`, form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    Swal.fire({
      position: "center",
      icon: resp.data.status === "success" ? "success" : "error",
      title: resp.data.message,
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
    return resp;
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

export const pulihkanMemoById = async (id, authId) => {
  try {
    const form = new FormData();
    form.append("id", id);
    form.append("authId", authId);
    const resp = await baseURlPost.post(`memo/pulihkan`, form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    Swal.fire({
      position: "center",
      icon: resp.data.status === "success" ? "success" : "error",
      title: resp.data.message,
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
    return resp;
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
export const kirimMemo = async (id, disetujui, penerima, cc) => {
  try {
    const form = new FormData();
    form.append("id", id);
    form.append("disetujui", JSON.stringify(disetujui));
    form.append("penerima", JSON.stringify(penerima));
    form.append("cc", cc);

    const resp = await baseURlPost.post(`memo/bagikan`, form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    Swal.fire({
      position: "center",
      icon: resp.data.status === "success" ? "success" : "error",
      title: resp.data.message,
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
    return resp;
  } catch (error) {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Oops...",
      text: error,
      showConfirmButton: false,
      timer: 1500,
    });
  }
};

export const DeletePermanenMemoById = async (id, authId) => {
  try {
    const validId = id.map((data) => {
      return { id: data, authId: authId };
    });

    const form = new FormData();
    form.append("id", JSON.stringify(validId));
    form.append("authId", authId);
    const resp = await baseURlPost.post(`memo/deleteselamanya`, form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    Swal.fire({
      position: "center",
      icon: resp.data.status === "success" ? "success" : "error",
      title: resp.data.message,
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
    return resp;
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
export const deleteMemoBerbintangById = async (id, noMemo) => {
  try {
    const form = new FormData();
    form.append("id", id);
    form.append("nodoc", noMemo);
    const resp = await baseURlPost.post(`memo/delBintang`, form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return resp.data;
  } catch (error) {
    console.log(error);
  }
};

export const addMemoBerbintangById = async (id, noMemo) => {
  try {
    const form = new FormData();
    form.append("id", id);
    form.append("nodoc", noMemo);
    const resp = await baseURlPost.post(`memo/setBintang`, form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return resp.data;
  } catch (error) {
    console.log(error);
  }
};

export const setAprovalMemoById = async (id) => {
  try {
    const form = new FormData();
    form.append("id", id);
    const resp = await baseURlPost.post(`memo/approval`, form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    Swal.fire({
      position: "center",
      icon: resp.data.status === "success" ? "success" : "error",
      title: resp.data.message,
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
    return resp.data;
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

export const setRevisiMemoById = async (id, revisi) => {
  try {
    const form = new FormData();
    form.append("id", id);
    form.append("revisi", JSON.stringify(revisi));
    const resp = await baseURlPost.post(`memo/revisi`, form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    Swal.fire({
      position: "center",
      icon: resp.data.status === "success" ? "success" : "error",
      title: resp.data.message,
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
    return resp.data;
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

export const addMemoArsipById = async (id) => {
  try {
    const form = new FormData();
    form.append("id", id);

    const resp = await baseURlPost.post(`memo/setArsip`, form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    Swal.fire({
      position: "center",
      icon: resp.data.status === "success" ? "success" : "error",
      title: resp.data.message,
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
    return resp.data;
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
export const removeMemoArsipById = async (id) => {
  try {
    const form = new FormData();
    form.append("id", id);

    const resp = await baseURlPost.post(`memo/delArsip`, form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    Swal.fire({
      position: "center",
      icon: resp.data.status === "success" ? "success" : "error",
      title: resp.data.message,
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
    return resp.data;
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
