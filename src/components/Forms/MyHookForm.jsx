import {Col, Form, Row} from "react-bootstrap";
import React from "react";

const MyHookForm = ({label, name, placeholder, type, register, as, defaultValue, required}) => {

  return (
    <Form.Group as={Row}>
      <Form.Label column sm="3">{label}</Form.Label>
      <Col>
        <Form.Control
          name={name}
          placeholder={placeholder}
          ref={register}
          defaultValue={defaultValue}
          type={type}
          as={as}
          required={required}
        />
      </Col>
    </Form.Group>
  );
}

export default MyHookForm;