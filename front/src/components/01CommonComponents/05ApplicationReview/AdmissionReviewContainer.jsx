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
      numberInWaitingList: "",
      mainGuardian: null,
      additionalGuardian: null,
      approvedKindergarten: "",
      kindergartenChoices: null,
      priorities: null
    };
    this.handleReturn = this.handleReturn.bind(this);
    this.handleDownloadContract = this.handleDownloadContract.bind(this);
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
          numberInWaitingList: response.data.numberInWaitingList,
          mainGuardian: response.data.mainGuardian,
          additionalGuardian: response.data.additionalGuardian,
          approvedKindergarten: response.data.approvedKindergarten,
          kindergartenChoices: response.data.kindergartenChoices,
          priorities: response.data.priorities
        })
      }).catch(error => {
        swal({
          text: "Įvyko klaida perduodant duomenis iš serverio: " + JSON.stringify(error),
          button: "Gerai"
        })
      });
  }

  handleDownloadContract(data) {
    http.request({
      url: `${apiEndpoint}/api/contract/user/${data.id}`,
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

  handleReturn() {
    let route = this.context.state.role === "USER" ? "/prasymai" : "/eile";
    this.props.history.push(route);
  }

  render() {
    return (
      <AdmissionReviewComponent
        state={this.state}
        role={this.context.state.role}
        handleDownloadContract={this.handleDownloadContract}
        handleReturn={this.handleReturn}
      />
    )
  }
}