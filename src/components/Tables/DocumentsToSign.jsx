import React, {useState} from "react";
import BootstrapTable from "react-bootstrap-table-next";
import {MissedBtn} from "../Buttons/TableBtns";
import CaptionElement from "../Others/CaptionElement";
import ConfirmModal from "../Modals/ConfirmModal";
import EmptyTable from "./EmptyTable";
import {fitBtn, nonExpandableDocs, orderBy, require_superior, successResponse} from "../../helpers/functions";
import {FormattedDeadline, FormattedEmployeeDate, FormattedRelease, FullName, NameWithLink} from "../Others/Formatter";

const DocumentsToSign = ({documents, fetchSign}) => {

  const [docs, setDocs] = useState(documents);
  const [showModal, setShowModal] = useState(false)
  const [modalInfo, setModalInfo] = useState({})

  const handleAccept = () => {
    if (require_superior(modalInfo) === false) {
      signAsEmployee(modalInfo.signatures[0].id)
    } else {
      signAsSuperior(modalInfo.id)
    }
    setShowModal(false);
  }

  const signAsEmployee = (signature_id) => {
    fetchSign('/sign', signature_id)
      .then(res => {
        if (successResponse(res)){
          updateEmployeeDocs(signature_id)
        }
      })
  }

  const signAsSuperior = (signature_id) => {
    fetchSign('/sign/superior', signature_id)
      .then(res => {
        if (successResponse(res)){
          updateSuperiorDocs(signature_id)
        }
      })
  }

  const updateEmployeeDocs = (signature_id) => {
    setDocs(docs.filter(d => d.signatures[0].id !== signature_id))
  }

  const updateSuperiorDocs = (signature_id) => {
    const update = docs.map(d => {
      return {...d, signatures: d.signatures.filter(s => s.id !== signature_id)}
    })
    setDocs(update.filter(d => d.signatures.length));
  }

  const columns = [{
    dataField: 'name',
    text: 'Name',
    sort: true,
    formatter: NameWithLink
  }, {
    dataField: 'release_date.Time',
    text: 'Release',
    sort: true,
    formatter: FormattedRelease
  }, {
    dataField: 'deadline.Time',
    text: 'Deadline',
    sort: true,
    formatter: FormattedDeadline
  }, {
    dataField: 'missedBtn',
    formatter: MissedBtn,
    formatExtraData: {
      setModalInfo: setModalInfo,
      setShowModal: setShowModal,
      asSuperior: false
    },
    headerStyle: fitBtn()
  }];

  const expandColumns = [{
    dataField: 'employee.id',
    text: 'Employee ID',
    sort: true,
  }, {
    dataField: 'employee.last_name',
    text: 'Full name',
    sort: true,
    formatter: FullName
  }, {
    dataField: 'e_date.Time',
    text: 'Sign Date',
    sort: true,
    formatter: FormattedEmployeeDate
  },{
    formatter: MissedBtn,
    formatExtraData: {
      setModalInfo: setModalInfo,
      setShowModal: setShowModal,
      asSuperior: true
    },
    headerStyle: fitBtn()
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
      <CaptionElement title="Documents to sign"/>
      <BootstrapTable
        keyField="id"
        hover
        data={docs}
        columns={columns}
        expandRow={expandRow}
        defaultSorted={orderBy('deadline.Time')}
        noDataIndication={EmptyTable}
      />
      {showModal &&
        <ConfirmModal
          showModal={showModal}
          setShowModal={setShowModal}
          modalInfo={modalInfo}
          handleAccept={handleAccept}
        />
      }
    </>
  )
};

export default DocumentsToSign;