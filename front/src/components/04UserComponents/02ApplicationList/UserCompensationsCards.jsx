import React from "react";

export default function UserCompensationsCards(props) {

  return (
    <div>
      {props.compensations.map(compensation => (
        <div className="card mb-2">
          <div className="card-body">
            <h6 className="card-title">
              {compensation.childName} {compensation.childSurname}
            </h6>
            <br />
            <p className="card-text">
              Pateikimo data: <b>{compensation.submitedAt}</b>
            </p>
            <p className="card-text">
              Prašymo statusas: <b>{compensation.applicationStatus}</b>
            </p>
            <p className="card-text">
              Darželio pavadinimas: <b>{compensation.entityName}</b>
            </p>
            <div className="d-flex">
              <button
                id="btnReviewCompensationUser"
                className="btn btn-primary btn-sm btn-block me-2"
                onClick={() => props.handleCompensationReview(compensation.id)}
              >Peržiūrėti
              </button>
              <button
                id="btnDeleteCompensation"
                className="btn btn-danger btn-block btn-sm"
                onClick={() => props.handleCompensationDelete(compensation.id)}
              >Ištrinti
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}