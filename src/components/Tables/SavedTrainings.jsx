import React, {useState} from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import EditBtn from "../Buttons/EditBtn";
import EmptyTable from "./EmptyTable";
import SendBtn from "../Buttons/SendBtn";
import {FormattedDate} from "../Others/Formatter";
import {fitBtn} from "../../helpers/functions";
import {CustomAlert} from "../Others/CustomAlert";
import CaptionElement from "../Others/CaptionElement";

const SavedTrainings = ({setForm, trainings}) => {
  console.log('trainings', trainings)
  const [savedTrainings, setSavedTrainings] = useState(trainings);
  const [notification, setNotification] = useState()

  const columns = [{
    dataField: 'name',
    text: 'Name',
    sort: true,
  }, {
    dataField: 'release_date.Time',
    text: 'Release',
    formatter: FormattedDate,
    sort: true,
  }, {
    dataField: 'place',
    text: 'Place',
    sort: true,
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
      setSavedRec: setSavedTrainings
    },
    headerStyle: fitBtn()
  }];

  return (
    <>
      <CaptionElement title="Saved trainings"/>
      <BootstrapTable
        keyField="id"
        hover
        data={savedTrainings}
        columns={columns}
        noDataIndication={EmptyTable}
      />
      {notification &&
        <CustomAlert notification={notification}/>
      }
    </>
  )
}

export default SavedTrainings;

