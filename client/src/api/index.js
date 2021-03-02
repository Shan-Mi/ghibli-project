import axios from "axios";
import { URL } from "../constants/";

const privateHeaders = (token) => ({
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    Authorization: `Bearer ${token}`,
  },
});
/* films */
export const fetchFilms = async () => await axios.get(`${URL}films/`);

export const fetchFilm = (id) => axios.get(`${URL}${id}`);

export const updateFilm = async (payload, filmId) =>
  await axios.patch(`${URL}films/${filmId}`, payload);

export const createFilm = async (payload) =>
  await axios.post(`${URL}films/`, payload);

/* auth */

export const login = async (payload) =>
  await axios.post(`${URL}users/login`, payload);

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

export const sendVerifyEmail = async (payload) =>
  await axios.post(`${URL}users/verifyEmail`, payload);

export const updatePassword = async (payload) =>
  await axios.patch(`${URL}users/updateMyPassword`, payload);

/* helper */
export const getErrorMessage = (e) => e.response?.data.message;

/* user */
export const updateUser = async (payload) =>
  await axios.patch(`${URL}users/updateMe`, payload);

export const getAllUsers = async () => await axios.get(`${URL}users`);

export const getOneUser = async (userId) =>
  await axios.get(`${URL}users/${userId}`);

/* review */
// in payload, should have {userId, filmId, title, content}
export const createNewReview = async (payload, filmId) =>
  await axios.post(`${URL}films/${filmId}/reviews/`, payload);

export const updateReview = async (payload, filmId, reviewId) =>
  await axios.patch(`${URL}films/${filmId}/reviews/${reviewId}`, payload);

export const likeReview = async (filmId, reviewId) =>
  await axios.patch(`${URL}films/${filmId}/reviews/${reviewId}/likeReview`);

export const getAllReviews = async () => await axios.get(`${URL}reviews`);

/* admin delete - irrevocable */
export const deleteUserByAdmin = async (userId) =>
  await axios.delete(`${URL}users/${userId}`);

export const deleteReviewByAdmin = async (reviewId) =>
  await axios.delete(`${URL}reviews/${reviewId}`);

export const deleteFilmByAdmin = async (filmId) =>
  await axios.delete(`${URL}films/${filmId}`);
