import React, {Component} from 'react';
import Helmet from 'react-helmet';

export default class ExpenditureReport extends Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>View Expenditure Records</title>
          <meta name="description" content="View Expenditure Records" />
        </Helmet>
        <h1>View Expenditure Records</h1>
      </div>
    );
  }
}