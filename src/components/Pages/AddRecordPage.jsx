import React, {useState} from 'react';
import {Button, ButtonGroup, Container} from 'react-bootstrap';
import DocumentForm from "../Forms/DocumentForm";
import TrainingForm from "../Forms/TrainingForm";
import {successResponse} from "../../helpers/functions";

const AddRecordPage = () => {

  const [formType, setFormType] = useState('document');
  const [status, setStatus] = useState();

  const handleClick = (event) => {
    setFormType(event.target.id)
  };

  const handleDatabase = (type, data, action) => {
    let id
    if (true) {
      insertRecord(type, data) // TODO insert
    } else {
      id = updateRecord(type, data) // TODO update
    }
    if (action === "send"){
      sendRecord(type, id) // TODO send
    }
    return status
  }

  const insertRecord = (record, data) => { // TODO test
    console.log('data', data)
    return fetch(`/${record}/create`, {
      method: "POST",
      body: JSON.stringify(data)
    })
  }

  const sendRecord = (record, id) => { // TODO test
    return fetch(`/${record}/confirm/`, {
      method: "POST",
      body: new URLSearchParams(`${record}=${id}`)
    })
      .then(response => response.json())
      .then(res => {
        console.log(res)
        return res;
      })
      .catch((e) => console.log(e))
  }

  const updateRecord = (record, data, id) => { // TODO
    return fetch(`/${record}/update`, {
      // ...
    })
  }

  // const successMsg = () => {
  //   setNotification({
  //     variant: 'success',
  //     body: `Record ${row.name} was successfully sent`
  //   })
  // }
  //
  // const errorMsg = () => {
  //   setNotification({
  //     variant: 'danger',
  //     body: `Sending the ${row.name} failed`
  //   })
  // }

  const active = id => formType === id && 'active'

  return (
    <Container className="w-75">
      <ButtonGroup onClick={handleClick} className="btn-group btn-header">
        <Button id="document" className={active("document")}>Document</Button>
        <Button id="training" className={active("training")}>Online training</Button>
      </ButtonGroup>
      {formType === 'document' && // if
        <DocumentForm insertRecord={insertRecord}/>
      }
      {formType === 'training' && // elif
        <TrainingForm handleDatabase={handleDatabase}/>
      }
    </Container>
  )
}

export default AddRecordPage;
