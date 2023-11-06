import Swal from "sweetalert2";
import { baseURlPost, baseURlView } from "./baseAPI";

export const tambahIde = async (authId, userName, judul, isi, file, tim) => {
  try {
    const form = new FormData();
    form.append("judul", judul);
    form.append("isi", isi);
    form.append("iduser", authId);
    form.append("arsip", JSON.stringify([]));
    form.append("delete", JSON.stringify([]));
    form.append("deletepermanen", JSON.stringify([]));
    form.append("berbintang", JSON.stringify([]));
    form.append("authId", JSON.stringify([{ id: authId, nama: userName }]));
    form.append("tim", JSON.stringify(tim ? tim : []));
    form.append("file", JSON.stringify(file ? file : []));
    form.append("komentar", JSON.stringify([]));
    const data = await baseURlPost.post("ide/create", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    Swal.fire({
      position: "center",
      icon: data.data.status === "success" ? "success" : "error",
      title: data.data.message,
      showConfirmButton: false,
      timer: 2500,
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
      timer: 2500,
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

export const ubahIde = async (
  authId,
  idIde,
  userName,
  judul,
  isi,
  file,
  tim
) => {
  try {
    const form = new FormData();
    form.append("judul", judul);
    form.append("isi", isi);
    form.append("authId", JSON.stringify([{ id: authId, nama: userName }]));
    form.append("iduser", authId);
    form.append("file", JSON.stringify(file ? file : []));
    form.append("id", idIde);
    form.append("tim", tim ? JSON.stringify(tim) : null);
    const data = await baseURlPost.post("ide/update", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    Swal.fire({
      position: "center",
      icon: data.data.status === "success" ? "success" : "error",
      title: data.data.message,
      showConfirmButton: false,
      timer: 2500,
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
      timer: 2500,
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

export const commentIde = async (idComment, userId, userName, idIde, isi) => {
  try {
    const form = new FormData();
    form.append("idide", idIde);
    form.append(
      "komentar",
      JSON.stringify({
        uuid: idComment,
        id: userId,
        nama: userName,
        isi: isi,
        tgl: new Date(),
      })
    );

    const data = await baseURlPost.post("ide/komenide", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    Swal.fire({
      position: "center",
      icon: data.data.status === "success" ? "success" : "error",
      title: data.data.message,
      showConfirmButton: false,
      timer: 2500,
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
      timer: 2500,
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

export const getAllDataIde = async (
  id,
  page,
  limit,
  startDate,
  endDate,
  type,
  search
) => {
  try {
    const data = await baseURlView.get(
      `ide/getall/${type}/${id}?page=${page}&limit=${limit}&startDate=0&endDate=0&search=${search}`
    );

    return data.data;
  } catch (error) {
    console.log(error);
  }
};

export const getDataDokumen = async (page) => {
  try {
    const data = await baseURlView.get(
      `dokumentasi/getall/?page=${page}&limit=5`
    );
    return data.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const getDataBerbagi = async (page) => {
  try {
    const data = await baseURlView.get(
      `ide/getallberbagi/?page=${page}&limit=5&search=`
    );
    return data.data.data;
  } catch (error) {}
};

export const getIdeById = async (id) => {
  try {
    const data = await baseURlView.get(
      `ide/getitem/${id}?page=1&limit=2&search=0&startDate=0&endDate=0`
    );
    return data.data.data[0];
  } catch (error) {
    console.log(error);
  }
};

export const getKomentarIdeById = async (id) => {
  try {
    const data = await baseURlView.get(
      `ide/getall/komentar/${id}?page=1&limit=100&search=&startDate=0&endDate=0`
    );
    return data.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteIde = async (ide) => {
  try {
    const form = new FormData();

    form.append("idide", JSON.stringify(ide));

    const data = await baseURlPost.post(`ide/delete`, form, {
      headers: {
        "Content-Type": "text/html",
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
export const arsipIde = async (authId, userName, idide) => {
  try {
    const form = new FormData();

    form.append("idide", idide);
    form.append(
      "authId",
      JSON.stringify({ id: authId.toString(), nama: userName })
    );
    const data = await baseURlPost.post(`ide/arsip`, form, {
      headers: {
        "Content-Type": "text/html",
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

export const addBerbintangIde = async (authId, userName, idide) => {
  try {
    const form = new FormData();

    form.append("idide", idide);
    form.append(
      "authId",
      JSON.stringify({ id: authId.toString(), nama: userName })
    );
    const data = await baseURlPost.post(`ide/addberbintang`, form, {
      headers: {
        "Content-Type": "text/html",
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
export const removeBerbintangIde = async (authId, userName, idide) => {
  try {
    const form = new FormData();

    form.append("idide", idide);
    form.append("authId", authId);
    const data = await baseURlPost.post(`ide/deleteberbintang`, form, {
      headers: {
        "Content-Type": "text/html",
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
export const deletePermanenIde = async (ide) => {
  try {
    const form = new FormData();

    form.append("idide", JSON.stringify(ide));
    const data = await baseURlPost.post(`ide/deleteselamanya`, form, {
      headers: {
        "Content-Type": "text/html",
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

export const pulihkanDeleteIde = async (authId, idide, username) => {
  try {
    const form = new FormData();

    form.append("idide", idide);
    form.append("authId", authId);
    const data = await baseURlPost.post(`ide/pulihkanhapus`, form, {
      headers: {
        "Content-Type": "text/html",
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

export const pulihkanArsipIde = async (authId, idide, username) => {
  try {
    const form = new FormData();

    form.append("idide", idide);
    form.append("authId", authId);
    const data = await baseURlPost.post(`ide/pulihkanarsip`, form, {
      headers: {
        "Content-Type": "text/html",
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
