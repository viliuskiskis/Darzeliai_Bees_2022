import React, { Component } from 'react';

import '../../../App.css';
import swal from 'sweetalert';

import http from '../../00Services/httpService';
import apiEndpoint from '../../00Services/endpoint';

import UserApplicationsTable from './UserApplicationsTable';
import UserCompensationsTable from './UserCompensationsTable';

export default class UserHomeContainer extends Component {

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
        http.get(`${apiEndpoint}/api/prasymai/user`)
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

    handleApplicationDelete = (applicationId) => {
        swal({
            text: "Ar tikrai norite ištrinti prašymą?",
            buttons: ["Ne", "Taip"],
            dangerMode: true,
        }).then((actionConfirmed) => {
            if (actionConfirmed) {
                http.delete(`${apiEndpoint}/api/prasymai/user/delete/${applicationId}`)
                    .then((response) => {
                        swal({
                            text: response.data,
                            button: "Gerai"
                        })
                    }).then(
                        setTimeout(() => {
                            this.getUserApplications()
                        }, 1000)
                    ).catch(() => { });
            }
        });
    }

    handleCompensationDelete = (compensationId) => {
        swal({
            text: "Ar tikrai norite ištrinti prašymą?",
            buttons: ["Ne", "Taip"],
            dangerMode: true,
        }).then((actionConfirmed) => {
            if (actionConfirmed) {
                http.delete(`${apiEndpoint}/api/kompensacijos/user/delete/${compensationId}`)
                    .then((response) => {
                        swal({
                            text: response.data,
                            button: "Gerai"
                        })
                    }).then(
                        setTimeout(() => {
                            this.getUserCompensations()
                        }, 1000)
                    ).catch(() => { });
            }
        });
    }

    handleApplicationReview = (applicationId) => {
        this.props.history.push(`/prasymas/priimti/${applicationId}`)
    }

    handleCompensationReview = (compensationId) => {
        this.props.history.push(`/prasymas/kompensuoti/${compensationId}`)
    }

    render() {
        const { length: ApplicationCount } = this.state.applications;
        const { length: CompensationCount } = this.state.compensations;

        return (
            <div>
                {ApplicationCount === 0 && CompensationCount === 0 &&
                    <div className="container pt-5"><h6 className="pt-5">Jūs neturite pateiktų prašymų.</h6></div>
                }

                <div className="container pt-4" >

                    {ApplicationCount !== 0 &&
                        <div>
                            <h6 className="ps-2 pt-3">Mano prašymai į valstybinius darželius</h6>
                            <div className="row pt-2">
                                <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                                    <UserApplicationsTable
                                        applications={this.state.applications}
                                        handleApplicationDelete={this.handleApplicationDelete}
                                        handleApplicationReview={this.handleApplicationReview}
                                    />
                                </div>
                            </div>
                        </div>
                    }

                    {CompensationCount !== 0 &&
                        <div>
                            <h6 className="ps-2 pt-3">Mano prašymai dėl kompensacijos</h6>
                            <div className="row pt-2">
                                <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                                    <UserCompensationsTable
                                        compensations={this.state.compensations}
                                        handleCompensationDelete={this.handleCompensationDelete}
                                        handleCompensationReview={this.handleCompensationReview}
                                    />
                                </div>
                            </div>
                        </div>
                    }

                </div>
            </div>
        )
    }
}