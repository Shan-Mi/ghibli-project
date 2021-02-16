import React, { useState, useRef, useContext } from "react";
import { useParams } from "react-router-dom";
import { createNewReview, getErrorMessage } from "../api";
import { GhibliContext } from "../context/GlobalContext";
import { getOneFilm } from "../utilities";

const ReviewCreater = () => {
  const [textLength, setTextLength] = useState(0);
  const titleRef = useRef();
  const contentRef = useRef();
  const { films, token, setError } = useContext(GhibliContext);
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
      const res = await createNewReview(payload, filmId, token);
      console.log(res);
    } catch (e) {
      setError({
        hidden: false,
        message: e.response.data.message,
      });
      console.error(getErrorMessage(e));
    }
  };

  return (
    <form
      ref={(el) => (myFormRef = el)}
      onSubmit={handleSubmit}
      className="editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl rounded-md mb-10"
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

      <div className="buttons flex">
        <div
          onClick={handleCancel}
          className="btn border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 ml-auto"
        >
          Cancel
        </div>
        <button
          type="submit"
          className="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500"
        >
          Post
        </button>
      </div>
    </form>
  );
};

export default ReviewCreater;
