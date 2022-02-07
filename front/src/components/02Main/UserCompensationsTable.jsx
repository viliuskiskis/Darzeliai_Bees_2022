import React, { Component } from "react";

import Table from "../08CommonComponents/Table";

class UserCompensationsTable extends Component {

  columns = [
    {
      key: 'date',
      path: 'date',
      label: 'Pateikimo data',
      content: compensation => <span>{compensation.submitedAt}</span>
    },

    {
      key: 'childSurname',
      path: 'childSurname',
      label: 'Vaiko vardas, pavardė',
      content: compensation => <span>{compensation.childName} {compensation.childSurname}</span>
    },
    {
      key: 'status',
      path: 'status',
      label: 'Prašymo statusas',
      content: compensation => <span>{compensation.status} </span>
    },
    {
      key: 'kindergarten',
      path: 'kindergarten',
      label: 'Darželio pavadinimas',
      content: compensation => <span>{compensation.kindergartenName}</span>
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