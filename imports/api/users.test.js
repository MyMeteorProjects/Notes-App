import {Meteor} from 'meteor/meteor'
import expect from 'expect'; // assertion libary

import{ validateNewUser } from './users.js';

if(Meteor.isServer){
describe('users', function () {

  it('should allow valid email adress', function(){
    const testUser = {
      emails: [
        {
          address: 'test@test.com'
        }
      ]
    };
    const res = validateNewUser(testUser);

    expect(res).toBe(true);
  });

  it('should reject invalid email', function () {
    expect(() => {

    }).toNotThrow();
  });
}); // end users describe


} // end if







































// a few tests to take example from

// const add = (a, b) => {
//
//   if (typeof b !== 'number'){
//     return a + a;
//   }
//   return a + b;
// };
// const square = (c) => {
//   return Math.pow(c, 2)
// }
//
// describe('add', function(){
//   it('should add 2 numbers', function (){
//     const res = add(1, 1);
//     expect(res).toBe(2);
//   });
//
//   it ('should double a single number', function (){
//     const res = add(44)
//     expect(res).toBe(88)
//   });
// });
//
// describe('square', function(){
//   it('should square a number', function(){
//     const res = square(4)
//     expect(res).toBe(16)
//   });
// });
