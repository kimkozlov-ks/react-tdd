import React from 'react';

export const Appointment = ({ customer, stylist, service, notes, startAt}) => (
  <>
    <h4>{`Today's appointment at ${startAt}`}</h4>
    <table>
      <tbody>
        <tr>
          <td>Customer</td>
          <td>{customer.firstName} {customer.lastName}</td>
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
  </>
);

