import React, {Component} from 'react';
import Helmet from 'react-helmet';

export default class TransferFunds extends Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>Transfer Funds</title>
          <meta name="description" content="Transfer Funds" />
        </Helmet>
        <div>
          <h1>Transfer Funds</h1>
        </div>
      </div>
    );
  }
}