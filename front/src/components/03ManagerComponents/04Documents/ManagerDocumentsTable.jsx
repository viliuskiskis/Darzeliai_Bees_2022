import React, { Component } from 'react'
import Table from '../../05ReusableComponents/Table';

export default class ManagerDocumentsTable extends Component {

  columns = [
    {
      key: "uploadDate",
      label: "Įkėlimo data",
      content: document => <span>{document.uploadDate}</span>
    },
    {
      key: "userPersonalCode",
      label: "Vartotojo a.k.",
      content: document => <span>{document.userPersonalCode}</span>
    },
    {
      key: "userFirstName",
      label: "Vardas",
      content: document => <span>{document.userFirstName}</span>
    },
    {
      key: "userLastName",
      label: "Pavardė",
      content: document => <span>{document.userLastName}</span>
    },
    {
      key: "name",
      label: "Dokumento pavadinimas",
      content: document => <span>{document.name}</span>
    },
    {
      key: "download",
      label: "Atsisiųsti",
      content: document => <button
        className="btn btn-primary btn-sm btn-block"
        onClick={() => this.props.handleDocumentDownload(document)}
      >
        Atsisiųsti
      </button>
    }
  ]

  render() {
    return (
      <Table
        columns={this.columns}
        data={this.props.documentList}
      />
    )
  }
}
