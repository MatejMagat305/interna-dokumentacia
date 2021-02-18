import React from "react";
import Modal from "react-bootstrap/Modal";
import DocumentForm from "../Forms/DocumentForm";
import TrainingForm from "../Forms/TrainingForm";

const EditRecordModal = ({form, setForm, actual}) => {

  const closeModal = () => setForm({...form, type: ''});

  if (form.type === ''){
    return null
  }
  return (
    <Modal show={true} onHide={closeModal} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Edit {form.type}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {form.type === 'document'
          ? <DocumentForm formData={form.data} actual={actual}/>
          : <TrainingForm formData={form.data} actual={actual}/>
        }
      </Modal.Body>
    </Modal>
  )
}

export default EditRecordModal;
