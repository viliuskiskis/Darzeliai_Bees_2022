import React, { Component } from "react";
import apiEndpoint from "../../00Services/endpoint";
import http from "../../00Services/httpService";
import swal from "sweetalert";
import AdmissionReviewComponent from "./AdmissionReviewComponent";
import AuthContext from "../../00Services/AuthContext";

export default class AdmissionReviewContainer extends Component {
  static contextType = AuthContext;

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
    let role = this.context.state.role.toLowerCase();
    http.get(`${apiEndpoint}/api/prasymai/${role}/${this.props.match.params.id}`)
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
        alert(JSON.stringify(response.data))
      }).catch(error => {
        swal({
          text: "Įvyko klaida perduodant duomenis iš serverio: " + JSON.stringify(error),
          button: "Gerai"
        })
      });
  }

  handleReturn() {
    let route = this.context.state.role === "USER" ? "/prasymai" : "/eile";
    this.props.history.push(route);
  }

  render() {
    return (
      <AdmissionReviewComponent
        state={this.state}
        role={this.context.state.role}
        handleReturn={this.handleReturn}
      />
    )
  }
}