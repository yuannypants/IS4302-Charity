import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext'
import { httpPOST } from '../../utils/httpUtils'
import { httpGET } from "../../../server/utils/httpUtils";
import { ListBox } from "primereact/listbox";

export default class CreateFundTransferRequest extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fundRequestName: '',
      fundReuqestPurpose: '',
      fundRequestAmount: 0,
      donationDriveName: '',
      beneficiaries: [],
      suppliers: [],
      donationDrives: [],
      selectedBeneficiaries: [],
      selectedSuppliers: [],
      selectedDrive: null,
      error: null
    }

    this.onClickSubmit = this.onClickSubmit.bind(this);
  }

  componentWillMount() {
    httpGET('http://localhost:3000/api/private/DonationDrive/' + localStorage.getItem("username")) //by right should be charitableorg username
      .then(response => {
        let donationDrives = [];
        for (var drive = 0; drive < response.data.data.length; drive++) {
          if ("resource:com.is4302.charity.CharitableOrganisation#" + localStorage.getItem("username") === response.data.data[drive].charitableOrganisation) //check if donation drive got the username of the charitable org
          {
            donationDrives.push({ benesId: response.data.data[drive].id });
          }
        }

        this.setState({ donationDrives: donationDrives }); //set state
      })
      .catch(error => {
        // catch errors
        console.log(error)
        let errorMsg = "";
        this.setState({ error: errorMsg })
      });
    httpGET('http://localhost:3000/api/private/CharitableOrganisation/' + localStorage.getItem("username")) //retrieve based on charitable login
      .then(response => {


        let beneficiaries = response.data.data.beneficiaries;
        let suppliers = response.data.data.suppliers;

        this.setState({ beneficiaries: beneficiaries, suppliers: suppliers });
      })
      .catch(error => {
        // catch errors
        console.log(error)
        let errorMsg = "";
        this.setState({ error: errorMsg })
      });
  }

  onClickSubmit() {
    let data = {
      $class: "com.is4302.charity.CreateFundTransferRequest",
      fundRequestName: this.state.fundRequestName,
      fundReuqestPurpose: this.state.fundReuqestPurpose,
      fundRequestAmount: this.state.fundRequestAmount,
      donationDriveName: this.state.selectedDrive,
      beneficiaries: this.state.beneficiaries,
      suppliers: this.state.suppliers
    }

    httpPOST('http://localhost:3000/api/private/CreateFundTransferRequest', data)
      .then(response => {
        console.log("CreateFundTransferRequest: " + response);
      })
      .catch(error => {
        // catch errors
        let errorMsg = error;
        this.setState({ error: errorMsg })
      });
  }

  render() {
    return (
      <div className="p-grid p-fluid p-justify-center">
        <Helmet>
          <title>Create Funds Transfer Request</title>
          <meta name="description" content="Create New Funds Transfer Request" />
        </Helmet>
        <div className="p-col-12">
          <div className="card card-w-title">
            <h1>Create Funds Transfer Request</h1>
            <div className="p-indent p-justify-center">
              <p style={{ color: "red", textAlign: "center" }} >{this.state.error}</p>
              <form>
                <table cellPadding="10" width="100%">
                  <tbody>
                    <tr>
                      <td width="25%">
                        <label htmlFor="fundRequestName">Fund Request Name:</label>
                      </td>
                      <td width="75%">
                        <InputText id="fundRequestName" value={this.state.fundRequestName} onChange={e => this.setState({ fundRequestName: e.target.value })} />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label htmlFor="fundRequestPurpose">Fund Request Purpose:</label>
                      </td>
                      <td>
                        <InputText id="fundRequestPurpose" value={this.state.fundRequestPurpose} onChange={e => this.setState({ fundRequestPurpose: e.target.value })} />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label htmlFor="fundRequestAmount">Fund Request Amount:</label>
                      </td>
                      <td>
                        <InputText id="fundRequestAmount" value={this.state.fundRequestAmount} onChange={e => this.setState({ fundRequestAmount: e.target.value })} />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label htmlFor="donationDrive">Request from Donation Drive:</label>
                      </td>
                      <td>
                        <ListBox value={this.state.selectedDrive} options={this.state.donationDrives} onChange={(e) => this.setState({ selectedDrive: e.value })} optionLabel="DonationDriveId" />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label htmlFor="beneficiaries">Select Beneficiaries:</label>
                      </td>
                      <td>
                        <ListBox value={this.state.selectedBeneficiaries} options={this.state.beneficiaries} onChange={(e) => this.setState({ selectedBeneficiaries: e.value })} multiple={true} optionLabel="BeneficiaryId" />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label htmlFor="suppliers">Select Suppliers:</label>
                      </td>
                      <td>
                        <ListBox value={this.state.selectedSuppliers} options={this.state.suppliers} onChange={(e) => this.setState({ selectedBeneficiaries: e.value })} multiple={true} optionLabel="SupplierId" />
                      </td>
                    </tr>
                    <tr>
                      <td colSpan='2'>
                        <Button label="Submit" className="p-button-raised p-button-raised" onClick={this.onClickSubmit} />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </form>
            </div >
          </div>
        </div>
      </div>
    );
  }
}
