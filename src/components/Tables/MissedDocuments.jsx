import React, {useState} from "react";
import BootstrapTable from "react-bootstrap-table-next";
import {MissedBtn} from "../Buttons/TableBtns";
import CaptionElement from "../Others/CaptionElement";
import ConfirmModal from "../Modals/ConfirmModal";
import EmptyTable from "./EmptyTable";
import {nonExpandableDocs, require_superior, delay} from "../../functions";
import {FormattedDeadline, FormattedRelease} from "../Others/DateFormatter";
import {proxy} from "../../data";

const MissedDocuments = ({documents}) => {

  console.log("documents", documents)

  const [docs, setDocs] = useState(documents);
  const [showModal, setShowModal] = useState(false)
  const [modalInfo, setModalInfo] = useState({})

  const handleAccept = async () => {
    console.log('modalInfo', modalInfo);
    console.log('signing as', require_superior(modalInfo))

    // const update = docs.filter(d => d.signatures[0].id !== 1114)
    // console.log('update', update)
    // setDocs(update);
    // await delay(5000).then(r => console.log("dayPeriod"))
    // console.log("hu")
    // console.log('docs', docs)
    //
    // return

    if (require_superior(modalInfo) === false) {
      fetchSign('/sign', modalInfo.signatures[0].id)
    } else {
      fetchSign('/sign/superior', modalInfo.id)
      setDocs(docs.filter(d => d.id !== modalInfo.id)); // TODO ME
    }

    setShowModal(false);
  }

  /** Update sign date (e_date or s_date) to Date.now()
   * @param url: /sign update employee date
   *             /sign/superior update superior
   * @param id: id of document_signature
   * */
  const fetchSign = (url, id) => {
    console.log('fetch to', url, id)
    fetch(`${proxy}${url}`, {
      method: "POST",
      body: new URLSearchParams(`id=${id}`)
    })
      .then(response => response.json())
      .then(res => {
        console.log("succeeded")
        console.log('res', res)
      })
      .catch(() => console.log("something goes wrong"))
  }

  const columns = [
    {
      dataField: 'name',
      text: 'Name',
      sort: true
    }, {
      dataField: 'release_date.time',
      text: 'Release',
      formatter: FormattedRelease,
      sort: true // FIXME not work
    }, {
      dataField: 'deadline.time',
      text: 'Deadline',
      formatter: FormattedDeadline,
      sort: true // FIXME not work
    }, {
      dataField: 'signBtn',
      text: 'Sign',
      formatter: MissedBtn,
      formatExtraData: {
        setModalInfo: setModalInfo,
        setShowModal: setShowModal
      },
      headerStyle: () => { return {width: '1%'} }
    }
  ];

  const expandColumns = [
    {
      dataField: 'employee.id',
      text: 'Employee ID',
      sort: true
    }, {
      dataField: 'employee.first_name',
      text: 'First name',
      sort: true
    }, {
      dataField: 'employee.last_name',
      text: 'Last Name',
      sort: true
    }, {
      dataField: 'signBtn',
      text: 'Sign',
      formatter: MissedBtn,
      formatExtraData: {
        setModalInfo: setModalInfo,
        setShowModal: setShowModal
      },
      headerStyle: () => { return {width: '1%'} }
    }
  ];

  // const getData = (row) => {
  //   console.log('row', row)
  //   console.log('inner-row', documents[row].signatures)
  //   return documents[row].signatures
  // }

  const expandRow = {
    nonExpandable: nonExpandableDocs(documents),
    renderer: (cell, row) => (
      <BootstrapTable
        keyField="id"
        classes="inner-table"
        hover
        data={documents[row].signatures}
        columns={expandColumns}
        defaultSorted={[{dataField: 'employee.last_name', order: 'asc'}]}/>
    )
  };

  return (
    <>
      <CaptionElement title="Documents to sign"/>
      <BootstrapTable
        keyField="id"
        hover
        data={documents}
        columns={columns}
        expandRow={expandRow}
        defaultSorted={[{dataField: 'deadline', order: 'asc'}]}
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
}

export default MissedDocuments;