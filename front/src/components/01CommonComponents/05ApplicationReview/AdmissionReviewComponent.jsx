import React from "react";

export default function AdmissionReviewComponent(props) {

  return (
    <div className="container pt-4" >
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-6">
          <h5>Prašymas į valstybinius darželius</h5>
          <div>
            <div className="container pb-2">
              <span>Pateikimo data:<b> {props.state.submitedAt}</b></span><br />
              <span>Prašymo statusas:<b> {props.state.status}</b></span><br />
            </div>
            <h6>Vaiko duomenys</h6>
            <div className="container pb-2">
              <span>Vardas:<b> {props.state.childName}</b></span><br />
              <span>Pavardė:<b> {props.state.childSurname}</b></span><br />
              <span>Asmens kodas:<b> {props.state.childPersonalCode}</b></span><br />
              <span>Gimimo data:<b> {props.state.birthdate}</b></span><br />
            </div>
            <h6>Globėjo duomenys</h6>
            <div className="container pb-2">
              <span>Vardas:<b> {props.state.mainGuardian.name}</b></span><br />
              <span>Pavardė:<b> {props.state.mainGuardian.surname}</b></span><br />
              <span>Asmens kodas:<b> {props.state.mainGuardian.personalCode}</b></span><br />
              <span>Telefonas:<b> {props.state.mainGuardian.phone}</b></span><br />
              <span>El. paštas:<b> {props.state.mainGuardian.email}</b></span><br />
              <span>Adresas:<b> {props.state.mainGuardian.address}</b></span><br />
            </div>
            <button
              id="CompensationReviewReturn"
              className="btn btn-success me-2"
              onClick={props.handleReturn}
            >Grįžti</button>
          </div>
        </div>
      </div>
    </div>
  )
}