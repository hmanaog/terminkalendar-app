import React from 'react';
import { Meteor } from 'meteor/meteor';
import moment from 'moment';

export const AppointmentForm = ({ state, setState, showUpdateButton, setShowUpdateButton }) => {
   const clearState = () => {
      setShowUpdateButton(false);
      setState({
         firstname: '',
         lastname: '',
         date: '',
         phoneNumber: '',
         phoneType: 'home',
      });
   };

   const handleSubmit = (event) => {
      event.preventDefault();

      if (!state.firstname && !state.lastname && !state.date && !state.phoneNumber) return;

      Meteor.call(
         'appointments.insert',
         state.firstname,
         state.lastname,
         !state.date ? new Date() : new Date(state.date),
         state.phoneNumber,
         state.phoneType
      );

      clearState();
   };

   const handleUpdate = (event) => {
      event.preventDefault();

      if (!state.firstname && !state.lastname && !state.date && !state.phoneNumber) return;

      Meteor.call(
         'appointments.update',
         state.id,
         state.firstname,
         state.lastname,
         !state.date ? new Date() : new Date(state.date),
         state.phoneNumber,
         state.phoneType
      );

      clearState();
   };

   const handleCancel = (event) => {
      event.preventDefault();
      clearState();
   };

   const handleRemove = () => {
      Meteor.call('appointments.remove', state.id);
      clearState();
   };

   return (
      <form className='appointment-form' onSubmit={handleSubmit}>
         <div className='input-container'>
            <label htmlFor='firstname'>First name:</label>
            <input
               className='input-style'
               required
               id='firstname'
               type='text'
               placeholder='First Name'
               value={state.firstname}
               onChange={(event) => setState({ ...state, firstname: event.target.value })}
            />
         </div>
         <div className='input-container'>
            <label htmlFor='lastname'>Last name:</label>
            <input
               className='input-style'
               required
               id='lastname'
               type='text'
               placeholder='Last Name'
               value={state.lastname}
               onChange={(event) => setState({ ...state, lastname: event.target.value })}
            />{' '}
         </div>
         <div className='input-container'>
            <label htmlFor='date'>Date:</label>
            <input
               className='input-style'
               required
               id='date'
               type='date'
               min={moment().format('YYYY-MM-DD')}
               value={state.date}
               onChange={(event) => setState({ ...state, date: event.target.value })}
            />{' '}
         </div>
         <div className='input-container'>
            <label htmlFor='phonenumber'>Phone number:</label>
            <input
               className='input-style'
               required
               id='phonenumber'
               type='number'
               placeholder='Phone Number'
               value={state.phoneNumber}
               onChange={(event) => setState({ ...state, phoneNumber: event.target.value })}
            />
            <select
               className='input-style'
               name='phone-types'
               id='phone-type-select'
               value={state.phoneType}
               onChange={(event) => setState({ ...state, phoneType: event.target.value })}
            >
               <option value='home'>Home</option>
               <option value='mobile'>Mobile</option>
            </select>
         </div>
         <div className='input-container'>
            {showUpdateButton ? (
               <>
                  <button type='button' className='button-submit' onClick={handleUpdate}>
                     Update
                  </button>{' '}
                  <button type='button' className='button-cancel' onClick={handleCancel}>
                     Cancel
                  </button>{' '}
                  <button type='button' className='button-remove' onClick={handleRemove}>
                     Remove
                  </button>
               </>
            ) : (
               <button className='button-submit' type='submit'>
                  Submit
               </button>
            )}
         </div>
      </form>
   );
};
