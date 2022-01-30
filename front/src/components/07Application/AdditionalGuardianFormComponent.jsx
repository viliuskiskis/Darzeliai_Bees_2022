import React, { useContext } from "react";
import inputValidator from "../08CommonComponents/InputValidator";
import { ApplicationContext } from "./CreateApplicationFormContainer";

export default function AdditionalGuardianFormComponent(props) {

  const context = useContext(ApplicationContext);

  return (
    <div>
      <div className="form">
        <div className="row py-1">
          <div className="col-7">
            <h6 className="formHeader">Kito globėjo duomenys</h6>
          </div>
          <div className="col-5">
            <button
              id="btnEnableAdditionalGuardian"
              className="btn btn-primary btn-sm btn-block float-end my-1"
              style={{ padding: "4px" }}
              onClick={context.enableAdditionalGuardian}
              disabled={context.registrationDisabled}
            >
              {!context.state.additionalGuardianInput ? "Pridėti" : "Pašalinti"}
            </button>
          </div>
        </div>
        <div className="form-group mb-3">
          <label className="form-label" htmlFor="txtName">
            Vardas <span className="fieldRequired">*</span>
          </label>
          <input
            type="text"
            id="txtAdditionalName"
            name="name"
            placeholder="Vardas"
            className="form-control"
            value={context.state.additionalGuardian.name}
            onChange={(e) => context.additionalGuardianOnChange(e)}
            onInvalid={(e) => inputValidator(e)}
            disabled={!context.state.additionalGuardianInput || context.registrationDisabled}
            pattern="[A-zÀ-ž]{2,32}"
            required
          />
        </div>
        <div className="form-group mb-3">
          <label className="form-label" htmlFor="txtSurname">
            Pavardė <span className="fieldRequired">*</span>
          </label>
          <input
            type="text"
            id="txtAdditionalSurname"
            name="surname"
            placeholder="Pavardė"
            className="form-control"
            value={context.state.additionalGuardian.surname}
            onChange={(e) => context.additionalGuardianOnChange(e)}
            onInvalid={(e) => inputValidator(e)}
            disabled={!context.state.additionalGuardianInput || context.registrationDisabled}
            pattern="[A-zÀ-ž]{2,32}"
            required
          />
        </div>
        <div className="form-group mb-3">
          <label className="form-label" htmlFor="txtPersonalCode">
            Asmens kodas <span className="fieldRequired">*</span>
          </label>
          <input
            type="text"
            id="txtAdditionalPersonalCode"
            name="personalCode"
            placeholder="Asmens kodas"
            className="form-control"
            value={context.state.additionalGuardian.personalCode}
            onChange={(e) => context.additionalGuardianOnChange(e)}
            onInvalid={(e) => inputValidator(e)}
            disabled={!context.state.additionalGuardianInput || context.registrationDisabled}
            pattern="[0-9]{11}"
            required
          />
        </div>
        <div className="form-group mb-3">
          <label className="form-label" htmlFor="txtTelNo">
            Telefonas <span className="fieldRequired">*</span>
          </label>
          <div className="input-group">
            <input
              type="tel"
              id="txtAdditionalPhone"
              name="phone"
              placeholder="+37012345678"
              className="form-control"
              value={context.state.additionalGuardian.phone}
              onChange={(e) => context.additionalGuardianOnChange(e)}
              onInvalid={(e) => inputValidator(e)}
              disabled={!context.state.additionalGuardianInput || context.registrationDisabled}
              pattern="[+]{1}[0-9]{4,19}"
              required
            />
          </div>
        </div>
        <div className="form-group mb-3">
          <label className="form-label" htmlFor="txtEmail">
            El. paštas <span className="fieldRequired">*</span>
          </label>
          <input
            type="text"
            id="txtAdditionalEmail"
            name="email"
            placeholder="El. paštas"
            className="form-control"
            value={context.state.additionalGuardian.email}
            onChange={(e) => context.additionalGuardianOnChange(e)}
            onInvalid={(e) => inputValidator(e)}
            disabled={!context.state.additionalGuardianInput || context.registrationDisabled}
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}"
            required
          />
        </div>
        <div className="form-group mb-3">
          <label className="form-label" htmlFor="txtAddress">
            Adresas <span className="fieldRequired">*</span>
          </label>
          <input
            type="text"
            className="form-control"
            id="txtAdditionalAddress"
            name="address"
            placeholder="Adresas"
            value={context.state.additionalGuardian.address}
            onChange={(e) => context.additionalGuardianOnChange(e)}
            onInvalid={(e) => inputValidator(e)}
            disabled={!context.state.additionalGuardianInput || context.registrationDisabled}
            required
          />
        </div>
      </div>
    </div>
  )
}