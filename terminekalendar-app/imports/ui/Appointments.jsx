import React, { useEffect, useMemo, useState } from 'react';
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

export const Appointments = ({ appointments, setState, setShowUpdateButton }) => {
   const [eventState, setEventState] = useState([]);

   useEffect(() => {
      const events = [];
      appointments.forEach((data) => {
         let body = {
            id: data._id,
            firstname: data.firstname,
            lastname: data.lastname,
            date: data.date,
            phoneNumber: data.phoneNumber,
            phoneType: data.phoneType,
            start: moment(data.date).toDate(),
            end: moment(data.date).toDate(),
            title: `${data.firstname} ${data.lastname} - ${data.phoneNumber}`,
         };
         events.push(body);
      });
      setEventState(events);
   }, [appointments]);

   const showEventDetails = (data) => {
      setShowUpdateButton(true);
      setState({
         id: data.id,
         firstname: data.firstname,
         lastname: data.lastname,
         date: moment(data.date).format('YYYY-MM-DD'),
         phoneNumber: data.phoneNumber,
         phoneType: data.phoneType,
      });
   };
   return (
      <React.Fragment>
         <Calendar
            localizer={localizer}
            defaultDate={new Date()}
            defaultView='month'
            events={eventState}
            style={{ height: '100vh' }}
            views={{ month: true, agenda: true }}
            onSelectEvent={(data) => showEventDetails(data)}
         />
      </React.Fragment>
   );
};
