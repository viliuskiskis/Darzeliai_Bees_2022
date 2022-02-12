import React, { Component } from "react";
import { withRouter } from "react-router";
import apiEndpoint from "../10Services/endpoint";
import http from "../10Services/httpService";
import swal from "sweetalert";
import inputValidator from "../01CommonComponents/00Reusable/InputValidator";
import CompensationReviewComponent from "./CompensationReviewComponent";
import CompensationEditComponent from "./CompensationEditComponent";
import childDataUrl from "../10Services/childDataUrl";

class CompensationReviewContainer extends Component {
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
    this.handleDelete = this.handleDelete.bind(this);
    this.activateEdit = this.activateEdit.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.mainGuardianOnChange = this.mainGuardianOnChange.bind(this);
    this.kindergartenOnChange = this.kindergartenOnChange.bind(this);
    this.childAkOnChange = this.childAkOnChange.bind(this);
    this.childSurnameOnChange = this.childSurnameOnChange.bind(this);
  }

  componentDidMount() {
    this.getUserCompensation();
  }

  getUserCompensation() {
    http.get(`${apiEndpoint}/api/kompensacijos/user/${this.props.match.params.id}`)
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

  activateEdit() {
    this.setState({ editIsActive: true })
  }

  handleDelete = () => {
    swal({
      text: "Ar tikrai norite ištrinti prašymą?",
      buttons: ["Ne", "Taip"],
      dangerMode: true,
    }).then((actionConfirmed) => {
      if (actionConfirmed) {
        http.delete(`${apiEndpoint}/api/kompensacijos/user/delete/${this.state.id}`)
          .then((response) => {
            swal({
              text: response.data,
              button: "Gerai"
            })
          }).then(
            setTimeout(() => {
              this.props.history.push("/prasymai")
            }, 1000)
          ).catch(() => { });
      }
    });
  }

  handleReturn() {
    this.props.history.push("/prasymai")
  }

  handleEdit(e) {
    e.preventDefault();
    const data = {
      birthdate: this.state.birthdate,
      childName: this.state.childName,
      childPersonalCode: this.state.childPersonalCode,
      childSurname: this.state.childSurname,
      kindergartenData: this.state.kindergartenData,
      mainGuardian: this.state.mainGuardian,
      applicationStatus: this.state.applicationStatus
    }
    if (this.state.childName === "" || this.state.childSurname === "") {
      swal({
        title: "Įvyko klaida",
        text: "Trūksta vaiko duomenų"
      });
    } else {
      http
        .put(`${apiEndpoint}/api/kompensacijos/user/edit/${this.state.id}`, data)
        .then((response) => {
          swal({
            text: response.data,
            button: "Gerai",
          });
          this.props.history.push("/prasymai")
        })
        .catch((error) => {
          swal({
            text: "Įvyko klaida. ",
            button: "Gerai"
          });
        });
    }
  }

  mainGuardianOnChange(e) {
    inputValidator(e);
    this.setState({
      mainGuardian: {
        ...this.state.mainGuardian,
        [e.target.name]: e.target.name === "email" ? e.target.value.toLowerCase() : e.target.value
      },
    });
  }

  kindergartenOnChange(e) {
    inputValidator(e);
    this.setState({
      kindergartenData: {
        ...this.state.kindergartenData,
        [e.target.name]: e.target.name === "account" || e.target.name === "bankCode" ? e.target.value.toUpperCase() :
          e.target.name === "email" ? e.target.value.toLowerCase() : e.target.value
      }
    });
  }

  childAkOnChange(e) {
    inputValidator(e);
    this.setState({ childPersonalCode: e.target.value });
    let akRegexp = new RegExp('^[56][12][0-9][01][0-9][0-3][0-9]{5}$');
    let gimimoDataRegexp = new RegExp("[0-9]{4}-[0-9]{2}-[0-9]{2}");
    if (akRegexp.test(e.target.value)) {
      http.get(`${childDataUrl}/${e.target.value}`)
        .then(response => {
          if (gimimoDataRegexp.test(response.data.gimimoData)) {
            this.setState({
              birthdate: response.data.gimimoData
            })
          }
          if (response.data.pavarde === this.state.childSurname) {
            this.setState({ childName: response.data.vardas })
          } else {
            this.setState({ childName: "" });
          }
          this.setState({
            hiddenChildName: response.data.vardas,
            hiddenChildSurname: response.data.pavarde
          })
        })
        .catch(error => {
          this.resetChildData();
          swal({
            text: "Asmenų registre tokio asmens kodo nėra.",
            button: "Gerai"
          });
        })
    } else {
      this.resetChildData();
    }
  }

  childSurnameOnChange(e) {
    inputValidator(e);
    this.setState({ childSurname: e.target.value });
    if (e.target.value === this.state.hiddenChildSurname) {
      this.setState({ childName: this.state.hiddenChildName });
    } else {
      this.setState({ childName: "" });
    }
  }

  resetChildData() {
    this.setState({
      childName: "",
      hiddenChildName: "",
      hiddenChildSurname: "",
      birthdate: "0001-01-01"
    })
  }


  render() {
    if (this.state.editIsActive) {
      return (
        <CompensationEditComponent
          state={this.state}
          handleEdit={this.handleEdit}
          mainGuardianOnChange={this.mainGuardianOnChange}
          kindergartenOnChange={this.kindergartenOnChange}
          childAkOnChange={this.childAkOnChange}
          childSurnameOnChange={this.childSurnameOnChange}
        />
      )
    } else {
      return (
        <CompensationReviewComponent
          state={this.state}
          activateEdit={this.activateEdit}
          handleDelete={this.handleDelete}
          handleReturn={this.handleReturn}
        />
      )
    }
  }
}

export default withRouter(CompensationReviewContainer);