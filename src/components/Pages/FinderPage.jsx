import React, {useEffect, useState} from "react";
import Button from "react-bootstrap/Button";
import Filter from "../Others/Filter";
import FoundRecords from "../Tables/FoundRecords";
import SkillMatrix from "../Tables/SkillMatrix";

const FinderPage = () => {

  const [toggle, setToggle] = useState(true)
  const [filter, setFilter] = useState({
    type: [],
    branch: [],
    city: [],
    department: [],
    division: [],
    record: [],
    employeeName: '',
    recordName: ''
  });

  const [documents, setDocuments] = useState([])
  const [combs, setCombs] = useState([])

  const myFetch = (url) => {
    return fetch(url, {
      mode: 'no-cors',
      method: "GET"
    }).then(result => result.json())
  }

  useEffect(() => {
    fetch("http://localhost:7777/document/filter", {
      mode: 'no-cors',
      method: "POST",
      body: JSON.stringify(filter)
    }).then(function (res) {
      if (res.ok) {
        alert("Perfect! ");
      } else if (res.status === 401) {
        alert("Oops! ");
      }
    }, function (e) {
      alert("Error submitting form!");
    });

    myFetch("/document/actual")
      .then(actual => {
        setDocuments(actual)
      })
    myFetch("/combination")
      .then(data => setCombs(data))
  }, [])

  return (
    <div style={{marginTop: '1%'}} className="finder">
      <Filter filter={filter} setFilter={setFilter} combs={combs} />
      {toggle
        ? <FoundRecords
            filter={filter}
            docs={documents}
            setDocs={setDocuments}
            combs={combs}
          />
        : <SkillMatrix
            filter={filter}
          />
      }
      {/* TODO PATO export */}
      <Button className="mr-1" size="sm">Export</Button>
      <Button onClick={()=>setToggle(!toggle)} size="sm">{`Show ${toggle ? 'skillMatrix' : 'table'}`}</Button>
    </div>
  )
}

export default FinderPage;
