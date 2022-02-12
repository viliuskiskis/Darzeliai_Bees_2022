import React from "react";
import { Switch, Route } from "react-router-dom";
import CommonErrorHandler from "../00Services/CommonErrorHandler";

import ManagerNavBar from "../03ManagerComponents/00NavBar/ManagerNavBar";
import KindergartenContainer from "../03ManagerComponents/01KindergartenList/KindergartenContainer";
import KindergartenStatContainer from "../01CommonComponents/04KindergartenStatistics/KindergartenStatContainer";
import QueueContainer from "../03ManagerComponents/02AdmissionApplications/QueueContainer";
import CompensationListContainer from "../03ManagerComponents/03CompensationApplications/CompensationListContainer";
import ReviewContainer from "../03ManagerComponents/03CompensationApplications/ReviewContainer";
import ManagerAdmissionReviewContainer from "../03ManagerComponents/02AdmissionApplications/ManagerAdmissionReviewContainer";
import UpdateProfileFormContainer from "../01CommonComponents/03UpdateProfile/UpdateProfileFormContainer";
import NotFound from "../01CommonComponents/02NotFound/NotFound";

export default function ManagerRoutes() {
  return (
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
              component={ManagerAdmissionReviewContainer}
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
  )
}