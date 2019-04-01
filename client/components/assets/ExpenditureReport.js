import { Dropdown } from 'primereact/dropdown'
import React, {Component} from 'react';
import Helmet from 'react-helmet';
import { JsonToTable } from 'react-json-to-table'
import { httpGET } from '../../utils/httpUtils'

export default class ExpenditureReport extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      ownDonationDrives: [
        {label: 'Empower Youths', value: 'Empower Youths'},
        {label: 'Green Initiative Drive', value: 'Green Initiative Drive'},
        {label: 'Rise Singapore', value: 'Rise Singapore'},
      ],
      receipts: [
        {label: 'GID430201A', value: 'GID430201A'},
        {label: 'GID430202B', value: 'GID430202B'},
        {label: 'GID430203C', value: 'GID430203C'},
      ],
      selectedDonationDrive: '',
      selectedReceipt: ''
    }
  }

  componentWillMount () {
    let url = 'http://localhost:3000/api/private/ExpenditureReport';
    httpGET(url)
    .then(response => {
      this.setState({data: response.data});
    })
    .then(()=>{

    })
  }

  render() {
    return (
      <div className="p-grid p-fluid p-justify-center">
        <Helmet>
          <title>Expenditure Reports</title>
          <meta name="description" content="Expenditure Reports" />
        </Helmet>
        <div className="p-col-12">
          <div className="card card-w-title">
            <h1>View Expenditure Reports</h1>
            <p>Select the donation drive you want to view the expenditure report for: </p>
            <Dropdown value={this.state.selectedDonationDrive} options={this.state.ownDonationDrives} onChange={(e) => this.setState({ selectedDonationDrive: e.value })} placeholder={"Select one..."} />
            <span><strong>           Total spendings to date:</strong> $800.50</span>
            <p>Select a receipt</p>
            <Dropdown value={this.state.selectedReceipt} options={this.state.receipts} onChange={(e) => this.setState({ selectedReceipt: e.value })} placeholder={"Select one..."} />
            <br/>
            <img src={require('../../assets/img/receipt.png')} style={{maxHeight: '300px', resizeMode: 'contain'}}/>
          </div>
        </div>
      </div>
    );
  }
}
