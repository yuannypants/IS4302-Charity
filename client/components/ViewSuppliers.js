import React, {Component} from 'react';
import Helmet from 'react-helmet';

export default class ViewSuppliers extends Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>View Suppliers</title>
          <meta name="description" content="View Suppliers" />
        </Helmet>
        <h1>View Suppliers</h1>
      </div>
    );
  }
}