import axios from 'axios'
import React, {Component} from 'react';
import Helmet from 'react-helmet';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.onRegisterSubmit = this.onRegisterSubmit.bind(this);
  }

  onRegisterSubmit() {
    alert('Logging in with the following information' + JSON.stringify(data));
    axios.post('/api/public/login', data)
          .then(response => {
      localStorage.setItem("user", "TestUser");
      window.location.href = '/viewDonors'; // Redirects to main page
    })
          .catch((error) => {

    });
  }
  render() {
    return (
      <div>
        <Helmet>
          <title>Login</title>
          <meta name="description" content="Login" />
        </Helmet>
        <form id="login_form" action="/api/public/login" role="form" method="post">
          <div id="signin">
            <header className="text-center mb-5">
              <h2 className="h4 mb-0">Login to Your Account</h2>
            </header>
            <div className="mb-3">
              <div className=" input-group form">
                <div className="input-group-prepend ">
                  <span className="input-group-text form-icon">
                    <span className="fa fa-user form-icon-inner"></span>
                  </span>
                </div>
                <input className="form-control " name="username" id="username" placeholder="Username" type="text" />
              </div>
            </div>
            <div className=" mb-3">
              <div className=" input-group form">
                <div className="input-group-prepend ">
                  <span className="input-group-text form-icon">
                    <span className="fa fa-lock form-icon-inner"></span>
                  </span>
                </div>
                <input className="form-control " name="password" id="password" placeholder="Password" type="password" />
              </div>
            </div>
            <div className="mb-3">
              <button type="submit" className="btn btn-block btn-primary">Login
                to your account
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}