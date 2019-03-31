import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { httpGET } from '../../utils/httpUtils'

const localStorage = window.localStorage;

export class Topbar extends Component {
  static defaultProps = {onToggleMenu: null}
  static propTypes = {onToggleMenu: PropTypes.func.isRequired}

  constructor(props) {
    super(props);

    this.state = {
      nickname: null
    }

    this.onClickLogout = this.onClickLogout.bind(this);
  }

  componentWillMount () {
    if (localStorage.getItem("nickname") !== null )
      this.setState({ nickname: localStorage.getItem("nickname")});
  }

  onClickLogout() {
    localStorage.removeItem("username");
    localStorage.removeItem("participant");
    localStorage.removeItem("nickname");
    this.setState({nickname: null});
  }

  render() {
    return (
      <div className="layout-topbar clearfix">
        {
          this.state.nickname && (
            <button className="p-link layout-menu-button" onClick={this.props.onToggleMenu}>
              <span className="pi pi-bars"/>
            </button>
          )
        }
        <div className="layout-topbar-icons">
          {
            this.state.nickname && (
              <span>Welcome, {this.state.nickname}! <a onClick={this.onClickLogout}>Log out.</a></span>
            )
          }
          {
            this.state.nickname && (
              <button className="p-link">
                <span className="layout-topbar-item-text">Sign Out</span>
                <span className="layout-topbar-icon pi pi-sign-out"/>
              </button>
            )
          }
          <button className="p-link">
            <span className="layout-topbar-item-text">Home</span>
            <span className="layout-topbar-icon pi pi-home"/>
          </button>
        </div>
      </div>
    );
  }
}
