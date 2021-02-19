import React from "react";
import cx from "classnames";

const EditReviewGroup = ({
  isEditable,
  handleEdit,
  handleCancel,
  handleUpdate,
}) => {
  return (
    <>
      <button
        className={cx("editBtn", isEditable && "hidden")}
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
  );
};

export default EditReviewGroup;
