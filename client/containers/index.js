import React, {Component} from 'react';
import Helmet from 'react-helmet'
import {hot} from 'react-hot-loader';

// Import custom components
import RootClientRouter from '../routers';

class RootContainer extends Component {
  render() {
    return (
      <div>
        <Helmet
          titleTemplate="%s - IS4302 Charity"
          defaultTitle="IS4302 Charity"
        >
          <meta name="description" content="IS4302 Charity" />
        </Helmet>
        <RootClientRouter />
      </div>
    );
  }
}

export default hot(module)(RootContainer);