import axios from "axios";
import { URL } from "../constants/";

const privateHeaders = (token) => ({
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    Authorization: `Bearer ${token}`,
  },
});

export const fetchFilms = async () => await axios.get(`${URL}films/`);

export const fetchFilm = (id) => axios.get(`${URL}${id}`);

// export const likePost = (id) => axios.patch(`${URL}/${id}/likePost`);
// export const updatePost = (id, updatedPost) =>
// axios.patch(`${URL}/${id}`, updatedPost);
export const deletePost = (id) => axios.delete(`${URL}/${id}`);

export const login = async (email, password) => {
  try {
    const payload = { email, password };
    return await axios.post(`${URL}users/login`, payload);
  } catch (e) {
    console.error(e.response.data.message);
  }
};

export const logout = async () => await axios.get(`${URL}users/logout/`);

export const register = async (payload) =>
  await axios.post(`${URL}users/signup`, payload);

export const sendResetPassword = async (payload) =>
  await axios.post(`${URL}users/forgotPassword`, payload);

export const resetPassword = async (payload, token) =>
  await axios.patch(
    `${URL}users/resetPassword/${token}`,
    payload,
    privateHeaders(token)
  );

// export const getErrorMessage = (e) => e.response;
export const getErrorMessage = (e) => e.response.data.message;
export const getSuccessMessage = (res) => res.data.message;

export const updateUser = async (payload, token) =>
  await axios.patch(`${URL}users/updateMe`, payload, privateHeaders(token));

// in payload, should have {userId, filmId, title, content}
export const createNewReview = async (payload, filmId) =>
  await axios.post(`${URL}films/${filmId}/reviews/`, payload);

export const updateReview = async (payload, filmId, reviewId) =>
  await axios.patch(`${URL}films/${filmId}/reviews/${reviewId}`, payload);
