import React, { Component } from "react";
import "../../App.css";
import http from "../10Services/httpService";
import apiEndpoint from "../10Services/endpoint";
import swal from "sweetalert";
import Pagination from './../08CommonComponents/Pagination';

import CompensationListTable from "./CompensationListTable";

export default class CompensationListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      compensations: [],
      pageSize: 10, // PAGE SIZE FUNCTIONALITY NOT YET IMPLEMENTED
      currentPage: 1,
      totalPages: 0,
      totalElements: 0,
      numberOfElements: 0,
    }
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleCompensationReview = this.handleCompensationReview.bind(this);
    this.handleCompensationDeactivate = this.handleCompensationDeactivate.bind(this);
  }

  componentDidMount() {
    this.getCompensations(this.state.currentPage);
  }

  getCompensations(page) {
    http.get(`${apiEndpoint}/api/kompensacijos/manager?pageNumber=${page - 1}&pageSize=10`)
      .then(response => {
        this.setState({
          compensations: response.data.content,
          totalPages: response.data.totalPages,
          totalElements: response.data.totalElements,
          numberOfElements: response.data.numberOfElements,
          currentPage: response.data.number + 1
        });
      }).catch(error => {
        swal({
          text: "Įvyko klaida perduodant duomenis",
          button: "Gerai"
        })
      })
  }

  handlePageChange(page) {
    this.setState({ currentPage: page });
    this.getCompensations(page);
  }

  handleCompensationReview(id) {
    this.props.history.push(`/prasymas/k/${id}`)
  }

  handleCompensationDeactivate(id) {
    http.post(`${apiEndpoint}/api/kompensacijos/manager/deactivate/${id}`)
      .then(response => {
        swal({
          text: response.data,
          button: "Gerai"
        })
      })
      .then(setTimeout(() => {
        this.getCompensations(this.state.currentPage);
      }, 1000))
      .catch(error => {
        swal({
          text: "Įvyko klaida",
          button: "Gerai"
        })
      })
  }

  render() {
    return (
      <div className="container pt-4">
        <h6 className="ps-2 pt-3">Prašymai gauti kompensaciją</h6>
        <CompensationListTable
          compensations={this.state.compensations}
          handleCompensationReview={this.handleCompensationReview}
          handleCompensationDeactivate={this.handleCompensationDeactivate}
        />

        {this.state.totalPages > 1 && <div className="d-flex justify-content-center">
          <Pagination
            itemsCount={this.state.totalElements}
            pageSize={this.state.pageSize}
            onPageChange={this.handlePageChange}
            currentPage={this.state.currentPage}
          />
        </div>
        }

      </div>
    )
  }

}