import React, { Component } from "react";
import Table from "../../05ReusableComponents/Table";

export default class CompensationListTable extends Component {
  columns = [
    {
      key: 'applicationStatus',
      path: 'applicationStatus',
      label: 'Prašymo statusas',
      content: compensation => <span> {compensation.applicationStatus}</span>
    },
    {
      key: 'submitedAt',
      path: 'submitedAt',
      label: 'Pateikimo data',
      content: compensation => <span> {compensation.submitedAt}</span>
    },
    {
      key: 'childPersonalCode',
      path: 'childPersonalCode',
      label: 'Vaiko asmens kodas',
      content: compensation => <span> {compensation.childPersonalCode}</span>
    },
    {
      key: 'childName',
      path: 'childName',
      label: 'Vaiko vardas',
      content: compensation => <span> {compensation.childName} </span>
    },
    {
      key: 'childSurname',
      path: 'childSurname',
      label: 'Vaiko pavardė',
      content: compensation => <span> {compensation.childSurname} </span>
    },
    {
      key: 'entityName',
      path: 'entityName',
      label: 'Darželio pavadinimas',
      content: compensation => <span> {compensation.entityName} </span>
    },
    {
      key: 'review',
      label: 'Peržiūrėti prašymą',
      content: compensation =>
        <button onClick={() => this.props.handleCompensationReview(compensation.id)}
          id="btnReviewCompensationManager"
          className="btn btn-outline-primary btn-sm btn-block">Peržiūrėti</button>
    },
    {
      key: 'deactivate',
      label: 'Deaktyvuoti prašymą',
      content: compensation =>
        <button
          id="btnDeactivateCompensationManager"
          className="btn btn-outline-danger btn-sm btn-block"
          onClick={() => this.props.handleCompensationDeactivate(compensation.id)}
          disabled={compensation.applicationStatus !== "Pateiktas"}
        >Atmesti
        </button>
    }
  ]

  render() {

    return (
      <Table
        columns={this.columns}
        data={this.props.compensations}
      />
    )
  }

}