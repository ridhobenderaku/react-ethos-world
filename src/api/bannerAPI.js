import { baseURlView } from "./baseAPI";

const getBanner = async () => {
  try {
    const data = await baseURlView.get(`news/private`);

    return data.data.data;
  } catch (error) {}
};

export default getBanner;
