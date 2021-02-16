import React from "react";
import Button from "react-bootstrap/Button";
import {recordType} from "../../helpers/functions";

const EditBtn = (cell, row, index, {setForm}) => {

  const handleClick = () => {
    setForm({
      type: recordType(row),
      data: row
    })
  }

  return (
    <Button onClick={handleClick} size="sm" id="editBtn">Edit</Button>
  );
};

export default EditBtn;
