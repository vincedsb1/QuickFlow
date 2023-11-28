import React from "react";
import PropTypes from "prop-types";
import EditButton from "./EditButton";
import SaveButton from "./SaveButton";
import CloseButton from "./CloseButton";

function ActionButtons({ editMode, onEdit, onSave }) {
  return (
    <div className="flex flex-col md:flex-row ">
      <EditButton onEdit={onEdit} editMode={editMode} />
      <SaveButton onSave={onSave} />
      <CloseButton />
    </div>
  );
}

ActionButtons.propTypes = {
  editMode: PropTypes.bool,
  onEdit: PropTypes.func,
  onSave: PropTypes.func.isRequired,
};

ActionButtons.defaultProps = {
  editMode: false,
  onEdit: () => {}, // default to a no-op function
};

export default ActionButtons;
