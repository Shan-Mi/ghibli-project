import React from "react";

const Message = ({ text }) => {
  const message = document.querySelector("#popupMessage");
  message.classList.remove("hidden");
  setTimeout(() => {
    message.classList.add("hidden");
    // setIsHidden("hidden");
  }, 2500);

  return (
    <div
      id="popupMessage"
      className={`absolute hidden left-1/2 -translate-x-1/2 md:w-6/12 lg:w-5/12 2xl:w-4/12 h-20 bg-blue-400 rounded-md shadow-sm flex justify-center items-center text-red-700 text-2xl font-Montserrat transition transform all duration-150 ease-in-out`}
    >
      {text}
    </div>
  );
};

export default Message;
