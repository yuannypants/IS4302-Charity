import React, {Component} from 'react';
import Helmet from 'react-helmet';
import { httpGET } from '../../utils/httpUtils';


const localStorage = window.localStorage;


export default class Wallet extends Component {

  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      data: null,
    };
  }

  componentWillMount() {
    console.log(localStorage);
    let url = 'http://localhost:3000/api/private/Wallet?id=' + localStorage.username;
    httpGET(url)
    .then(response => {
      this.setState({data: response.data})
    })
  }

  // onClick(event) {

  //   httpGet('http://localhost:3000/api/private/Wallet')
  //   .then(response => {
  //     console.log("HIHIHIHI");
  //     console.log(response);
  //     this.state.data = response;
  //   })
  //   .catch(error => {
  //     let errorMsg = 'An error was encountered. Source: ' + error.response.data.errorSource
  //     this.setState({error: errorMsg})
  //     console.log(JSON.stringify(error.response.data,null,2));
  //   });

  //   this.setState({expanded: !this.state.expanded});
  //   event.preventDefault();
  // }



 

  render() {
    return (
      <div>
        <Helmet>
          <title>View Wallets</title>
          <meta name="description" content="View Wallets" />
        </Helmet>
        <h1>View Wallets</h1>
        <p>
       {
          this.state.data && JSON.stringify(this.state.data.data[0].balance)
        }
        </p>
      </div>
    );
  }
}