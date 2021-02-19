import React, { useState, useRef, useContext } from "react";
import { useParams } from "react-router-dom";
import { getOneFilm } from "../utilities";
import { GhibliContext } from "../context/GlobalContext";
import cx from "classnames";
import { updateReview } from "../api";

const Review = ({ review }) => {
  const { user, title, content, createdAt, id: reviewId, updatedAt } = review;
  const currUser = JSON.parse(localStorage.getItem("user"));
  const { films, setError } = useContext(GhibliContext);
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
      console.log("res from db", review);
      setCurrReview(review);
      setIsEditable(false);
      console.log(review);
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

  // TODO:
  // use this toLocaleString method, maybe will convert this to some more customized formatting func
  const formatDate = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleString();
  };

  const handleEdit = () => {
    setIsEditable(true);
    // setCurrReview(review);
  };

  const handleCancel = () => {
    setIsEditable(false);
    setCurrReview(review);
    console.log(review);
    console.log(currReview);
    // setCurrReview(review)
  };

  return (
    <div className="relative mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 py-5 shadow-lg max-w-2xl rounded-md mb-10 px-8">
      <input
        ref={titleRef}
        className={cx(
          "bg-gray-100 p-2 mb-4 outline-none rounded-md font-Amaranth text-lg",
          !isEditable && "pointer-events-none"
        )}
        placeholder="Title"
        type="text"
        value={currReview.title}
        onChange={(e) =>
          setCurrReview({ ...currReview, title: e.target?.value })
        }
      />
      <textarea
        ref={contentRef}
        className={cx(
          "bg-gray-100 sec p-3 h-40 border border-gray-300 outline-none rounded-md font-Amaranth py-5 px-1",
          !isEditable && "hidden"
        )}
        placeholder="Describe everything about this post here"
        type="text"
        value={currReview.content}
        onChange={(e) =>
          setCurrReview({ ...currReview, content: e.target?.value })
        }
      />
      <p className={cx("font-Amaranth py-5 px-1", isEditable && "hidden")}>
        {currReview.content}
      </p>
      {currUser?._id === user?._id && (
        <>
          <button
            className={cx(
              "editBtn",
              isEditable && "hidden"
            )}
            onClick={handleEdit}
          >
            Edit
          </button>
          <div className="flex justify-around mt-4">
            <button
              className={cx("editBtn", !isEditable && "hidden")}
              onClick={handleCancel}
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
        </>
      )}

      <p className="font-Montserrat pb-2 pr-3 text-right font-light">
        {user?.name.toUpperCase()}
      </p>
      <p className="font-Montserrat pb-2 pr-3 text-right italic text-sm font-light">
        {!updatedAt || createdAt === updatedAt
          ? formatDate(currReview.createdAt)
          : `Edited at: ${formatDate(currReview.updatedAt)}`}
      </p>
    </div>
  );
};

export default Review;
