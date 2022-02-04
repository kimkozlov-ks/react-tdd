import React from 'react'
import ReactDOM from 'react-dom'
import { sampleAppointments } from './sampleData'
import { AppointmentsDayView } from './AppointmentsDayView'
import { CustomerForm } from './CustomerForm'
import 'whatwg-fetch'

ReactDOM.render(
  <>
    <AppointmentsDayView appointments={sampleAppointments} />
    <CustomerForm />
  </>,
  document.getElementById('root')
)
