import React from "react";

export default function UserApplicationsCards(props) {

  return (
    <div>
      {props.applications.map(application => (
        <div className="card mb-2">
          <div className="card-body">
            <h6 className="card-title">
              {application.childName} {application.childSurname}
            </h6>
            <br />
            <p className="card-text">
              Pateikimo data: <b>{application.submitedAt}</b>
            </p>
            <p className="card-text">
              Prašymo statusas: <b>{application.status}</b>
            </p>
            {/* Show this if status is "Patvirtintas" */}
            {application.status === "Patvirtintas" &&
              <p className="card-text">
                Priimta į darželį: <b>{application.kindergartenName}</b>
              </p>
            }
            {/* Show this if status is "Laukiantis" */}
            {application.status === "Laukiantis" &&
              <p className="card-text">
                Laukiančiųjų eilės nr.: <b>{application.numberInWaitingList}</b>
              </p>
            }
            <div className="d-flex">
              {/* Show this button, if application status is NOT "Parvirtintas" */}
              {application.status !== "Patvirtintas" &&
                <button
                  onClick={() => props.handleApplicationReview(application)}
                  id="btnReviewCompensation"
                  className="btn btn-primary btn-sm btn-block me-2"
                >Peržiūrėti
                </button>
              }
              {/* Show this button, if application status is "Parvirtintas" */}
              {application.status === "Patvirtintas" &&
                <button
                  onClick={() => props.handleKindergartenContract(application.id)}
                  id="btnReviewContractUser"
                  className="btn btn-success btn-block btn-sm me-2"
                >Pasirašymui
                </button>
              }
              <button
                onClick={() => props.handleApplicationDelete(application.id)}
                id="btnDeleteApplication"
                className="btn btn-danger btn-block btn-sm"
              >Ištrinti
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}