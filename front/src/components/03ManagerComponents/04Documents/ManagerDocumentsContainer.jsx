import React, { Component } from "react";
import apiEndpoint from "../../00Services/endpoint";
import http from '../../00Services/httpService';
import swal from "sweetalert";
import Pagination from "react-js-pagination";
import ManagerDocumentsTable from "./ManagerDocumentsTable";

export default class ManagerDocumentsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      documentList: [],
      pageSize: 10, // FUNCTIONALITY NOT YET IMPLEMENTED
      currentPage: 1,
      totalPages: 0,
      totalElements: 0,
      numberOfElements: 0,
      searchQuery: ""
    };
    this.getDocuments = this.getDocuments.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleDocumentDownload = this.handleDocumentDownload.bind(this);
  }

  componentDidMount() {
    this.getDocuments(this.state.currentPage, this.state.pageSize);
  }

  getDocuments(page, size) {
    http.get(`${apiEndpoint}/api/documents/manager/get?pageNumber=${page - 1}&pageSize=${size}`)
      .then(response => {
        this.setState({
          documentList: response.data.content,
          totalPages: response.data.totalPages,
          totalElements: response.data.totalElements,
          numberOfElements: response.data.numberOfElements,
          currentPage: response.data.number + 1
        });
      }).catch(error => {
        swal({
          text: "Įvyko klaida perduodant duomenis iš serverio.",
          button: "Gerai"
        });
      })
  }

  handlePageChange(page) {
    this.setState({ currentPage: page });
    this.getDocuments(page, this.state.pageSize);
  }

  handleDocumentDownload(doc) {
    http.request({
      url: `${apiEndpoint}/api/documents/manager/get/${doc.id}`,
      method: "GET",
      responseType: "blob"
    }).then(response => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${doc.name}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    }).catch(error => {
      swal({
        text: "Įvyko klaida atsisiunčiant pažymą.",
        button: "Gerai"
      })
    })
  }

  render() {
    // THIS IS FOR FUTURE searchBox IMPLEMENTATION:
    // let size = 0;
    // if (this.state.documentList !== undefined) size = this.state.documentList.length;

    return (
      <div className="container pt-4">
        <h6 className="ps-2 pt-3">Prašymų registruotis į valstybinius darželius pažymos</h6>

        <ManagerDocumentsTable
          documentList={this.state.documentList}
          handleDocumentDownload={this.handleDocumentDownload}
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