import React, {Component} from 'react';
import Helmet from 'react-helmet';

export default class ViewBeneficiaries extends Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>View Beneficiaries</title>
          <meta name="description" content="View Beneficiaries" />
        </Helmet>
        <h1>View Beneficiaries</h1>
      </div>
    );
  }
}