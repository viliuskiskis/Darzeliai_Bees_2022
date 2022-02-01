import React, { useState } from "react";
import axios from "axios";

// Šis komponentas (su visu katalogu) baigtoje aplikacijoje turės būti ištrintas

export default function Testing() {

  const [akList, setAkList] = useState([]);
  const [error, setError] = useState({});
  const [ak, setAk] = useState(51609260000);

  function startTesting() {
    for (let i = 0; i < 100; i++) {
      delay(i)
    }
  }

  function delay(i) {
    setTimeout(() => {
      axios.get(`https://darzelis.akademijait.vtmc.lt/registru-centras/vaikai/${ak + i}`)
        .then(response => setAkList(prevList => [...prevList, response.data]))
        .catch(er => setError(er.response.data))
        .then(setAk(prevState => prevState + 1))
    }, 300);
  }

  function handleChange(event) {
    setAk(+event.target.value)
  }

  return (
    <div className="d-flex flex-column align-items-center min-vh-100">
      <h4>Gauti vaikų sąrašą testavimui</h4>
      <form>
        <div className="form-group mb-3">
          <label className="form-label" htmlFor="testingField">
            Pradėti nuo asmens kodo (pvz.: 51609260000)
          </label>
          <input
            type="text"
            className="form-control"
            name="ak"
            id="testingField"
            value={ak}
            onChange={handleChange}
          />
        </div>
      </form>
      <button className="btn btn-primary mb-3" onClick={startTesting}>Siųsti 100 užklausų</button>
      <h6>Current AK: {ak}</h6>
      <h6>Error: {JSON.stringify(error)}</h6>
      <h6>AK List:</h6>
      {akList.map(vaikas => <p>{JSON.stringify(vaikas)}</p>)}
    </div>
  )
}