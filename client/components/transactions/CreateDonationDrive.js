import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, {Component} from 'react';
import Helmet from 'react-helmet';
import { httpGET } from '../../utils/httpUtils'

export default class CreateDonationDrive extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [
      {"brand": "Volkswagen", "year": 2012, "color": "White", "vin": "dsad231ff"},
      {"brand": "Audi", "year": 2011, "color": "Black", "vin": "gwregre345"},
      {"brand": "Renault", "year": 2005, "color": "Gray", "vin": "h354htr"},
      {"brand": "BMW", "year": 2003, "color": "Blue", "vin": "j6w54qgh"},
      {"brand": "Mercedes", "year": 1995, "color": "White", "vin": "hrtwy34"},
      {"brand": "Volvo", "year": 2005, "color": "Black", "vin": "jejtyj"},
      {"brand": "Honda", "year": 2012, "color": "Yellow", "vin": "g43gr"},
      {"brand": "Jaguar", "year": 2013, "color": "White", "vin": "greg34"},
      {"brand": "Ford", "year": 2000, "color": "Black", "vin": "h54hw5"},
      {"brand": "Fiat", "year": 2013, "color": "Red", "vin": "245t2s"}
    ],
    }
  }

  componentWillMount () {
    let url = 'http://localhost:3000/api/private/CreateDonationDrive/' + localStorage.getItem("username");
    // let url = 'http://localhost:3000/api/private/CreateDonationDrive';
    console.log("URL IS " + url);
    httpGET(url)
    .then(response => {
      console.log(JSON.stringify(response, null, 2));
      // EXAMPLE 1: Combining two different sources of data
      let dd = response.data.donorData;
      let cod = response.data.COData;
      let dataToRender = [];

      if (typeof donor === "object") {
        for (let donor of dd) {
          dataToRender.push({
            id: donor.id,
            wallet: donor.wallet,
            uen: 'None',
            beneficiaries: 'None',
            suppliers: 'None',
          })
        }
      }
      for (let co of cod) {
        let beneficiaryString = "";
        let supplierString = "";

        for (let beneficiary of co.beneficiaries)
          beneficiaryString += beneficiary.substring(40) + ", ";
        for (let suppliers of co.suppliers)
          supplierString += suppliers.substring(40) + ", ";

        dataToRender.push({
          id: "None",
          wallet: "None",
          uen: co.uen,
          beneficiaries: beneficiaryString,
          suppliers: supplierString,
        })
      }
      // console.log(JSON.stringify(dataToRender,null,2));

      // EXAMPLE 2: Joining two different sources of data from blockchain and firebase (must have both firstName and lastname)
      let blockchainDataset = [
        {id: "1", firstName: "Yuanhao"},
        {id: "2", firstName: "Yuanhao2"},
        {id: "3", firstName: "Yuanhao3"},
        {id: "4", firstName: "Yuanhao4"},
      ];
      let firebaseDataset = [
        {id: "2", lastName: "Zhang2"},
        {id: "3", lastName: "Zhang3"},
        {id: "4", lastName: "Zhang4"},
      ];
      let combinedDataset = [];

      for (let blockchainData of blockchainDataset) {
        let tempRecord = firebaseDataset.filter(item => {
          return item.id === blockchainData.id;
        })
        if (tempRecord.length > 0)
          combinedDataset.push({
            id: blockchainData.id,
            firstName: blockchainData.firstName,
            lastName: tempRecord[0].lastName,
          })
      }
      // console.log(JSON.stringify(combinedDataset,null,2));

      this.setState({data: combinedDataset});
    })
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Create Donation Drive</title>
          <meta name="description" content="Create Donation Drive" />
        </Helmet>
        <h1>Donors and Charitable Organisation</h1>
        {/*<DataTable value={this.state.data}>*/}
          {/*<Column field="id" header="Donor ID" />*/}
          {/*<Column field="wallet" header="Donor Wallet ID" />*/}
          {/*<Column field="uen" header="Charitable Organisation UEN" />*/}
          {/*<Column field="beneficiaries" header="Charitable Organisation Beneficiaries" />*/}
          {/*<Column field="suppliers" header="Charitable Organisation Suppliers" />*/}
        {/*</DataTable>*/}

        <DataTable value={this.state.data}>
          <Column field="id" header="ID" />
          <Column field="firstName" header="First Name" />
          <Column field="lastName" header="Last Name" />
        </DataTable>
        {/*<p>*/}
          {/*{*/}
            {/*this.state.data && JSON.stringify(this.state.data,null,2)*/}
          {/*}*/}
        {/*</p>*/}
      </div>
    );
  }
}
