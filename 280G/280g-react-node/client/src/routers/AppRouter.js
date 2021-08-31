import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import StartProject from '../components/Screens/Home';
import ProjectSummary from '../components/Screens/ProjectSummary/ProjectSummary';
import CompanyInformation from '../components/Screens/CompanyInformation/CompanyInformation';
import ExecutiveSummary from '../components/Screens/ExecutiveSummary';
import Compensation from '../components/Screens/Compensation/Compensation';
import NonEquityPayments from '../components/Screens/NonEquityPayments/NonEquityPayments';
import EquityGrants from '../components/Screens/EquityGrants/EquityGrants';
import EquityGrant from '../components/Screens/EquityGrants/EquityGrant';
import NotFound from '../components/Screens/NotFound';

const AppRouter = () => (
  <Router>
      <Switch>
        <Route exact path="/" component={ StartProject } />        
        <Route exact path="/company/info" component={ CompanyInformation } />
        <Route exact path="/company/:companyId" component={ ProjectSummary } />
        <Route exact path="/company/:companyId/info" component={ CompanyInformation } />
        <Route exact path="/company/:companyId/executive/:executiveId" component={ ExecutiveSummary } />
        <Route exact path="/company/:companyId/executive/:executiveId/compensation" component={ Compensation } />
        <Route exact path="/company/:companyId/executive/:executiveId/non-equity-payments" component={ NonEquityPayments } />
        <Route exact path="/company/:companyId/executive/:executiveId/equity-grants" component={ EquityGrants } />
        <Route exact path="/company/:companyId/executive/:executiveId/equity-grants/:grantId" component={ EquityGrant } />
        <Route component={ NotFound } />
      </Switch>
  </Router>
);

export default AppRouter;