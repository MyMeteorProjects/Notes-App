import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

const PrivateHeader = (props) => {

    return(
      <div className="top-bar">
        <div className="top-bar__content">
          <h1 className="top-bar__title">{props.title}</h1>
          <button className="button button--link-text" onClick={() => props.handleLogout()}>Logout</button>
        </div>
      </div>
    )
}
PrivateHeader.propTypes = {
  title: React.PropTypes.string.isRequired,
  handleLogout: React.PropTypes.func.isRequired
}
export default PrivateHeader;
  //Accounts.logout();
