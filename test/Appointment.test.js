import {describe, it, beforeEach} from "@jest/globals";
import { Appointment} from '../src/Appointment';
import React from "react";
import ReactDOM from 'react-dom';
import {sampleAppointments} from "../src/sampleData";

describe('Appointment', () => {
  let container;
  let customer;

  const render = component => ReactDOM.render(component, container);

  beforeEach(() => {
    container = document.createElement('div');
  });

  it('renders the customer first name', () => {
    customer = { firstName: 'Ashley' };
    render(<Appointment customer={customer} />);
    expect(container.textContent).toMatch('Ashley');
  });
  it('renders the customer first name', () => {
    customer = { firstName: 'Jourdan' };
    render(<Appointment customer={customer} />);
    expect(container.textContent).toMatch('Jourdan');
  });

  it('renders the two columns table', () => {
    render(<Appointment customer={sampleAppointments[0].customer} />);
    expect(container.querySelector('table')).not.toBeNull();
    expect(
      container.querySelector('table > tbody > tr').children
    ).toHaveLength(2);
  });

  it('renders customer first and last name in the first row', () => {
    render(<Appointment customer={sampleAppointments[0].customer} />);
    expect(
      container.querySelector('table > tbody > tr')
        .children[0]
        .textContent).toMatch('Customer')
    expect(
      container.querySelector('table > tbody > tr')
        .children[1]
        .textContent).toMatch(
          `${sampleAppointments[0].customer.firstName} ${sampleAppointments[0].customer.lastName}`)
  });

  it('renders customer phone number in the second row', () => {
    render(<Appointment customer={sampleAppointments[0].customer} />);
    expect(
      container.querySelector('table > tbody')
        .children[1].children[0]
        .textContent).toMatch('Phone number')
    expect(
      container.querySelector('table > tbody')
        .children[1].children[1]
        .textContent).toMatch(
      `${sampleAppointments[0].customer.phoneNumber}`)
  });

  it('renders stylist in the third row', () => {
    render(<Appointment
      customer={sampleAppointments[0].customer}
      stylist={sampleAppointments[0].stylist} />);
    expect(
      container.querySelector('table > tbody')
        .children[2].children[0]
        .textContent).toMatch('Stylist')
    expect(
      container.querySelector('table > tbody')
        .children[2].children[1]
        .textContent).toMatch(
      `${sampleAppointments[0].stylist}`)
  });

  it('renders service in the 4th row', () => {
    render(<Appointment
      customer={sampleAppointments[0].customer}
      stylist={sampleAppointments[0].stylist}
      service={sampleAppointments[0].service}
    />);
    expect(
      container.querySelector('table > tbody')
        .children[3].children[0]
        .textContent).toMatch('Service')
    expect(
      container.querySelector('table > tbody')
        .children[3].children[1]
        .textContent).toMatch(
      `${sampleAppointments[0].service}`)
  });

  it('renders notes in the 5th row', () => {
    render(<Appointment
      customer={sampleAppointments[0].customer}
      stylist={sampleAppointments[0].stylist}
      service={sampleAppointments[0].service}
      notes={sampleAppointments[0].notes}
    />);
    expect(
      container.querySelector('table > tbody')
        .children[4].children[0]
        .textContent).toMatch('Notes')
    expect(
      container.querySelector('table > tbody')
        .children[4].children[1]
        .textContent).toMatch(
      `${sampleAppointments[0].notes}`)
  });

  it('renders appointment header with time', () => {
    render(<Appointment
      customer={sampleAppointments[0].customer}
      stylist={sampleAppointments[0].stylist}
      service={sampleAppointments[0].service}
      notes={sampleAppointments[0].notes}
      startsAt={sampleAppointments[0].startsAt}
    />);
    expect(container.querySelector('h4')).not.toBeNull();
    expect(
      container.querySelector('h4')
        .textContent).toMatch(`Today's appointment at ${sampleAppointments[0].startsAt}`)
  });

});


