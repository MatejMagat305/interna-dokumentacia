import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import CaptionElement from "../Others/CaptionElement";
import {SignedBtn} from "../Buttons/TableBtns";
import {nonExpandableDocs, orderBy} from "../../helpers/functions";
import EmptyTable from "./EmptyTable";
import {
  FormattedEmployeeDate,
  FormattedRelease,
  FormattedSuperiorDate,
  FullName,
  NameWithLink
} from "../Others/Formatter";

const SignedDocuments = ({documents}) => {

  console.log('documents', documents)
  const columns = [{
    dataField: 'name',
    text: 'Name',
    sort: true,
    formatter: NameWithLink
  }, {
    dataField: 'release_date.Time',
    text: 'Release',
    // align: 'center',
    // headerAlign: 'center',
    sort: true,
    formatter: FormattedRelease
  }, {
    dataField: 'signatures[0].e_date.Time',
    text: 'Signed date',
    // align: 'right',
    // headerAlign: 'right',
    sort: true,
    formatter: SignedBtn
  }];

const expandColumns = [{
    dataField: 'employee.id',
    text: 'Employee ID',
    sort: true
  }, {
    dataField: 'employee.last_name',
    text: 'Full name',
    sort: true,
    formatter: FullName
  }, {
    dataField: 'e_date.Time',
    text: 'Employee Sign',
    sort: true,
    formatter: FormattedEmployeeDate
  },{
    dataField: 's_date.Time',
    text: 'My Sign',
    sort: true,
    formatter: FormattedSuperiorDate
  }];

  const expandRow = {
    onlyOneExpanding: true,
    nonExpandable: nonExpandableDocs(documents),
    renderer: (cell) => (
      <BootstrapTable
        keyField="id"
        classes="inner-table"
        hover
        data={cell.signatures}
        columns={expandColumns}
        defaultSorted={orderBy('employee.last_name')}
      />
    )
  };

  return (
    <>
      <CaptionElement title="Signed Documents"/>
      <BootstrapTable
        keyField="id"
        hover
        data={documents}
        columns={columns}
        expandRow={expandRow}
        noDataIndication={EmptyTable}
        defaultSorted={orderBy('release_date.Time', 'desc')}
      />
    </>
  );
}

export default SignedDocuments;
