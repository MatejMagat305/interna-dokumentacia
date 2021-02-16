import React, {useState} from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import EditBtn from "../Buttons/EditBtn";
import EmptyTable from "./EmptyTable";
import SendBtn from "../Buttons/SendBtn";
import {FormattedDeadline, FormattedRelease} from "../Others/Formatter";
import {fitBtn} from "../../helpers/functions";
import {CustomAlert} from "../Others/CustomAlert";
import CaptionElement from "../Others/CaptionElement";

const SavedDocuments = ({setForm, documents}) => {
  console.log('documents', documents)
  const [savedDocs, setSavedDocs] = useState(documents);
  const [notification, setNotification] = useState()

  const columns = [{
    dataField: 'name',
    text: 'Name',
    sort: true
  }, {
    dataField: 'release_date.Time',
    text: 'Release',
    sort: true,
    formatter: FormattedRelease,
  }, {
    dataField: 'deadline.Time',
    text: 'Deadline',
    sort: true,
    formatter: FormattedDeadline,
  }, {
    dataField: 'editBtn',
    formatter: EditBtn,
    formatExtraData: {
      setForm: setForm,
    },
    headerStyle: fitBtn()
  }, {
    dataField: 'sendBtn',
    formatter: SendBtn,
    formatExtraData: {
      setNotification: setNotification,
      setSavedRec: setSavedDocs
    },
    headerStyle: fitBtn()
  }];

  return (
    <>
      <CaptionElement title="Saved documents"/>
      <BootstrapTable
        keyField="id"
        hover
        data={savedDocs}
        columns={columns}
        noDataIndication={EmptyTable}
      />
      {notification &&
        <CustomAlert notification={notification}/>
      }
    </>
  )
};

export default SavedDocuments;

