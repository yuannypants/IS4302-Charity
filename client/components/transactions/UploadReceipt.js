import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Button } from 'primereact/button';
import {Dropdown} from 'primereact/dropdown';
import { httpPOST, httpGET } from '../../utils/httpUtils'
import {InputTextarea} from 'primereact/inputtextarea';

export default class UploadReceipt extends Component {
  constructor(props) {
    super(props);

    this.state = {
      donationDrive: '',
      ownDonationDrives: '',
      receipt: '',
      error: null
    }

    this.onClickSubmit = this.onClickSubmit.bind(this);
  }

  // componentWillMount() {
  //   let url = 'http://localhost:3000/api/private/DonationDrive'
  //   httpGET(url)
  //   .then(response => {
  //     this.setState({donationDrives: response})
  //   })
  // }

  onClickSubmit() {
    // const selectedFile = document.getElementsByName("receipt")[0].files[0];
    // console.log(selectedFile);
    console.log(this.state.receipt);
    let data = {
      receipt: this.state.receipt,
      donationDrive: "AAA"
    }

    httpPOST('http://localhost:3000/api/private/uploadReceipt', data)
      .then(response => {
        console.log("Uploaded");
      })
      .catch(error => {
        // catch errors
        let errorMsg = "Error uploading receipt!";
        this.setState({ error: errorMsg })
      });
  }

  render() {
    return (
      <div className="p-grid p-fluid p-justify-center">
        <Helmet>
          <title>Upload Receipt</title>
          <meta name="description" content="Upload Receipt" />
        </Helmet>
        <div className="p-col-12">
          <div className="card card-w-title">
            <h1>Upload Receipt</h1>
            <div className="p-indent p-justify-center">
              <p style={{ color: "red", textAlign: "center" }} >{this.state.error}</p>
              <form>
                <table cellPadding="10" width="100%">
                  <tbody>
                    <tr>
                      <td width="25%"><b>Select Donation Drive: </b></td>
                      <td width="75%">
                        <Dropdown value = {this.state.donationDrive} option = {this.state.ownDonationDrives} onChange = {(e) => {this.setState({donationDrive: e.value})}} placeholder = 'Select a Donation Drive...' />
                      </td>
                    </tr>
                    <tr>
                      <td><b>Receipt Data: </b></td>
                      <td>
                        {/* <input type = "file" name = "receipt"/> */}
                        <InputTextarea value = {this.state.receipt} rows = {5} cols = {30} autoResize = {true} onChange = {(e) => this.setState({receipt: e.target.value})} />
                      </td>
                    </tr>
                    <tr>
                      <td colSpan='2'>
                        <Button type="button" label="Upload" className="p-button-raised p-button-raised" onClick={(e) => this.onClickSubmit()} />
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
