import {Button} from "react-bootstrap";
import React from "react";
import {recordType, successResponse} from "../../helpers/functions";

const SendBtn = (cell, row, index, {setSavedRec, setNotification}) => {

  const handleClick = () => {
    console.log('sending', row)
    sendRecord()
      .then(res => {
        if (successResponse(res)){
          updateSavedRec()
          successMsg()
        } else {
          errorMsg()
        }
      })
      .catch((e) => console.log(e))
  }

  const updateSavedRec = () => {
    setSavedRec(prev => prev.filter(doc => doc.id !== row.id));
  }

  const successMsg = () => {
    setNotification({
      variant: 'success',
      body: `Record ${row.name} was successfully sent`
    })
  }

  const errorMsg = () => {
    setNotification({
      variant: 'danger',
      body: `Sending the ${row.name} failed`
    })
  }

  /** Send record to relevant employees */
  const sendRecord = () => {
    const record = recordType(row)
    return fetch(`/${record}/confirm/${row.id}`, {
      method: "GET",
    })
  }

  return (
    <Button id="save" variant="danger" size="sm" onClick={handleClick}>Send</Button>
  );
};

export default SendBtn;
