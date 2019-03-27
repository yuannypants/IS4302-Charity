import React, {Component} from 'react';
import Helmet from 'react-helmet';
import { httpGET } from '../../utils/httpUtils'

export default class FundTransferRequest extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
    }
  }

  componentWillMount () {
    let url = 'http://localhost:3000/api/private/FundTransferRequest';
    httpGET(url)
    .then(response => {
      this.setState({data: response.data});
    })
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Funds Transfer Request</title>
          <meta name="description" content="Funds Transfer Request" />
        </Helmet>
        <div>
          <h1>Funds Transfer Request</h1>
          <p>
            {
              this.state.data && JSON.stringify(this.state.data)
            }
          </p>
        </div>
      </div>
    );
  }
}
