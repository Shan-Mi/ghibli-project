import React, { useState, useRef, useContext } from "react";
import { useParams } from "react-router-dom";
import { createNewReview, getErrorMessage } from "../api";
import { GhibliContext } from "../context/GlobalContext";
import { getOneFilm } from "../utilities";
import { IoCloseCircleOutline } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";

const ReviewCreater = ({ setOpenNewReview }) => {
  const [textLength, setTextLength] = useState(0);
  const titleRef = useRef();
  const contentRef = useRef();
  const { films } = useContext(GhibliContext);
  const { id } = useParams();
  const [film] = getOneFilm(id, films);
  const filmId = film.id;

  let myFormRef;

  const handleCancel = () => {
    myFormRef.reset();
    setTextLength(0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const title = titleRef.current?.value;
      const content = contentRef.current?.value;
      const payload = { title, content };
      await createNewReview(payload, filmId);
      setOpenNewReview(false);
    } catch (e) {
      getErrorMessage(e)
        .split(",")
        .map((err) => notifyError(err));
    }
  };

  const handleCloseErr = () => {
    setOpenNewReview(false);
  };

  const notifyError = (message) => toast.error(message);

  return (
    <div className="relative mt-10 ">
      <ToastContainer />

      <form
        ref={(el) => (myFormRef = el)}
        onSubmit={handleSubmit}
        className=" mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl rounded-md mb-10"
      >
        <input
          className=" bg-gray-100 border border-gray-300 p-2 mb-4 outline-none rounded-md"
          placeholder="Titles"
          type="text"
          ref={titleRef}
        />
        <textarea
          className=" bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none rounded-md"
          placeholder="Describe everything about this post here"
          type="text"
          onChange={() => {
            setTextLength(contentRef.current?.value.length);
          }}
          ref={contentRef}
        />
        <div className="icons flex text-gray-500 m-2">
          <div className="count ml-auto text-gray-400 text-xs font-semibold">
            {textLength}/1200
          </div>
        </div>

        <div className="flex">
          <div
            onClick={handleCancel}
            className="rounded-md border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 ml-auto transform hover:bg-gray-200 hover:text-gray-700 duration-200 ease-in-out"
          >
            Cancel
          </div>
          <button
            type="submit"
            className="rounded-md border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500 transform hover:bg-indigo-600 hover:text-gray-50 duration-200 ease-in-out"
          >
            Post
          </button>
        </div>
      </form>

      <button
        className="absolute -top-3 right-1/2 transform transition duration-300 hover:scale-110"
        onClick={handleCloseErr}
      >
        <IoCloseCircleOutline className="text-2xl text-gray-600 bg-white rounded-xl" />
      </button>
    </div>
  );
};

export default ReviewCreater;
