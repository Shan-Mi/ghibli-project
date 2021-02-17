import React from "react";
import cx from "classnames";

const Review = ({ review: { content, title, user, createdAt } }) => {
  const currUser = JSON.parse(localStorage.getItem("user"));

  const editContent = () => {
    console.log(user._id, "you are the creator, and you may edit me!");
  };

  return (
    <div className="editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl rounded-md mb-10">
      <input
        className=" bg-gray-100 border border-gray-300 p-2 mb-4 outline-none rounded-md"
        placeholder="Titles"
        type="text"
        defaultValue={title}
      />
      <textarea
        className=" bg-gray-100 sec p-3 h-40 border border-gray-300 outline-none rounded-md hidden"
        placeholder="Describe everything about this post here"
        type="text"
        defaultValue={content}
      />
      <p>{content}</p>
      <button
        className={cx(
          "px-3 py-1 bg-indigo-300",
          currUser?._id !== user?._id && "hidden"
        )}
        onClick={editContent}
      >
        Edit
      </button>
      <p>{user?.name}</p>
      <p>{createdAt}</p>
    </div>
  );
};

export default Review;
