import {Form, Row, Col, Button} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import MyHookForm from "./MyHookForm";
import Combinations from "../Others/Combinations";
import {ErrorAlert} from "../Others/ErrorAlert";
import {proxy, types} from "../../data";
import {getSelectOptions} from "../../functions";
import {SuccessAlert} from "../Others/SuccessAlert";

const DocumentForm = ({form_data}) => {
  console.log('form_data', form_data)
  const {register, handleSubmit, errors, reset} = useForm({
    defaultValues: {...form_data, deadline: 14}
  });

  const [combinations, setCombinations] = useState([])
  const [emptyCombinations, setEmptyCombinations] = useState([true])

  const [error, setError] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  useEffect(()=>setError(""), emptyCombinations)

  const onSubmit = (data, event) => {
    if (emptyCombinations[0] || combinations.length === 0){
      setError("At least one combination is required")
      return
    }

    data = {...data, combinations: combinations}
    console.log('combinations', combinations);
    console.log('data', data)

    const doc_id = insertDocument(data)
    if (event.target.id === "send"){
      sendDocument(doc_id)
      setSuccessMessage("Document was successfully sent")
    } else {
      setSuccessMessage("Document was successfully saved")
    }

    reset({})
  }

  const insertDocument = (data) => {
    return fetch(`${proxy}/document/create`, {
      method: "POST",
      body: new URLSearchParams(`document=${data}`)
    })
      .then(response => response.json())
      .then(respon => {
        console.log(respon)
        return null; // id
      })
      .catch((e) => console.log(e))
  }

  const sendDocument = (id) => {
    return fetch(`${proxy}/document/confirm`, {
      method: "POST",
      body: new URLSearchParams(`document=${id}`)
    })
      .then(response => response.json())
      .then(respon => {
        console.log(respon)
        return null;
      })
      .catch((e) => console.log(e))
  }

  return (
    <Form onChange={()=>setSuccessMessage("")}>

      {/* TYPE OF DOCUMENT */}
      <Form.Group as={Row}>
        <Form.Label column sm="2">Type*</Form.Label>
        <Col>
          <Form.Control
            as="select"
            name="type"
            ref={register({validate: v => v !== ""})}
          >
            <option hidden value="">Select option ...</option>
            {getSelectOptions(types)}
          </Form.Control>
        </Col>
      </Form.Group>
      {/*{ errors.type && <ErrorAlert text={"Select a type"}/> }*/}

      <Form.Group as={Row}>
        <Form.Label column sm="2">Require superior*</Form.Label>
        <Col>
          <Form.Check
            type="radio"
            id="yes"
            label="yes"
            value={true}
            inline
            name="require_superior"
            ref={register}
          />
          <Form.Check
            type="radio"
            id="no"
            label="no"
            value={false}
            name="require_superior"
            inline
            defaultChecked
            ref={register}
          />
        </Col>
      </Form.Group>

      {/* NAME */}
      <MyHookForm
        label="Document name*"
        name="name"
        placeholder="Enter document name"
        register={register({required:true})}
        required={true}
      />
      {/*{ errors.name && <ErrorAlert/> }*/}

      {/* LINK */}
      <MyHookForm
        label="Link to sharepoint"
        name="link"
        placeholder="Enter document link to sharepoint"
        register={register}
      />

      {/* RELEASE */}
      <MyHookForm
        label="Release date*"
        name="release"
        type="date"
        register={register({required:true})}
      />
      {/*{ errors.release && <ErrorAlert/> }*/}

      {/* DEADLINE */}
      <MyHookForm
        label="Days to deadline*"
        name="deadline"
        type="number"
        defaultValue="14"
        register={register({required:true})}
      />
      {/*{ errors.number && <ErrorAlert/> }*/}

      {/* VERSION */}
      <MyHookForm
        label="Version*"
        name="version"
        placeholder="Enter version"
        register={register({required:true})}
      />
      {/*{ errors.version && <ErrorAlert/> }*/}

      {/* ORDER NUMBER */}
      <MyHookForm
        label="Order number*"
        name="number"
        type="number"
        placeholder="Enter number"
        register={register({required:true})}
      />
      {/*{ errors.number && <ErrorAlert/> }*/}

      {/* NOTE */}
      <MyHookForm
        label="Note"
        name="note"
        as="textarea"
        placeholder="Enter note"
        register={register}
      />

      {/* COMBINATIONS */}
      <Combinations combinations={combinations} setCombinations={setCombinations} setReq={setEmptyCombinations}/>

      {/* ALERTS */}
      { error && <ErrorAlert text={error}/> }
      { Object.keys(errors).length ? <ErrorAlert text={"Fill all the require fields"}/> : null }
      { successMessage && <SuccessAlert text={successMessage}/> }

      {/* SAVE | SEND BUTTONS */}
      <div onClick={handleSubmit(onSubmit)} className="pt-1 btn-block text-right">
        <Button id="save" type="submit" className="mr-1">Save</Button>
        <Button id="send" type="submit" variant="danger">Send</Button>
      </div>
    </Form>
  )
}

export default DocumentForm;
