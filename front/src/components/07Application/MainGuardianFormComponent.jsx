import React, { useContext } from "react";
import inputValidator from "../08CommonComponents/InputValidator";
import { ApplicationContext } from "./CreateApplicationFormContainer";

export default function MainGuardianFormComponent(props) {

  const context = useContext(ApplicationContext);

  return (
    <div>
      <div className="form">
        <h6 className="formHeader">Globėjo duomenys</h6>
        <div className="form-group mb-3">
          <label className="form-label" htmlFor="txtName">
            Vardas <span className="fieldRequired">*</span>
          </label>
          <input
            type="text"
            id="txtMainName"
            name="name"
            placeholder="Vardas"
            className="form-control"
            value={context.state.mainGuardian.name}
            onChange={(e) => context.mainGuardianOnChange(e)}
            onInvalid={(e) => inputValidator(e)}
            disabled={context.registrationDisabled}
            required
            pattern="[A-zÀ-ž]{2,32}"
          />
        </div>
        <div className="form-group mb-3">
          <label className="form-label" htmlFor="txtSurname">
            Pavardė <span className="fieldRequired">*</span>
          </label>
          <input
            type="text"
            id="txtMainSurname"
            name="surname"
            placeholder="Pavardė"
            className="form-control"
            value={context.state.mainGuardian.surname}
            onChange={(e) => context.mainGuardianOnChange(e)}
            onInvalid={(e) => inputValidator(e)}
            disabled={context.registrationDisabled}
            required
            pattern="[A-zÀ-ž]{2,32}"
          />
        </div>
        <div className="form-group mb-3">
          <label className="form-label" htmlFor="txtPersonalCode">
            Asmens kodas <span className="fieldRequired">*</span>
          </label>
          <input
            type="text"
            id="txtMainPersonalCode"
            name="personalCode"
            placeholder="Asmens kodas"
            className="form-control"
            value={context.state.mainGuardian.personalCode}
            onChange={(e) => context.mainGuardianOnChange(e)}
            onInvalid={(e) => inputValidator(e)}
            disabled={context.registrationDisabled}
            required
            pattern="[0-9]{11}"
          />
        </div>
        <div className="form-group mb-3">
          <label className="form-label" htmlFor="txtTelNo">
            Telefonas <span className="fieldRequired">*</span>
          </label>
          <div className="input-group">
            <input
              type="tel"
              id="txtMainPhone"
              name="phone"
              placeholder="+37012345678"
              className="form-control"
              value={context.state.mainGuardian.phone}
              onChange={(e) => context.mainGuardianOnChange(e)}
              onInvalid={(e) => inputValidator(e)}
              disabled={context.registrationDisabled}
              required
              pattern="[+]{1}[0-9]{4,19}"
            ></input>
          </div>
        </div>
        <div className="form-group mb-3">
          <label className="form-label" htmlFor="txtEmail">
            El. paštas <span className="fieldRequired">*</span>
          </label>
          <input
            type="text"
            id="txtMainEmail"
            name="email"
            placeholder="El. paštas"
            className="form-control"
            value={context.state.mainGuardian.email}
            onChange={(e) => context.mainGuardianOnChange(e)}
            onInvalid={(e) => inputValidator(e)}
            disabled={context.registrationDisabled}
            required
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}"
          />
        </div>
        <div className="form-group mb-3">
          <label className="form-label" htmlFor="txtAddress">
            Adresas <span className="fieldRequired">*</span>
          </label>
          <input
            type="text"
            className="form-control"
            id="txtMainAddress"
            name="address"
            placeholder="Adresas"
            value={context.state.mainGuardian.address}
            onChange={(e) => context.mainGuardianOnChange(e)}
            onInvalid={(e) => inputValidator(e)}
            disabled={context.registrationDisabled}
            required
          />
        </div>
      </div>
    </div>
  )
}