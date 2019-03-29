import React, {Component} from 'react';
import Helmet from 'react-helmet';
import { JsonToTable } from 'react-json-to-table'
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
    let url = 'http://localhost:3000/api/private/Wallet/' + localStorage.getItem("username");
    httpGET(url)
    .then(response => {
      this.setState({data: response.data})
    })
  }

  render() {
    return (
      <div className="p-grid p-fluid p-justify-center">
        <Helmet>
          <title>Wallets</title>
          <meta name="description" content="Wallets" />
        </Helmet>
        <div className="p-col-12">
          <div className="card card-w-title">
            <h1>Wallets</h1>
            {
              this.state.data && <JsonToTable json={this.state.data} />
            }
          </div>
        </div>
      </div>
    );
  }
}
