import React, {Component} from 'react';
import Helmet from 'react-helmet';
import { httpGET } from '../../utils/httpUtils'

export default class DonationDrive extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
    }
  }

  componentWillMount () {
    let url = 'http://localhost:3000/api/private/DonationDrive';
    httpGET(url)
    .then(response => {
      this.setState({data: response.data});
    })
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>View Donation Drives</title>
          <meta name="description" content="View Donation Drives" />
        </Helmet>
        <h1>View Donation Drives</h1>
        <p>
          {
            this.state.data && JSON.stringify(this.state.data)
          }
        </p>
      </div>
    );
  }
}
