import React, {Component} from 'react';
import Helmet from 'react-helmet';

export default class CharitableOrganisation extends Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>View Charitable Organisations</title>
          <meta name="description" content="View Charitable Organisations" />
        </Helmet>
        <h1>View Charitable Organisations</h1>
      </div>
    );
  }
}