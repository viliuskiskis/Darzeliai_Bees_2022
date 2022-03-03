import React, { Component } from 'react';
import swal from 'sweetalert';
import http from '../../00Services/httpService';
import apiEndpoint from '../../00Services/endpoint';
import KindergartenListTable from './KindergartenListTable';
import Pagination from "react-js-pagination";
import SearchBox from '../../05ReusableComponents/SeachBox';

export default class KindergartenListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      darzeliai: [],
      elderates: [],
      pageSize: 10, // FUNCTIONALITY NOT YET IMPLEMENTED
      currentPage: 1,
      totalPages: 0,
      totalElements: 0,
      numberOfElements: 0,
      searchQuery: "",
      inEditMode: false,
      editRowId: "",
      editedKindergarten: null,
      errorMessages: {}
    }
  }
  componentDidMount() {
    this.getKindergartenInfo(this.state.currentPage, this.state.pageSize, this.state.searchQuery);
    this.getElderates();
    document.addEventListener("keydown", this.handleEscape, false);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleEscape, false);
  }

  handleEscape = (e) => {
    if (e.key === 'Escape') {
      this.onCancel();

      setTimeout(function () {
        window.location.reload();
      }, 10);
    }
  }

  getKindergartenInfo(page, size, filter) {
    http.get(`${apiEndpoint}/api/darzeliai/manager/page?page=${page - 1}&size=${size}&filter=${filter}`)
      .then((response) => {
        this.setState({
          darzeliai: response.data.content,
          totalPages: response.data.totalPages,
          totalElements: response.data.totalElements,
          numberOfElements: response.data.numberOfElements,
          currentPage: response.data.number + 1
        });
      }).catch(() => { });
  }

  getElderates() {
    http.get(`${apiEndpoint}/api/darzeliai/manager/elderates`)
      .then((response) => {
        this.setState({ elderates: response.data });
      }).catch(() => { });
  }

  handleSearch = (e) => {
    this.setState({ searchQuery: e.currentTarget.value });
    this.getKindergartenInfo(1, this.state.pageSize, e.currentTarget.value);
  }

  handleDelete = (item) => {
    swal({
      text: "Ar tikrai norite ištrinti darželį?",
      buttons: ["Ne", "Taip"],
      dangerMode: true,
    }).then((actionConfirmed) => {
      if (actionConfirmed) {
        const { currentPage, numberOfElements } = this.state;
        let page = numberOfElements === 1 ? (currentPage - 1) : currentPage;
        page = page < 1 ? 1 : page;
        http.delete(`${apiEndpoint}/api/darzeliai/manager/delete/${item.id}`)
          .then((response) => {
            swal({
              text: response.data,
              button: "Gerai"
            });
          }).then(() => {
            this.getKindergartenInfo(page, this.state.pageSize, this.state.searchQuery);
          }).catch(() => { });
      }
    });
  }

  handleEditKindergarten = (item) => {
    this.setState({
      inEditMode: true,
      editRowId: item.id,
      editedKindergarten: item
    });
  }

  onCancel = () => {
    this.setState(
      {
        inEditMode: false,
        editRowId: "",
        editedKindergarten: null
      }
    )
  }

  handleChange = ({ target: input }) => {
    const errorMessages = this.state.errorMessages;

    if (input.validity.valueMissing || input.validity.patternMismatch || input.validity.rangeUnderflow || input.validity.rangeOverflow) {
      errorMessages[input.name] = `*${input.title}`;
    } else {
      delete errorMessages[input.name];
    }
    const kindergarten = this.state.editedKindergarten;
    kindergarten[input.name] = input.value;
    this.setState({
      editedKindergarten: kindergarten,
      errorMessages: errorMessages
    });
  }

  handleSaveEdited = () => {
    const { editedKindergarten, editRowId, errorMessages } = this.state;
    if (Object.keys(errorMessages).length === 0) {
      http.put(`${apiEndpoint}/api/darzeliai/manager/update/${editRowId}`, editedKindergarten)
        .then(() => {
          this.onCancel();
          this.getKindergartenInfo(this.state.currentPage, this.state.searchQuery);
        }).catch(error => {
          if (error && error.response.status === 409) {
            swal({
              text: error.response.data,
              button: "Gerai"
            });
          }
        })
    }
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
    this.getKindergartenInfo(page, this.state.pageSize, this.state.searchQuery);
  };

  render() {
    const { darzeliai, elderates, searchQuery, inEditMode, editRowId, errorMessages } = this.state;
    const hasErrors = Object.keys(errorMessages).length === 0 ? false : true;

    return (
      <React.Fragment>

        <SearchBox
          value={searchQuery}
          onSearch={this.handleSearch}
          placeholder={"Ieškoti pagal pavadinimą..."}
        />

        <KindergartenListTable
          darzeliai={darzeliai}
          elderates={elderates}
          inEditMode={inEditMode}
          editRowId={editRowId}
          errorMessages={errorMessages}
          hasErrors={hasErrors}
          onDelete={this.handleDelete}
          onEditData={this.handleEditKindergarten}
          onEscape={this.handleEscape}
          onChange={this.handleChange}
          onSave={this.handleSaveEdited}
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

      </React.Fragment>
    )
  }
}