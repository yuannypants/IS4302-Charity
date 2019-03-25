import React, {Component} from 'react';
import Helmet from 'react-helmet';
import { httpPOST } from '../utils/httpUtils';

const localStorage = window.localStorage;

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.onRegisterSubmit = this.onRegisterSubmit.bind(this);
  }

  onRegisterSubmit(event) {
    let data = {
      nric: event.target.nric.value,
      firstName: event.target.firstName.value,
      lastName: event.target.lastName.value,
      password: event.target.password.value
    }
    event.preventDefault();
    httpPOST('http://localhost:3000/api/public/register', data)
    .then(response => {
      window.location.href = '/login'; // Redirects to main page
    })
    .catch(error => {

    });
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Register</title>
          <meta name="description" content="Register" />
        </Helmet>
        <div>
          <form id="register_form" onSubmit={event => this.onRegisterSubmit(event)} method="post">
            <div id="signin">
              <header className="text-center mb-5">
                <h2 className="h4 mb-0">Register as a New User</h2>
              </header>
              <div className="mb-3">
                <div className=" input-group form">
                  <div className="input-group-prepend ">
                  <span className="input-group-text form-icon">
                     <span className="fa fa-user form-icon-inner"></span>
                  </span>
                  </div>
                  <input className="form-control " name="nric" id="nric" placeholder="NRIC" type="text" />
                </div>
              </div>
              <div className="mb-3">
                <div className=" input-group form">
                  <div className="input-group-prepend ">
                  <span className="input-group-text form-icon">
                     <span className="fa fa-user form-icon-inner"></span>
                  </span>
                  </div>
                  <input className="form-control " name="firstName" id="firstName" placeholder="First Name" type="text" />
                </div>
              </div>
              <div className="mb-3">
                <div className=" input-group form">
                  <div className="input-group-prepend ">
                  <span className="input-group-text form-icon">
                     <span className="fa fa-user form-icon-inner"></span>
                  </span>
                  </div>
                  <input className="form-control " name="lastName" id="lastName" placeholder="Last Name" type="text" />
                </div>
              </div>
              <div className="mb-3">
                <div className=" input-group form">
                  <div className="input-group-prepend ">
                  <span className="input-group-text form-icon">
                     <span className="fa fa-lock form-icon-inner"></span>
                  </span>
                  </div>
                  <input className="form-control " name="password" id="password" placeholder="Password" type="password" />
                </div>
              </div>
              <br/>
                <button type="submit" className="btn btn-block btn-primary">Register</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}