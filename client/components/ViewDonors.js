import React, {Component} from 'react';
import Helmet from 'react-helmet';
import { httpGET } from '../utils/httpUtils'

export default class ViewDonors extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
    }
  }

  componentWillMount () {
    let url = 'http://localhost:3000/api/private/Donor';
    httpGET(url)
    .then(response => {
      this.setState({data: response.data});
    })
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>View Donors</title>
          <meta name="description" content="View Donors" />
        </Helmet>
        <h1>View Donors (must be logged in)</h1>
        <p>
        {
          this.state.data && JSON.stringify(this.state.data)
        }
        </p>
      </div>
    );
  }
}