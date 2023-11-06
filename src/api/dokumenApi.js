import { baseURlPost, baseURlView } from "./baseAPI";

export const getDataDokumen = async (page, search, filter) => {
  try {
    const data = await baseURlView.get(
      `dokumentasi/getall?page=${page}&limit=10&search=${search}&tipe=${filter}`
    );
    return data.data;
  } catch (error) {
    console.log(error);
  }
};
