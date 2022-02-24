import React from "react";

export default function AdmissionReviewComponent(props) {

  return (
    <div className="container pt-4" >
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-6">
          <h5>Prašymas į valstybinius darželius</h5>
          <div>
            <div className="container pb-2">
              <span>Prašymo statusas:<b> {props.state.status}</b></span><br />
              <span>Pateikimo data:<b> {props.state.submitedAt}</b></span><br />
              <span>Patvirtinimo data:<b> {props.state.approvalDate}</b></span><br />
              <span>Priimta į darželį:<b> {props.state.approvedKindergarten}</b></span><br />
              <span>Numeris laukiančiųjų eilėje:<b> {props.state.numberInWaitingList}</b></span><br />
            </div>
            <h6>Vaiko duomenys</h6>
            <div className="container pb-2">
              <span>Vardas:<b> {props.state.childName}</b></span><br />
              <span>Pavardė:<b> {props.state.childSurname}</b></span><br />
              <span>Asmens kodas:<b> {props.state.childPersonalCode}</b></span><br />
              <span>Gimimo data:<b> {props.state.birthdate}</b></span><br />
            </div>
            <h6>Globėjo duomenys</h6>
            {props.state.mainGuardian !== null &&
              <div className="container pb-2">
                <span>Vardas:<b> {props.state.mainGuardian.name}</b></span><br />
                <span>Pavardė:<b> {props.state.mainGuardian.surname}</b></span><br />
                <span>Asmens kodas:<b> {props.state.mainGuardian.personalCode}</b></span><br />
                <span>Telefonas:<b> {props.state.mainGuardian.phone}</b></span><br />
                <span>El. paštas:<b> {props.state.mainGuardian.email}</b></span><br />
                <span>Adresas:<b> {props.state.mainGuardian.address}</b></span><br />
              </div>
            }
            <h6>Kito globėjo duomenys</h6>
            {props.state.additionalGuardian !== null &&
              <div className="container pb-2">
                <span>Vardas:<b> {props.state.additionalGuardian.name}</b></span><br />
                <span>Pavardė:<b> {props.state.additionalGuardian.surname}</b></span><br />
                <span>Asmens kodas:<b> {props.state.additionalGuardian.personalCode}</b></span><br />
                <span>Telefonas:<b> {props.state.additionalGuardian.phone}</b></span><br />
                <span>El. paštas:<b> {props.state.additionalGuardian.email}</b></span><br />
                <span>Adresas:<b> {props.state.additionalGuardian.address}</b></span><br />
              </div>
            }
            <h6>Pasirinkti darželiai</h6>
            {props.state.kindergartenChoices !== null &&
              <div className="container pb-2">
                <span>Pirmas:<b> {props.state.kindergartenChoices.kindergarten1}</b></span><br />
                <span>Antras:<b> {props.state.kindergartenChoices.kindergarten2}</b></span><br />
                <span>Trečias:<b> {props.state.kindergartenChoices.kindergarten3}</b></span><br />
                <span>Ketvirtas:<b> {props.state.kindergartenChoices.kindergarten4}</b></span><br />
                <span>Penktas:<b> {props.state.kindergartenChoices.kindergarten5}</b></span><br />
              </div>
            }
            <h6>Vaiko priėmimo tvarkos prioritetai</h6>
            {props.state.priorities !== null &&
              <div className="container pb-2">
                {props.state.priorities.livesInVilnius && <span>Vaiko deklaruojama gyvenamoji vieta yra Vilniaus miesto savivaldybė<br /></span>}
                {props.state.priorities.childIsAdopted && <span>Vaikas yra įvaikintas<br /></span>}
                {props.state.priorities.familyHasThreeOrMoreChildrenInSchools && <span>Šeima augina (globoja) tris ir daugiau vaikų, kurie mokosi pagal bendrojo ugdymo programas<br /></span>}
                {props.state.priorities.guardianInSchool && <span>Vienas iš tėvų (globėjų) mokosi bendrojo ugdymo mokykloje<br /></span>}
                {props.state.priorities.guardianDisability && <span>Vienas iš tėvų (globėjų) turi ne daugiau kaip 40 procentų darbingumo lygio<br /></span>}
                {props.state.priorities.livesMoreThanTwoYears && <span>Vienas iš tėvų (globėjų) gyvena Vilniuje ne mažiau nei 2 mtus<br /></span>}
              </div>
            }

            {props.state.status === "Patvirtintas" &&
              <button
                id="CompensationReviewDownloadPDF"
                className="btn btn-success me-2"
                onClick={() => props.handleDownloadContract(props.state.id)}
              >Parsisiųsti dokumentą pasirašymui
              </button>
            }

            <button
              id="CompensationReviewReturn"
              className="btn btn-success me-2"
              onClick={props.handleReturn}
            >Grįžti
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}