import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import CaptionElement from "../Others/CaptionElement";
import EmptyTable from "./EmptyTable";
import {FormattedDate, FormattedTrainingDate} from "../Others/Formatter";
import {orderBy} from "../../helpers/functions";

const SignedTrainings = ({trainings}) => {

  const columns = [{
    dataField: 'name',
    text: 'Name',
    sort: true
  }, {
    dataField: 'date.Time',
    text: 'Took place',
    sort: true,
    formatter: FormattedDate
  }, {
    dataField: 'signatures[0].date.Time', // always array with length of 1 [by SQL query]
    text: 'Signed date',
    sort: true,
    formatter: FormattedTrainingDate
  }];

  return (
    <>
      <CaptionElement title="Signed Trainings"/>
      <BootstrapTable
        keyField="id"
        hover
        data={trainings}
        columns={columns}
        noDataIndication={EmptyTable}
        defaultSorted={orderBy('date.Time', 'desc')}
      />
    </>
  )
}

export default SignedTrainings;