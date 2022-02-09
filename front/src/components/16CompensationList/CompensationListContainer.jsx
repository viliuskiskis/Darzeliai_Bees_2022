import React, { Component } from "react";

import "../../App.css";

// import http from "../10Services/httpService";
// import apiEndpoint from "../10Services/endpoint";

// import QueueTable from "../12Queue/QueueTable";

export default class CompensationListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      compensations: []
    }
  }

  componentDidMount() {
    this.getCompensations();
  }

  getCompensations() {
    // FILL THIS
  }

  render() {
    return (
      <div>
        <h1>Compensation List</h1>
      </div>
    )
  }

}