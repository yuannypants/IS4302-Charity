import React, {Component} from 'react';
import Helmet from 'react-helmet';

export default class UploadReceipt extends Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>Upload Receipt</title>
          <meta name="description" content="Upload Receipt" />
        </Helmet>
        <div>
          <h1>Upload Receipt</h1>
        </div>
      </div>
    );
  }
}
