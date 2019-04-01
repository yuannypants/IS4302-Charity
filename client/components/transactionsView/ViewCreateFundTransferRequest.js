import React, {Component} from 'react';
import Helmet from 'react-helmet';
import { JsonToTable } from 'react-json-to-table'
import { httpGET } from '../../utils/httpUtils'

export default class ViewCreateFundTransferRequest extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
    }
  }

  componentWillMount () {
    let url = 'http://localhost:3000/api/private/CreateFundTransferRequest';
    httpGET(url)
    .then(response => {
      this.setState({data: response.data.data});
    })
  }

  render() {
    return (
      <div className="p-grid p-fluid p-justify-center">
        <Helmet>
          <title>View Create Fund Transfer Request Transactions</title>
          <meta name="description" content="View Create Fund Transfer Request Transactions" />
        </Helmet>
        <div className="p-col-12">
          <div className="card card-w-title">
            <h1>View Create Fund Transfer Request Transactions</h1>
            {
              this.state.data && <JsonToTable json={this.state.data} />
            }
          </div>
        </div>
      </div>
    );
  }
}
