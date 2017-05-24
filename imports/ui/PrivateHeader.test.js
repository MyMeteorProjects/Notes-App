import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import PrivateHeader from './PrivateHeader'

if(Meteor.isClient) {
  describe('PrivateHeader', function (){
    it('should set butten text to logout', function(){
     const wrapper = mount( <PrivateHeader title="test title" handleLogout={ () => {} }/> ) // every test will require us to mount the element tested and provide its props
     const buttonText = wrapper.find('button').text() // pretty similar to jquery selectors

     expect(buttonText).toBe('Logout');
    });

    it('should render title as h1 tag', function(){
         const wrapper = mount( <PrivateHeader title="test title" handleLogout={ () => {} }/> )
         const h1Text = wrapper.find('h1').text()

         expect(h1Text).toBe('test title');
    });

    it('should call me a function', function (){
      const spy = expect.createSpy(); // spy is a mock function
      spy(3, 4); // usually we inject the spy in to the tested component
      //  expect(spy).toHaveBeenCalled(); //this test if a function was called
      spy('yuda')
      //  expect(spy).toNotHaveBeenCalled()
      expect(spy).toHaveBeenCalledWith('yuda')
    });



    });


  }); //end describe
} //end if





//REFERENCE TO CALLING A SPY
/*
it('should call handleLogout on click', function(){
  const spy = expect.createSpy(); // the spy is supose to be called on click because its in the handle log out function (or prop in this case)
  const wrapper = mount( <PrivateHeader title="test title" handleLogout={spy}/> ) // the spy was passed into the handleLogout prop

  wrapper.find('button').simulate('click') // this simulates a click on the logout button

  expect(spy).toHaveBeenCalled(); */
