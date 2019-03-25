import React, {Component} from 'react';
import Helmet from 'react-helmet';

export default class MakeDonation extends Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>Make Donation</title>
          <meta name="description" content="Make Donation" />
        </Helmet>
        <h1>Make Donation</h1>
      </div>
    );
  }
}