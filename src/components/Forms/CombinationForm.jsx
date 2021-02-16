import React, {useEffect, useState} from "react";
import {Col} from "react-bootstrap";
import Select from "react-select";
import {setOf} from "../../helpers/functions";
import {combinations} from "../../helpers/data";

const CombinationForm = ({combination, setCombination}) => {

  let combi = combinations

  const [select, setSelect] = useState()
  const [toggle, setToggle] = useState([false])

  const [branches, setBranches] = useState(setOf(combi.map(c => c.branch)));
  const [divisions, setDivisions] = useState(setOf(combi.map(c => c.division)));
  const [departments, setDepartments] = useState(setOf(combi.map(c => c.department)));
  const [cities, setCities] = useState(setOf(combi.map(c => c.city)));

  const handleBranch = (data) => {
    setCombination({...combination, branch: data})
    commitChanges('branch')
  }

  const handleDivision = (data) => {
    setCombination({...combination, division: data})
    commitChanges('division')
  }

  const handleDepartment = (data) => {
    setCombination({...combination, department: data})
    commitChanges('department')
  }

  const handleCity = (data) => {
    setCombination({...combination, city: data})
    commitChanges('city')
  }

  const commitChanges = (select) => {
    setSelect(select)
    setToggle([!toggle[0]])
  }

  const isEmptyFilter = () => {
    return !combination.branch.length &&
      !combination.division.length &&
      !combination.department.length &&
      !combination.city.length
  }

  useEffect(() => {
    if (isEmptyFilter()) {
      setSelect('reset')
    }
    updateDropBox(combination, select)
  }, toggle);

  const updateDropBox = (data, select) => {
    let update = combi
    let values = []

    // branches
    values = combination.branch.map(d => d.value)
    if (values.length) {
      update = update.filter(c => values.includes(c.branch.value))
    } else {
      setBranch(update)
      console.log("any branches")
    }

    // divisions
    values = combination.division.map(d => d.value)
    if (values.length) {
      update = update.filter(c => values.includes(c.division.value))
    } else {
      setDivision(update)
      console.log("any divisions")
    }

    // departments
    values = combination.department.map(d => d.value)
    if (values.length) {
      update = update.filter(c => values.includes(c.department.value))
    } else {
      setDepartment(update)
      console.log("any departments")
    }

    // cities
    values = combination.city.map(d => d.value)
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
    <Col>
      <Select isMulti={true} placeholder="Branches" options={branches} onChange={handleBranch}/>
      <Select isMulti={true} placeholder="Divisions" options={divisions} onChange={handleDivision}/>
      <Select isMulti={true} placeholder="Departments" options={departments} onChange={handleDepartment}/>
      <Select isMulti={true} placeholder="Cities" options={cities} onChange={handleCity}/>
    </Col>
  )
}

export default CombinationForm;