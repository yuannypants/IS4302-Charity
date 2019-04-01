import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { removeIdentifier } from '../../utils/bcUtils';
import { httpGET, httpPOST } from '../../utils/httpUtils';
import { ListBox } from "primereact/listbox";

export default class CreateFundTransferRequest extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fundRequestName: '',
      fundRequestPurpose: '',
      fundRequestAmount: 0,

      ownDonationDrives: [],
      selectedDonationDrive: null,

      donationDriveBeneficiaries: [],
      selectedBeneficiaries: [],

      donationDriveSuppliers: [],
      selectedSuppliers: [],

      error: null
    }

    this.onClickSubmit = this.onClickSubmit.bind(this);
    this.onClickSelectDonationDrive = this.onClickSelectDonationDrive.bind(this);
  }

  componentWillMount() {
    let username = localStorage.getItem("username");
    let participant = localStorage.getItem("participant");
    if (participant === "CharitableOrganisation") {
      httpGET('http://localhost:3000/api/private/DonationDrive/')
      .then(response => {
        let ownDonationDrives = [];
        let donationDrives = response.data.data;
        for (let drive of donationDrives) {
          if (removeIdentifier(drive.charitableOrganisation) === username) {
            ownDonationDrives.push({ label: drive.id, value: drive.id, key: drive.id, beneficiaries: drive.beneficiaries, suppliers: drive.suppliers});
          }
        }
        this.setState({ ownDonationDrives: ownDonationDrives });//, () => console.log(this.state.ownDonationDrives)); //set state
      })
      .catch(error => {
        let errorMsg = "Error retrieving list of donation drives belonging to your charitable organisation.";
        this.setState({ error: errorMsg })
      });
    } else {
      window.location = "Landing"
    }
  }

  onClickSelectDonationDrive(e) {
    let selectedDonationDrive = e.value, beneficiaries = [], suppliers = [];
    console.log(selectedDonationDrive);

    if (selectedDonationDrive) {
      if (selectedDonationDrive.beneficiaries !== undefined)
        for (let beneficiary of selectedDonationDrive.beneficiaries)
          beneficiaries.push({ label: removeIdentifier(beneficiary), value: removeIdentifier(beneficiary), key: removeIdentifier(beneficiary) });
      if (selectedDonationDrive.suppliers !== undefined)
        for (let supplier of selectedDonationDrive.suppliers)
          suppliers.push({ label: removeIdentifier(supplier), value: removeIdentifier(supplier), key: removeIdentifier(supplier) });
    }
    this.setState({ selectedDonationDrive: selectedDonationDrive, donationDriveBeneficiaries: beneficiaries, donationDriveSuppliers: suppliers });
  }

  onClickSubmit() {
    if (this.state.fundRequestName === "") {
      this.setState({ error: "Please enter a funds transfer request name." })
    } else if (this.state.fundRequestPurpose === "") {
      this.setState({ error: "Please enter a funds transfer request purpose." })
    } else if (parseInt(this.state.fundRequestAmount,10) === 0) {
      this.setState({ error: "Please specify an amount." })
    } else if (this.state.selectedDonationDrive === null) {
      this.setState({ error: "Please select a donation drive." })
    } else {
      let beneficiaries = [];
      let suppliers = [];

      for (let beneficiary of this.state.selectedBeneficiaries)
        beneficiaries.push(beneficiary.value);
      for (let supplier of this.state.selectedSuppliers)
        suppliers.push(supplier.value);

      let data = {
        name: this.state.fundRequestName,
        purpose: this.state.fundRequestPurpose,
        amount: this.state.fundRequestAmount,
        donationDriveId: this.state.selectedDonationDrive.value,
        beneficiariesId: beneficiaries,
        suppliersId: suppliers
      }

      if (confirm("Confirm to submit funds transfer request?")) {
        httpPOST('http://localhost:3000/api/private/CreateFundTransferRequest', data)
        .then(response => {
          this.setState({ error: null })
        })
        .catch(error => {
          this.setState({ error: "An unknown error occurred." })
        });
      }
    }
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
              <table style={{cellPadding:"10", width:"100%"}}>
                <tbody>
                  <tr>
                    <td style={{width:"25%"}}>
                      <label htmlFor="fundRequestName">Funds Transfer Request Name</label>
                    </td>
                    <td style={{width:"75%"}}>
                      <InputText id="fundRequestName" value={this.state.fundRequestName} onChange={e => this.setState({ fundRequestName: e.target.value })} placeholder="Enter a meaningful name for your funds transfer request."/>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="fundRequestPurpose">Funds Transfer Request Purpose</label>
                    </td>
                    <td>
                      <InputText id="fundRequestPurpose" value={this.state.fundRequestPurpose} onChange={e => this.setState({ fundRequestPurpose: e.target.value })} placeholder="Enter a purpose for your funds transfer request." />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="fundRequestAmount">Amount requested</label>
                    </td>
                    <td>
                      <InputText id="fundRequestAmount" keyfilter="pint" value={this.state.fundRequestAmount} onChange={e => this.setState({ fundRequestAmount: e.target.value })} />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="donationDrive">Request from Donation Drive</label>
                    </td>
                    <td>
                      <ListBox value={this.state.selectedDonationDrive} options={this.state.ownDonationDrives} onChange={(e) => this.onClickSelectDonationDrive(e)} optionLabel="label" />
                    </td>
                  </tr>
                  {
                    this.state.selectedDonationDrive && this.state.donationDriveBeneficiaries.length > 0 && (
                      <tr>
                        <td>
                          <label htmlFor="beneficiaries">Select Beneficiaries:</label>
                        </td>
                        <td>
                          <ListBox value={this.state.selectedBeneficiaries} options={this.state.donationDriveBeneficiaries} onChange={(e) => this.setState({ selectedBeneficiaries: e.value })} multiple={true} optionLabel="label" />
                        </td>
                      </tr>
                    )
                  }
                  {
                    this.state.selectedDonationDrive && this.state.donationDriveSuppliers.length > 0 && (
                      <tr>
                        <td>
                          <label htmlFor="suppliers">Select Suppliers:</label>
                        </td>
                        <td>
                          <ListBox value={this.state.selectedSuppliers} options={this.state.donationDriveSuppliers} onChange={(e) => this.setState({ selectedSuppliers: e.value })} multiple={true} optionLabel="label" />
                        </td>
                      </tr>
                    )
                  }
                  <tr>
                    <td colSpan='2'>
                      <Button label="Submit Funds Transfer Request" className="p-button-raised p-button-raised" onClick={this.onClickSubmit} />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div >
          </div>
        </div>
      </div>
    );
  }
}
