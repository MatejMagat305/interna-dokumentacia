import React, {useEffect, useState} from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import EditBtn from "../Buttons/EditBtn";
import EditRecordModal from "../Modals/EditRecordModal";
import ReportBtn from "../Buttons/ReportBtn";
import {fitBtn, orderBy} from "../../helpers/functions";
import EmptyTable from "./EmptyTable";
import {FormattedRelease} from "../Others/Formatter";

const FoundRecords = ({filter, docs, setDocs, combs}) => {

  const [form, setForm] = useState();

  useEffect(() => {
    if(docs.length > 0 && combs.length > 0) {
      docs.forEach(d => {
        let branchId = d.assigned_to[0]
        let cityId = d.assigned_to[3]
        let departmentId = d.assigned_to[6]
        let divisionId = d.assigned_to[9]
        let combination = combs.filter(c => c.city_id == cityId
          && c.department_id == departmentId
          && c.division_id == divisionId)
        //console.log(`combination: ${cityId} ${departmentId} ${divisionId}`)
        //console.log(combination)
        if(combination.length > 0) {
          d.city = combination[0].city_name
        }
      })
      setDocs(docs)
    }
  }, [])

  const columns = [{
    dataField: 'name',
    text: "Name"
  }, {
    dataField: 'release',
    text: 'Release',
    formatter: FormattedRelease
  }, {
    dataField: 'type',
    text: 'Type'
  }, {
    dataField: 'division',
    text: 'Division'
  }, {
    dataField: 'department',
    text: 'Department'
  }, {
    dataField: 'city',
    text: 'City'
  }, {
    dataField: 'record_type',
    text: 'Record Type'
  }, {
    dataField: 'state',
    text: 'State'
  }, {
    dataField: 'edit',
    text: 'Edit',
    formatter: EditBtn,
    formatExtraData: {
      setForm: setForm,
    },
    headerStyle: fitBtn()
  }, {
    dataField: 'report',
    text: 'Report',
    formatter: ReportBtn,
    headerStyle: fitBtn()
  }];

  return (
    <>
      <BootstrapTable
        keyField="id"
        hover
        data={docs}
        columns={columns}
        defaultSorted={orderBy('name')}
        noDataIndication={EmptyTable}
        // horizontal scroll
        wrapperClasses="table-responsive"
        rowClasses="text-nowrap"
      />
      {form &&
        <EditRecordModal
          form={form}
          setForm={setForm}
          actual={true}
        />
      }
    </>
  );
};

export default FoundRecords;