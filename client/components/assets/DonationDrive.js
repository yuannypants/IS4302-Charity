import { Card } from 'primereact/card'
import React, {Component} from 'react';
import Helmet from 'react-helmet';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext'
import { JsonToTable } from 'react-json-to-table'
import { httpPOST } from '../../utils/httpUtils'
import {httpGET} from "../../../server/utils/httpUtils";
import {ListBox} from "primereact/listbox";

export default class CreateFundTransferRequest extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
    }
  }

  componentWillMount() {
    let url = 'http://localhost:3000/api/private/DonationDrive';
    httpGET(url)
    .then(response => {
      this.setState({data: response.data});
    })
  }

  render() {
    let donationDriveCards = [];
    let cardFooter = <Button className="p-button-success" label="Donate" onClick={() => window.location = "MakeDonation"}/>;

    this.state.data && this.state.data.data.forEach(donationDrive => {
      donationDriveCards.push(
        <div className="p-col-3">
          <Card title={donationDrive.id} className="ui-card-shadow" footer={cardFooter} >
            <div style={{height: '50px'}}>Creator: {donationDrive.charitableOrganisation}</div>
            <div style={{height: '50px'}}>Description: ENTER DESCRIPTION HERE</div>
          </Card>
        </div>
      )
    })

    return (
      <div className="p-grid p-fluid p-justify-center">
        <Helmet>
          <title>Create New Funds Transfer Request</title>
          <meta name="description" content="Create New Funds Transfer Request" />
        </Helmet>
        <div className="p-col-12">
          <div className="card card-w-title">
            <h1 style={{textAlign: 'center'}}>Available Donation Drives</h1>
            <div className="p-grid p-justify-center">
              { donationDriveCards }
            </div>
            <div className="card card-w-title">
              {
                this.state.data && <JsonToTable json={this.state.data} />
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
