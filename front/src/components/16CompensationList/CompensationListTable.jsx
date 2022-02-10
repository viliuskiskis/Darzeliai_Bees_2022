import React, { Component } from "react";
import Table from "../08CommonComponents/Table";

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