import React, {useState} from "react";
import BootstrapTable from "react-bootstrap-table-next";
import {PlusSquare, XSquare} from 'react-bootstrap-icons';
import CombinationModal from "../Modals/CombinationModal";
import EmptyTable from "./EmptyTable";
import Button from "react-bootstrap/Button";
import {fitBtn} from "../../helpers/functions";

const Combinations = ({combinations, setCombinations, setEmptyCombinations}) => {

  const [showModal, setShowModal] = useState(false)

  console.log('combinations', combinations)

  const deleteCombination = (row) => {
    setCombinations(prevState => {
     return prevState.filter(c => c.id !== row.id)
    })
  };

  const DeleteIcon = (cell, row) => {
    return (
      <XSquare size="25" color="red" onClick={() => deleteCombination(row)}/>
    )
  };

  const AddIcon = () => {
    return (
      <Button variant="success" onClick={() => setShowModal(true)} size="sm" className="mb-2">
        <strong>Add combination {" "}</strong>
        <PlusSquare size="20" color="white"/>
      </Button>
    )
  };

  const getLabels = (field) => {
    return <>{field.map(f => f.label).join(',')}</>
  }
  const Branch = (_, row) => getLabels(row.branch)
  const Division = (_, row) => getLabels(row.division)
  const Department = (_, row) => getLabels(row.department)
  const City = (_, row) => getLabels(row.city)

  const columns = [{
    dataField: 'branch',
    text: 'Branch',
    formatter: Branch
  }, {
    dataField: 'division',
    text: 'Division',
    formatter: Division
  }, {
    dataField: 'department',
    text: 'Department',
    formatter: Department
  }, {
    dataField: 'city',
    text: 'City',
    formatter: City
  }, {
    dataField: '',
    text: '',
    formatter: DeleteIcon,
    headerStyle: fitBtn()
  }];

  return (
    <>
      <BootstrapTable
        keyField="id"
        data={combinations}
        columns={columns}
        bordered={false}
        noDataIndication={EmptyTable}
        // horizontal scroll
        wrapperClasses="table-responsive"
        rowClasses="text-nowrap"
      />
      <AddIcon/>
      {showModal &&
        <CombinationModal
          setShowModal={setShowModal}
          setCombinations={setCombinations}
          setEmptyCombinations={setEmptyCombinations}
        />
      }
    </>
  )
}

export default Combinations;
