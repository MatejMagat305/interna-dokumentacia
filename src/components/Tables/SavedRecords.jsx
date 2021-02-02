import React, {useState} from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import EditBtn from "../Buttons/EditBtn";
import EmptyTable from "./EmptyTable";
import {docs} from "../../data";
import SendBtn from "../Buttons/SendBtn";
import {Alert} from "react-bootstrap";

const SavedRecords = ({setFormType, setFormData}) => {

  const [msg, setMsg] = useState()

  // TODO MATO get editable documents from DB
  const editable_docs = docs;

  const columns = [{
      dataField: 'name',
      text: 'Name'
    }, {
      dataField: 'release',
      text: 'Release'
    }, {
      dataField: 'deadline',
      text: 'Deadline'
    }, {
      dataField: 'editBtn',
      text: 'Edit',
      formatter: EditBtn,
      formatExtraData: {
        setFormType: setFormType,
        setFormData: setFormData
      },
      headerStyle: () => { return {width: '1%'} }
    }, {
      dataField: 'sendBtn',
      text: 'Send',
      formatter: SendBtn,
      formatExtraData: {
        data: editable_docs,
        setMsg: setMsg
      },
      headerStyle: () => { return {width: '1%'} }
    }
  ];

  return (
    <>
      <BootstrapTable
        keyField="id"
        hover
        data={editable_docs}
        columns={columns}
        noDataIndication={EmptyTable}
      />
      {msg && // TODO
        <Alert variant='success'>{msg}</Alert>
      }
    </>
  )
}

export default SavedRecords;

