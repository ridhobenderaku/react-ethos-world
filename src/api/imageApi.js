import Swal from "sweetalert2";

import { baseURlView } from "./baseAPI";

export const uploadImage = async (img) => {
  try {
    const form = new FormData();
    form.append("image", img);
    const data = await baseURlView.post(`uploadgambar`, form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return data ? JSON.parse(data.data.message) : null;
  } catch (error) {
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: "Oops...",
      text: error,
      showConfirmButton: false,
      timer: 1500,
    });
  }
};

export const deleteImage = async (nameFile) => {
  try {
    const data = await baseURlView.delete(`hapusgambar/${nameFile}`);
    return data;
  } catch (error) {
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: "Oops...",
      text: error,
      showConfirmButton: false,
      timer: 1500,
    });
  }
};
