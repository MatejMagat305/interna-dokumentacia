import React from "react";
import {ExclamationTriangle} from "react-bootstrap-icons";
import {employees} from "../../helpers/data";

export const FullName = (_, row) => {
  if (row.employee === null) {
    return
  }
  return <>{row.employee.first_name} {row.employee.last_name}</>
}

const formatted = (date) => date.substr(0,10).split("-").reverse().join(".");

export const FormattedDate = (_, row) => {
  return <>{formatted(row.date.Time)}</>
}

export const FormattedDeadline = (_, row) => {
  return <>{formatted(row.deadline.Time)}</>
}

export const FormattedRelease = (_, row) => {
  return <>{formatted(row.release_date.Time)}</>
}

export const FormattedSuperiorDate = (_, row) => {
  return <>{formatted(row.s_date.Time)}</>
}

export const FormattedTrainingDate = (_, row) => {
  return <>{formatted(row.signatures[0].date.Time)}</>
}

export const FormattedEmployeeDate = (_, row) => {
  const date = formatted(row.e_date.Time)
  if (date === '01.01.0001') {
    return <>-</> // Employee didn't signed yet
  }
  else {
    return <>{date}</>
  }
}

export const NameWithLink = (_, row) => {
  return <a href={row.name} target="_blank">{row.name}</a>
}

export const DocumentLabel = (_, row) => {

  const ExclamationName = () => {
    return (
      <h5>
        <ExclamationTriangle style={{color: "red", marginBottom: "6px"}}/>
        {" "}{NameWithLink(_, row)}
      </h5>
    );
  }

  const expired = row.deadline < Date.now() &&
    row.employees.find(e => e.state.includes("e") || e.state.includes("s"))

  return <>{expired ? <ExclamationName/> : NameWithLink(_, row)}</>
}

export const FormattedEmployee = (_, row) => {
  const employee = employees[row-1]
  const percentage = 100 // TODO
  return (
    <div style={{fontSize: "12px"}}>
      {employee.name}, {employee.job}, {percentage}%
    </div>
  )
}