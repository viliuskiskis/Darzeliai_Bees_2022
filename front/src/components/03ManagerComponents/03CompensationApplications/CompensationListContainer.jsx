import React, { Component } from "react";
import http from "../../00Services/httpService";
import apiEndpoint from "../../00Services/endpoint";
import swal from "sweetalert";
import Pagination from "react-js-pagination";
import SearchBox from "../../05ReusableComponents/SeachBox";

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
      searchQuery: ""
    }
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleCompensationReview = this.handleCompensationReview.bind(this);
    this.handleCompensationDeactivate = this.handleCompensationDeactivate.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleCompensationConfirm = this.handleCompensationConfirm.bind(this);
  }

  componentDidMount() {
    this.getCompensations(this.state.currentPage, this.state.pageSize, this.state.searchQuery);
  }

  getCompensations(page, size, filter) {
    http.get(`${apiEndpoint}/api/kompensacijos/manager?pageNumber=${page - 1}&pageSize=${size}&filter=${filter}`)
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

  handleSearch(e) {
    this.setState({ searchQuery: e.currentTarget.value });
    this.getCompensations(1, this.state.pageSize, e.currentTarget.value);
  }

  handlePageChange(page) {
    this.setState({ currentPage: page });
    this.getCompensations(page, this.state.pageSize, this.state.searchQuery);
  }

  handleCompensationReview(id) {
    this.props.history.push(`/prasymas/kompensuoti/${id}`)
  }

  handleCompensationDeactivate(item) {
    swal({
      text: "DĖMESIO! Šio veiksmo negalėsite atšaukti!\n\nAr tikrai norite atmesti prašymą?",
      buttons: ["Ne", "Taip"],
      dangerMode: true,
    }).then((actionConfirmed) => {
      if (actionConfirmed) {
        http.post(`${apiEndpoint}/api/kompensacijos/manager/deactivate/${item.id}`)
          .then(response => {
            swal({
              text: response.data,
              button: "Gerai"
            });
          }).then(() => {
            this.getCompensations(this.state.currentPage, this.state.pageSize, "");
          }).catch(error => {
            swal({
              text: "Įvyko klaida" + error.response.data,
              button: "Gerai"
            })
          })
      }
    })
  }

  handleCompensationConfirm(item) {
    swal({
      text: "DĖMESIO! Šio veiksmo negalėsite atšaukti!\n\nAr tikrai norite patvirtinti prašymą?",
      buttons: ["Ne", "Taip"],
      dangerMode: true,
    }).then((actionConfirmed) => {
      if (actionConfirmed) {
        http.post(`${apiEndpoint}/api/kompensacijos/manager/confirm/${item.id}`)
          .then(response => {
            swal({
              text: response.data,
              button: "Gerai"
            });
          }).then(() => {
            this.getCompensations(this.state.currentPage, this.state.pageSize, "");
          }).catch(error => {
            swal({
              text: "Įvyko klaida" + error.response.data,
              button: "Gerai"
            })
          })
      }
    })
  }

  render() {
    let size = 0;
    if (this.state.compensations !== undefined) size = this.state.compensations.length;

    return (
      <div className="container pt-4">
        <h6 className="ps-2 pt-3">Prašymai gauti kompensaciją</h6>

        {(size > 0 || this.state.searchQuery !== "") &&
          <SearchBox
            value={this.state.searchQuery}
            onSearch={this.handleSearch}
            placeholder={"Ieškoti pagal vaiko asmens kodą..."}
          />
        }

        <CompensationListTable
          compensations={this.state.compensations}
          handleCompensationReview={this.handleCompensationReview}
          handleCompensationDeactivate={this.handleCompensationDeactivate}
          handleCompensationConfirm={this.handleCompensationConfirm}
        />

        {this.state.totalPages > 1 &&
          <div className="d-flex justify-content-center">
            <Pagination
              itemClass="page-item"
              linkClass="page-link"
              activePage={this.state.currentPage}
              itemsCountPerPage={this.state.pageSize}
              totalItemsCount={this.state.totalElements}
              pageRangeDisplayed={15}
              onChange={this.handlePageChange}
            />
          </div>
        }

      </div>
    )
  }

}