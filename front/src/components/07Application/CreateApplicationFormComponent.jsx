import React, { useContext } from "react";
import ChildFormComponent from "./ChildFormComponent";
import CheckboxPriorityFormComponent from "./CheckboxPriorityFormComponent";
import KindergartenPriorityFormComponent from "./KindergartenPriorityFormComponent";
import MainGuardianFormComponent from "./MainGuardianFormComponent";
import AdditionalGuardianFormComponent from "./AdditionalGuardianFormComponent";
import { ApplicationContext } from "./CreateApplicationFormContainer";

export default function CreateApplicationFormComponent(props) {

  const context = useContext(ApplicationContext);

  return (
    <div className="container pt-4">

      {context.state.registrationDisabled ?
        <div className="alert alert-warning p-1" role="alert">
          Šiuo metu registracija nevykdoma
        </div>
        : ""
      }

      <div className="form">
        <form onSubmit={(e) => context.handleApplicationSubmit(e)}>
          <div className="row">
            <div className="col-4">
              <MainGuardianFormComponent />
            </div>

            <div className="col-4">
              <AdditionalGuardianFormComponent />
            </div>

            <div className="col-4">
              <ChildFormComponent />
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <CheckboxPriorityFormComponent />
            </div>

            <div className="col-7">
              <KindergartenPriorityFormComponent />

              <button type="submit" className="btn btn-primary mt-3" disabled={context.state.registrationDisabled}>
                Sukurti prašymą
              </button>

            </div>
          </div>
        </form>
      </div>
    </div>
  )
}