import React, { Component, createContext } from "react";
import { withRouter } from "react-router-dom";

import { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import lt from "date-fns/locale/lt";

import http from "../10Services/httpService";
import apiEndpoint from "../10Services/endpoint";
import childDataUrl from "../10Services/childDataUrl";
import swal from "sweetalert";

import inputValidator from "../08CommonComponents/InputValidator";
import CreateApplicationFormComponent from "./CreateApplicationFormComponent";

import "../../App.css";
import "../08CommonComponents/datePickerStyle.css";
import { parse } from "date-fns";

registerLocale("lt", lt);

export const ApplicationContext = createContext();

class CreateApplicationFormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mainGuardian: {
        name: "",
        surname: "",
        personalCode: "",
        phone: "",
        email: "",
        address: "",
        username: "",
      },
      additionalGuardian: {
        name: "",
        surname: "",
        personalCode: "",
        phone: "",
        email: "",
        address: "",
      },
      birthdate: parse("0001-01-01", "yyyy-MM-dd", new Date()),
      childName: "",
      childPersonalCode: "",
      childSurname: "",
      kindergartenChoices: {
        kindergartenId1: "",
        kindergartenId2: "",
        kindergartenId3: "",
        kindergartenId4: "",
        kindergartenId5: "",
      },
      priorities: {
        childIsAdopted: false,
        familyHasThreeOrMoreChildrenInSchools: false,
        guardianDisability: false,
        guardianInSchool: false,
        livesInVilnius: false,
      },
      kindergartenList: [],
      additionalGuardianInput: false,
      registrationDisabled: false,
    };
    this.kindergartenListToSelect = this.kindergartenListToSelect.bind(this);
    this.mainGuardianOnChange = this.mainGuardianOnChange.bind(this);
    this.additionalGuardianOnChange = this.additionalGuardianOnChange.bind(this);
    this.enableAdditionalGuardian = this.enableAdditionalGuardian.bind(this);
    this.childOnChange = this.childOnChange.bind(this);
    this.resetChildData = this.resetChildData.bind(this);
    this.checkboxOnChange = this.checkboxOnChange.bind(this);
    this.handleKindergarten1 = this.handleKindergarten1.bind(this);
    this.handleKindergarten2 = this.handleKindergarten2.bind(this);
    this.handleKindergarten3 = this.handleKindergarten3.bind(this);
    this.handleKindergarten4 = this.handleKindergarten4.bind(this);
    this.handleKindergarten5 = this.handleKindergarten5.bind(this);
    this.handleApplicationSubmit = this.handleApplicationSubmit.bind(this);

  }

  componentDidMount() {
    /** Get registation status */
    http.get(`${apiEndpoint}/api/status`)
      .then((response) => {
        //console.log(response.data.registrationActive);
        this.setState({ registrationDisabled: !response.data.registrationActive })
      })

    /** get logged in user data */
    http
      .get(`${apiEndpoint}/api/users/user`)
      .then((response) => {
        this.setState({
          mainGuardian: {
            ...this.state.mainGuardian,
            name: response.data.name,
            surname: response.data.surname,
            personalCode: response.data.personalCode,
            phone: response.data.phone,
            email: response.data.username,
            address: response.data.address,
            username: response.data.username,
            role: response.data.role,
          },
        });

        /** get kindergarten list */
        var kindergartenList = [];
        http.get(`${apiEndpoint}/api/darzeliai`).then((response) => {
          kindergartenList = response.data.map((k) => ({
            value: k.id,
            label: k.name + " (" + k.address + ")",
            disabled: "no",
          }));
          this.setState({
            kindergartenList,
          });
        });
      })
      .catch((error) => {
        swal({
          text: "Įvyko klaida perduodant duomenis iš serverio.",
          button: "Gerai",
        });
      });
  }

  /** Darzeliu sarasas i options formata */
  kindergartenListToSelect(kList, priorityFieldName) {
    var optionsList = kList.map((k) => ({
      value: k.id,
      label: k.name + " (" + k.address + ")",
      name: priorityFieldName,
    }));
    return optionsList;
  }

  /** Pagrindinio atstovo formos onChange */
  mainGuardianOnChange(e) {
    inputValidator(e);
    this.setState({
      mainGuardian: {
        ...this.state.mainGuardian,
        [e.target.name]: e.target.value,
      },
    });
  }

  /** Antro atstovo formos onChange */
  additionalGuardianOnChange(e) {
    inputValidator(e);
    this.setState({
      additionalGuardian: {
        ...this.state.additionalGuardian,
        [e.target.name]: e.target.value,
      },
    });
  }

  enableAdditionalGuardian() {
    // e.preventDefault();
    this.setState({
      ...this.state,
      additionalGuardianInput: !this.state.additionalGuardianInput
    });
  }

  /** Vaiko formos onChange */
  childOnChange(e) {
    inputValidator(e);
    this.setState({
      childPersonalCode: e.target.value,
    });
    let akRegexp = new RegExp('^[0-9]{11}$');
    let gimimoDataRegexp = new RegExp("[0-9]{4}-[0-9]{2}-[0-9]{2}");
    if (akRegexp.test(e.target.value)) {
      http.get(`${childDataUrl}/${e.target.value}`)
        .then(response => {
          if (gimimoDataRegexp.test(response.data.gimimoData)) {
            this.setState({
              childName: response.data.vardas,
              childSurname: response.data.pavarde,
              birthdate: parse(
                response.data.gimimoData,
                "yyyy-MM-dd",
                new Date()
              )
            })
          } else {
            swal({
              text: JSON.stringify(response.data),
              button: "Gerai"
            })
          }
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

  resetChildData() {
    this.setState({
      childName: "",
      childSurname: "",
      birthdate: parse(
        "0001-01-01",
        "yyyy-MM-dd",
        new Date()
      )
    })
  }

  /** Checkbox onChange */
  checkboxOnChange(e) {
    this.setState({
      priorities: {
        ...this.state.priorities,
        [e.target.name]: e.target.checked
      },
    });
  }

  /** Kindergarten Choices onChange */
  handleKindergarten1(e) {
    if (
      e.value !== this.state.kindergartenChoices.kindergartenId1
    ) {
      const lastIdValue = this.state.kindergartenChoices
        .kindergartenId1;
      this.setState({
        ...this.state,
        kindergartenChoices: {
          ...this.state.kindergartenChoices,
          kindergartenId1: e.value,
        },
      });
      this.state.kindergartenList.forEach((element) => {
        if (element.value === lastIdValue) {
          element.disabled = "no";
        }
      });
    }
    this.setState({
      ...this.state,
      kindergartenChoices: {
        ...this.state.kindergartenChoices,
        kindergartenId1: e.value,
      },
    });
    this.state.kindergartenList.forEach((element) => {
      if (element.value === e.value) {
        element.disabled = "yes";
      }
    });
  }

  handleKindergarten2(e) {
    if (
      e.value !== this.state.kindergartenChoices.kindergartenId2
    ) {
      const lastIdValue = this.state.kindergartenChoices
        .kindergartenId2;
      this.setState({
        ...this.state,
        kindergartenChoices: {
          ...this.state.kindergartenChoices,
          kindergartenId2: e.value,
        },
      });
      this.state.kindergartenList.forEach((element) => {
        if (element.value === lastIdValue) {
          element.disabled = "no";
        }
      });
    }
    this.setState({
      ...this.state,
      kindergartenChoices: {
        ...this.state.kindergartenChoices,
        kindergartenId2: e.value,
      },
    });
    this.state.kindergartenList.forEach((element) => {
      if (element.value === e.value) {
        element.disabled = "yes";
      }
    });
  }

  handleKindergarten3(e) {
    if (
      e.value !== this.state.kindergartenChoices.kindergartenId3
    ) {
      const lastIdValue = this.state.kindergartenChoices
        .kindergartenId3;
      this.setState({
        ...this.state,
        kindergartenChoices: {
          ...this.state.kindergartenChoices,
          kindergartenId3: e.value,
        },
      });
      this.state.kindergartenList.forEach((element) => {
        if (element.value === lastIdValue) {
          element.disabled = "no";
        }
      });
    }
    this.setState({
      ...this.state,
      kindergartenChoices: {
        ...this.state.kindergartenChoices,
        kindergartenId3: e.value,
      },
    });
    this.state.kindergartenList.forEach((element) => {
      if (element.value === e.value) {
        element.disabled = "yes";
      }
    });
  }

  handleKindergarten4(e) {
    if (
      e.value !== this.state.kindergartenChoices.kindergartenId4
    ) {
      const lastIdValue = this.state.kindergartenChoices
        .kindergartenId4;
      this.setState({
        ...this.state,
        kindergartenChoices: {
          ...this.state.kindergartenChoices,
          kindergartenId4: e.value,
        },
      });
      this.state.kindergartenList.forEach((element) => {
        if (element.value === lastIdValue) {
          element.disabled = "no";
        }
      });
    }
    this.setState({
      ...this.state,
      kindergartenChoices: {
        ...this.state.kindergartenChoices,
        kindergartenId4: e.value,
      },
    });
    this.state.kindergartenList.forEach((element) => {
      if (element.value === e.value) {
        element.disabled = "yes";
      }
    });
  }

  handleKindergarten5(e) {
    if (
      e.value !== this.state.kindergartenChoices.kindergartenId5
    ) {
      const lastIdValue = this.state.kindergartenChoices
        .kindergartenId5;
      this.setState({
        ...this.state,
        kindergartenChoices: {
          ...this.state.kindergartenChoices,
          kindergartenId5: e.value,
        },
      });
      this.state.kindergartenList.forEach((element) => {
        if (element.value === lastIdValue) {
          element.disabled = "no";
        }
      });
    }
    this.setState({
      ...this.state,
      kindergartenChoices: {
        ...this.state.kindergartenChoices,
        kindergartenId5: e.value,
      },
    });
    this.state.kindergartenList.forEach((element) => {
      if (element.value === e.value) {
        element.disabled = "yes";
      }
    });
  }

  /** Handle submit */
  handleApplicationSubmit(e) {
    e.preventDefault();

    const data = {
      additionalGuardian: this.state.additionalGuardian,
      birthdate: this.state.birthdate.toLocaleDateString("en-CA"),
      childName: this.state.childName,
      childPersonalCode: this.state.childPersonalCode,
      childSurname: this.state.childSurname,
      // choices become choises (with "s"), when sending data
      // maybe it should be fixed?..
      kindergartenChoises: this.state.kindergartenChoices,
      mainGuardian: this.state.mainGuardian,
      priorities: this.state.priorities
    }

    if (!this.state.kindergartenChoices.kindergartenId1) {
      swal({
        title: "Įvyko klaida",
        text: "1 Prioritetas yra privalomas"
      });
    } else if (this.state.childName === "" || this.state.childSurname === "") {
      swal({
        title: "Įvyko klaida",
        text: "Trūksta vaiko duomenų"
      });
    } else {
      http
        .post(`${apiEndpoint}/api/prasymai/user/new`, data)
        .then((response) => {
          //console.log(response);
          swal({
            text: response.data,
            button: "Gerai",
          });

          this.props.history.push("/prasymai")
        })
        .catch((error) => {
          swal({
            text: "Įvyko klaida. " + error.response.data,
            button: "Gerai"
          });
        });
    }
  }

  render() {

    return (
      <ApplicationContext.Provider value={{
        state: this.state,
        handleApplicationSubmit: this.handleApplicationSubmit,
        mainGuardianOnChange: this.mainGuardianOnChange,
        additionalGuardianOnChange: this.additionalGuardianOnChange,
        enableAdditionalGuardian: this.enableAdditionalGuardian,
        childOnChange: this.childOnChange,
        checkboxOnChange: this.checkboxOnChange,
        handleKindergarten1: this.handleKindergarten1,
        handleKindergarten2: this.handleKindergarten2,
        handleKindergarten3: this.handleKindergarten3,
        handleKindergarten4: this.handleKindergarten4,
        handleKindergarten5: this.handleKindergarten5
      }}>
        <CreateApplicationFormComponent />
      </ApplicationContext.Provider>
    );
  }
}

export default withRouter(CreateApplicationFormContainer);
