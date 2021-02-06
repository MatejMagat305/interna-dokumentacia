import {Button} from "react-bootstrap";
import React from "react";
import {recordType} from "../../functions";

const EditBtn = (cell, row, rowIndex, {setFormData, setFormType}) => {

  const handleClick = async () => {
    // FIXME do not redirect after click on document
    setFormData(row);
    console.log("edit")
    console.log(row)
    recordType(row) === "document" ? setFormType("new_document") : setFormType("new_training");
  }

  return (
    <Button onClick={handleClick} size="sm" id="editBtn">Edit</Button>
  );
};

export default EditBtn;
