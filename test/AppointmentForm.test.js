import React from 'react'
import { createContainer } from './domManipulators'
import { AppointmentForm } from '../src/AppointmentForm'
import { describe, beforeEach, it } from '@jest/globals'
import { CustomerForm } from '../src/CustomerForm'
import ReactTestUtils from 'react-dom/test-utils'

let render, container

beforeEach(() => {
  ;({ render, container } = createContainer())
})

const form = (id) => container.querySelector(`form[id="${id}"]`)
const field = (name) => form('appointment').elements[name]
const findOption = (dropdownNode, textContent) => {
  const options = Array.from(dropdownNode.childNodes)
  return options.find((option) => option.textContent === textContent)
}
const labelFor = (formElement) => container.querySelector(`label[for="${formElement}"]`)

const itRendersALabel = (fieldName, value) =>
  it('renders a label', () => {
    render(<AppointmentForm />)
    expect(labelFor(fieldName)).not.toBeNull()
    expect(labelFor(fieldName).textContent).toEqual(value)
  })

const itAssignsAnIdThatMatchesTheLabelId = (fieldName) =>
  it('assigns an id that matches the label id', () => {
    render(<AppointmentForm />)
    expect(field(fieldName).id).toEqual(fieldName)
  })

const itSubmitsExistingValue = (fieldName, value) =>
  it('saves existing value when submitted', async () => {
    expect.hasAssertions()
    render(
      <AppointmentForm {...{ [fieldName]: value }} onSubmit={(props) => expect(props[fieldName]).toEqual(value)} />
    )

    await ReactTestUtils.Simulate.submit(form('appointment'))
  })

const itSubmitsNewValue = (fieldName, value) =>
  it('saves new value when submitted', async () => {
    expect.hasAssertions()
    render(
      <CustomerForm
        {...{ [fieldName]: 'existingValue' }}
        onSubmit={(props) => expect(props[fieldName]).toEqual(value)}
      />
    )
    await ReactTestUtils.Simulate.change(field(fieldName), {
      target: { value: value, name: fieldName }
    })
    await ReactTestUtils.Simulate.submit(form('appointment'))
  })

describe('AppointmentForm', () => {
  it('renders a form', () => {
    render(<AppointmentForm />)
    expect(form('appointment')).not.toBeNull()
  })
})

describe('service field', () => {
  it('renders as a select box', () => {
    render(<AppointmentForm />)
    expect(form('appointment').elements.service).not.toBeNull()
    expect(form('appointment').elements.service.tagName).toEqual('SELECT')
  })

  it('initially has a blank value chosen', () => {
    render(<AppointmentForm />)
    const firstNode = field('service').childNodes[0]
    expect(firstNode.value).toEqual('')
    expect(firstNode.selected).toBeTruthy()
  })

  it('lists all salon services', () => {
    const selectableServices = ['Cut', 'Blow-dry']
    render(<AppointmentForm selectableServices={selectableServices} />)
    const optionNodes = Array.from(field('service').childNodes)
    const renderedServices = optionNodes.map((node) => node.textContent)
    expect(renderedServices).toEqual(expect.arrayContaining(selectableServices))
  })

  it('pre-selects the existing value', () => {
    const services = ['Cut', 'Blow-dry']
    render(<AppointmentForm selectableServices={services} service='Blow-dry' />)
    const option = findOption(field('service'), 'Blow-dry')
    expect(option.selected).toBeTruthy()
  })

  itRendersALabel('service', 'Service')
  itAssignsAnIdThatMatchesTheLabelId('service')

  itSubmitsExistingValue('appointment')
  itSubmitsNewValue('service', 'new')
})
