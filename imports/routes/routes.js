import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import Signup from '../ui/Signup';
import Dashboard from '../ui/Dashboard';
import NotFound from '../ui/NotFound';
import Login from '../ui/Login';

const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/Dashboard', ]
const onEnterPublicPage = () => { // this function prevents authenticated user from reaching the public pages
  if(Meteor.userId()) { // it is called inside the JSX on the 'onEnter' att
    browserHistory.replace('/Dashboard')
  }
}
const onEnterPrivatePages = () =>{ //this also prevents unauthenticated users from reaching private pages
  if(!Meteor.userId()) { // it is called inside the JSX on the 'onEnter' att
    browserHistory.replace('/')
  }
}

export const onAuthChange = (isAuthenticated) => {
  const pathname = browserHistory.getCurrentLocation().pathname;// this gets the page that the usin is in right now
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathname); //this checks if a page is for authenticated users or not
  const isAuthenticatedPage = authenticatedPages.includes(pathname);//this checks if a page is for authenticated users or not

  if(isUnauthenticatedPage && isAuthenticated ){
    browserHistory.replace('/Dashboard')//pushes authenticated user to his links page
  } else if (isAuthenticatedPage && !isAuthenticated){
    browserHistory.replace('/')//pushes a logged out user or not authenticated user back to the login page (root)
  }

  console.log('isAuthenticated', isAuthenticated);
}

export const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Login} onEnter={onEnterPublicPage}/>
    <Route path="/signup" component={Signup} onEnter={onEnterPublicPage}/>
    <Route path="/Dashboard" component={Dashboard} onEnter={onEnterPrivatePages}/>
    <Route path="*" component={NotFound} onEnter={onEnterPrivatePages}/>
  </Router>
);
