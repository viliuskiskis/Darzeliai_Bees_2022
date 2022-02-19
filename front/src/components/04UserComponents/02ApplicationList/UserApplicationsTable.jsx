import React, { Component } from 'react';

import Table from '../../05ReusableComponents/Table';

export default class UserApplicationsTable extends Component {

  columns = [
    {
      key: 'date',
      path: 'date',
      label: 'Pateikimo data',
      content: application => <span>{application.submitedAt}</span>
    },
    {
      key: 'childSurname',
      path: 'childSurname',
      label: 'Vaiko vardas, pavardė',
      content: application => <span>{application.childName} {application.childSurname}</span>
    },
    {
      key: 'status',
      path: 'status',
      label: 'Prašymo statusas',
      content: application => <span>{application.status} </span>
    },
    {
      key: 'kindergarten',
      path: 'kindergarten',
      label: 'Priimta į darželį',
      content: application =>
        <span>
          {application.status === 'Patvirtintas' ? <span>{application.kindergartenName}</span> : <span>-</span>}
        </span>
    },
    {
      key: 'waiting',
      path: 'waiting',
      label: 'Laukiančiųjų eilės numeris',
      content: application =>
        <span>
          {application.status === 'Laukiantis' ? <span>{application.numberInWaitingList}</span> : <span>-</span>}
        </span>
    },
    {
      key: 'veiksmai',
      label: 'veiksmai',
      content: application =>
        <div className="d-flex justify-content-center">
          <button
            onClick={() => this.props.handleApplicationReview(application.id)}
            id="btnReviewCompensation"
            className="btn btn-primary btn-sm btn-block me-2"
          >Peržiūrėti
          </button>
          <button onClick={() => this.props.handleApplicationDelete(application.id)}
            id="btnDeleteApplication"
            className="btn btn-danger btn-block btn-sm"
          >Ištrinti
          </button>
        </div>
    }
  ]


  render() {
    return (
      <Table
        columns={this.columns}
        data={this.props.applications}
      />
    );
  }
}