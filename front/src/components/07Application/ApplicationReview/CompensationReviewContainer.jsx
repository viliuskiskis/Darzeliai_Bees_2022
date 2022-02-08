import React, { Component } from "react";
import { withRouter } from "react-router";
import apiEndpoint from "../../10Services/endpoint";
import http from "../../10Services/httpService";
import swal from "sweetalert";

class CompensationReviewContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      compensation: {}
    }
  }

  componentDidMount() {
    this.getUserCompensation();
  }

  getUserCompensation() {
    http.get(`${apiEndpoint}/api/kompensacijos/user/${this.props.match.params.id}`)
      .then(response => {
        this.setState({ compensation: response.data })
      }).catch(error => {
        swal({
          text: "Įvyko klaida perduodant duomenis iš serverio: " + JSON.stringify(error),
          button: "Gerai"
        })
      });
  }

  render() {
    return (
      <div>
        <h1>
          Compensation {this.props.match.params.id} Review
        </h1>
        <p>
          {JSON.stringify(this.state.compensation)}
        </p>
      </div>
    )
  }
}

export default withRouter(CompensationReviewContainer);