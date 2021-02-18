import React from "react";
import Button from "react-bootstrap/Button";
import {badMsg, goodMsg, successResponse} from "../../helpers/functions";

const SendBtn = (cell, row, index, {setSavedRec, setNotification}) => {

  /** Send record to relevant employees */
  const handleClick = () => {
    console.log('sending', row)
    fetch(`/confirm/${row.id}`, {
      method: "GET",
    })
      .then(res => {
        if (successResponse(res)){
          updateSavedRec()
          setNotification(goodMsg(`Record ${row.name} was successfully sent`))
        } else {
          setNotification(badMsg(`Sending the ${row.name} failed`))
        }
      })
      .catch((e) => console.log(e))
  }

  const updateSavedRec = () => {
    setSavedRec(prev => prev.filter(doc => doc.id !== row.id));
  }

  return (
    <Button id="save" variant="danger" size="sm" onClick={handleClick}>Send</Button>
  );
};

export default SendBtn;
