import React, {Component} from 'react';
import Helmet from 'react-helmet';

export default class FundTransferRequest extends Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>Funds Transfer Request</title>
          <meta name="description" content="Funds Transfer Request" />
        </Helmet>
        <div>
          <h1>Funds Transfer Request</h1>
        </div>
      </div>
    );
  }
}