import {Button} from "react-bootstrap";
import React from "react";
import {recordType, successResponse} from "../../helpers/functions";

const SendBtn = (cell, row, index, {setSavedRec, setNotification}) => {

  const handleClick = () => {
    sendRecord()
      .then(res => {
        if (successResponse(res)){
          setSavedRec(prev => prev.filter(doc => doc.id !== row.id));
          setNotification({
            variant: 'success',
            body: `Record ${row.name} was successfully sent`
          })
        } else {
          setNotification({
            variant: 'danger',
            body: `Sending the ${row.name} failed`
          })
        }
      })
      .catch((e) => console.log(e))
  }

  /** Send record to relevant employees */
  const sendRecord = () => {
    const record = recordType(row)
    return fetch(`/${record}/confirm`, {
      method: "POST",
      body: new URLSearchParams(`${record}=${row.id}`)
    })
  }

  return (
    <Button id="save" variant="danger" size="sm" onClick={handleClick}>Send</Button>
  );
};

export default SendBtn;
