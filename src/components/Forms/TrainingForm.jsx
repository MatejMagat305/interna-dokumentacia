import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import MyHookForm from "./MyHookForm";
import {Row, Col, Form, Button} from "react-bootstrap";
import {Typeahead} from 'react-bootstrap-typeahead'
import 'react-bootstrap-typeahead/css/Typeahead.css';
import {CustomAlert} from "../Others/CustomAlert";
import {trn_form, employees as e} from "../../helpers/data";
import {
  badMsg,
  goodMsg,
  correctTrainingFormData,
  successResponse,
  prefillTrainingForm
} from "../../helpers/functions";

const TrainingForm = ({formData, actual}) => {
  const {register, handleSubmit, errors, reset} = useForm({
    defaultValues: prefillTrainingForm(trn_form) // TODO ME - prefill employees
    // defaultValues: prefillDocumentForm(formData)
  });

  const [employees, setEmployees] = useState([]);
  const [notification, setNotification] = useState();
  const [attendees, setAttendees] = useState([])
  const [emptyAttendees, setEmptyAttendees] = useState([true])
  useEffect(() => setNotification(undefined), emptyAttendees)
  useEffect(()=>{
    setEmployees(e) // TODO MATO load employees
  },[])

  const onSubmit = (data, event) => {
    if (emptyAttendees[0] || attendees.length === 0){
      setNotification(badMsg("At least one employee is required"))
      return
    }

    data = correctTrainingFormData(data, attendees)
    console.log(data)
    const action = event.target.id
    // const result = handleDatabase('/training', data, action)

    fetch(`/training/update`, {
      method: "POST",
      body: JSON.stringify(data)
    })
      .then(res => {
        if (successResponse(res)) {
          setNotification(goodMsg(`${action} was successful`))
          // reset({})
        } else {
          setNotification(badMsg(`${action} failed`))
        }
      })
      .catch((e) => console.log('error', e))
  }

  const addAttendees = (attendee) => {
    setAttendees(attendee)
    setEmptyAttendees([false])
  }

  return (
    <Form onChange={()=>setNotification(undefined)}>
      {/* NAME */}
      <MyHookForm
        label="Training name*"
        name="name"
        placeholder="Enter document name"
        register={register({required:true})}
      />
      {/* TRAINEE */}
      <MyHookForm
        label="Name of lector"
        name="lector"
        placeholder="Enter document link to sharepoint"
        register={register}
      />
      {/* AGENCY */}
      <MyHookForm
        label="Name of agency"
        name="agency"
        placeholder="Enter agency"
        register={register}
      />
      {/* PLACE */}
      <MyHookForm
        label="Place"
        name="place"
        placeholder="Enter place"
        register={register}
      />
      {/* DATE */}
      <MyHookForm
        label="Date*"
        name="date"
        type="date"
        placeholder="Enter date"
        register={register({required:true})}
      />
      {/* DEADLINE */}
      <MyHookForm
        label="Days to deadline*"
        name="deadline"
        type="date"
        defaultValue="14"
        register={register({required:true})}
      />
      {/* DURATION */}
      <MyHookForm
        label="Duration"
        name="duration"
        type="number"
        placeholder="Enter duration"
        register={register({valueAsNumber: true})}
      />
      {/* AGENDA */}
      <MyHookForm
        label="Agenda*"
        name="agenda"
        as="textarea"
        placeholder="Enter agenda"
        register={register({required:true})}
      />
      {/* LIST OF EMPLOYEES */}
      <Form.Group as={Row}>
        <Form.Label column sm="3">Add employees*</Form.Label>
        <Col>
          <Typeahead
            id="basic-typeahead-single"
            name="employees"
            labelKey={option => `${option.name} [${option.id}]`}
            multiple
            onChange={addAttendees}
            options={employees}
            placeholder="Choose an employees..."
            selected={attendees}
          />
        </Col>
      </Form.Group>
      {/* ALERTS */}
      {notification &&
        <CustomAlert notification={notification}/>
      }
      {Object.keys(errors).length ?
        <CustomAlert text={badMsg("Fill all the require fields")}/> : null
      }
      {/* SAVE | SEND BUTTONS */}
      <div onClick={handleSubmit(onSubmit)} className="pt-1 btn-block text-right">
        <Button id="save" type="submit" className="mr-1">Save</Button>
        <Button id="send" type="submit" variant="danger">Send</Button>
      </div>
    </Form>
  )
}

export default TrainingForm;
