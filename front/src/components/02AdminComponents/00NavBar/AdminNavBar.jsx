import React from 'react';
import { NavLink } from 'react-router-dom';

import logo from '../../../images/logo.png';
import '../../../App.css';

import Logout from '../../05ReusableComponents/Logout';

export default function AdminNavBar(props) {
    return (
        <div className="pb-4" >
            <nav className="navbar navbar-expand-md py-4 navbar-light bg-light">

                <div className="container">

                    <NavLink className="navbar-brand" to={"/home"}>
                        <img className="nav-img" src={logo} alt="logotipas" loading="lazy" />
                    </NavLink>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto ">

                            <li className="nav-item me-2">
                                <NavLink className="nav-link" id="navAdminUserList" to={"/admin"}>Naudotojai</NavLink>
                            </li>

                            <li className="nav-item me-2">
                                <NavLink className="nav-link" id="navAdminApplicationStats" to={"/statistika"}>Prašymų statistika</NavLink>
                            </li>

                            <li className="nav-item me-2">
                                <NavLink className="nav-link" id="navManagerApplicationAdmin" to={"/prasymai/statusas"}>Sąrašo redagavimas</NavLink>
                            </li>

                            <li className="nav-item me-2">
                                <NavLink className="nav-link" id="navAdminEventLog" to={"/zurnalas"}>Įvykių žurnalas</NavLink>
                            </li>

                            <li className="nav-item me-2">
                                <NavLink className="nav-link" id="navAdminMyAccount" to={"/profilis/atnaujinti"}>Mano paskyra</NavLink>
                            </li>

                            <li className="nav-item nav-item me-2">
                                <Logout />
                            </li>

                        </ul>

                    </div>
                </div>
            </nav>
            <div>{props.children}</div>
        </div >

    );

}