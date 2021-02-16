import {ExclamationTriangle} from 'react-bootstrap-icons';
import {Alert, Toast} from "react-bootstrap";
import {useEffect, useState} from "react";

export const CustomAlert = ({notification}) => {

  // const [visible, setVisible] = useState(true);
  // useEffect(() => {
  //   setVisible(true);
  //   setTimeout(() => {
  //     setVisible(false);
  //   }, 5*1000);
  // }, [notification]);
  if (notification === undefined) return null

  return (
      <>
      {/*{ visible ? */}
        <Alert variant={notification.variant}>{notification.body}</Alert>
        {/*: null*/}
      {/*}*/}
      </>
    )
    // <Toast
    //   onClose={() => show = false} show={show}
    //   // delay={3000} autohide
    //   style={{
    //   position: 'absolute',
    //   top: '5rem',
    //   right: '1rem',
    //   backgroundColor: notification.color
    // }}>
    //   <Toast.Header>
    //     <strong className="mr-auto">Notification</strong>
    //   </Toast.Header>
    //   <Toast.Body>{notification.body}</Toast.Body>
    // </Toast>
}