import React, {Component} from 'react';
import Helmet from 'react-helmet';

export default class WalletTransaction extends Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>Wallet Transaction</title>
          <meta name="description" content="Wallet Transaction" />
        </Helmet>
        <h1>Wallet Transaction</h1>
      </div>
    );
  }
}