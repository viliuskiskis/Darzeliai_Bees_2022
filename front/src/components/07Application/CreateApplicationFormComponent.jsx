import React, { useContext, useState } from "react";
import ChildFormComponent from "./ChildFormComponent";
import CheckboxPriorityFormComponent from "./CheckboxPriorityFormComponent";
import KindergartenPriorityFormComponent from "./KindergartenPriorityFormComponent";
import MainGuardianFormComponent from "./MainGuardianFormComponent";
import AdditionalGuardianFormComponent from "./AdditionalGuardianFormComponent";
import KindergartenFormComponent from "./KindergartenFormComponent";
import { ApplicationContext } from "./CreateApplicationFormContainer";
import "./Application.css";

export default function CreateApplicationFormComponent(props) {

  const context = useContext(ApplicationContext);

  const [compensationActive, setCompensationActive] = useState(false);

  function handleClick() {
    setCompensationActive(prevState => !prevState)
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col col-12 col-lg-6 mb-1">
            <button
              className="btn btn-primary navigation-button"
              disabled={!compensationActive}
              onClick={handleClick}
            >Prašymas į valstybinius darželius</button>
          </div>
          <div className="col col-12 col-lg-6">
            <button
              className="btn btn-primary navigation-button"
              disabled={compensationActive}
              onClick={handleClick}
            >Prašymas dėl kompensacijos privatiems darželiams</button>
          </div>
        </div>
      </div>

      <div className="container pt-4">

        {/* Prašymo forma į darželius */}
        {!compensationActive &&
          <div>
            {context.state.registrationDisabled &&
              <div className="alert alert-warning p-1" role="alert">
                Šiuo metu registracija nevykdoma
              </div>
            }

            <div className="form">
              <form onSubmit={(e) => context.handleApplicationSubmit(e)}>
                <div className="row">
                  <div className="col-12 col-md-4">
                    <MainGuardianFormComponent />
                  </div>

                  <div className="col-12 col-md-4">
                    <AdditionalGuardianFormComponent />
                  </div>

                  <div className="col-12 col-md-4">
                    <ChildFormComponent />
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <CheckboxPriorityFormComponent />
                  </div>

                  <div className="col-12 col-lg-7">
                    <KindergartenPriorityFormComponent />

                    <button type="submit" className="btn btn-primary mt-3" disabled={context.state.registrationDisabled}>
                      Sukurti prašymą į darželius
                    </button>

                  </div>
                </div>
              </form>
            </div>
          </div>

        }

        {/* Prašymo forma dėl kompensacijos */}
        {compensationActive &&
          <div>
            <div className="form">
              <form onSubmit={(e) => context.handleCompensationSubmit(e)}>
                <div className="row">
                  <div className="col-12 col-md-4">
                    <MainGuardianFormComponent />
                  </div>

                  <div className="col-12 col-md-4">
                    <KindergartenFormComponent />
                  </div>

                  <div className="col-12 col-md-4">
                    <ChildFormComponent />
                  </div>
                </div>
                <div className="row">


                  <div className="col-12 col-lg-7">

                    <button type="submit" className="btn btn-primary mt-3">
                      Sukurti prašymą kompensacijai
                    </button>

                  </div>
                </div>
              </form>
            </div>
          </div>
        }
      </div>
    </div>
  )
}