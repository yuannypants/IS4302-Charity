import React from 'react';
import { Route, Switch, Router } from 'react-router-dom';

// Import components
import AuthenticatedRoute from './AuthenticatedRoute';
import NotFound from '../components/404';

// Public components
import Login from '../components/Login';
import Register from '../components/Register';
import HomePage from '../components/HomePage';
import Landing from '../components/Landing';

// View Participants
import Donors from '../components/participants/Donor';
import CharitableOrganisations from '../components/participants/CharitableOrganisation';
import Beneficiaries from '../components/participants/Beneficiary';
import Supplier from '../components/participants/Supplier';
import Validators from '../components/participants/Validator';

// View Assets
import Wallets from '../components/assets/Wallet';
import DonationDrives from '../components/assets/DonationDrive';
import FundTransferRequest from '../components/assets/FundTransferRequest';
import ExpenditureReport from '../components/assets/ExpenditureReport';
import Receipt from '../components/assets/Receipt';

// Transactions
import CreateDonationDrive from '../components/transactions/CreateDonationDrive';
import CreateFundTransferRequest from '../components/transactions/CreateFundTransferRequest';
import MakeDonation from '../components/transactions/MakeDonation';
import TransferFund from '../components/transactions/TransferFund';
import UploadReceipt from '../components/transactions/UploadReceipt';
import ValidateFundTransferRequest from '../components/transactions/ValidateFundTransferRequest';
import WalletTransaction from '../components/transactions/WalletTransaction';

const history = require("history").createBrowserHistory();

const RootClientRouter = () => (
  <Router history={history}>
    <Switch>
      <AuthenticatedRoute exact path="/Landing" component={Landing}/>
      // View Participants
      <AuthenticatedRoute exact path="/Donor" component={Donors}/>
      <AuthenticatedRoute path="/Donor/" component={Donors}/>
      <AuthenticatedRoute exact path="/CharitableOrganisation" component={CharitableOrganisations}/>
      <AuthenticatedRoute path="/CharitableOrganisation/" component={CharitableOrganisations}/>
      <AuthenticatedRoute exact path="/Beneficiary" component={Beneficiaries}/>
      <AuthenticatedRoute path="/Beneficiary/" component={Beneficiaries}/>
      <AuthenticatedRoute exact path="/Supplier" component={Supplier}/>
      <AuthenticatedRoute path="/Supplier/" component={Supplier}/>
      <AuthenticatedRoute exact path="/Validator" component={Validators}/>
      <AuthenticatedRoute path="/Validator/" component={Validators}/>

      //  Assets
      <AuthenticatedRoute exact path="/Wallet" component={Wallets}/>
      <AuthenticatedRoute path="/Wallet/" component={Wallets}/>
      <AuthenticatedRoute exact path="/DonationDrive" component={DonationDrives}/>
      <AuthenticatedRoute path="/DonationDrive/" component={DonationDrives}/>
      <AuthenticatedRoute exact path="/FundTransferRequest" component={FundTransferRequest}/>
      <AuthenticatedRoute path="/FundTransferRequest/" component={FundTransferRequest}/>
      <AuthenticatedRoute exact path="/ExpenditureReport" component={ExpenditureReport}/>
      <AuthenticatedRoute path="/ExpenditureReport/" component={ExpenditureReport}/>
      <AuthenticatedRoute exact path="/Receipt" component={Receipt}/>
      <AuthenticatedRoute path="/Receipt/" component={Receipt}/>

      // Transactions
      <AuthenticatedRoute exact path="/CreateDonationDrive" component={CreateDonationDrive}/>
      <AuthenticatedRoute path="/CreateDonationDrive/" component={CreateDonationDrive}/>
      <AuthenticatedRoute exact path="/CreateFundTransferRequest" component={CreateFundTransferRequest}/>
      <AuthenticatedRoute path="/CreateFundTransferRequest/" component={CreateFundTransferRequest}/>
      <AuthenticatedRoute exact path="/MakeDonation" component={MakeDonation}/>
      <AuthenticatedRoute path="/MakeDonation/" component={MakeDonation}/>
      <AuthenticatedRoute exact path="/TransferFund" component={TransferFund}/>
      <AuthenticatedRoute path="/TransferFund/" component={TransferFund}/>
      <AuthenticatedRoute exact path="/UploadReceipt" component={UploadReceipt}/>
      <AuthenticatedRoute path="/UploadReceipt/" component={UploadReceipt}/>
      <AuthenticatedRoute exact path="/ValidateFundTransferRequest" component={ValidateFundTransferRequest}/>
      <AuthenticatedRoute path="/ValidateFundTransferRequest/" component={ValidateFundTransferRequest}/>
      <AuthenticatedRoute exact path="/WalletTransaction" component={WalletTransaction}/>
      <AuthenticatedRoute path="/WalletTransaction/" component={WalletTransaction}/>

      // Public
      <Route exact path="/Login" component={Login}/>
      <Route exact path="/Register" component={Register}/>
      <Route path="" component={HomePage}/>
      <Route component={NotFound}/>
    </Switch>
  </Router>
);

export default RootClientRouter;
