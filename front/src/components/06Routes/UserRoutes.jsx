import React from "react";
import { Switch, Route } from "react-router-dom";
import CommonErrorHandler from "../00Services/CommonErrorHandler";

import UserNavBar from "../04UserComponents/00NavBar/UserNavBar";
import UserHomeContainer from "../04UserComponents/02ApplicationList/UserHomeContainer";
import AdmissionReviewContainer from "../01CommonComponents/05ApplicationReview/AdmissionReviewContainer";
import CompensationReviewContainer from "../01CommonComponents/05ApplicationReview/CompensationReviewContainer";
import CompensationContractContainer from "../01CommonComponents/05ApplicationReview/CompensationContractContainer";
import KindergartenStatContainer from "../01CommonComponents/04KindergartenStatistics/KindergartenStatContainer";
import CreateApplicationFormContainer from "../04UserComponents/01ApplicationForms/CreateApplicationFormContainer";
import UpdateProfileFormContainer from "../01CommonComponents/03UpdateProfile/UpdateProfileFormContainer";
import UserDocumentContainer from "../04UserComponents/04Documents/UserDocumentContainer";
import NotFound from "../01CommonComponents/02NotFound/NotFound";

import Testing from "../99DeleteThis/Testing";


export default function UserRoutes() {
  return (
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
              path="/prasymas/priimti/:id"
              component={AdmissionReviewContainer}
            />
            <Route
              path="/prasymas/kompensuoti/:id"
              component={CompensationReviewContainer}
            />
            <Route
              path="/prasymas/kompensuoti_sutartis/:id"
              component={CompensationContractContainer}
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
  )
}