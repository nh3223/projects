import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import StartProject from '../components/Screens/Home';
import ProjectSummary from '../components/Screens/ProjectSummary/ProjectSummary';
import CompanyInformation from '../components/Screens/CompanyInformation/CompanyInformation';
import ExecutiveSummary from '../components/Screens/ExecutiveSummary';
import Compensation from '../components/Screens/Compensation/Compensation';
import NonEquityPayments from '../components/Screens/NonEquityPayment';
import EquityPayments from '../components/Screens/EquityPayments';
import RestrictedStock from '../components/Screens/RestrictedStock';
import Options from '../components/Screens/Options';
import NotFound from '../components/Screens/NotFound';

const AppRouter = () => (
  <Router>
      <Switch>
        <Route exact path="/" component={ StartProject } />
        <Route exact path="/company/:company_id" component={ ProjectSummary } />
        <Route exact path="/company/:company_id/info" component={ CompanyInformation } />
        <Route exact path="/executive/:executive_id" component={ ExecutiveSummary } />
        <Route exact path="/executive/:executive_id/compensation" component={ Compensation } />
        <Route exact path="/executive/:executive_id/non-equity-payments" component={ NonEquityPayments } />
        <Route exact path="/executive/:executive_id/equity-payments" component={ EquityPayments } />
        <Route exact path="/restricted-stock/:grant_id" component={ RestrictedStock } />
        <Route exact path="/options/:grant_id" component={ Options } />
        <Route component={ NotFound } />
      </Switch>
  </Router>
);

export default AppRouter;