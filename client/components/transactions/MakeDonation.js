import React, {Component} from 'react';
import Helmet from 'react-helmet';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext'
import { httpPOST } from '../../utils/httpUtils'

export default class MakeDonation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      amount: 0,
      donationDriveName: "",
      data: null,
      error: null
    }

    this.onClickSubmit = this.onClickSubmit.bind(this);
  }

  onClickSubmit() {
    let data = {
      $class: "com.is4302.charity.MakeDonation",
      amount: this.state.amount,
      donationDriveName: this.state.donationDriveName
    }

    httpPOST('http://localhost:3000/api/private/MakeDonation', data)
    .then(response => {
      console.log("MakeDonation: " + response);
    })
     .catch(error => {
      // catch errors
      let errorMsg = error;
      console.log("MakeDonationError: " + errorMsg);
      this.setState({error: errorMsg});
    });
  }

  render() {
    return (
      <div className="p-grid p-fluid p-justify-center">
        <Helmet>
          <title>Make a Donation</title>
          <meta name="description" content="Make a Donation" />
        </Helmet>
        <div className="p-col-12">
          <div className="card card-w-title">
            <h1>Make a Donation</h1>
            <div className="p-col-4" style={{marginTop:'8px'}}>
              <label htmlFor="amount">Donation Amount: </label>
              <InputText id="amount" value={this.state.amount} onChange={e => this.setState({amount: e.target.value})} />
            </div>
            <div className="p-col-4" style={{marginTop:'8px'}}>
              <label htmlFor="donationDriveName">Donation Drive: </label>
              <InputText id="donationDriveName" value={this.state.donationDriveName} onChange={e => this.setState({donationDriveName: e.target.value})} />
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
