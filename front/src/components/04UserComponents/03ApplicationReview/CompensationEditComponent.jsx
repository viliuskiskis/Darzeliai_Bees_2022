import React from "react";
import MainGuardianFormComponent from "../01ApplicationForms/MainGuardianFormComponent";
import KindergartenFormComponent from "../01ApplicationForms/KindergartenFormComponent";
import ChildFormComponent from "../01ApplicationForms/ChildFormComponent";

export default function CompensationEditComponent(props) {
  return (
    <div className="container pt-4">
      <div className="form">
        <form onSubmit={(e) => props.handleEdit(e)}>
          <div className="row">
            <div className="col-12 col-md-4">
              <MainGuardianFormComponent
                mainGuardian={props.state.mainGuardian}
                mainGuardianOnChange={props.mainGuardianOnChange}
              />
            </div>

            <div className="col-12 col-md-4">
              <KindergartenFormComponent
                kindergartenData={props.state.kindergartenData}
                kindergartenOnChange={props.kindergartenOnChange}
              />
            </div>

            <div className="col-12 col-md-4">
              <ChildFormComponent
                hiddenChildSurname={props.state.hiddenChildSurname}
                birthdate={props.state.birthdate}
                childName={props.state.childName}
                childPersonalCode={props.state.childPersonalCode}
                childSurname={props.state.childSurname}
                childAkOnChange={props.childAkOnChange}
                childSurnameOnChange={props.childSurnameOnChange}
              />
            </div>
          </div>
          <div className="row">


            <div className="col-12 col-lg-7">

              <button
                id="editCompensationButton"
                type="submit"
                className="btn btn-primary mt-3">
                Keisti prašymą
              </button>

            </div>
          </div>
        </form>
      </div>
    </div>
  )
}