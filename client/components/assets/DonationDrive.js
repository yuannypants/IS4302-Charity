import React, {Component} from 'react';
import Helmet from 'react-helmet';

export default class DonationDrive extends Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>View Donation Drives</title>
          <meta name="description" content="View Donation Drives" />
        </Helmet>
        <h1>View Donation Drives</h1>
      </div>
    );
  }
}