import React, { Component } from 'react'

import http from '../10Services/httpService';
import apiEndpoint from '../10Services/endpoint';

/*
    Todo:
        Optional: Bootstrap validation
*/

const styleFieldRequired = {
    color: "red",
    textTransform: "uppercase",
    fontSize: "12px",
    fontWeight: "bold",
    verticalAlign: "text-top"
}

function dateFormat(num) {
    if(num>=1 && num<=9) {
        return "0" + num;
    }
    else return num;
}

var currentDate = (new Date().getUTCFullYear()) + "-" + dateFormat(new Date().getUTCMonth() + 1) + "-" + dateFormat(new Date().getUTCDate());

export default class AdminCreateUser extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            role: "ADMIN",
            name: "",
            surname: "",
            birthdate: "",
            identificationCode: "",
            address: "",
            telno: "",
            email: "",
        }
        this.roleDropdownOnChange = this.roleDropdownOnChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    drawSelector () {
        return (
            <div className="form-row">
                    <div className="form-group col">
                        <label htmlFor="role-selector">Naudotojo rolė:</label>
                        <select name="role-selector" id="selectpicker" className="form-control" value={this.state.role} onChange={this.roleDropdownOnChange}>
                            <option value="ADMIN">Administratorius</option>
                            <option value="MANAGER">Švietimo specialistas</option>
                            <option value="USER">Vaiko atstovas</option>
                        </select>
                    </div>
                    <div className="form-group col">
                        <label htmlFor="txtEmail">El. paštas <span style={styleFieldRequired}>*</span></label>
                        <input type="email" className="form-control" id="txtEmail" name="email" value={this.state.email} onChange={this.handleChange} placeholder="El. paštas" required="required"></input>
                    </div>
            </div>
        )
    }

    drawForm (role) {
        if(role === "ADMIN" || role === "MANAGER") {
            return (
                <div className="form-row">
                    <div className="form-group col">
                        <input type="text" className="form-control" id="txtName" name="name" value={this.state.name} onChange={this.handleChange} placeholder="Vardas"></input>
                    </div>
                    <div className="form-group col">
                        <input type="text" className="form-control" id="txtSurname" name="surname" value={this.state.surname} onChange={this.handleChange} placeholder="Pavardė"></input>
                    </div>
                </div>
            )
        }
        else if(role === "USER") {
            return (
            <div className="innerForm">
                <div className="form-row">
                    <div className="form-group col">
                        <label htmlFor="txt">Gimimo data <span style={styleFieldRequired}>*</span></label>
                        <input type="date" data-date-format="YYYY-MM-DD" min='1900-01-01' max={currentDate} className="form-control" id="txtBirthdate" name="birthdate" value={this.state.birthdate} onChange={this.handleChange} placeholder="MMMM-MM-DD" required="required"></input>
                        
                    </div>
                    <div className="form-group col">
                        <label htmlFor="txtIdentificationCode">Asmens kodas <span style={styleFieldRequired}>*</span></label>
                        <input type="text" className="form-control" id="txtIdentificationCode" name="identificationCode" value={this.state.identificationCode} onChange={this.handleChange} placeholder="Asmens kodas" required="required" pattern="[0-9]{11}"></input>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col">
                        <label htmlFor="txtName">Vardas <span style={styleFieldRequired}>*</span></label>
                        <input type="text" className="form-control" id="txtName" name="name" value={this.state.name} onChange={this.handleChange} placeholder="Vardas" required="required"></input>
                    </div>
                    <div className="form-group col">
                        <label htmlFor="txtSurname">Pavardė <span style={styleFieldRequired}>*</span></label>
                        <input type="text" className="form-control" id="txtSurname" name="surname" value={this.state.surname} onChange={this.handleChange} placeholder="Pavardė" required="required"></input>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col">
                        <label htmlFor="txtAddress">Adresas <span style={styleFieldRequired}>*</span></label>
                        <input type="text" className="form-control" id="txtAddress" name="address" value={this.state.address} onChange={this.handleChange} placeholder="Adresas" required="required"></input>
                    </div>
                    <div className="form-group col">
                        <label htmlFor="txtTelNo">Telefonas <span style={styleFieldRequired}>*</span></label>
                        <input type="text" className="form-control" id="txtTelNo" name="telno" value={this.state.telno} onChange={this.handleChange} placeholder="+370xxxxxxxx" required="required" pattern="[+,0-9]{12}"></input>
                    </div>
                </div>
            </div>
            )
        }
    }

    resetState = () => {
        this.setState({
            name: "",
            surname: "",
            birthdate: "",
            identificationCode: "",
            address: "",
            telno: "",
            email: ""
        })
    }

    roleDropdownOnChange(event) {
        event.preventDefault()
        this.setState({
            role: event.target.value,
        })
        this.resetState();
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        http.post(`${apiEndpoint}/api/users/admin/createuser`, {
            "address": this.state.address,
            "birthdate": this.state.birthdate,
            "email": this.state.email,
            "name": this.state.name,
            "password": this.state.email,
            "personalCode": this.state.identificationCode,
            "phone": this.state.telno,
            "role": this.state.role,
            "surname": this.state.surname,
            "username": this.state.email
        })
        .then((response) => {
            console.log("Naujas naudotojas sukurtas");
            console.log(this.state);
            alert('Naujas naudotojas sėkmingai sukurtas!');
            this.resetState();
        })
        .catch((error) => {
            console.log(error);
            alert('Įvyko klaida');
        })
    }
    render() {
        return (
            <div className="container">
                <h4><b>Naujo naudotojo sukūrimas</b></h4>
                <div className="row">
                <form className="col-8" onSubmit={this.handleSubmit}>
                    {this.drawSelector()}
                    {this.drawForm(this.state.role)}
                    <h4><b>Naudotojo prisijungimai</b></h4>
                    <div className="col-12">
                         <div className="row">
                            <div className="col-md-3">
                                <p><b>Naudotojo vardas</b></p>
                            </div>
                            <div className="col-md-9">
                                <p>{this.state.email}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-3">
                                <p><b>Slaptažodis</b></p>
                            </div>
                            <div className="col-md-9">
                                <p>{this.state.email}</p>
                            </div>
                        </div>
                    </div>
                    <button className="btn btn-danger float-left" onClick={this.resetState}>Išvalyti</button>
                    <button type="submit" className="btn btn-primary float-right">Sukurti</button>
                </form>
                </div>
            </div>
        )
    }
}
