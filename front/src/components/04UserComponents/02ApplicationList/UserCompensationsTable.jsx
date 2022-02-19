import React, { Component } from "react";

import Table from "../../05ReusableComponents/Table";

export default class UserCompensationsTable extends Component {

  columns = [
    {
      key: 'id',
      path: 'id',
      label: '#',
      content: compensation => <span>{compensation.id}</span>
    },
    {
      key: 'submitedAt',
      path: 'submitedAt',
      label: 'Pateikimo data',
      content: compensation => <span>{compensation.submitedAt}</span>
    },
    {
      key: 'childPersonalCode',
      path: 'childPersonalCode',
      label: 'Vaiko asmens kodas',
      content: compensation => <span>{compensation.childPersonalCode}</span>
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
      key: 'veiksmai',
      label: 'Veiksmai',
      content: compensation =>
        <div className="d-flex justify-content-center">
          <button
            id="btnReviewCompensationUser"
            className="btn btn-primary btn-sm btn-block me-2"
            onClick={() => this.props.handleCompensationReview(compensation.id)}
          >Peržiūrėti
          </button>
          <button
            id="btnDeleteCompensation"
            className="btn btn-danger btn-block btn-sm"
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