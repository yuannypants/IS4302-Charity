import React, {Component} from 'react';
import Helmet from 'react-helmet';
import { httpGET } from '../../utils/httpUtils'

export default class Validator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
    }
  }

  componentWillMount () {
    let url = 'http://localhost:3000/api/private/Validator';
    httpGET(url)
    .then(response => {
      this.setState({data: response.data});
    })
  }
  render() {
    return (
      <div>
        <Helmet>
          <title>View Validators</title>
          <meta name="description" content="View Validators" />
        </Helmet>
        <h1>View Validators</h1>
        <p>
          {
            this.state.data && JSON.stringify(this.state.data)
          }
        </p>
      </div>
    );
  }
}
