import React, { Component } from "react";
import { withRouter } from "react-router";
import apiEndpoint from "../../00Services/endpoint";
import http from "../../00Services/httpService";
import swal from "sweetalert";
import ReviewApplicationComponent from "./ReviewApplicationComponent";

class ReviewApplicationContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      submitedAt: "",
      status: "",
      childName: "",
      childSurname: "",
      childPersonalCode: "",
      approvalDate: null,
      birthdate: "",
      mainGuardian: {
        name: "",
        surname: "",
        personalCode: "",
        address: "",
        phone: "",
        email: "",
        username: ""
      },
      kindergartenInfo: {}
    };
    this.handleReturn = this.handleReturn.bind(this);
  };

  componentDidMount() {
    this.getUserApplication();
  }

  getUserApplication() {
    http.get(`${apiEndpoint}/api/prasymai/manager/${this.props.match.params.id}`)
      .then(response => {
        this.setState({
          id: response.data.id,
          submitedAt: response.data.submitedAt,
          status: response.data.status,
          childName: response.data.childName,
          childSurname: response.data.childSurname,
          childPersonalCode: response.data.childPersonalCode,
          approvalDate: response.data.approvalDate,
          birthdate: response.data.birthdate,
          mainGuardian: response.data.mainGuardian,
          kindergartenInfo: response.data.kindergartenInfo
        })
      }).catch(error => {
        swal({
          text: "Įvyko klaida perduodant duomenis iš serverio: " + JSON.stringify(error),
          button: "Gerai"
        })
      });
  }

  handleReturn() {
    this.props.history.push("/eile");
  }

  render() {
    return (
      <ReviewApplicationComponent
        state={this.state}
        handleReturn={this.handleReturn}
      />
    )
  }
}

export default withRouter(ReviewApplicationContainer);