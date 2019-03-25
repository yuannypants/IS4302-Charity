import React, {Component} from 'react';
import Helmet from 'react-helmet';

export default class CreateDonationDrive extends Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>Create Donation Drive</title>
          <meta name="description" content="Create Donation Drive" />
        </Helmet>
        <h1>Create Donation Drive</h1>
      </div>
    );
  }
}