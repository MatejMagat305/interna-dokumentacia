import React, {useState} from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import EditBtn from "../Buttons/EditBtn";
import EmptyTable from "./EmptyTable";
import {dbdocs} from "../../data";
import SendBtn from "../Buttons/SendBtn";
import {Alert} from "react-bootstrap";
import {FormattedDeadline, FormattedRelease} from "../Others/DateFormatter";

const SavedRecords = ({setFormType, setFormData}) => {

  const [msg, setMsg] = useState()

  // TODO MATO get editable documents from DB
  const [editable_docs, setEditable_docs] = useState(dbdocs);

  const columns = [{
      dataField: 'name',
      text: 'Name'
    }, {
      dataField: 'release.Time',
      text: 'Release',
      formatter: FormattedRelease,
    }, {
      dataField: 'deadline.Time',
      text: 'Deadline',
      formatter: FormattedDeadline,
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
        setMsg: setMsg,
        editable_docs: editable_docs,
        setEditable_docs: setEditable_docs
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
      {msg && <Alert variant='success'>{msg}</Alert>}
    </>
  )
}

export default SavedRecords;

