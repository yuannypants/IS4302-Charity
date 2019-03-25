import React, {Component} from 'react';
import Helmet from 'react-helmet';

export default class ViewValidators extends Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>View Validators</title>
          <meta name="description" content="View Validators" />
        </Helmet>
        <h1>View Validators</h1>
      </div>
    );
  }
}