import { Card } from 'primereact/card'
import React, {Component} from 'react';
import Helmet from 'react-helmet';
import { Button } from 'primereact/button'
import 'primeicons/primeicons.css';

export default class Landing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      participant: null
    }
  }

  componentWillMount () {
    let participant = localStorage.getItem("participant");
    if (participant === null)
      window.location = "Login";
    else
      this.setState({participant: participant})
  }

  render() {
    let background = require('../assets/img/background.jpg');
    let card1ImageSrc = require('../assets/img/card1.png');

    let card1Image = <img alt="Donate" src={card1ImageSrc} style={{resizeMode: 'contain'}}/>;
    let card2Image = <img alt="Donation Drives" src={card1ImageSrc} style={{resizeMode: 'contain'}}/>;
    let card3Image = <img alt="Top Up" src={card1ImageSrc} style={{resizeMode: 'contain'}}/>;

    let donorLinks =
      <div className="p-grid p-justify-center">
        <div className="p-col-3">
          <Card
            title="Donate"
            className="ui-card-shadow"
            header={card1Image}
            footer={<Button className="p-button-success" label="Donate now!" icon="pi pi-check" onClick={() => window.location = "CreateDonationDrive"}/>}
          >
            <div style={{height: '50px'}}>Donate to a donation drive of your choice.</div>
          </Card>
        </div>
        <div className="p-col-3">
          <Card
            title="Donation Drives"
            className="ui-card-shadow"
            header={card2Image}
            footer={<Button label="View Donation Drives" onClick={() => window.location = "DonationDrive"}/>}
          >
            <div style={{height: '50px'}}>View currently ongoing donation drives</div>
          </Card>
        </div>
        <div className="p-col-3">
          <Card
            title="Top Up"
            className="ui-card-shadow"
            header={card3Image}
            footer={<Button label="Top Up" onClick={() => window.location = "WalletTransaction"}/>}
          >
            <div style={{height: '50px'}}>Add funds to your wallet</div>
          </Card>
        </div>
      </div>;

    let charitableOrganisationLinks =
      <div className="p-grid p-justify-center">
        <div className="p-col-3">
          <Card
            title="Donate"
            className="ui-card-shadow"
            header={card1Image}
            footer={<Button className="p-button-success" label="Donate now!" icon="pi pi-check" onClick={() => window.location = "CreateDonationDrive"}/>}
          >
            <div style={{height: '50px'}}>Donate to a donation drive of your choice.</div>
          </Card>
        </div>
        <div className="p-col-3">
          <Card
            title="Donation Drives"
            className="ui-card-shadow"
            header={card2Image}
            footer={<Button label="View Donation Drives" onClick={() => window.location = "DonationDrive"}/>}
          >
            <div style={{height: '50px'}}>View currently ongoing donation drives</div>
          </Card>
        </div>
        <div className="p-col-3">
          <Card
            title="Top Up"
            className="ui-card-shadow"
            header={card3Image}
            footer={<Button label="Top Up" onClick={() => window.location = "WalletTransaction"}/>}
          >
            <div style={{height: '50px'}}>Add funds to your wallet</div>
          </Card>
        </div>
      </div>;
    let beneficiaryLinks =
      <div className="p-grid p-justify-center">
        <div className="p-col-3">
          <Card
            title="Donation Drives"
            className="ui-card-shadow"
            header={card1Image}
            footer={<Button label="View Donation Drives" onClick={() => window.location = "DonationDrive"}/>}
          >
            <div style={{height: '50px'}}>View the current status of donation drives you are benefiting from.</div>
          </Card>
        </div>
        <div className="p-col-3">
          <Card
            title="Withdraw Funds"
            className="ui-card-shadow"
            header={card2Image}
            footer={<Button label="Withdraw" onClick={() => window.location = "WalletTransaction"}/>}
          >
            <div style={{height: '50px'}}>Withdraw funds from your wallet.</div>
          </Card>
        </div>
      </div>;
    let supplierLinks = beneficiaryLinks;
    let validatorLinks =
      <div className="p-grid p-justify-center">
        <div className="p-col-6">
          <Card
            title="Validate Transfers"
            className="ui-card-shadow"
            header={card3Image}
            footer={<Button label="Start Validating" onClick={() => window.location = "ValidateFundTransferRequest"}/>}
          >
            <div style={{height: '50px'}}>Validate outstanding fund transfer requests</div>
          </Card>
        </div>
      </div>;

    return (
      <div className="p-grid p-fluid">
        <Helmet>
          <title>Home</title>
          <meta name="description" content="Home - IS4302 Charity" />
        </Helmet>
        <img src={background} style={{height: '100%', width: '100%', resizeMode: 'cover', opacity: '0.5', left: 0, top: 0, position: 'absolute', zIndex: -1}} />
        <div className="p-col-12">
          <div className="card card-w-title">
            <h1 style={{textAlign: 'center'}}>Welcome, { localStorage.getItem("nickname") }!</h1>
            <h2 style={{textAlign: 'center', marginBottom:'20px'}}>What would you like to do today?</h2>
            <div className="p-grid p-justify-center">
              {
                this.state.participant === "Donor" ? donorLinks :
                this.state.participant === "CharitableOrganisation" ? charitableOrganisationLinks :
                this.state.participant === "Beneficiary" ? beneficiaryLinks :
                this.state.participant === "Supplier" ? supplierLinks :
                this.state.participant === "Validator" ? validatorLinks : null
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
