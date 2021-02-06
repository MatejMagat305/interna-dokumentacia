import {Button} from "react-bootstrap";
import React from "react";

const SendBtn = (cell, row, index, {data, setMsg, editable_docs, setEditable_docs}) => {

  const handleClick = () => {
    // TODO MATO send the record to employees
    console.log("send", data[index]);
    setEditable_docs(editable_docs.filter(d => d.id !== data[index].id));
    setMsg(`Record ${data[index].name} was successfully sent`)
  }

  return(
    <Button id="save" variant="danger" size="sm" onClick={handleClick}>
      Send
    </Button>
  );
};

export default SendBtn;
