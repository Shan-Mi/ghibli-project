import axios from "axios";
import { URL } from "../constants/";

export const fetchFilms = async () => await axios.get(`${URL}films/`);
export const fetchFilm = (id) => axios.get(`${URL}${id}`)
export const createReview = (newReview) => axios.post(URL, newReview);
// export const likePost = (id) => axios.patch(`${URL}/${id}/likePost`);
// export const updatePost = (id, updatedPost) =>
  // axios.patch(`${URL}/${id}`, updatedPost);
export const deletePost = (id) => axios.delete(`${URL}/${id}`);
