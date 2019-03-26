import React, {Component} from 'react';
import Helmet from 'react-helmet';
import { httpGET } from '../../utils/httpUtils'

export default class CharitableOrganisation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
    }
  }

  componentWillMount () {
    let url = 'http://localhost:3000/api/private/CharitableOrganisation';
    httpGET(url)
    .then(response => {
      this.setState({data: response.data});
    })
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>View Charitable Organisations</title>
          <meta name="description" content="View Charitable Organisations" />
        </Helmet>
        <h1>View Charitable Organisations</h1>
        <p>
          {
            this.state.data && JSON.stringify(this.state.data)
          }
        </p>
      </div>
    );
  }
}
