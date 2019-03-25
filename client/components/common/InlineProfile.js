import React, { Component } from 'react';
import classNames from 'classnames';

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

  render() {
    let profileImg = require("../../assets/images/profile.png")
    return  (
      <div className="profile">
        <div>
          <img src={profileImg} alt="" />
        </div>
        <button className="p-link profile-link" onClick={this.onClick}>
          <span className="username">Sample User</span>
          <i className="pi pi-fw pi-cog"/>
        </button>
        <ul className={classNames({'profile-expanded': this.state.expanded})}>
          <li><button className="p-link"><i className="pi pi-fw pi-user"/><span>Account</span></button></li>
          <li><button className="p-link"><i className="pi pi-fw pi-inbox"/><span>Notifications</span></button></li>
          <li><button className="p-link"><i className="pi pi-fw pi-power-off"/><span>Logout</span></button></li>
        </ul>
      </div>
    );
  }
}