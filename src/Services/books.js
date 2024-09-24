import { axiosClient } from "../api/axiosClient";

const getAllBooks = async () => {
  try {
    const res = await axiosClient.get("Book");   
    return res.data
  } catch (error) {
    throw error;
  }
};



export {getAllBooks};