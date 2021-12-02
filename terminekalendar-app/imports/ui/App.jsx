import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { CalendarCollection } from '../db/CalendarCollection';
import { Appointments } from './Appointments';
import { AppointmentForm } from './AppointmentForm';

export const App = () => {
   const appointments = useTracker(() => {
      Meteor.subscribe('appointments');
      const data = CalendarCollection.find({}, { sort: { date: 1 } }).fetch();
      return data;
   });

   let isLoading = false;

   const loader = useTracker(() => {
      const handler = Meteor.subscribe('appointments');
      if (!handler.ready()) {
         return (isLoading = true);
      }
   });

   const [showUpdateButton, setShowUpdateButton] = useState(false);
   const [state, setState] = useState({
      firstname: '',
      lastname: '',
      date: '',
      phoneNumber: '',
      phoneType: 'home',
   });

   return (
      <div className='main_container'>
         <header>
            <h1>Terminkalendar App</h1>{' '}
         </header>

         <div className='child_container'>
            <div className='left_container'>
               <AppointmentForm
                  state={state}
                  setState={setState}
                  showUpdateButton={showUpdateButton}
                  setShowUpdateButton={setShowUpdateButton}
               />
            </div>

            {loader && <div className='loading'>loading...</div>}

            <div className='right_container'>
               <Appointments
                  appointments={appointments}
                  setState={setState}
                  setShowUpdateButton={setShowUpdateButton}
               />
            </div>
         </div>
      </div>
   );
};
