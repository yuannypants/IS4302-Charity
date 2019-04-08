import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { removeIdentifier } from '../../utils/bcUtils'
import { httpGET, httpPOST } from '../../utils/httpUtils';
import { ListBox } from 'primereact/listbox';


const localStorage = window.localStorage;

export default class CreateDonationDrive extends Component {
  constructor(props) {
    super(props);

    this.state = {
      donationDriveName: "",
      donationDrivePurpose: "",

      donationDriveBeneficiaries: [],
      selectedBeneficiaries: [],

      donationDriveSuppliers: [],
      selectedSuppliers: [],

      error: null
    }

    this.onClickSubmit = this.onClickSubmit.bind(this);
  }

  componentWillMount() {
    let username = localStorage.getItem("username");
    let participant = localStorage.getItem("participant");
    if (participant === "CharitableOrganisation") {
      httpGET('http://localhost:3000/api/private/CharitableOrganisation/' + username)
      .then(response => {
        let beneficiaries = [];
        let suppliers = [];

        let charitableOrganisation = response.data.data;
        console.log(charitableOrganisation);

        if (charitableOrganisation.beneficiaries !== undefined)
          for (let beneficiary of charitableOrganisation.beneficiaries)
            beneficiaries.push({ label: removeIdentifier(beneficiary), value: removeIdentifier(beneficiary), key: removeIdentifier(beneficiary) });
        if (charitableOrganisation.suppliers !== undefined)
          for (let supplier of charitableOrganisation.suppliers)
            suppliers.push({ label: removeIdentifier(supplier), value: removeIdentifier(supplier), key: removeIdentifier(supplier) });

        this.setState({ donationDriveBeneficiaries: beneficiaries, donationDriveSuppliers: suppliers });
      })
      .catch(error => {
        let errorMsg = "Error retrieving list of beneficiaries and suppliers belonging to your charitable organisation.";
        this.setState({ error: errorMsg })
      });
    }
    // else {
    //   window.location = "Landing"
    // }
  }

  onClickSubmit() {
    if (this.state.donationDriveName === "") {
      this.setState({ error: "Please enter a donation drive name." })
    } else if (this.state.donationDrivePurpose === "") {
      this.setState({ error: "Please enter the purpose of the donation drive." })
    } else if (this.state.selectedBeneficiaries.length === 0 || this.state.selectedSuppliers.length === 0) {
      this.setState({ error: "Please choose at least one beneficiary/supplier." })
    } else {
      let beneficiaries = [];
      let suppliers = [];

      for (let beneficiary of this.state.selectedBeneficiaries)
        beneficiaries.push(beneficiary.value);
      for (let supplier of this.state.selectedSuppliers)
        suppliers.push(supplier.value);

      let data = {
        name: this.state.donationDriveName,
        purpose: this.state.donationDrivePurpose,
        beneficiariesId: beneficiaries,
        suppliersId: suppliers
      }

      if (confirm("Confirm to create a new donation drive?")) {
        httpPOST('http://localhost:3000/api/private/CreateDonationDrive', data)
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
          <title>Create Donation Drive</title>
          <meta name="description" content="Create Donation Drive" />
        </Helmet>
        <div className="p-col-12">
          <div className="card card-w-title">
            <h1>Create Donation Drive</h1>
            <div className="p-indent p-justify-center">
              <p style={{ color: "red", textAlign: "center" }} >{this.state.error}</p>
              <table style={{cellPadding:"10", width:"100%"}}>
                <tbody>
                  <tr>
                    <td style={{width:"25%"}}>
                      <label htmlFor="donationDriveName">Donation Drive Name</label>
                    </td>
                    <td style={{width:"75%"}}>
                      <InputText id="donationDriveName" value={this.state.donationDriveName} onChange={e => this.setState({ donationDriveName: e.target.value })} placeholder="Enter a donation drive name."/>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="donationDrivePurpose">Donation Drive Purpose</label>
                    </td>
                    <td>
                      <InputText id="donationDrivePurpose" value={this.state.donationDrivePurpose} onChange={e => this.setState({ donationDrivePurpose: e.target.value })}  placeholder="Enter a donation drive purpose."/>
                    </td>
                  </tr>
                  {
                    this.state.donationDriveBeneficiaries.length > 0 && (
                      <tr>
                        <td>
                          <label htmlFor="donationDriveBeneficiaries">Donation Drive Beneficiaries</label>
                        </td>
                        <td>
                          <ListBox id="donationDriveBeneficiaries" value={this.state.selectedBeneficiaries} options={this.state.donationDriveBeneficiaries} onChange={(e) => this.setState({ selectedBeneficiaries: e.value })} multiple={true} optionLabel="label"/>
                        </td>
                      </tr>
                    )
                  }
                  {
                    this.state.donationDriveSuppliers.length > 0 && (
                      <tr>
                        <td>
                          <label htmlFor="donationDriveSuppliers">Donation Drive Suppliers</label>
                        </td>
                        <td>
                          <ListBox id="donationDriveSuppliers" value={this.state.selectedSuppliers} options={this.state.donationDriveSuppliers} onChange={(e) => this.setState({ selectedSuppliers: e.value })} multiple={true} optionLabel="label"/>
                        </td>
                      </tr>
                    )
                  }
                  <tr>
                    <td colSpan='2'>
                      <Button label="Submit" className="p-button-raised p-button-raised"  onClick={() => this.onClickSubmit()} />
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
