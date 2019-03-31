import React, {Component} from 'react';
import Helmet from 'react-helmet';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext'
import { httpPOST } from '../../utils/httpUtils'
import {httpGET} from "../../../server/utils/httpUtils";
import {ListBox} from "primereact/listbox";

export default class CreateFundTransferRequest extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fundRequestName: '',
      fundReuqestPurpose: '',
      fundRequestAmount: 0,
      donationDriveName: '',
      beneficiaries: [],
      suppliers:[],
      donationDrives: [],
      selectedDrive: null,
      error: null
    }

    this.onClickSubmit = this.onClickSubmit.bind(this);
  }

  componentWillMount() {
    httpGET('http://localhost:3000/api/private/DonationDrive/'+localStorage.getItem("username")) //by right should be charitableorg username
        .then(response => {
          let donationDrives = [];
          for(var drive =0 ; drive< response.data.data.length;drive++)
          {
            if("resource:com.is4302.charity.CharitableOrganisation#" + localStorage.getItem("username") === response.data.data[drive].charitableOrganisation) //check if donation drive got the username of the charitable org
            {
              donationDrives.push({benesId : response.data.data[drive].id});
            }
          }

          this.setState({donationDrives:donationDrives }); //set state
        })
        .catch(error => {
          // catch errors
          console.log(error)
          let errorMsg = "";
          this.setState({error: errorMsg})
        });
    httpGET('http://localhost:3000/api/private/CharitableOrganisation/'+localStorage.getItem("username")) //retrieve based on charitable login
        .then(response => {


          let beneficiaries = response.data.data.beneficiaries;
          let suppliers = response.data.data.suppliers;

          this.setState({beneficiaries: beneficiaries, suppliers: suppliers });
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
      this.setState({error: errorMsg})
    });
  }

  render() {
    return (
      <div className="p-grid p-fluid p-justify-center">
        <Helmet>
          <title>Create New Funds Transfer Request</title>
          <meta name="description" content="Create New Funds Transfer Request" />
        </Helmet>
        <div className="p-col-12">
          <div className="card card-w-title">
            <h1>Create New Funds Transfer Request</h1>
            <div className="p-col-4" style={{marginTop:'8px'}}>
              <label htmlFor="fundRequestName">Fund Request Name</label>
              <InputText id="fundRequestName" value={this.state.fundRequestName} onChange={e => this.setState({fundRequestName: e.target.value})} />
            </div>
            <div className="p-col-4" style={{marginTop:'8px'}}>
              <label htmlFor="fundRequestPurpose">Fund Request Purpose</label>
              <InputText id="fundRequestPurpose" value={this.state.fundRequestPurpose} onChange={e => this.setState({fundRequestPurpose: e.target.value})} />
            </div>
            <div className="p-col-4" style={{marginTop:'8px'}}>
              <label htmlFor="fundRequestAmount">Fund Request Amount</label>
              <InputText id="fundRequestAmount" value={this.state.fundRequestAmount} onChange={e => this.setState({fundRequestAmount: e.target.value})} />
            </div>
            <div className="content-section implementation">
              <label>Request from Donation Drive :</label>
              {/*TODO: find donation drives and change all beneficiaries in this div*/}
              <ListBox value={this.state.donationDrives} options={this.state.donationDrives} onChange={(e) => this.setState({selectedDrive: e.value})} optionLabel="DonationDriveId"/>
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
            <div className="p-col-1">
              <Button label="Submit" icon="pi pi-user-plus" onClick={this.onClickSubmit}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
