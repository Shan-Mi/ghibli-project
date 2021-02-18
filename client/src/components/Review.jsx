import React, { useState, useRef, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { getOneFilm } from "../utilities";
import { GhibliContext } from "../context/GlobalContext";
import cx from "classnames";
import { updateReview } from "../api";

const Review = ({ review }) => {
  const { user, createdAt, id: reviewId, updatedAt } = review;
  const currUser = JSON.parse(localStorage.getItem("user"));
  const { films, error, setError } = useContext(GhibliContext);
  const [isEditable, setIsEditable] = useState(false);
  const titleRef = useRef();
  const contentRef = useRef();
  const { id } = useParams();
  const [film] = getOneFilm(id, films);
  const filmId = film.id;
  const [currReview, setCurrReview] = useState(review);

  // Add error handling
  const handleUpdate = async (e) => {
    try {
      const title = titleRef.current?.value;
      const content = contentRef.current?.value;
      const payload = { title, content };
      const {
        data: {
          data: { review },
        },
      } = await updateReview(payload, filmId, reviewId);
      setCurrReview(review);
      setIsEditable(false);
    } catch (e) {
      const { data } = e.response;
      if (
        Object.keys(data).includes("errors") ||
        Object.keys(data).includes("error")
      ) {
        // this is any validation error
        return setError({
          hidden: false,
          message: e.response.data.message,
        });
      }

      if (data.code === 11000) {
        // this 11000 is for handling mongo error
        const { keyPattern } = data;
        if (Object.keys(keyPattern).includes("film", "user")) {
          return setError({
            hidden: false,
            message: "One user can only create one review.",
          });
        }
      }
    }
  };

  useEffect(() => {
    // hide error message after 4500 ms if the user is not closing this component by themselves.
    const timer = setTimeout(() => {
      setError({ ...error, hidden: true });
    }, 4500);
    return () => clearTimeout(timer);
  }, [error, setError]);

  // TODO:
  // use this toLocaleString method, maybe will convert this to some more customized formatting func
  const formatDate = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleString();
  };
  const handleCloseErr = () => {
    setError({ message: "", hidden: true });
    setIsEditable(false);
  };

  return (
    <div className="relative mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 py-5 shadow-lg max-w-2xl rounded-md mb-10 px-8">
      <input
        ref={titleRef}
        className={cx(
          "bg-gray-100 p-2 mb-4 outline-none rounded-md font-Amaranth text-lg",
          !isEditable && "pointer-events-none"
        )}
        placeholder="Titles"
        type="text"
        defaultValue={currReview.title}
      />
      <textarea
        ref={contentRef}
        className={cx(
          "bg-gray-100 sec p-3 h-40 border border-gray-300 outline-none rounded-md font-Amaranth py-5 px-1",
          !isEditable && "hidden"
        )}
        placeholder="Describe everything about this post here"
        type="text"
        defaultValue={currReview.content}
      />
      <p className={cx("font-Amaranth py-5 px-1", isEditable && "hidden")}>
        {currReview.content}
      </p>
      <button
        className={cx(
          "editBtn",
          currUser?._id !== user?._id && "hidden",
          isEditable && "hidden"
        )}
        onClick={() => {
          setIsEditable(true);
        }}
      >
        Edit
      </button>
      <div className="flex justify-around mt-4">
        <button
          className={cx("editBtn", !isEditable && "hidden")}
          onClick={handleCloseErr}
        >
          Cancel
        </button>
        <button
          className={cx("editBtn", !isEditable && "hidden")}
          onClick={handleUpdate}
        >
          Update
        </button>
      </div>

      <p className="font-Montserrat pb-2 pr-3 text-right font-light">
        {user?.name.toUpperCase()}
      </p>
      <p className="font-Montserrat pb-2 pr-3 text-right italic text-sm font-light">
        {createdAt === updatedAt
          ? formatDate(currReview.createdAt)
          : `Edited at: ${formatDate(currReview.updatedAt)}`}
      </p>
    </div>
  );
};

export default Review;
