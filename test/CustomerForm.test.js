import React from 'react'
import { createContainer } from './domManipulators'
import { CustomerForm } from '../src/CustomerForm'
import { describe, beforeEach, it } from '@jest/globals'
import ReactTestUtils, { act } from 'react-dom/test-utils'
import { fetchResponseOk, fetchResponseError, requestBodyOf } from './spyHelpers'
import 'whatwg-fetch'

const expectToBeInputFieldOfTypeText = (formElement) => {
  expect(formElement).not.toBeNull()
  expect(formElement.tagName).toEqual('INPUT')
  expect(formElement.type).toEqual('text')
}
let render, container, form, field, labelFor, element, change, submit
beforeEach(() => {
  ;({ render, container, form, field, labelFor, element, change, submit } = createContainer())
  jest.spyOn(window, 'fetch').mockReturnValue(fetchResponseOk({}))
})
afterEach(() => {
  window.fetch.mockRestore()
})

const itRendersAsATextBox = (fieldName) =>
  it('renders as a text box', () => {
    render(<CustomerForm />)
    expectToBeInputFieldOfTypeText(field('customer', fieldName))
  })
const itIncludesTheExistingValue = (fieldName) =>
  it('includes the existing value', () => {
    render(<CustomerForm {...{ [fieldName]: 'value' }} />)
    expect(field('customer', fieldName).value).toEqual('value')
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
    expect(field('customer', fieldName).id).toEqual(fieldName)
  })

const itSubmitsExistingValue = (fieldName, value) =>
  it('saves existing value when submitted', async () => {
    render(<CustomerForm {...{ [fieldName]: value }} fetch={window.fetch.fn} />)

    await submit(form('customer'))

    expect(requestBodyOf(window.fetch)).toMatchObject({
      [fieldName]: value
    })
  })

const itSubmitsNewValue = (fieldName, value) =>
  it('saves new value when submitted', async () => {
    render(<CustomerForm {...{ [fieldName]: 'existingValue' }} fetch={window.fetch.fn} />)
    await change(field('customer', fieldName), {
      target: { value: value, name: fieldName }
    })
    await submit(form('customer'))
    expect(requestBodyOf(window.fetch)).toMatchObject({
      [fieldName]: value
    })
  })

describe('CustomerForm', () => {
  it('renders a form', () => {
    render(<CustomerForm />)
    expect(element('form[id="customer"]')).not.toBeNull()

    expect(form('customer')).not.toBeNull()
  })

  itRendersAsATextBox('firstName')
  itIncludesTheExistingValue('firstName')
  itRendersALabel('firstName', 'First name')
  itAssignsAnIdThatMatchesTheLabelId('firstName')
  itSubmitsExistingValue('firstName', 'firstName')
  itSubmitsNewValue('firstName', 'firstName')

  it('calls fetch with the right properties when submitting data', async () => {
    render(<CustomerForm fetch={window.fetch.fn} />)
    submit(form('customer'))
    expect(window.fetch).toHaveBeenCalledWith(
      '/customers',
      expect.objectContaining({
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' }
      })
    )
  })

  it('notifies onSave when form is submitted', async () => {
    const customer = { id: 123 }
    window.fetch.mockReturnValue(fetchResponseOk(customer))
    const saveSpy = jest.fn()
    render(<CustomerForm onSave={saveSpy} />)
    await act(async () => {
      submit(form('customer'))
    })
    expect(saveSpy).toHaveBeenCalledWith(customer)
  })

  it('does not notify onSave if the POST request returns an error', async () => {
    window.fetch.mockReturnValue(fetchResponseError())
    const saveSpy = jest.fn()
    render(<CustomerForm onSave={saveSpy} />)
    await act(async () => {
      submit(form('customer'))
    })
    expect(saveSpy).not.toHaveBeenCalled()
  })

  it('prevents the default action when submitting the form', async () => {
    const preventDefaultSpy = jest.fn()
    render(<CustomerForm />)
    await act(async () => {
      submit(form('customer'), {
        preventDefault: preventDefaultSpy
      })
    })
    expect(preventDefaultSpy).toHaveBeenCalled()
  })

  it('renders error message when fetch call fails', async () => {
    window.fetch.mockReturnValue(Promise.resolve({ ok: false }))
    render(<CustomerForm />)
    await act(async () => {
      submit(form('customer'))
    })
    expect(element('.error')).not.toBeNull()
    expect(element('.error').textContent).toMatch('error occurred')
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
    const submitButton = element('input[type="submit"]')
    expect(submitButton).not.toBeNull()
  })
})
