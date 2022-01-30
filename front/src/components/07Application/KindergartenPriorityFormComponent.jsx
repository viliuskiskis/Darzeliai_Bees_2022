import React, { useContext } from "react";
import Select from "react-select";
import { ApplicationContext } from "./CreateApplicationFormContainer";


export default function KindergartenPriorityFormComponent(props) {

  const context = useContext(ApplicationContext);

  return (
    <div>
      <div className="form">
        <h6 className="formHeader">Darželių prioritetas</h6>
        <p>Pasirinkite darželių prioritetą, daugiausiai leidžiamos 5
          įstaigos.</p>

        <div className="form-group mb-3">
          <label className="form-label" htmlFor="selKindergartenId1">
            1 prioritetas <span className="fieldRequired">*</span>
          </label>
          <span id="selectKindergarten1">
            <Select
              className="basic-single"
              classNamePrefix="select"
              name="kindergartenId1"
              id="selKindergartenId1"
              placeholder="Pasirinkite darželį iš sąrašo"
              options={context.state.kindergartenList}
              onChange={(e) => context.handleKindergarten1(e)}
              isOptionDisabled={(option) => option.disabled === "yes" || context.state.registrationDisabled}
            />
          </span>
        </div>
        <div className="form-group mb-3">
          <label className="form-label" htmlFor="selKindergartenId2">2 prioritetas</label>
          <Select
            name="kindergartenId2"
            id="selKindergartenId2"
            placeholder="Pasirinkite darželį iš sąrašo"
            options={context.state.kindergartenList}
            onChange={(e) => context.handleKindergarten2(e)}
            isOptionDisabled={(option) => option.disabled === "yes" || context.state.registrationDisabled}
          />
        </div>
        <div className="form-group mb-3">
          <label className="form-label" htmlFor="selKindergartenId3">3 prioritetas</label>
          <Select
            name="kindergartenId3"
            id="selKindergartenId3"
            placeholder="Pasirinkite darželį iš sąrašo"
            options={context.state.kindergartenList}
            onChange={(e) => context.handleKindergarten3(e)}
            isOptionDisabled={(option) => option.disabled === "yes" || context.state.registrationDisabled}
          />
        </div>
        <div className="form-group mb-3">
          <label className="form-label" htmlFor="selKindergartenId4">4 prioritetas</label>
          <Select
            name="kindergartenId4"
            id="selKindergartenId4"
            placeholder="Pasirinkite darželį iš sąrašo"
            options={context.state.kindergartenList}
            onChange={(e) => context.handleKindergarten4(e)}
            isOptionDisabled={(option) => option.disabled === "yes" || context.state.registrationDisabled}
          />
        </div>
        <div className="form-group mb-3">
          <label className="form-label" htmlFor="selKindergartenId5">5 prioritetas</label>
          <Select
            name="kindergartenId5"
            id="selKindergartenId5"
            placeholder="Pasirinkite darželį iš sąrašo"
            options={context.state.kindergartenList}
            onChange={(e) => context.handleKindergarten5(e)}
            isOptionDisabled={(option) => option.disabled === "yes" || context.state.registrationDisabled}
          />
        </div>
      </div>
      <p>
        Dėmesio! Jei pirmu numeriu nurodytoje įstaigoje nėra laisvų
        vietų, vieta skiriama antru numeriu pažymėtoje įstaigoje, jei
        joje yra laisvų vietų ir t. t. Jeigu visuose prašyme pažymėtose
        įstaigose nėra laisvų vietų, prašymas lieka laukiančiųjų eilėje.
      </p>
    </div>
  )
}