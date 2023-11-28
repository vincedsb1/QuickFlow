import React from "react";
import PropTypes from "prop-types";

function EditButton({ onEdit, editMode }) {
  return (
    <div className="flex justify-center ">
      <div className=" flex justify-center">
        <button
          id="editButton"
          className={`my-4 md:my-0 text-base md:mr-10 border-solid border-2 rounded-full px-4 py-2 w-56 md:ml-12 ${
            editMode
              ? "text-slate-400 border-slate-400"
              : "text-emerald-600 border-emerald-500"
          }`}
          type="button"
          onClick={onEdit}
          disabled={editMode} // Button will be disabled when editMode is active
        >
          Modifier
        </button>
      </div>
    </div>
  );
}

EditButton.propTypes = {
  onEdit: PropTypes.func,
  editMode: PropTypes.bool, // Also add editMode as a prop type
};

EditButton.defaultProps = {
  onEdit: () => {}, // default to a no-op function
  editMode: false,
};

export default EditButton;
