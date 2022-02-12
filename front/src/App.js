import React, { useEffect, useReducer } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import "./index.css";
import "./App.css";
import Spinner from "./components/05ReusableComponents/Spinner";
import swal from "sweetalert";

import Login from "./components/01CommonComponents/01Login/LoginContainer";
import NotFound from "./components/01CommonComponents/02NotFound/NotFound";
import Admin from "./components/02AdminComponents/AdminContainer";
import UserListContainer from "./components/02AdminComponents/UserListContainer";
import KindergartenContainer from "./components/03ManagerComponents/01KindergartenList/KindergartenContainer";
import UpdateProfileFormContainer from "./components/01CommonComponents/03UpdateProfile/UpdateProfileFormContainer";
import CreateApplicationFormContainer from "./components/04UserComponents/01ApplicationForms/CreateApplicationFormContainer";

import AdminNavBar from "./components/02AdminComponents/AdminNavBar";
import UserNavBar from "./components/04UserComponents/UserNavBar";
import ManagerNavBar from "./components/03ManagerComponents/ManagerNavBar";

import AuthContext from "./components/00Services/AuthContext";
import http from "./components/00Services/httpService";
import CommonErrorHandler from "./components/00Services/CommonErrorHandler";
import apiEndpoint from "./components/00Services/endpoint";
import UserHomeContainer from "./components/04UserComponents/02ApplicationList/UserHomeContainer";
import KindergartenStatContainer from "./components/01CommonComponents/04KindergartenStatistics/KindergartenStatContainer";
import QueueContainer from "./components/03ManagerComponents/02AdmissionApplications/QueueContainer";
import UserDocumentContainer from "./components/04UserComponents/04Documents/UserDocumentContainer";
import { ApplicationStatusContainer } from './components/02AdminComponents/ApplicationStatusContainer';
import EventJournalContainer from "./components/02AdminComponents/03EventJournal/EventJournalContainer";

import Testing from "./components/99DeleteThis/Testing";
import ApplicationReviewContainer from "./components/04UserComponents/03ApplicationReview/ApplicationReviewContainer";
import CompensationReviewContainer from "./components/04UserComponents/03ApplicationReview/CompensationReviewContainer";
import CompensationListContainer from "./components/03ManagerComponents/03CompensationApplications/CompensationListContainer";
import ReviewContainer from "./components/03ManagerComponents/03CompensationApplications/ReviewContainer";
import ReviewApplicationContainer from "./components/03ManagerComponents/02AdmissionApplications/ReviewApplicationContainer";

var initState = {
  isAuthenticated: null,
  username: null,
  role: null,
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        username: action.payload.username,
        role: action.payload.role,
        error: null,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        username: null,
        role: null,
        error: null,
      };
    case "ERROR":
      return {
        ...state,
        isAuthenticated: false,
        username: null,
        role: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initState);

  useEffect(() => {

    if (state.isAuthenticated === null) {
      http
        .get(`${apiEndpoint}/api/loggedUserRole`)
        .then((resp) => {
          dispatch({
            type: "LOGIN",
            payload: { role: resp.data },
          });
        })
        .catch((error) => {
          const unexpectedError = error.response &&
            error.response.status >= 400 &&
            error.response.status < 500;

          if (!unexpectedError || (error.response && error.response.status === 404)) {
            swal("Įvyko klaida, puslapis nurodytu adresu nepasiekiamas");
            dispatch({
              type: "ERROR",
            });
          }
          else dispatch({
            type: "ERROR",
            payload: error.response.status,
          });
        });
    }
  }, [state.isAuthenticated]);

  if (state.isAuthenticated) {
    switch (state.role) {
      case "ADMIN":
        return (
          <AuthContext.Provider value={{ state, dispatch }}>
            <CommonErrorHandler>
              <div className="container-fluid px-0">
                <AdminNavBar>
                  <Switch>
                    <Route exact path="/" component={Admin} />
                    <Route exact path="/home" component={Admin} />
                    <Route exact path="/admin" component={Admin} />
                    <Route
                      exact
                      path="/statistika"
                      component={KindergartenStatContainer}
                    />
                    <Route
                      exact
                      path="/prasymai/statusas"
                      component={ApplicationStatusContainer}
                    />
                    <Route
                      exact
                      path="/naudotojai"
                      component={UserListContainer}
                    />
                    <Route
                      exact
                      path="/zurnalas"
                      component={EventJournalContainer}
                    />
                    <Route
                      exact
                      path="/profilis/atnaujinti"
                      component={UpdateProfileFormContainer}
                    />
                    <Route path="*" component={NotFound} />
                  </Switch>
                </AdminNavBar>
              </div>
            </CommonErrorHandler>
          </AuthContext.Provider>
        );
      case "MANAGER":
        return (
          <AuthContext.Provider value={{ state, dispatch }}>
            <CommonErrorHandler>
              <div className="container-fluid px-0">
                <ManagerNavBar>
                  <Switch>
                    <Route exact path="/" component={KindergartenContainer} />
                    <Route
                      exact
                      path="/home"
                      component={KindergartenContainer}
                    />
                    <Route
                      exact
                      path="/statistika"
                      component={KindergartenStatContainer}
                    />
                    <Route
                      exact
                      path="/darzeliai"
                      component={KindergartenContainer}
                    />
                    <Route exact path="/eile" component={QueueContainer} />
                    <Route
                      exact
                      path="/kompensacijos"
                      component={CompensationListContainer}
                    />
                    <Route
                      path="/prasymas/k/:id"
                      component={ReviewContainer}
                    />
                    <Route
                      path="/prasymas/d/:id"
                      component={ReviewApplicationContainer}
                    />
                    <Route
                      exact
                      path="/profilis/atnaujinti"
                      component={UpdateProfileFormContainer}
                    />
                    <Route path="*" component={NotFound} />
                  </Switch>
                </ManagerNavBar>
              </div>
            </CommonErrorHandler>
          </AuthContext.Provider>
        );
      case "USER":
        return (
          <AuthContext.Provider value={{ state, dispatch }}>
            <CommonErrorHandler>
              <div className="container-fluid px-0">
                <UserNavBar>
                  <Switch>
                    {/* Pabaigus aplikaciją ištrinti kelią iki "Testing" */}
                    <Route exact path="/testing" component={Testing} />
                    <Route exact path="/" component={UserHomeContainer} />
                    <Route exact path="/home" component={UserHomeContainer} />
                    <Route
                      exact
                      path="/prasymai"
                      component={UserHomeContainer}
                    />
                    <Route
                      path="/prasymas/d/:id"
                      component={ApplicationReviewContainer}
                    />
                    <Route
                      path="/prasymas/k/:id"
                      component={CompensationReviewContainer}
                    />
                    <Route
                      exact
                      path="/statistika"
                      component={KindergartenStatContainer}
                    />
                    <Route
                      exact
                      path="/prasymai/naujas"
                      component={CreateApplicationFormContainer}
                    />
                    <Route
                      exact
                      path="/profilis/atnaujinti"
                      component={UpdateProfileFormContainer}
                    />
                    <Route
                      exact
                      path="/pazymos"
                      component={UserDocumentContainer}
                    />
                    <Route path="*" component={NotFound} />
                  </Switch>
                </UserNavBar>
              </div>
            </CommonErrorHandler>
          </AuthContext.Provider>
        );
      default:
        return (
          <AuthContext.Provider value={{ state, dispatch }}>
            <div className="container-fluid px-0">
              <NotFound />
            </div>
          </AuthContext.Provider>
        );
    }
  } else if (state.isAuthenticated === false) {
    return (
      <div>
        <AuthContext.Provider value={{ state, dispatch }}>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route path="*">
              <Redirect to="/login" />
            </Route>
          </Switch>
        </AuthContext.Provider>
      </div>
    );
  }
  else return <Spinner />;
}

export default App;
