import React, { Component } from 'react';
import swal from 'sweetalert';
import Pagination from "react-js-pagination";
import http from '../../00Services/httpService';
import apiEndpoint from '../../00Services/endpoint';
import QueueTable from './QueueTable';
import QueueProcessedTable from './QueueProcessedTable';
import SearchBox from '../../05ReusableComponents/SeachBox';
import Buttons from './Buttons';

export default class QueueContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      applications: [],
      pageSize: 10, // FUNCTIONALITY NOT YET IMPLEMENTED
      currentPage: 1,
      totalPages: 0,
      totalElements: 0,
      numberOfElements: 0,
      searchQuery: "",
      isActive: false,
      isLocked: false,
      currentButtonValue: ""
    }
    this.handleApplicationReview = this.handleApplicationReview.bind(this);
    this.handleContractDownload = this.handleContractDownload.bind(this);
  }
  componentDidMount() {
    this.getApplicationState();
    this.getApplications(this.state.currentPage, this.state.pageSize, this.state.searchQuery);
  }

  getApplicationState() {
    http.get(`${apiEndpoint}/api/status`)
      .then((response) => {
        let buttonValue = response.data.registrationActive ? "On" : "Off"
        this.setState({
          isActive: response.data.registrationActive,
          isLocked: response.data.queueEditingLocked,
          currentButtonValue: buttonValue
        });
      }).catch(() => { });
  }

  getApplications(page, size, filter) {
    // FIX GET METHOD FOR THIS:
    let uri = `${apiEndpoint}/api/eile/manager/queue?page=${page - 1}&size=${size}&filter=${filter}`;
    if (this.state.isActive) {
      uri = `${apiEndpoint}/api/prasymai/manager?page=${page - 1}&size=${size}&filter=${filter}`;
    }
    http.get(uri)
      .then((response) => {
        this.setState({
          applications: response.data.content,
          totalPages: response.data.totalPages,
          totalElements: response.data.totalElements,
          numberOfElements: response.data.numberOfElements,
          currentPage: response.data.number + 1
        });
      }).catch(() => { });
  }

  resetState() {
    this.setState({
      applications: [],
      currentPage: 1,
      totalPages: 0,
      totalElements: 0,
      numberOfElements: 0,
      searchQuery: ""
    });
  }

  handleClick = (e) => {
    const buttonValue = e.currentTarget.value;

    if (buttonValue !== this.state.currentButtonValue) {
      this.resetState();

      if (buttonValue === "On") {
        http.post(`${apiEndpoint}/api/status/${true}`)
          .then(() => {
            this.setState({
              isActive: true,
              currentButtonValue: buttonValue
            }, function () {
              this.getApplications(this.state.currentPage, this.state.pageSize, this.state.searchQuery);
            });
          }).catch(() => { });

      } else {
        http.post(`${apiEndpoint}/api/status/${false}`)
          .then(() => {
            this.setState({
              isActive: false,
              currentButtonValue: buttonValue
            }, function () {
              this.getApplications(this.state.currentPage, this.state.pageSize, this.state.searchQuery);
            });
          }).catch(() => { });
      }
    }
  }

  handleProcessQueue = () => {
    const buttonValue = "Process";

    if (buttonValue !== this.state.currentButtonValue) {
      this.resetState();

      http.post(`${apiEndpoint}/api/queue/process`)
        .then((response) => {
          swal({
            text: response.data,
            button: 'Gerai'
          });
          this.setState({
            currentButtonValue: buttonValue
          }, function () {
            this.getApplications(this.state.currentPage, this.state.pageSize, this.state.searchQuery);
          });
        }).catch(() => { });
    }
  }

  handleConfirmQueue = () => {
    const buttonValue = "Confirm";

    if (buttonValue !== this.state.currentButtonValue) {
      swal({
        text: "DĖMESIO! Šio veiksmo negalėsite atšaukti!\n\nPo patvirtinimo bus automatiškai išsiųsti pranešimai vaiko atstovams.\nAr tikrai norite patvirtinti eiles?",
        buttons: ["Ne", "Taip"],
        dangerMode: true,
      }).then((actionConfirmed) => {
        if (actionConfirmed) {
          this.resetState();

          http.post(`${apiEndpoint}/api/queue/confirm`)
            .then((response) => {
              swal({
                text: response.data,
                button: 'Gerai'
              });
              this.setState({
                currentButtonValue: buttonValue
              }, function () {
                this.getApplications(this.state.currentPage, this.state.pageSize, this.state.searchQuery);
              });
            }).catch((error) => {
              if (error && error.response.status === 405) {
                swal({
                  text: error.response.data,
                  button: "Gerai"
                });
                this.getApplications(this.state.currentPage, this.state.pageSize, this.state.searchQuery);
              }
            });
        }
      })
    }
  }

  handleSearch = (e) => {
    this.setState({ searchQuery: e.currentTarget.value });
    this.getApplications(1, this.state.pageSize, e.currentTarget.value);
  }

  handleDeactivate = (item) => {
    swal({
      text: "DĖMESIO! Šio veiksmo negalėsite atšaukti!\n\nAr tikrai norite atmesti prašymą?",
      buttons: ["Ne", "Taip"],
      dangerMode: true,
    }).then((actionConfirmed) => {
      if (actionConfirmed) {
        http.post(`${apiEndpoint}/api/prasymai/manager/deactivate/${item.id}`)
          .then((response) => {
            swal({
              text: response.data,
              button: "Gerai"
            });
          }).then(() => {
            this.getApplications(this.state.currentPage, this.state.pageSize, this.state.searchQuery);
          }).catch(error => {
            if (error && error.response.status === 405) {
              swal({
                text: "Įvyko klaida. " + error.response.data,
                button: "Gerai"
              });
            }
          });
      }
    });
  }

  handleApplicationReview(id) {
    this.props.history.push(`/prasymas/priimti/${id}`);
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
    this.getApplications(page, this.state.pageSize, this.state.searchQuery);
  };

  handleContractDownload(data) {
    http.request({
      url: `${apiEndpoint}/api/contract/manager/${data.id}`,
      method: "GET",
      responseType: "blob"
    }).then(response => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download',
        `Ikimokyklinio ugdymo sutartis, ${data.childName} ${data.childSurname}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    }).catch(error => {
      swal({
        text: "Įvyko klaida atsisiunčiant sutartį.",
        button: "Gerai"
      })
    })
  }


  render() {

    const { applications, totalPages, searchQuery, isActive, currentButtonValue } = this.state;

    let size = 0;

    if (applications !== undefined) size = applications.length;

    const placeholder = "Ieškoti pagal vaiko asmens kodą..."

    return (

      <div className="container pt-4" >

        <h6 className="ps-2 pt-3">Prašymai registruotis į valstybinius darželius</h6>
        {isActive && <p className="ps-2 pt-3">Registracija vykdoma</p>}
        {!isActive && <p className="ps-2 pt-3">Šiuo metu registracija nevykdoma</p>}

        <Buttons
          onClick={this.handleClick}
          onProcess={this.handleProcessQueue}
          onConfirm={this.handleConfirmQueue}
          isActive={isActive}
          currentButtonValue={currentButtonValue}
          size={size}
        />

        {(size > 0 || searchQuery !== "") &&
          <SearchBox
            value={searchQuery}
            onSearch={this.handleSearch}
            placeholder={placeholder}
          />
        }

        <div className=" ">

          {isActive &&
            <QueueTable
              applications={applications}
              onDeactivate={this.handleDeactivate}
              handleApplicationReview={this.handleApplicationReview}
              handleContractDownload={this.handleContractDownload}
            />
          }

          {!isActive &&
            <QueueProcessedTable
              applications={applications}
              onDeactivate={this.handleDeactivate}
              handleApplicationReview={this.handleApplicationReview}
              handleContractDownload={this.handleContractDownload}
            />
          }

          {totalPages > 1 && <div className="d-flex justify-content-center">
            <Pagination
              itemClass="page-item"
              linkClass="page-link"
              activePage={this.state.currentPage}
              itemsCountPerPage={this.state.pageSize}
              totalItemsCount={this.state.totalElements}
              pageRangeDisplayed={15}
              onChange={this.handlePageChange.bind(this)}
            />
          </div>
          }

        </div>
      </div>
    )
  }
}