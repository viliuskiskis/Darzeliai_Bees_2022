import React, { Component } from "react";
import { withRouter } from "react-router";
import apiEndpoint from "../../10Services/endpoint";
import http from "../../10Services/httpService";
import swal from "sweetalert";

class ApplicationReviewContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      application: {}
    }
  }

  componentDidMount() {

    this.getUserApplication();
  }

  getUserApplication() {
    http.get(`${apiEndpoint}/api/prasymai/user/${this.props.match.params.id}`)
      .then(response => {
        this.setState({ application: response.data })
        // swal({
        //   text: JSON.stringify(response.data),
        //   button: "Gerai"
        // })
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
          Applictaion {this.props.match.params.id} Review
        </h1>
        <p>
          {JSON.stringify(this.state.application)}
        </p>
      </div>
    )
  }
}

export default withRouter(ApplicationReviewContainer);