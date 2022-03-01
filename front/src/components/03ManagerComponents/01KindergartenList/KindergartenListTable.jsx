import React, { Component } from 'react';

import '../../../App.css';
class KindergartenListTable extends Component {

  render() {
    const {
      darzeliai,
      elderates,
      inEditMode,
      editRowId,
      errorMessages,
      hasErrors,
      onEditData,
      onSave,
      onChange,
      onDelete } = this.props;

    return (
      <div className="table-responsive-md">

        <table className="table" >

          <thead className="no-top-border">
            <tr >
              <th>Pavadinimas</th>
              <th>Adresas</th>
              <th>Seniūnija</th>
              <th colSpan={2}>Vietų</th>
              <th colSpan={2}>Direktorius</th>
              <th className="deleteColumn">Veikmai</th>
            </tr>
          </thead>
          <tbody >
            {
              darzeliai.map((darzelis) => (

                <tr key={darzelis.id}>
                  {inEditMode && editRowId === darzelis.id ?
                    (
                      <React.Fragment>
                        <td >
                          <input
                            type="text"
                            className="form-control"
                            id="txtKindergartenName"
                            name="name"
                            value={darzelis.name}
                            onChange={(event) => onChange(event)}
                            placeholder="Pavadinimas"
                            title="Pavadinimas turi būti 3-50 simbolių ir negali prasidėti tarpu"
                            required
                            pattern="\S[\s\S]{2,49}"
                          />
                          {errorMessages.name && <div className="text-danger">{errorMessages.name}</div>}
                        </td>

                        <td>
                          <input
                            type="text"
                            className="form-control"
                            id="txtKindergartenAddress"
                            name="address"
                            value={darzelis.address}
                            onChange={(event) => onChange(event)}
                            placeholder="Adresas"
                            title="Adresas privalomas"
                            required
                          />
                          {errorMessages.address && <div className="text-danger">{errorMessages.address}</div>}
                        </td>

                        <td>
                          <select type="text"
                            className="form-control"
                            id="txtKindergartenElderate"
                            name="elderate"
                            onChange={(event) => onChange(event)}
                            placeholder="Seniūnija"
                            title="Seniūnija privaloma"
                            required>
                            <option value={darzelis.elderate}>{darzelis.elderate}</option>
                            {elderates.map(option => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                          {errorMessages.elderate && <div className="text-danger">{errorMessages.elderate}</div>}
                        </td>

                        <td>
                          <input
                            type="number"
                            min="0"
                            max="999"
                            className="form-control"
                            id="nmbCapacity2to3"
                            name="capacityAgeGroup2to3"
                            value={darzelis.capacityAgeGroup2to3}
                            onChange={(event) => onChange(event)}
                            title="Negali būti mažiau nei 0 ir daugiau nei 999"
                            required
                          />
                          {errorMessages.capacityAgeGroup2to3 && <div className="text-danger">{errorMessages.capacityAgeGroup2to3}</div>}
                        </td>

                        <td>
                          <input
                            type="number"
                            min="0"
                            max="999"
                            className="form-control"
                            id="nmbCapacity3to6"
                            name="capacityAgeGroup3to6"
                            value={darzelis.capacityAgeGroup3to6}
                            onChange={(event) => onChange(event)}
                            title="Negali būti mažiau nei 0 ir daugiau nei 999"
                            required
                          />
                          {errorMessages.capacityAgeGroup3to6 && <div className="text-danger">{errorMessages.capacityAgeGroup3to6}</div>}
                        </td>

                        <td>
                          <input
                            type="text"
                            className="form-control"
                            id="txtKindergartenManagerName"
                            name="managerName"
                            value={darzelis.managerName}
                            onChange={(event) => onChange(event)}
                            placeholder="Direktoriaus vardas"
                            title="Vardą gali sudaryti raidės, tarpai ir brūkšneliai"
                            required
                            pattern="^[A-zÀ-ž\s-]{2,32}"
                          />
                          {errorMessages.managerName && <div className="text-danger">{errorMessages.managerName}</div>}
                        </td>

                        <td>
                          <input
                            type="text"
                            className="form-control"
                            id="txtKindergartenManagerSurname"
                            name="managerSurname"
                            value={darzelis.managerSurname}
                            onChange={(event) => onChange(event)}
                            placeholder="Direktoriaus pavardė"
                            title="Pavardę gali sudaryti raidės, tarpai ir brūkšneliai"
                            required
                            pattern="^[A-zÀ-ž\s-]{2,32}"
                          />
                          {errorMessages.managerSurname && <div className="text-danger">{errorMessages.managerSurname}</div>}
                        </td>

                        <td>
                          <div className="d-flex">
                            <button
                              type="submit"
                              className="btn btn-primary btn-sm btn-block me-2"
                              id="btnSaveUpdatedKindergarten"
                              onClick={() => onSave({ id: darzelis.id, item: darzelis })}
                              disabled={hasErrors}>
                              Saugoti
                            </button>
                            <button
                              onClick={() => onDelete(darzelis)}
                              id="btnDeleteKindergarten"
                              className="btn btn-outline-danger btn-sm btn-block">
                              Ištrinti
                            </button>
                          </div>
                        </td>
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        <td>{darzelis.name}</td>
                        <td>{darzelis.address}</td>
                        <td>{darzelis.elderate}</td>
                        <td>{darzelis.capacityAgeGroup2to3}</td>
                        <td>{darzelis.capacityAgeGroup3to6}</td>
                        <td>{darzelis.managerName}</td>
                        <td>{darzelis.managerSurname}</td>
                        <td>
                          <div className="d-flex">
                            <button
                              className="btn btn-outline-primary btn-sm btn-block me-2"
                              id="btnUpdateKindergarten"
                              onClick={() => onEditData(darzelis)}>
                              Redaguoti
                            </button>
                            <button
                              onClick={() => onDelete(darzelis)}
                              id="btnDeleteKindergarten"
                              className="btn btn-outline-danger btn-sm btn-block">
                              Ištrinti
                            </button>
                          </div>
                        </td>
                      </React.Fragment>
                    )}

                </tr>
              ))
            }
          </tbody>
        </table>
      </div>

    );
  }
}

export default KindergartenListTable;