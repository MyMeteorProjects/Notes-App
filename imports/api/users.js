import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Accounts } from 'meteor/accounts-base'

export const validateNewUser = (user) => { // validate new user function
  const email = user.emails[0].address; // defining email

//using the try catch method gives access to simple schema errors
  new SimpleSchema({
    email: {
      type: String,
      regEx: SimpleSchema.RegEx.Email
    }
  }).validate({ email })// es6 syntax equel to: email: email

  return true;
};

if(Meteor.isServer) {
  Accounts.validateNewUser(validateNewUser);
}
