import React, { Component } from 'react';

import Table from '../../05ReusableComponents/Table';

class QueueTable extends Component {

    columns = [
        {
            key: 'childPersonalCode',
            path: 'childPersonalCode',
            label: 'Vaiko asmens kodas',
            content: application => <span> {application.childPersonalCode}</span>
        },
        {
            key: 'name',
            path: 'name',
            label: 'Vaiko vardas, pavardė',
            content: application => <span> {application.childName} {application.childSurname}</span>
        },

        {
            key: 'choiseName1',
            path: 'choiseName1',
            label: '1 prioritetas',
            content: application => <span> {application.choise1 ? application.choise1 : "-"} </span>
        },
        {
            key: 'choiseName2',
            path: 'choiseName2',
            label: '2 prioritetas',
            content: application => <span> {application.choise2 ? application.choise2 : "-"} </span>
        },
        {
            key: 'choiseName3',
            path: 'choiseName3',
            label: '3 prioritetas',
            content: application => <span> {application.choise3 ? application.choise3 : "-"} </span>
        },
        {
            key: 'choiseName4',
            path: 'choiseName4',
            label: '4 prioritetas',
            content: application => <span> {application.choise4 ? application.choise4 : "-"} </span>
        },
        {
            key: 'choiseName5',
            path: 'choiseName5',
            label: '5 prioritetas',
            content: application => <span> {application.choise5 ? application.choise5 : "-"} </span>
        },
        {
            key: 'status',
            label: 'Statusas',
            content: application => <span>{application.status}</span>
        },
        {
            key: 'review',
            label: 'Peržiūrėti prašymą',
            content: application =>
                <button
                    id="btnReviewApplicationManager"
                    className="btn btn-outline-primary btn-sm btn-block"
                    onClick={() => this.props.handleApplicationReview(application.id)}
                >Peržiūrėti
                </button>
        },
    ]

    additionalColumn =
        {
            key: 'deactivate',
            label: 'Veiksmai',
            content: application =>
                <span>
                    {application.status === 'Neaktualus' || application.status === 'Patvirtintas' ? <span>-</span> : <button onClick={() => this.props.onDeactivate(application)} id="btnDeactivateApplication" className="btn btn-outline-danger btn-sm btn-block">Deaktyvuoti</button>}
                </span>
        }




    render() {

        const { applications, isLocked } = this.props;

        let columns = [];

        if (isLocked) {
            columns = this.columns;
        } else {
            columns = [...this.columns, this.additionalColumn]
        }

        return (
            <Table
                columns={columns}
                data={applications}

            />
        );
    }
}


export default QueueTable;