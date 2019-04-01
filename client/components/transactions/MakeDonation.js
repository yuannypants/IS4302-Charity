import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { httpGET, httpPOST } from '../../utils/httpUtils';

export default class MakeDonation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      amount: 0,
      ownDonationDrives: [
        {label: 'Empower Youths', value: 'Empower Youths'},
        {label: 'Green Initiative Drive', value: 'Green Initiative Drive'},
        {label: 'Rise Singapore', value: 'Rise Singapore'},
      ],
      selectedDonationDrive: "",
      walletBalance: 0,
      data: null,
      error: null
    }

    this.onClickSubmit = this.onClickSubmit.bind(this);
  }

  componentWillMount() {
    let walletUrl = 'http://localhost:3000/api/private/Wallet/' + localStorage.getItem("username");
    httpGET(walletUrl)
      .then(response => {
        this.setState({
          // walletId: response.data.data.id,
          walletBalance: response.data.data.balance
        });
      })

    // let donationDriveUrl = 'http://localhost:3000/api/private/DonationDrive';
    // httpGET(donationDriveUrl)
    //   .then(response => {
    //     this.setState({
    //       donationDrives: response.data.data
    //     });
    //   })
  }

  onClickSubmit() {
    let errorMsg = '';
    if (this.state.amount == 0) {
      errorMsg = 'Amount cannot be 0!';
    } else if (this.state.amount < 0) {
      errorMsg = 'Amount cannot be below 0!'
    } else if (isNaN(this.state.amount)) {
      errorMsg = 'Invalid amount entered!'
    } else if (this.state.amount > this.state.walletBalance) {
      errorMsg = 'You do not have enough balance to withdraw this amount!';
    } else {
      let data = {
        $class: "com.is4302.charity.MakeDonation",
        amount: this.state.amount,
        donationDriveName: this.state.selectedDonationDrive
      }

      // httpPOST('http://localhost:3000/api/private/MakeDonation', data)
      // .then(response => {
      //   console.log("MakeDonation: " + response);
      // })
      // .catch(error => {
      //   // catch errors
      //   errorMsg = error;
      //   console.log("MakeDonationError: " + errorMsg);
      // });
      if (confirm('Confirm to make a donation of $' + this.state.amount + ' to Green Initiative Drive?')) {
        alert('Thank you for your donation!')
        window.location = "Landing"
      }
    }
    this.setState({ error: errorMsg });

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
            <div className="p-indent p-justify-center">
              <p style={{ color: "red", textAlign: "center" }} >{this.state.error}</p>
              <form>
                <table cellPadding="10" width="100%">
                  <tbody>
                    <tr>
                      <td width="25%">
                        <label htmlFor="currentBalance">Current Balance:</label>
                      </td>
                      <td width="75%">${parseFloat(this.state.walletBalance).toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td>
                        <label htmlFor="transferType">Donation Drive:</label>
                      </td>
                      <td>
                        <Dropdown value={this.state.selectedDonationDrive} options={this.state.ownDonationDrives} onChange={(e) => this.setState({ selectedDonationDrive: e.value })} placeholder={"Select one..."} />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label htmlFor="amount">Amount:</label>
                      </td>
                      <td>
                        <InputText id="amount" value={this.state.amount} onChange={(e) => this.setState({ amount: e.target.value })} />
                      </td>
                    </tr>
                    <tr>
                      <td colSpan='2'>
                        <Button type="button" label="Submit" className="p-button-raised p-button-raised" onClick={this.onClickSubmit} />
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
