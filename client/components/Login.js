import axios from 'axios'
import { Card } from 'primereact/card'
import React, {Component} from 'react';
import Helmet from 'react-helmet';
import { InputText } from 'primereact/inputtext';

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
        <Card>
          <h1>Log In</h1>
          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">
              <i className="pi pi-user"> </i>
            </span>
            <InputText placeholder="Username" />
          </div>
          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">
              <i className="pi pi-lock"> </i>
            </span>
            <InputText placeholder="Password" />
          </div>
        </Card>
      </div>
    );
  }
}