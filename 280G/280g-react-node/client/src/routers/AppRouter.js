import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import StartProject from '../components/Screens/Home';
import ProjectSummary from '../components/Screens/ProjectSummary/ProjectSummary';
import CompanyInformation from '../components/Screens/CompanyInformation/CompanyInformation';
import ExecutiveSummary from '../components/Screens/ExecutiveSummary';
import Compensation from '../components/Screens/Compensation/Compensation';
import NonEquityPayments from '../components/Screens/NonEquityPayments/NonEquityPayments';
import RestrictedStock from '../components/Screens/RestrictedStock/RestrictedStock';
import RestrictedStockGrant from '../components/Screens/RestrictedStock/RestrictedStockGrant';
import Options from '../components/Screens/Options/Options';
import OptionGrant from '../components/Screens/Options/OptionGrant';
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
        <Route exact path="/company/:companyId/executive/:executiveId/options" component={ Options } />
        <Route exact path="/company/:companyId/executive/:executiveId/options/:optionId" component={ OptionGrant } />
        <Route exact path="/company/:companyId/executive/:executiveId/restricted-stock" component={ RestrictedStock } />
        <Route exact path="/company/:companyId/executive/:executiveId/restricted-stock/:restrictedStockId" component={ RestrictedStockGrant } />
        <Route component={ NotFound } />
      </Switch>
  </Router>
);

export default AppRouter;