import React, { Component } from 'react';
import classNames from 'classnames';
import { httpGET } from '../../utils/httpUtils'

const localStorage = window.localStorage;

export class InlineProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      walletBalance: 100
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick(event) {
    this.setState({expanded: !this.state.expanded});
    event.preventDefault();
  }

  viewDonor() {
    window.location.href = '/Donor'
  }

  componentWillMount() {
    let url = 'http://localhost:3000/api/private/Wallet?id=' + localStorage.username;
    httpGET(url)
    .then(response => {
      this.setState({walletBalance: response.data.data[0].balance});
    })
  }

  render() {
    let profileImg = require("../../assets/img/profile.png")
    let nickname = localStorage.getItem("nickname") || 'Unknown User';
    let participant = localStorage.getItem("participant") || 'Unknown Participant Type';

    return  (
      <div className="profile">
        <div>
          <img src={profileImg} alt="" />
        </div>
        <button className="p-link profile-link" onClick = { this.viewDonor }>
          <span className="username">{nickname} ({participant})</span>
          
          {/*<i className="pi pi-fw pi-cog"/>*/}
        </button><br/>
        <span className="balance"  >Balance: ${this.state.walletBalance}</span>
        {/*<ul className={classNames({'profile-expanded': this.state.expanded})}>*/}
          {/*<li><button className="p-link"><i className="pi pi-fw pi-user"/><span>Account</span></button></li>*/}
          {/*<li><button className="p-link"><i className="pi pi-fw pi-inbox"/><span>Notifications</span></button></li>*/}
        {/*</ul>*/}
      </div>
    );
  }
}
