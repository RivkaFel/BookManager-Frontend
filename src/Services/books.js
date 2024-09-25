import { axiosClient } from "../api/axiosClient";

const getAllBooks = async () => {
  try {
    const res = await axiosClient.get("Book");   
    return res.data
  } catch (error) {
    throw error;
  }
};

const createBook = async (book) => {
  try {
    const res = await axiosClient.post("Book",book);   
    return res.data
  } catch (error) {
    throw error;
  }
};

const deleteBook = async (bookUPC) => {
  try {
    const res = await axiosClient.delete(`book/${bookUPC}`);   
    return res.data
  } catch (error) {
    throw error;
  }
};




export {getAllBooks, createBook,deleteBook};