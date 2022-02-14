import React, { Component } from "react";
import "../../../App.css";
import http from "../../00Services/httpService";
import apiEndpoint from "../../00Services/endpoint";
import swal from "sweetalert";
import Pagination from '../../05ReusableComponents/Pagination';
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
  }

  componentDidMount() {
    this.getCompensations(this.state.currentPage, this.state.searchQuery);
  }

  getCompensations(page, filter) {
    http.get(`${apiEndpoint}/api/kompensacijos/manager?pageNumber=${page - 1}&pageSize=10&filter=${filter}`)
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
    this.getCompensations(1, e.currentTarget.value);
  }

  handlePageChange(page) {
    this.setState({ currentPage: page });
    this.getCompensations(page, this.state.searchQuery);
  }

  handleCompensationReview(id) {
    this.props.history.push(`/prasymas/kompensuoti/${id}`)
  }

  handleCompensationDeactivate(id) {
    swal({
      text: "DĖMESIO! Šio veiksmo negalėsite atšaukti!\n\nAr tikrai norite deaktyvuoti prašymą?",
      buttons: ["Ne", "Taip"],
      dangerMode: true,
    }).then((actionConfirmed) => {
      if (actionConfirmed) {
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