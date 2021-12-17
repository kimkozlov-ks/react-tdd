import React from 'react';
import ReactDOM from 'react-dom';
import { sampleAppointments } from './sampleData';
import {AppointmentsDayView} from "./AppointmentsDayView";

ReactDOM.render(
  <AppointmentsDayView appointments={sampleAppointments} />,
  document.getElementById('root')
);
