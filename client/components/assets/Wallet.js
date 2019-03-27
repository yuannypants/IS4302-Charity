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
    let url = 'http://localhost:3000/api/private/Wallet/' + localStorage.getItem("username");
    httpGET(url)
    .then(response => {
      this.setState({data: response.data})
    })
  }

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
          this.state.data && JSON.stringify(this.state.data)
        }
        </p>
      </div>
    );
  }
}
