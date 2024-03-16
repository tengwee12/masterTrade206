import { axiosInstance } from "../services/axios";

export async function fetchPlumbers(token) {
  try {
    const result = await axiosInstance.get("/api/plumber", {
      headers: {
        Authorization: token,
      },
    });
    console.log(result.data);
    return result.data;
  } catch (error) {
    console.log(error);
  }
}
