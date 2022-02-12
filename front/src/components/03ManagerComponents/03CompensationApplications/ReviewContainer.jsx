import React, { Component } from "react";
import { withRouter } from "react-router";
import apiEndpoint from "../../00Services/endpoint";
import http from "../../00Services/httpService";
import swal from "sweetalert";
import ReviewComponent from "./ReviewComponent";

class ReviewContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editIsActive: false,
      id: 0,
      submitedAt: "",
      applicationStatus: "",
      approvalDate: "",
      kindergartenData: {
        entityName: "",
        code: "",
        phone: "",
        email: "",
        address: "",
        account: "",
        bankCode: "",
        bankName: ""
      },
      mainGuardian: {
        userId: 0,
        role: "",
        name: "",
        surname: "",
        personalCode: "",
        address: "",
        phone: "",
        email: "",
        username: ""
      },
      birthdate: "",
      childName: "",
      childPersonalCode: "",
      childSurname: "",
      hiddenChildName: "",
      hiddenChildSurname: ""
    };
    this.handleReturn = this.handleReturn.bind(this);
  }

  componentDidMount() {
    this.getUserCompensation();
  }

  getUserCompensation() {
    http.get(`${apiEndpoint}/api/kompensacijos/manager/${this.props.match.params.id}`)
      .then(response => {
        this.setState({
          id: response.data.id,
          submitedAt: response.data.submitedAt,
          applicationStatus: response.data.applicationStatus,
          approvalDate: response.data.approvalDate,
          kindergartenData: response.data.kindergartenDataInfo,
          mainGuardian: response.data.mainGuardianInfo,
          birthdate: response.data.childDataInfo.birthdate,
          childName: response.data.childDataInfo.childName,
          childPersonalCode: response.data.childDataInfo.childPersonalCode,
          childSurname: response.data.childDataInfo.childSurname,
          hiddenChildSurname: response.data.childDataInfo.childSurname,
          hiddenChildName: response.data.childDataInfo.childName
        })
      }).catch(error => {
        swal({
          text: "Įvyko klaida perduodant duomenis iš serverio: " + JSON.stringify(error),
          button: "Gerai"
        })
      });
  }

  handleReturn() {
    this.props.history.push("/kompensacijos")
  }

  render() {
    return (
      <ReviewComponent
        state={this.state}
        handleReturn={this.handleReturn}
      />
    )
  }
}

export default withRouter(ReviewContainer);