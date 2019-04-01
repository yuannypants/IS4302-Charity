import React, {Component} from 'react';
import Helmet from 'react-helmet';
import { JsonToTable } from 'react-json-to-table'
import { httpGET } from '../../utils/httpUtils'

export default class ViewUploadReceipt extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
    }
  }

  componentWillMount () {
    let url = 'http://localhost:3000/api/private/UploadReceipt';
    httpGET(url)
    .then(response => {
      this.setState({data: response.data.data});
    })
  }

  render() {
    return (
      <div className="p-grid p-fluid p-justify-center">
        <Helmet>
          <title>View Upload Receipt Transactions</title>
          <meta name="description" content="View Upload Receipt Transactions" />
        </Helmet>
        <div className="p-col-12">
          <div className="card card-w-title">
            <h1>View Upload Receipt Transactions</h1>
            {
              this.state.data && <JsonToTable json={this.state.data} />
            }
          </div>
        </div>
      </div>
    );
  }
}
