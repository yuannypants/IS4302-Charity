import React, { Component } from 'react';
import { httpGET } from '../../utils/httpUtils';

const localStorage = window.localStorage;

export class InlineProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick(event) {
    this.setState({expanded: !this.state.expanded});
    event.preventDefault();
  }

  componentWillMount() {
    let username = localStorage.getItem("username");
    let participant = localStorage.getItem("participant");
    if (username !== null && (participant === "Donor" || participant === "Beneficiary" || participant === "Supplier")) {
      let url = 'http://localhost:3000/api/private/Wallet/' + username;
      httpGET(url).then(response => {
        this.setState({ walletBalance: response.data.data.balance });
      })
    }
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
        <button className="p-link profile-link" onClick = { () => window.location.href = '/Wallet' }>
          <span className="username">{nickname} ({participant})</span>

          {/*<i className="pi pi-fw pi-cog"/>*/}
        </button><br/>
        { this.state.walletBalance && <span className="balance">Wallet Balance: ${ this.state.walletBalance.toFixed(2)}</span> }
        {/*<ul className={classNames({'profile-expanded': this.state.expanded})}>*/}
          {/*<li><button className="p-link"><i className="pi pi-fw pi-user"/><span>Account</span></button></li>*/}
          {/*<li><button className="p-link"><i className="pi pi-fw pi-inbox"/><span>Notifications</span></button></li>*/}
        {/*</ul>*/}
      </div>
    );
  }
}
