import { Meteor } from 'meteor/meteor';
import { CalendarCollection } from '../db/CalendarCollection';

Meteor.publish('appointments', function publishAppointment() {
   return CalendarCollection.find();
});
