import React, {Component} from 'react';
import Helmet from 'react-helmet';

export default class Receipt extends Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>View Receipts</title>
          <meta name="description" content="View Receipts" />
        </Helmet>
        <h1>View Receipts</h1>
      </div>
    );
  }
}