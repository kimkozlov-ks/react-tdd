import React from 'react'
import { createContainer } from './domManipulators'
import { CustomerForm } from '../src/CustomerForm'
import { describe, beforeEach, it } from '@jest/globals'
import ReactTestUtils from 'react-dom/test-utils'

const originalFetch = window.fetch
let fetchSpy

const expectToBeInputFieldOfTypeText = (formElement) => {
  expect(formElement).not.toBeNull()
  expect(formElement.tagName).toEqual('INPUT')
  expect(formElement.type).toEqual('text')
}

let render, container
beforeEach(() => {
  ;({ render, container } = createContainer())
  fetchSpy = spy()
  window.fetch = fetchSpy.fn
})
afterEach(() => {
  window.fetch = originalFetch
})
const form = (id) => container.querySelector(`form[id="${id}"]`)
const field = (name) => form('customer').elements[name]
const labelFor = (formElement) => container.querySelector(`label[for="${formElement}"]`)

const itRendersAsATextBox = (fieldName) =>
  it('renders as a text box', () => {
    render(<CustomerForm />)
    expectToBeInputFieldOfTypeText(field(fieldName))
  })
const itIncludesTheExistingValue = (fieldName) =>
  it('includes the existing value', () => {
    render(<CustomerForm {...{ [fieldName]: 'value' }} />)
    expect(field(fieldName).value).toEqual('value')
  })

const itRendersALabel = (fieldName, value) =>
  it('renders a label', () => {
    render(<CustomerForm />)
    expect(labelFor(fieldName)).not.toBeNull()
    expect(labelFor(fieldName).textContent).toEqual(value)
  })

const itAssignsAnIdThatMatchesTheLabelId = (fieldName) =>
  it('assigns an id that matches the label id', () => {
    render(<CustomerForm />)
    expect(field(fieldName).id).toEqual(fieldName)
  })

const itSubmitsExistingValue = (fieldName, value) =>
  it('saves existing value when submitted', async () => {
    render(<CustomerForm {...{ [fieldName]: value }} fetch={fetchSpy.fn} />)

    await ReactTestUtils.Simulate.submit(form('customer'))

    const fetchOpts = fetchSpy.receivedArgument(1)
    expect(JSON.parse(fetchOpts.body)[fieldName]).toEqual(value)
  })

const spy = () => {
  let receivedArguments
  return {
    fn: (...args) => (receivedArguments = args),
    receivedArguments: () => receivedArguments,
    receivedArgument: (n) => receivedArguments[n]
  }
}

expect.extend({
  toHaveBeenCalled(received) {
    if (received.receivedArguments() === undefined) {
      return {
        pass: false,
        message: () => 'Spy was not called.'
      }
    }
    return { pass: true, message: () => 'Spy was called.' }
  }
})

const itSubmitsNewValue = (fieldName, value) =>
  it('saves new value when submitted', async () => {
    render(<CustomerForm {...{ [fieldName]: 'existingValue' }} fetch={fetchSpy.fn} />)
    await ReactTestUtils.Simulate.change(field(fieldName), {
      target: { value: value, name: fieldName }
    })
    await ReactTestUtils.Simulate.submit(form('customer'))
    const fetchOpts = fetchSpy.receivedArgument(1)
    expect(JSON.parse(fetchOpts.body)[fieldName]).toEqual(value)
  })

describe('CustomerForm', () => {
  it('renders a form', () => {
    render(<CustomerForm />)
    expect(container.querySelector('form[id="customer"]')).not.toBeNull()

    expect(form('customer')).not.toBeNull()
  })

  itRendersAsATextBox('firstName')
  itIncludesTheExistingValue('firstName')
  itRendersALabel('firstName', 'First name')
  itAssignsAnIdThatMatchesTheLabelId('firstName')
  itSubmitsExistingValue('firstName', 'firstName')
  itSubmitsNewValue('firstName', 'firstName')

  it('calls fetch with the right properties when submitting data', async () => {
    render(<CustomerForm fetch={fetchSpy.fn} />)
    ReactTestUtils.Simulate.submit(form('customer'))
    expect(fetchSpy).toHaveBeenCalled()
    expect(fetchSpy.receivedArgument(0)).toEqual('/customers')
    const fetchOpts = fetchSpy.receivedArgument(1)
    expect(fetchOpts.method).toEqual('POST')
    expect(fetchOpts.credentials).toEqual('same-origin')
    expect(fetchOpts.headers).toEqual({
      'Content-Type': 'application/json'
    })
  })
})

describe('last name field', () => {
  itRendersAsATextBox('lastName')
  itIncludesTheExistingValue('lastName')
  itRendersALabel('lastName', 'Last name')
  itAssignsAnIdThatMatchesTheLabelId('lastName')
  itSubmitsExistingValue('lastName', 'lastName')
  itSubmitsNewValue('lastName', 'newlastName')

  it('has a submit button', () => {
    render(<CustomerForm />)
    const submitButton = container.querySelector('input[type="submit"]')
    expect(submitButton).not.toBeNull()
  })
})
