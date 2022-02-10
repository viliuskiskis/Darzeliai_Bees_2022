import React, { Component } from "react";
import "../../App.css";
import http from "../10Services/httpService";
import apiEndpoint from "../10Services/endpoint";
import swal from "sweetalert";
import Pagination from "react-js-pagination";

import CompensationListTable from "./CompensationListTable";

export default class CompensationListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      compensations: [],
      pageSize: 20, // PAGE SIZE FUNCTIONALITY NOT YET IMPLEMENTED
      currentPage: 0,
      totalPages: 0,
      totalElements: 0,
      numberOfElements: 0,
      searchQuery: ""
    }
  }

  componentDidMount() {
    this.getCompensations(this.state.currentPage);
  }

  getCompensations(page) {
    http.post(`${apiEndpoint}/api/kompensacijos/manager?pageNumber=${this.state.currentPage}&pageSize=20`)
      .then(response => {
        this.setState({
          compensations: response.data.content,
          totalPages: response.data.totalPages,
          totalElements: response.data.totalElements,
          numberOfElements: response.data.numberOfElements,
          currentPage: response.data.number
        });
      }).catch(error => {
        swal({
          text: "Įvyko klaida perduodant duomenis" + JSON.stringify(error),
          button: "Gerai"
        })
      })
  }

  handlePageChange(page) {
    this.setState({ currentPage: page });
    this.getApplications(page);
  }

  render() {
    return (
      <div className="container pt-4">
        <h6 className="ps-2 pt-3">Prašymai gauti kompensaciją</h6>
        <CompensationListTable
          compensations={this.state.compensations}
        />

        {this.state.totalPages > -1 && <div className="d-flex justify-content-center">
          <Pagination
            itemClass="page-item"
            linkClass="page-link"
            activePage={this.state.currentPage}
            itemsCountPerPage={this.state.pageSize}
            totalItemsCount={this.state.totalElements}
            pageRangeDisplayed={15}
            onPageChange={this.handlePageChange.bind(this)}
          />
        </div>
        }

      </div>
    )
  }

}