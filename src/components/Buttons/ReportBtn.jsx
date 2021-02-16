import {Button} from "react-bootstrap";
import React from "react";

const ReportBtn = (cell, row) => {

  const handleClick = () => {
    console.log('Show SM') // TODO ME implement me
  }

  return(
    <Button onClick={handleClick} size={"sm"}>
      report
    </Button>
  );
};

export default ReportBtn;
