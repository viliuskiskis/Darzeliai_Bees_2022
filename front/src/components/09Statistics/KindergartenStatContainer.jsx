import React, { Component } from 'react';

import '../../App.css';

import http from '../10Services/httpService';
import apiEndpoint from '../10Services/endpoint';

import KindergartenStatTable from './KindergartenStatTable';
import Pagination from './../08CommonComponents/Pagination';

export class KindergartenStatContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            darzeliai: [],
            pageSize: 10,
            currentPage: 1,
            totalPages: 0,
            totalElements: 0,
            numberOfElements: 0
        }
    }
    componentDidMount() {
        this.getKindergartenStat(this.state.currentPage);
    }

    getKindergartenStat(currentPage) {

        const { pageSize } = this.state;
        currentPage -= 1;

        var uri = `${apiEndpoint}/api/darzeliai/statistics?page=${currentPage}&size=${pageSize}`;

        http
            .get(uri)
            .then((response) => {

                this.setState({
                    darzeliai: response.data.content,
                    totalPages: response.data.totalPages,
                    totalElements: response.data.totalElements,
                    numberOfElements: response.data.numberOfElements,
                    currentPage: response.data.number + 1
                });

            }).catch(error => {
                console.log("Statistics container error", error);
            });
    }

    handlePageChange = (page) => {
        this.setState({ currentPage: page });
        this.getKindergartenStat(page);
    };


    render() {
        const { length: count } = this.state.darzeliai;
        const { darzeliai, totalElements, pageSize } = this.state;

        if (count === 0) return <div className="container pt-5"><h6 className="pt-5">Informacija ruošiama</h6></div>

        return (

            <div className="container pt-4" >

                <h6 className="pl-2 pt-3">Prašymų statistika</h6>

                <div className="row pt-2">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-9">

                        <KindergartenStatTable
                            darzeliai={darzeliai}
                        />

                        <Pagination
                            itemsCount={totalElements}
                            pageSize={pageSize}
                            onPageChange={this.handlePageChange}
                            currentPage={this.state.currentPage}
                        />

                    </div>

                </div>
            </div>
        )
    }
}

export default KindergartenStatContainer