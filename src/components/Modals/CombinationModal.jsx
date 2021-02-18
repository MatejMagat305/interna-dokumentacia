import React, {useState} from "react";
import {Button, Col, Container, Modal} from "react-bootstrap";
import CombinationForm from "../Forms/CombinationForm";
import uuid from 'react-uuid'

const CombinationModal = ({setShowModal, setCombinations, setEmptyCombinations}) => {

  const [combination, setCombination] = useState({
    branch: [],
    city: [],
    department: [],
    division: []
  });

  const add = () => {
    setEmptyCombinations([false])
    setCombinations(prevState => {
      return [...prevState, {...combination, id: uuid()}]
    });
  }

  const addClose = () => {
    add()
    closeModal();
  }

  const closeModal = () => {
    setShowModal(false);
  }

  return (
    <Modal show={true} onHide={closeModal} centered>
      <Container className="pt-3 pb-3 pl-5 pr-5">
      <Modal.Header closeButton>
        <Modal.Title>Add new combination</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CombinationForm
          combination={combination}
          setCombination={setCombination}
        />
      </Modal.Body>
      <Modal.Footer>
        <Col className="text-center">
          <Button onClick={add} size="sm" className="mr-2">Add next</Button>
          <Button onClick={addClose} size="sm" className="mr-2">Add and close</Button>
          <Button onClick={closeModal} variant="secondary" size="sm">close</Button>
        </Col>
      </Modal.Footer>
      </Container>
    </Modal>
  );
}

export default CombinationModal;
