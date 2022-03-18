import React, { Component } from "react";
import Table from "../../05ReusableComponents/Table";

export default class UserCompensationsTable extends Component {

  columns = [
    {
      key: 'submitedAt',
      path: 'submitedAt',
      label: 'Pateikimo data',
      content: compensation => <span>{compensation.submitedAt}</span>
    },
    {
      key: 'childName',
      path: 'childName',
      label: 'Vaiko vardas, pavardė',
      content: compensation => <span>{compensation.childName} {compensation.childSurname}</span>
    },
    {
      key: 'applicationStatus',
      path: 'applicationStatus',
      label: 'Prašymo statusas',
      content: compensation => <span>{compensation.applicationStatus} </span>
    },
    {
      key: 'entityName',
      path: 'entityName',
      label: 'Darželio pavadinimas',
      content: compensation => <span>{compensation.entityName}</span>
    },
    {
      key: 'childPersonalCode',
      path: 'childPersonalCode',
      label: 'Vaiko asmens kodas',
      content: compensation => <span>{compensation.childPersonalCode}</span>
    },
    {
      key: 'veiksmai',
      label: 'Veiksmai',
      content: compensation =>
        <div className="d-flex justify-content-around">
          <button
            id="btnReviewCompensationUser"
            className="btn btn-primary btn-sm btn-block me-2"
            onClick={() => this.props.handleCompensationReview(compensation.id)}
          >Peržiūrėti
          </button>

          {/* Show this button, if application status is "Parvirtintas" */}
          {/* unused code */}
          {/*compensation.applicationStatus === "Patvirtintas" &&
            <button
              id="btnReviewContractUser"
              className="btn btn-success btn-block btn-sm me-2"
              onClick={() => this.props.handleCompensationContractReview(compensation.id)}
            >Pasirašymui
            </button>
           */}

          <button
            id="btnDeleteCompensation"
            className="btn btn-outline-danger btn-block btn-sm"
            onClick={() => this.props.handleCompensationDelete(compensation.id)}
          >Ištrinti
          </button>
        </div>
    }
  ]

  render() {
    return (
      <Table
        columns={this.columns}
        data={this.props.compensations}
      />
    );
  }
}