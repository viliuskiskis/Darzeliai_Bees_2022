import React, { useContext } from "react";
import { ApplicationContext } from "./CreateApplicationFormContainer";

export default function CheckboxPriorityFormComponent(props) {

  const context = useContext(ApplicationContext);

  return (
    <div>
      <div className="form">
        <h6 className="formHeader">
          Vaiko priėmimo tvarkos prioritetai
        </h6>
        <p>Pažymėkite tinkamus prioritetus</p>

        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            name="livesInVilnius"
            id="chkLivesInVilnius"
            checked={context.state.priorities.livesInVilnius}
            onChange={(e) => context.checkboxOnChange(e)}
            disabled={context.state.registrationDisabled}
          />
          <label className="form-check-label" htmlFor="livesInVilnius">
            Vaiko deklaruojama gyvenamoji vieta yra Vilniaus miesto
            savivaldybė
          </label>
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            name="childIsAdopted"
            id="chkChildIsAdopted"
            checked={context.state.priorities.childIsAdopted}
            onChange={(e) => context.checkboxOnChange(e)}
            disabled={context.state.registrationDisabled}
          />
          <label className="form-check-label" htmlFor="childIsAdopted">
            Vaikas yra įvaikintas
          </label>
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            name="familyHasThreeOrMoreChildrenInSchools"
            id="chkFamilyHasThreeOrMoreChildrenInSchools"
            checked={context.state.priorities.familyHasThreeOrMoreChildrenInSchools}
            onChange={(e) => context.checkboxOnChange(e)}
            disabled={context.state.registrationDisabled}
          />
          <label
            className="form-check-label"
            htmlFor="familyHasThreeOrMoreChildrenInSchools"
          >
            Šeima augina (globoja) tris ir daugiau vaikų, kurie mokosi pagal
            bendrojo ugdymo programas
          </label>
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            name="guardianInSchool"
            id="chkGuardianInSchool"
            checked={context.state.priorities.guardianInSchool}
            onChange={(e) => context.checkboxOnChange(e)}
            disabled={context.state.registrationDisabled}
          />
          <label className="form-check-label" htmlFor="guardianInSchool">
            Vienas iš tėvų (globėjų) mokosi bendrojo ugdymo mokykloje
          </label>
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            name="guardianDisability"
            id="chkGuardianDisability"
            checked={context.state.priorities.guardianDisability}
            onChange={(e) => context.checkboxOnChange(e)}
            disabled={context.state.registrationDisabled}
          />
          <label className="form-check-label" htmlFor="guardianDisability">
            Vienas iš tėvų (globėjų) turi ne daugiau kaip 40 procentų
            darbingumo lygio
          </label>
        </div>
      </div>
    </div>
  )
}