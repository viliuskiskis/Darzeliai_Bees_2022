import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../../images/logo.png';
import Logout from '../../05ReusableComponents/Logout';

export default function AdminNavBar(props) {
  return (
    <div className="pb-4" >
      <nav className="navbar navbar-expand-lg py-4 navbar-light bg-light">

        <div className="container">

          <NavLink className="navbar-brand" to={"/home"}>
            <img className="nav-img" src={logo} alt="logotipas" loading="lazy" />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto align-items-center">

              <li className="nav-item me-1">
                <NavLink
                  className="nav-link"
                  id="navAdminUserList"
                  to={"/admin"}
                  data-bs-toggle="collapse"
                  data-bs-target=".navbar-collapse.show"
                >Naudotojai
                </NavLink>
              </li>

              <li className="nav-item me-1">
                <NavLink
                  className="nav-link"
                  id="navAdminApplicationStats"
                  to={"/statistika"}
                  data-bs-toggle="collapse"
                  data-bs-target=".navbar-collapse.show"
                >Prašymų statistika
                </NavLink>
              </li>

              <li className="nav-item me-1">
                <NavLink
                  className="nav-link"
                  id="navAdminEventLog"
                  to={"/zurnalas"}
                  data-bs-toggle="collapse"
                  data-bs-target=".navbar-collapse.show"
                >Įvykių žurnalas</NavLink>
              </li>

              <li className="nav-item me-1">
                <NavLink
                  className="nav-link"
                  id="navAdminMyAccount"
                  to={"/profilis/atnaujinti"}
                  data-bs-toggle="collapse"
                  data-bs-target=".navbar-collapse.show"
                >Mano paskyra</NavLink>
              </li>

              <li className="nav-item nav-item me-1 my-2">
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