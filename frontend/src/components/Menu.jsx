import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Link } from 'apps/router/components';
import getCsrfValue, { CSRF_FORM_NAME } from 'csrf';

@connect(state => ({
  isLoggedIn: state.auth.isLoggedIn,
}))
export default class Menu extends Component {

  static propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
  };

  static renderAnonymousMenuItems() {
    return (
      <ul className="ml-auto nav navbar-nav">
        <li className="nav-item">
          <Link className="nav-link" href="/login">Login</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" href="/sign-up">Sign up</Link>
        </li>
      </ul>
    );
  }

  static renderLoggedInMenuItems() {
    // this should be a good old fashioned POST to server
    return (
      <ul className="ml-auto nav navbar-nav">
        <form action="/accounts/logout/" method="POST">
          <input type="hidden" name={CSRF_FORM_NAME} value={getCsrfValue()} />
          <button className="nav-link btn btn-link">Logout</button>
        </form>
      </ul>
    );
  }

  renderMenuItems() {
    return this.props.isLoggedIn
      ? Menu.renderLoggedInMenuItems()
      : Menu.renderAnonymousMenuItems();
  }

  render() {
    return (
      <nav className="navbar navbar-toggleable-md navbar-light bg-faded">
        <div className="container">
          <button className="navbar-toggler navbar-toggler-right" type="button" dataToggle="collapse" dataTarget="#navbarSupportedContent" ariaControls="navbarSupportedContent" ariaExpanded="false" ariaLabel="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <a className="navbar-brand" href="/">Django Shopfront</a>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {this.renderMenuItems()}
          </div>
        </div>
      </nav>
    );
  }
}