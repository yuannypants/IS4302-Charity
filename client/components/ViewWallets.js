import React, {Component} from 'react';
import Helmet from 'react-helmet';

export default class ViewWallets extends Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>View Wallets</title>
          <meta name="description" content="View Wallets" />
        </Helmet>
        <h1>View Wallets</h1>
      </div>
    );
  }
}