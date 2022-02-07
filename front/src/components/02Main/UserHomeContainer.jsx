import React, { Component } from 'react';

import '../../App.css';
import swal from 'sweetalert';

import http from '../10Services/httpService';
import apiEndpoint from '../10Services/endpoint';

import UserApplicationsTable from './UserApplicationsTable';
import UserCompensationsTable from './UserCompensationsTable';

export class UserHomeContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            applications: [],
            compensations: []
        }
    }
    componentDidMount() {

        this.getUserApplications();
        this.getUserCompensations();
    }

    getUserApplications() {
        http
            .get(`${apiEndpoint}/api/prasymai/user`)
            .then((response) => {

                this.setState({ applications: response.data });

            }).catch(() => { });
    }

    getUserCompensations() {
        http.get(`${apiEndpoint}/api/kompensacijos/user`)
            .then(response => {
                this.setState({ compensations: response.data })
            }).catch(() => { });
    }

    handleDelete = (item) => {

        swal({
            text: "Ar tikrai norite ištrinti prašymą?",
            buttons: ["Ne", "Taip"],
            dangerMode: true,
        }).then((actionConfirmed) => {
            if (actionConfirmed) {
                http.delete(`${apiEndpoint}/api/prasymai/user/delete/${item.id}`)
                    .then((response) => {
                        swal({
                            text: response.data,
                            button: "Gerai"
                        })
                        this.getUserApplications();
                    }).catch(() => { });
            }
        });
    }

    handleCompensationDelete = () => {

    }

    render() {
        const { length: count } = this.state.applications;

        if (count === 0) return <div className="container pt-5"><h6 className="pt-5">Jūs neturite pateiktų prašymų.</h6></div>

        return (

            <div className="container pt-4" >

                <h6 className="ps-2 pt-3">Mano prašymai į valstybinius darželius</h6>

                <div className="row pt-2">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                        <UserApplicationsTable
                            applications={this.state.applications}
                            onDelete={this.handleDelete}
                        />
                    </div>

                </div>

                <h6 className="ps-2 pt-3">Mano prašymai dėl kompensacijos</h6>

                <div className="row pt-2">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                        <UserCompensationsTable
                            // compensations={this.state.compensations}
                            compensations={this.state.applications}
                            onDelete={this.handleCompensationDelete}
                        />
                    </div>

                </div>

                {/* Jei viskas veikia, DELETE THIS: */}
                <div className='row pt-2'>
                    <h1>Lentelė dar neveikia (nes nulūžta su blogais nuomenim). Čia response iš serverio:</h1>
                    <p>{JSON.stringify(this.state.compensations)}</p>
                </div>

            </div>
        )
    }
}

export default UserHomeContainer