import { confirmAlert } from "react-confirm-alert";

export const getOneFilm = (slug, films) =>
  films.filter((film) => film.slug === slug);

export const formatInput = (val) => val.trim().toLowerCase();

export const GenerateConfirmUI = (text, action) =>
  confirmAlert({
    customUI: ({ onClose }) => {
      return (
        <div className="custom-ui">
          <h1 className="text-3xl font-Montserrat font-bold mb-5">
            Are you sure?
          </h1>
          <p className="flex-1">{text}</p>
          <div className="flex justify-between flex-1">
            <button
              className="border-white border-solid border-2 w-2/5 p-3 m-2.5"
              onClick={onClose}
            >
              No
            </button>

            <button
              className="border-white border-solid border-2 w-2/5 p-3 m-2.5"
              onClick={async () => {
                action();
                onClose();
              }}
            >
              Yes, Delete it!
            </button>
          </div>
        </div>
      );
    },
  });
