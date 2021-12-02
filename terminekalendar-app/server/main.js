import { Meteor } from 'meteor/meteor';
import { CalendarCollection } from '../imports/db/CalendarCollection';
import '../imports/api/CalendarMethods';
import '../imports/api/CalendarPublication';

const insertAppointment = (firstname, lastname, date, phoneNumber) =>
   CalendarCollection.insert({
      firstname: firstname,
      lastname: lastname,
      date: date,
      phoneNumber: phoneNumber,
   });

Meteor.startup(() => {
   if (CalendarCollection.find().count() === 0) {
      [
         {
            firstname: 'Herbert',
            lastname: 'Manaog',
            date: new Date(2021, 12, 1),
            phoneNumber: 123456789,
         },
         {
            firstname: 'Isabelle',
            lastname: 'Che Kim',
            date: new Date(2021, 12, 1),
            phoneNumber: 987654321,
         },
      ].forEach((data) => insertAppointment(data.firstname, data.lastname, data.createdAt, data.phoneNumber));
   }
});
