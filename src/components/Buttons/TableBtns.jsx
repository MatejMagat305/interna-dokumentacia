import React from "react";
import Button from "react-bootstrap/Button";
import {require_superior} from "../../helpers/functions";
import {FormattedEmployeeDate} from "../Others/Formatter";

export const MissedBtn = (cell, row, index, {setModalInfo, setShowModal, asSuperior}) => {

  const handleClick = () => {
    if (require_superior(row)) {
      return
    }
    setModalInfo({...row, asSuperior: asSuperior});
    setShowModal(true);
  }
  return (
    <Button onClick={handleClick} size="sm" className="btn-block">
      {require_superior(row) ? 'Details' : 'Sign'}
    </Button>
  );
};

export const SignedBtn = (cell, row) => {
  return require_superior(row)
    ? <Button size="sm">Details</Button>
    : FormattedEmployeeDate(cell, row.signatures[0])
};

