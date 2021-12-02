import { check } from 'meteor/check';
import { CalendarCollection } from '../db/CalendarCollection';

Meteor.methods({
   'appointments.insert'(firstname, lastname, date, phoneNumber, phoneType) {
      check(firstname, String);
      check(lastname, String);
      check(date, Date);

      check(phoneType, String);

      CalendarCollection.insert({
         firstname: firstname,
         lastname: lastname,
         date: date,
         phoneNumber: phoneNumber,
         phoneType: phoneType,
         createdAt: new Date(),
      });
   },

   'appointments.remove'(appointmentId) {
      check(appointmentId, String);
      CalendarCollection.remove(appointmentId);
   },

   'appointments.update'(appointmentId, firstname, lastname, date, phoneNumber, phoneType) {
      check(appointmentId, String);
      check(firstname, String);
      check(lastname, String);
      check(date, Date);
      check(phoneType, String);

      CalendarCollection.update(appointmentId, {
         $set: {
            firstname: firstname,
            lastname: lastname,
            date: date,
            phoneNumber: phoneNumber,
            phoneType: phoneType,
            createdAt: new Date(),
         },
      });
   },
});
