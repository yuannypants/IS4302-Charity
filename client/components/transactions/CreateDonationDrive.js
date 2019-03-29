import React, {Component} from 'react';
import Helmet from 'react-helmet';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext'
import { httpPOST } from '../../utils/httpUtils'
import {ListBox} from 'primereact/listbox';
import {httpGET} from "../../../server/utils/httpUtils";


const localStorage = window.localStorage;

export default class CreateDonationDrive extends Component {
  constructor(props) {
    super(props);

    this.state = {
      donationDriveName: "",
      donationDriveDescription: "",
      selectedBeneficiaries:[],
      selectedSuppliers:[],
      beneficiaries:[],
      suppliers: [],
      data: null,
      error: null
    }

    this.onClickSubmit = this.onClickSubmit.bind(this);
  }

  componentWillMount () {
    httpGET('http://localhost:3000/api/private/CharitableOrganisation/201912345A'/*localStorage.getItem("username")*/)
        .then(response => {
          console.log(response.data.data);

          let beneficiaries = response.data.data.beneficiaries;
          let suppliers = response.data.data.suppliers;

          this.setState({beneficiaries: beneficiaries, suppliers: suppliers});
        })
        .catch(error => {
          // catch errors
          console.log(error)
          let errorMsg = "";
          this.setState({error: errorMsg})
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
      this.setState({error: errorMsg});
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
            <h1>Create New Donation Drive</h1>
            <div className="p-col-4" style={{marginTop:'8px'}}>
              <label htmlFor="donationDriveName">Donation Drive Name</label>
              <InputText id="donationDriveName" value={this.state.donationDriveName} onChange={e => this.setState({donationDriveName: e.target.value})} />
            </div>
            <div className="p-col-4" style={{marginTop:'8px'}}>
              <label htmlFor="donationDriveDescription">Donation Drive Description</label>
              <InputText id="donationDriveDescription" value={this.state.donationDriveDescription} onChange={e => this.setState({donationDriveDescription: e.target.value})} />
            </div>
            <div className="content-section implementation">
            <label>Select Beneficiaries :</label>
              <ListBox value={this.state.beneficiaries} options={this.state.beneficiaries} onChange={(e) => this.setState({selectedBeneficiaries: e.value})} multiple={true} optionLabel="BeneficiaryId"/>
            </div>
            <div className="content-section implementation">
              <label>Select Suppliers:</label>
              <ListBox value={this.state.suppliers} options={this.state.suppliers} onChange={(e) => this.setState({selectedBeneficiaries: e.value})} multiple={true} optionLabel="SupplierId"/>
            </div>
            {
              this.state.error && <div className="p-col-10">
                <small style={{color:'red'}}>{this.state.error}</small>
              </div>
            }
            <br>
            </br>
            <Button label="Submit" icon="pi pi-user-plus" onClick={() => this.onClickSubmit()}/>
          </div>
        </div>
      </div>
    );
  }
}
