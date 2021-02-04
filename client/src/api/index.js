import axios from "axios";
import { URL } from "../constants/";

const publicHeaderConfig = {
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
};

// const getPrivateHeaders = () => ({
//   "Content-Type": "application/json",
//   Authorization: `Bearer ${this.getToken()}`,
// });

export const fetchFilms = async () => await axios.get(`${URL}films/`);

export const fetchFilm = (id) => axios.get(`${URL}${id}`);
export const createReview = (newReview) => axios.post(URL, newReview);
// export const likePost = (id) => axios.patch(`${URL}/${id}/likePost`);
// export const updatePost = (id, updatedPost) =>
// axios.patch(`${URL}/${id}`, updatedPost);
export const deletePost = (id) => axios.delete(`${URL}/${id}`);

export const login = async (email, password) => {
  try {
    const payload = { email, password };
    return await axios.post(`${URL}users/login`, payload, publicHeaderConfig);
  } catch (e) {
    console.log(e);
  }
};

export const logout = async () => await axios.get(`${URL}users/logout/`);
