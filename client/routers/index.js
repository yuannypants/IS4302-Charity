import React from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

// Import components
import AuthenticatedRoute from './AuthenticatedRoute';
import NotFound from '../components/404';

// Public components
import Login from '../components/Login';
import Register from '../components/Register';
import HomePage from '../components/HomePage';

// View Participants
import ViewDonors from '../components/ViewDonors';
import ViewCharitableOrganisations from '../components/ViewCharitableOrganisations';
import ViewBeneficiaries from '../components/ViewBeneficiaries';
import ViewSuppliers from '../components/ViewSuppliers';
import ViewValidators from '../components/ViewValidators';

// View Assets
import ViewWallets from '../components/ViewWallets';
import ViewDonationDrives from '../components/ViewDonationDrives';
import ViewExpenditureRecords from '../components/ViewExpenditureRecords';
import ViewReceipts from '../components/ViewReceipts';

// Transactions
import CreateDonationDrive from '../components/CreateDonationDrive';
import MakeDonation from '../components/MakeDonation';
import TransferFunds from '../components/TransferFunds';

const history = createHistory();
const RootClientRouter = () => (
  <Router history={history}>
    <Switch>
      // View Participants
      <AuthenticatedRoute exact path="/viewDonors" component={ViewDonors}/>
      <AuthenticatedRoute exact path="/viewCharitableOrganisations" component={ViewCharitableOrganisations}/>
      <AuthenticatedRoute exact path="/viewBeneficiaries" component={ViewBeneficiaries}/>
      <AuthenticatedRoute exact path="/viewSuppliers" component={ViewSuppliers}/>
      <AuthenticatedRoute exact path="/viewValidators" component={ViewValidators}/>

      // View Assets
      <AuthenticatedRoute exact path="/viewWallets" component={ViewWallets}/>
      <AuthenticatedRoute exact path="/viewDonationDrives" component={ViewDonationDrives}/>
      <AuthenticatedRoute exact path="/viewExpenditureRecords" component={ViewExpenditureRecords}/>
      <AuthenticatedRoute exact path="/viewReceipts" component={ViewReceipts}/>

      // Transactions
      <AuthenticatedRoute exact path="/createDonationDrive" component={CreateDonationDrive}/>
      <AuthenticatedRoute exact path="/makeDonation" component={MakeDonation}/>
      <AuthenticatedRoute exact path="/transferFunds" component={TransferFunds}/>

      // Public
      <Route exact path="/login" component={Login}/>
      <Route exact path="/register" component={Register}/>
      <Route path="" component={HomePage}/>
      <Route component={NotFound}/>
    </Switch>
  </Router>
);

export default RootClientRouter;