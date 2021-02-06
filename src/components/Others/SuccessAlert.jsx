import {Alert} from "react-bootstrap";

export const SuccessAlert = ({text}) => {

  return <Alert variant="success" style={{color: "green"}}>{text}</Alert>
}