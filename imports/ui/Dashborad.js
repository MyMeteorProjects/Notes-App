import React from 'react';
import { Meteor } from 'meteor/meteor';

import PrivateHeader from './PrivateHeader';

//this is a STATELESS FUNCTIONAL COMPONENT

export default () => {
  return (
    <div>
      <PrivateHeader title="Dashboard"/>
      <div className="page-content">
        Dashboard Page Content
      </div>
    </div>
  );
}
