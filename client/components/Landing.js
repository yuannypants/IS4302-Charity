import { Card } from 'primereact/card'
import React, {Component} from 'react';
import Helmet from 'react-helmet';
import { Button } from 'primereact/button'
import 'primeicons/primeicons.css';

export default class Landing extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  componentWillMount () {

  }

  render() {
    let background = require('../assets/img/background.jpg');
    let card1ImageSrc = require('../assets/img/card1.png');

    let card1Image = <img alt="Donate" src={card1ImageSrc} style={{resizeMode: 'contain'}}/>;
    let card1Footer = <Button className="p-button-success" label="Donate now!" icon="pi pi-check" onClick={() => window.location = "CreateDonationDrive"}/>;
    let card2Image = <img alt="Donation Drives" src={card1ImageSrc} style={{resizeMode: 'contain'}}/>;
    let card2Footer = <Button label="View Donation Drives" onClick={() => window.location = "DonationDrive"}/>;
    let card3Image = <img alt="Top Up" src={card1ImageSrc} style={{resizeMode: 'contain'}}/>;
    let card3Footer = <Button label="Top Up" onClick={() => window.location = "Wallet"}/>;

    return (
      <div className="p-grid p-fluid">
        <Helmet>
          <title>Home</title>
          <meta name="description" content="Home - IS4302 Charity" />
        </Helmet>
        <img src={background} style={{height: '100%', width: '100%', resizeMode: 'cover', opacity: '0.5', left: 0, top: 0, position: 'absolute', zIndex: -1}} />
        <div className="p-col-12">
          <div className="card card-w-title">
            <h1 style={{textAlign: 'center'}}>Welcome, { localStorage.getItem("nickname") }</h1>
            <h2 style={{textAlign: 'center', marginBottom:'20px'}}>What would you like to do today?</h2>
            <div className="p-grid p-justify-center">
              <div className="p-col-3">
                <Card title="Donate" className="ui-card-shadow" header={card1Image} footer={card1Footer} >
                  <div style={{height: '50px'}}>Donate to a donation drive of your choice.</div>
                </Card>
              </div>
              <div className="p-col-3">
                <Card title="Donation Drives" className="ui-card-shadow" header={card2Image} footer={card2Footer} >
                  <div style={{height: '50px'}}>View currently ongoing donation drives</div>
                </Card>
              </div>
              <div className="p-col-3">
                <Card title="Top Up" className="ui-card-shadow" header={card3Image} footer={card3Footer} >
                  <div style={{height: '50px'}}>Add funds to your wallet</div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
