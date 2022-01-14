import React from 'react'
import { AppointmentForm } from './AppointmentForm'

export const Appointment = ({ customer, stylist, service, notes, startsAt }) => {
  const today = new Date()
  return (
    <>
      <h4>{`Today's appointment at ${startsAt}`}</h4>
      <table>
        <tbody>
          <tr>
            <td>Customer</td>
            <td>
              {customer.firstName} {customer.lastName}
            </td>
          </tr>
          <tr>
            <td>Phone number</td>
            <td>{customer.phoneNumber}</td>
          </tr>
          <tr>
            <td>Stylist</td>
            <td>{stylist}</td>
          </tr>
          <tr>
            <td>Service</td>
            <td>{service}</td>
          </tr>
          <tr>
            <td>Notes</td>
            <td>{notes}</td>
          </tr>
        </tbody>
      </table>
      <AppointmentForm
        availableTimeSlots={[{ startsAt: today.setHours(9, 0, 0, 0) }, { startsAt: today.setHours(9, 30, 0, 0) }]}
      />
    </>
  )
}
