import {describe, it, beforeEach} from "@jest/globals";
import { Appointment } from '../src/Appointment';
import React from "react";
import ReactDOM from 'react-dom';

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
});

