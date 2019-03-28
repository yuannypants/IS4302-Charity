import React, {Component} from 'react';
import Helmet from 'react-helmet';
import { httpGET } from '../../utils/httpUtils'
import {Card} from 'primereact/card';
import {Button} from 'primereact/button';


export default class DonationDrive extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
    }
  }

  componentDidMount() {
    let url = 'http://localhost:3000/api/private/DonationDrive';
    httpGET(url)
      .then(response => {
         console.log(JSON.stringify(response, null, 2));
        let dd = response.data;
        let dataToRender = [];

        for (let donationDrive of dd) {
          let beneficiaryString = "";
          let supplierString = "fddsfd";

          for (let beneficiary of charitable.beneficiaries)
            beneficiaryString += beneficiary.substring(40) + ", ";
          for (let suppliers of charitable.suppliers)
            supplierString += suppliers.substring(40) + ", ";

          dataToRender.push({
            uen: charitable.uen,
            beneficiaries: beneficiaryString,
            suppliers: supplierString,
          })
        }
        this.setState({ data: dataToRender });
        console.log(this.state.data);
      })
  }
  render() {

    const header = (
      <img alt="Card" src='showcase/resources/demo/images/usercard.png'/>
  );
  const footer = (
      <span>
          <Button label="Save" icon="pi pi-check"/>
          <Button label="Cancel" icon="pi pi-times" className="p-button-secondary"/>
      </span>
  );
    return (
      <div>
        <Helmet>
          <title>View Donation Drives</title>
          <meta name="description" content="View Donation Drives" />
        </Helmet>
        <h1>View Donation Drives</h1>
        <br/>

        <Card title={this.state.data && this.state.data.uen} subTitle="Subtitle" style={{width: '360px'}} className="ui-card-shadow" footer={footer} header={header}>
                        <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt
                            quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!</div>
                    </Card>
        <p>
          {
            this.state.data && JSON.stringify(this.state.data)
          }
        </p>
      

      </div>
    );
  }
}
