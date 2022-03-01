import React, { Component } from 'react';
import Pagination from "react-js-pagination";
import http from '../../00Services/httpService';
import apiEndpoint from '../../00Services/endpoint';
import Spinner from '../../05ReusableComponents/Spinner'
import SearchBox from "../../05ReusableComponents/SeachBox";
import EventJournalTable from './EventJournalTable';

export default class EventJournalContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      entries: [],
      pageSize: 10, // FUNCTIONALITY NOT YET IMPLEMENTED
      currentPage: 1,
      totalPages: 0,
      totalElements: 0,
      numberOfElements: 0,
      entriesLoaded: false,
      searchQuery: ""
    };
    this.getJournalEntries = this.getJournalEntries.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  };

  componentDidMount() {
    this.getJournalEntries(this.state.currentPage, this.state.pageSize, this.state.searchQuery);
  }

  getJournalEntries(page, size, filter) {
    var uri = `${apiEndpoint}/admin/getjournal/page?page=${page - 1}&size=${size}&filter=${filter}`;

    http
      .get(uri)
      .then((response) => {
        this.setState({
          entries: response.data.content.map((entry) => ({
            ...entry,
            id: entry.entryID
          })),
          totalPages: response.data.totalPages,
          totalElements: response.data.totalElements,
          numberOfElements: response.data.numberOfElements,
          currentPage: response.data.number + 1,
          entriesLoaded: true
        });
      })
      .catch(() => { });
  }

  handleSearch(e) {
    this.setState({ searchQuery: e.currentTarget.value });
    this.getJournalEntries(1, this.state.pageSize, e.currentTarget.value);
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
    this.getJournalEntries(page, this.state.pageSize, this.state.searchQuery);
  };

  render() {
    return (
      <div className="container pt-4" >
        <h6 className="ps-2 pt-3">Sistemos įvykių žurnalas</h6>
        {this.state.entriesLoaded ? (
          <div>
            <SearchBox
              value={this.state.searchQuery}
              onSearch={this.handleSearch}
              placeholder={"Search by username..."}
            />

            <EventJournalTable entries={this.state.entries} />
          </div>
        ) : (<Spinner />)}

        {this.state.totalPages > 1 &&
          <div className="d-flex justify-content-center">
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
    )
  }
}
