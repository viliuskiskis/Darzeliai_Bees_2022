import React, { Component } from "react";

import Table from "../08CommonComponents/Table";

class UserCompensationsTable extends Component {

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
      key: 'delete',
      label: 'Ištrinti prašymą',
      content: compensation => <button onClick={() => this.props.onDelete(compensation)} id="btnDeleteCompensation" className="btn btn-outline-danger btn-sm btn-block">Ištrinti</button>

    }

  ]


  render() {
    const { compensations } = this.props;

    return (
      <Table
        columns={this.columns}
        data={compensations}
      />
    );
  }
}


export default UserCompensationsTable;