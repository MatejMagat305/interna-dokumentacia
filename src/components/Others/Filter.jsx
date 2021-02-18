import React, {useEffect, useState} from "react";
import {Button, Col, Form, InputGroup, Row} from "react-bootstrap";
import {employees as e} from "../../helpers/data";
import Select from 'react-select'
import {setOf} from "../../helpers/functions";
import {Typeahead} from "react-bootstrap-typeahead";

const Filter = ({filter, setFilter, combs}) => {

  const [combi, setCombi] = useState([])

  useEffect (() => {
    setBranches(setOf(combi.map(c => c.branch)))
    setCities(setOf(combi.map(c => c.city)))
    setDepartments(setOf(combi.map(c => c.department)))
    setDivisions(setOf(combi.map(c => c.division)))
  }, [combi])

  useEffect(() => {
    combs.forEach(c => {
      c.type = {value: "TYPE", label: "TYPE"}
      c.branch = {value: c.branch_id, label: c.branch_name}
      c.city = {value: c.city_id, label: c.city_name}
      c.department = {value: c.department_id, label: c.department_name}
      c.division = {value: c.division_id, label: c.division_name}
    })
    setCombi(combs)
  }, [combs])

  const types = setOf(combi.map(c => c.type))
  const records = [
    { value: 'documents', label: 'documents' },
    { value: 'document-training', label: 'document-training' },
    { value: 'online-training', label: 'online-training' }
  ]

  const [select, setSelect] = useState()
  const [toggle, setToggle] = useState([false])

  const [branches, setBranches] = useState(setOf(combi.map(c => c.branch)));
  const [divisions, setDivisions] = useState(setOf(combi.map(c => c.division)));
  const [departments, setDepartments] = useState(setOf(combi.map(c => c.department)));
  const [cities, setCities] = useState(setOf(combi.map(c => c.city)));
  // const [recordName, setRecordName] = useState()

  const isEmptyFilter = () => {
    return !filter.branch.length &&
      !filter.division.length &&
      !filter.department.length &&
      !filter.city.length
  }

  const onSubmit = (e) => {
    e.preventDefault()
    console.log('handleSubmit', filter) // TODO filter
  };

  const handleType = (data) => {
    setFilter({...filter, type: data})
  };

  const handleBranch = (data) => {
    setFilter({...filter, branch: data})
    commitChanges('branch')
  }

  const handleDivision = (data) => {
    setFilter({...filter, division: data})
    commitChanges('division')
  }

  const handleDepartment = (data) => {
    setFilter({...filter, department: data})
    commitChanges('department')
  }

  const handleCity = (data) => {
    setFilter({...filter, city: data})
    commitChanges('city')
  }

  const handleRecord = (data) => {
    setFilter({...filter, record: data})
  }

  const addEmployee = (attendee) => {
    setFilter({...filter, employeeName: attendee})
  }

  const addRecord = (attendee) => {
    setFilter(prevState => {
      return {...prevState, recordName: attendee}
    })
  }

  const commitChanges = (select) => {
    setSelect(select)
    setToggle([!toggle[0]])
  }

  useEffect(() => {
    if (isEmptyFilter()) {
      setSelect('reset')
    }
    updateDropBox(filter, select)
  }, toggle);

  const updateDropBox = (data, select) => {
    let update = combi
    let values = []

    // branches
    values = filter.branch.map(d => d.value)
    if (values.length) {
      update = update.filter(c => values.includes(c.branch.value))
    } else {
      setBranch(update)
      console.log("any branches")
    }

    // divisions
    values = filter.division.map(d => d.value)
    if (values.length) {
      update = update.filter(c => values.includes(c.division.value))
    } else {
      setDivision(update)
      console.log("any divisions")
    }

    // departments
    values = filter.department.map(d => d.value)
    if (values.length) {
      update = update.filter(c => values.includes(c.department.value))
    } else {
      setDepartment(update)
      console.log("any departments")
    }

    // cities
    values = filter.city.map(d => d.value)
    if (values.length) {
      update = update.filter(c => values.includes(c.city.value))
    } else {
      setCity(update)
      console.log("any cities")
    }

    if (select !== 'branch') setBranch(update)
    if (select !== 'division') setDivision(update)
    if (select !== 'department') setDepartment(update)
    if (select !== 'city') setCity(update)
  }

  function setBranch(combs) {setBranches(setOf(combs.map(c => c.branch)))}
  function setDivision(combs) {setDivisions(setOf(combs.map(c => c.division)))}
  function setDepartment(combs) {setDepartments(setOf(combs.map(c => c.department)))}
  function setCity(combs) {setCities(setOf(combs.map(c => c.city)))}

  return (
    <Form className="pb-4" onSubmit={onSubmit}>
      <Row className='pb-1'>
        <Col>Types</Col>
        <Col>Branches</Col>
        <Col>Divisions</Col>
        <Col>Departments</Col>
        <Col>Cities</Col>
        <Col>Record</Col>
      </Row>
      <Row className='pb-2'>
        <Col><Select isMulti={true} placeholder="Types" options={types} onChange={handleType}/></Col>
        <Col><Select isMulti={true} placeholder="Branches" options={branches} onChange={handleBranch}/></Col>
        <Col><Select isMulti={true} placeholder="Divisions" options={divisions} onChange={handleDivision}/></Col>
        <Col><Select isMulti={true} placeholder="Departments" options={departments} onChange={handleDepartment}/></Col>
        <Col><Select isMulti={true} placeholder="Cities" options={cities} onChange={handleCity}/></Col>
        <Col><Select isMulti={true} placeholder="Record" options={records} onChange={handleRecord}/></Col>
      </Row>
      <Row>
        <Col>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">Record name</InputGroup.Text>
            </InputGroup.Prepend>
            <Typeahead
              id="basic-typeahead-single"
              name="recordName"
              labelKey={option => `${option.name}`}
              onChange={addRecord}
              options={e} // TODO ={records}
              placeholder="record name"
            />
          </InputGroup>
        </Col>
        <Col className="text-right">
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">Employee name</InputGroup.Text>
            </InputGroup.Prepend>
            {/*<Form.Control*/}
            {/*  placeholder="Employee name"*/}
            {/*  name="employeeName"*/}
            {/*  ref={register}*/}
            {/*/>*/}
            <Typeahead
              id="basic-typeahead-single"
              name="employeeName"
              labelKey={option => `${option.name} [${option.anet_id}]`}
              onChange={addEmployee}
              options={e} // TODO ={employees}
              placeholder="employee name"
            />
          </InputGroup>
        </Col>

        <Col className="text-right">
          <Button type="submit">Search</Button>
        </Col>
      </Row>
    </Form>
  )
}

export default Filter;

