import { Checkbox } from 'primereact/checkbox'
import { InputText } from 'primereact/inputtext'
import React, {Component} from 'react';
import Helmet from 'react-helmet';

export default class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Home</title>
          <meta name="description" content="Home - IS4302 Charity" />
        </Helmet>
        <h1>Home</h1>

      </div>
    );
  }
}