import React from "react";
import {Button, ButtonGroup, Col, Row, Badge, Card} from "react-bootstrap";
import {ExclamationTriangle} from "react-bootstrap-icons";
import Container from "react-bootstrap/Container";
import {employees} from "../../helpers/data";

export const RowButtons = ({setAction, setModalInfo, setShowModal, handleAccept, showLegend, setShowLegend}) => {

  const handleClick = (e) => {
    const action = e.target.id
    setAction(action)
    if (action === "cancel") {
      handleAccept()
    } else {
      setModalInfo({body:`Do you really want to ${action} selected signatures?`})
      setShowModal(true)
    }
  }

  return (
    <Row className="mb-3">
      {/*<Col className="text-left">*/}
      {/*  <ButtonGroup className="div-btn" size="sm">*/}
      {/*    <Button onClick={() => setShowLegend(!showLegend)} size="sm">{showLegend ? 'Hide legend' : 'Show legend'}</Button>*/}
      {/*  </ButtonGroup>*/}
      {/*</Col>*/}
      <Col className="text-right">
        <ButtonGroup className="div-btn" size="sm" onClick={handleClick}>
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

  const Badge = ({color, textColor="white", label, text}) => {
    const style = {
      background: color,
      borderColor: color,
      color: textColor,
      width: "80px",
      height: "20px",
      fontSize: '.7rem',
      fontWeight: 'bold',
      padding: '0'
    }
    return <p><span><Button style={style}>{label}</Button>{` ${text}`}</span></p>
  }

  return (
    <Card style={{ width: '30rem', marginTop: '8rem', fontSize: '.7rem', marginBottom: '.75rem' }}>
      <Card.Body>
        <Card.Subtitle className="mb-3 text-muted">Legend:</Card.Subtitle>
        <Card.Text>
          <Badge label="no need" text="Zamestnanec bol odznačený z potreby oboznámenia" color="gray"/>
          <Badge label="miss e+s" text="Ani zamestnanec ani nadriadený ešte nepotvrdili" color="tomato"/>
          <Badge label="miss e" text="Zamestnanec nepotvrdil" color="orange"/>
          <Badge label="miss s" text="Nadriadený nepotvrdil" color="gold" textColor="white"/>
          <Badge label="well done" text="Dokument je potvrdený" color="green"/>
          <Badge label="not sent" text="Este neodoslane" color="cornflowerblue"/>
          <p><ExclamationTriangle style={{color: "red", marginBottom: "4px"}}/>{' '}Uplynul deadline a chýbajú podpisy</p>
          {/* TODO hviezdicka */}
          <p>hviezdička <strong>*</strong> znamena, ze zamestnanec sa opakovane preškoluje</p>
        </Card.Text>
      </Card.Body>
    </Card>
  )
}