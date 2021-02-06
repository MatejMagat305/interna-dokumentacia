import React from "react";
import {Button, ButtonGroup, Col, Row, Badge} from "react-bootstrap";
import {ExclamationTriangle} from "react-bootstrap-icons";
import Container from "react-bootstrap/Container";

export const RowButtons = ({setEvent, setShowModal, handleAccept, handleExport}) => {

  const handleClick = (e) => {
    if (e.target.id === "cancel") {
      handleAccept()
    } else {
      setShowModal(true)
    }
    setEvent(e.target.id)
  }

  return (
    <Row>
      <Col xs="2">
        <Button id="export" variant="dark" onClick={handleExport}>Export</Button>
      </Col>
      <Col className="text-right">
        <ButtonGroup className="div-btn" onClick={handleClick}>
          <Button id="sign">Sign</Button>
          <Button id="cancelDuty">Cancel duty</Button>
          <Button id="trainAgain">Train again</Button>
          <Button id="cancel" onClick={handleClick}>Cancel</Button>
        </ButtonGroup>
      </Col>
    </Row>
  )
}

export const Legend = () => {

  const style = (color, textColor="white") => {
    return {
      background: color,
      borderColor: color,
      color: textColor,
      width: "100px"
    }
  }

  // const Badge = ({color, textColor="white", text}) => {
  //   const style = {
  //     background: color,
  //     borderColor: color,
  //     color: textColor,
  //     width: "100px"
  //   }
  //
  //   return (<Button>badge</Button>)
  // }

  return (
    <Container className="pt-5 pl-0" style={{marginTop: "3rem"}}>
      <h5 className="pb-2">Legend:</h5>
      <p><Button style={style("gray")} size="sm">no need</Button>{' '}Zamestnanec bol odznačený z potreby oboznámenia alebo sa ho dokument netýka</p>
      <p><Button style={style("tomato")} size="sm">miss e+s</Button>{' '}Ani zamestnanec ani nadriadený ešte nepotvrdili</p>
      <p><Button style={style("orange")} size="sm">miss e</Button>{' '}Zamestnanec nepotvrdil</p>
      <p><Button style={style("gold", "black")} size="sm">miss s</Button>{' '}Nadriadený nepotvrdil</p>
      <p><Button style={style("green")} size="sm">well done</Button>{' '}Dokument je potvrdený</p>
      <p><Button style={style("cornflowerblue")} size="sm">not sent</Button>{' '}Este neodoslane</p>
      <p>hviezdička <strong>*</strong> znamena, ze zamestnanec sa opakovane preškoluje</p>
      <p><ExclamationTriangle style={{color: "red"}}/>{' '}Uplynul deadline a chýbajú podpisy</p>
    </Container>
  )
}

export const DocumentLabel = (col, row, index, {data}) => {

  const doc = data[index]

  function expired(){
    return doc.deadline < Date.now() && doc.employees.find(e => e.state.includes("e") || e.state.includes("s"))
  }

  return (
    <>
      {expired()
        ? <h5><ExclamationTriangle style={{color: "red"}}/>{" "}{doc.name}</h5>
        : <p>{doc.name} </p>
      }
    </>
  )
}