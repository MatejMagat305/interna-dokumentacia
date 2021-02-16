import React from "react";
import {Button, Form, Row} from "react-bootstrap";
import {pobocky} from "../../helpers/data";

const SettingsPage = () => {

  // TODO JOZO implement the page

  //vybrat pobocku, z ktorej bol export spraveny
  //upload export
  //update DB
  //upload suboru so zamestnaneckymi kartami, zamestnanci su uz v DB
  //division == pobocka?

  let chosenFile = null

  const placeholderOption = () => {
    return (
      <option key={-1} disabled value="default">Select pobocka</option>
    )
  }
  const newOption = (name, i) => {
    return (
      <option key={i} value={name} >
        {name}
      </option>
    )
  }

  const createPobocky = () => {
    let menu = []
    menu.push(placeholderOption())
    for(let i=0; i<pobocky.length; i++) {
      menu.push(newOption(pobocky[i], i))
    }
    return menu
  }

  const fileHanlder = (e) => {
    console.log(e.target.files[0])

    let file = e.target.files[0]
    chosenFile = file
  }

  const onSubmit = (e) => {
    console.log("onSubmit")

    var data = new FormData()
    data.append('file', chosenFile)
    let name = document.getElementById("selectDivision").value + Date.now()
    data.append('name', name)


  }

  return (
    <div>
      <Form className="pl-3">
        <Row className="pt-3">Choose division</Row>
        <Row>
          <select defaultValue="default" id="selectDivision">
            {createPobocky()}
          </select>
        </Row>
        <Row className="pt-3">
          <input type="file" onChange={fileHanlder}/>
        </Row>
        <Row className="pt-3">
          <Button type="button" onClick={onSubmit} >Upload</Button>
        </Row>
      </Form>

      <Form className="pt-5">
        <p>Upload file with employee card information.</p>
        <Form.Group>
          <Form.File id="cardsFile" label="Select file."/>
        </Form.Group>

      </Form>
    </div>
  )
}

export default SettingsPage;

