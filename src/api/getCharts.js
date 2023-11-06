import { baseURlPost } from "./baseAPI";

const getCharts = async (id, page, limit, startDate, endDate, type) => {
  try {
    const form = new FormData();
    form.append("id", id);
    form.append("page", page);
    form.append("limit", limit);
    form.append("startDate", startDate);
    form.append("endDate", endDate);
    form.append("type", type);
    const data = await baseURlPost.post(`world/grafik`, form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return data.data.data;
  } catch (error) {}
};

export default getCharts;
