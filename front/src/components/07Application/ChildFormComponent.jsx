import React, { useContext } from "react";
import DatePicker from "react-datepicker";
import inputValidator from "../08CommonComponents/InputValidator";
import { ApplicationContext } from "./CreateApplicationFormContainer";

export default function ChildFormComponent(props) {

  const context = useContext(ApplicationContext);

  return (
    <div>
      <div className="form">
        <div className="pb-1">
          <h6 className="formHeader">Vaiko duomenys</h6>
        </div>
        <div className="form-group mb-3">
          <label className="form-label" htmlFor="txtChildPersonalCode">
            Asmens kodas <span className="fieldRequired">*</span>
          </label>
          <input
            type="text"
            id="txtChildPersonalCode"
            name="childPersonalCode"
            placeholder="Asmens kodas"
            className="form-control"
            value={context.state.childPersonalCode}
            onChange={(event) => context.childOnChange(event)}
            required
            onInvalid={(e) => inputValidator(e)}
            pattern="[0-9]{11}"
          />
        </div>
        <div className="form-group mb-3">
          <label className="form-label" htmlFor="txtChildName">
            Vaiko vardas <span className="fieldRequired">*</span>
          </label>
          <input
            type="text"
            id="txtChildName"
            name="childName"
            placeholder="Vaiko vardas"
            className="form-control"
            value={context.state.childName}
            required
            onInvalid={(e) => inputValidator(e)}
            pattern="^[A-zÀ-ž\s]{2,32}"
            disabled={true}
          />
        </div>
        <div className="form-group mb-3">
          <label className="form-label" htmlFor="txtChildSurname">
            Vaiko pavardė <span className="fieldRequired">*</span>
          </label>
          <input
            type="text"
            id="txtChildSurname"
            name="childSurname"
            placeholder="Vaiko pavardė"
            className="form-control"
            value={context.state.childSurname}
            required
            onInvalid={(e) => inputValidator(e)}
            pattern="^[A-zÀ-ž\s]{2,32}"
            disabled={true}
          />
        </div>
        <div className="form-group mb-3">
          <label className="form-label" htmlFor="txtChildBirthdate">
            Gimimo data <span className="fieldRequired">*</span>
          </label>
          <DatePicker
            id="txtChildBirthdate"
            className="form-control"
            locale="lt"
            dateFormat="yyyy-MM-dd"
            selected={context.state.birthdate}
            disabled={true}
          />
        </div>
      </div>
    </div>
  )
}