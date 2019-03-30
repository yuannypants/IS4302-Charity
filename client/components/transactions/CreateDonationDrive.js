import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext'
import { httpPOST } from '../../utils/httpUtils'
import { ListBox } from 'primereact/listbox';
import { httpGET } from "../../../server/utils/httpUtils";


const localStorage = window.localStorage;

export default class CreateDonationDrive extends Component {
  constructor(props) {
    super(props);

    this.state = {
      donationDriveName: "",
      donationDriveDescription: "",
      selectedBeneficiaries: [],
      selectedSuppliers: [],
      beneficiaries: [],
      suppliers: [],
      data: null,
      error: null
    }

    this.onClickSubmit = this.onClickSubmit.bind(this);
  }

  componentWillMount() {
    httpGET('http://localhost:3000/api/private/CharitableOrganisation/201912345A')
      .then(response => {
        let beneficiaries = [];
        let suppliers = [];
        for(var beneficiary = 0; beneficiary < response.data.data.beneficiaries.length; beneficiary++) {
          beneficiaries.push({beneficiaryId: response.data.data.beneficiaries[beneficiary]});
        }
        console.log(beneficiaries);
        for(var supplier = 0; supplier < response.data.data.suppliers.length; supplier++) {
          suppliers.push({supplierId: response.data.data.suppliers[supplier]});
        }
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
      $class: "com.is4302.charity.CreateDonationDrive",
      id: this.state.donationDriveName,
      beneficiaries: this.state.selectedBeneficiaries,
      suppliers: this.state.selectedSuppliers,
      donationDriveDescription: this.state.donationDriveDescription
    }

    httpPOST('http://localhost:3000/api/private/CreateDonationDrive', data)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        // catch errors
        let errorMsg = error;
        this.setState({ error: errorMsg });
      });
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
              <form>
                <table cellPadding="10" width="100%">
                  <tbody>
                    <tr>
                      <td width="25%">
                        <label htmlFor="donationDriveName">Donation Drive Name:</label>
                      </td>
                      <td width="75%">
                        <InputText id="donationDriveName" value={this.state.donationDriveName} onChange={e => this.setState({ donationDriveName: e.target.value })} />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label htmlFor="donationDriveDescription">Donation Drive Description:</label>
                      </td>
                      <td>
                        <InputText id="donationDriveDescription" value={this.state.donationDriveDescription} onChange={e => this.setState({ donationDriveDescription: e.target.value })} />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label htmlFor="donationDriveBeneficiaries">Donation Drive Beneficiaries:</label>
                      </td>
                      <td>
                        <ListBox id="donationDriveBeneficiaries" optionLabel="beneficiaryId"  value={this.state.selectedBeneficiaries} options={this.state.beneficiaries} onChange={(e) => this.setState({ selectedBeneficiaries: e.value })} multiple={true} />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label htmlFor="donationDriveSuppliers">Donation Drive Suppliers:</label>
                      </td>
                      <td>
                        <ListBox id="donationDriveSuppliers" optionLabel="supplierId" value={this.state.selectedSuppliers} options={this.state.suppliers} onChange={(e) => this.setState({ selectedSuppliers: e.value })} multiple={true} />
                      </td>
                    </tr>
                    <tr>
                      <td colSpan='2'>
                        <Button label="Submit" icon="pi pi-user-plus" onClick={() => this.onClickSubmit()} />
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
