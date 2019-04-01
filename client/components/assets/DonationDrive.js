import { Card } from 'primereact/card'
import React, {Component} from 'react';
import Helmet from 'react-helmet';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { JsonToTable } from 'react-json-to-table';
import { removeIdentifier } from '../../utils/bcUtils'
import { httpPOST } from '../../utils/httpUtils';
import {httpGET} from "../../../server/utils/httpUtils";
import {ListBox} from "primereact/listbox";

export default class DonationDrive extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      participant: localStorage.getItem("participant")
    }
  }

  componentWillMount() {
    let url = 'http://localhost:3000/api/private/DonationDrive';
    if (this.state.participant === "CharitableOrganisation")
      url += '?filter=%7B%22where%22%3A%7B%22charitableOrganisation%22%3A%22resource%3Acom.is4302.charity.CharitableOrganisation%23' + localStorage.getItem("username") + '%22%7D%7D';
    else if (this.state.participant === "Beneficiary")
      url += '?filter=%7B%22where%22%3A%7B%22charitableOrganisation%22%3A%22resource%3Acom.is4302.charity.CharitableOrganisation%23' + localStorage.getItem("username") + '%22%7D%7D';
    else if (this.state.participant === "Supplier")
      url += '?filter=%7B%22where%22%3A%7B%22charitableOrganisation%22%3A%22resource%3Acom.is4302.charity.CharitableOrganisation%23' + localStorage.getItem("username") + '%22%7D%7D';
    httpGET(url)
    .then(response => {
      this.setState({data: response.data});
    })
  }

  render() {
    let donationDriveCards = [];
    let cardFooter = <Button className="p-button-success" label="Donate" onClick={() => window.location = "MakeDonation"}/>;
    let cardBg = require('../../assets/img/card1.png');

    this.state.data && this.state.data.data.forEach(donationDrive => {
      donationDriveCards.push(
        <div className="p-col-3" key={donationDrive.id}>
          {
            this.state.participant === "Donor" ? (
              <Card className="ui-card-shadow" header={<img src={cardBg} />} footer={cardFooter} >
                <h3>{donationDrive.id}</h3>
                <p><strong>Creator</strong></p>
                <p>{removeIdentifier(donationDrive.charitableOrganisation)}</p>
                <p><strong>Description</strong></p>
                <p>This is a sample donation drive.</p>
              </Card>
            ) : (
              <Card className="ui-card-shadow" header={<img src={cardBg} />}>
                <h3>{donationDrive.id}</h3>
                <p><strong>Creator</strong></p>
                <p>{removeIdentifier(donationDrive.charitableOrganisation)}</p>
                <p><strong>Description</strong></p>
                <p>This is a sample donation drive.</p>
              </Card>
            )
          }
        </div>
      )
    })

    return (
      <div className="p-grid p-fluid p-justify-center">
        <Helmet>
          <title>Donation Drive</title>
          <meta name="description" content="Donation Drive" />
        </Helmet>
        <div className="p-col-12">
          <div className="card card-w-title">
            <h1 style={{textAlign: 'center'}}>Available Donation Drives</h1>
            <div className="p-grid p-justify-center">
              { donationDriveCards }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
