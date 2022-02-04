import React, { useState } from 'react'
export const CustomerForm = ({ firstName, lastName, phoneNumber }) => {
  const [customer, setCustomer] = useState({ firstName, lastName, phoneNumber })

  const handleChange = ({ target }) =>
    setCustomer((customer) => ({
      ...customer,
      [target.name]: target.value
    }))

  const handleSubmit = () => {
    window.fetch('/customers', {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(customer)
    })
  }

  return (
    <form id='customer' onSubmit={handleSubmit}>
      <label htmlFor='firstName'>First name</label>
      <input type='text' id='firstName' name='firstName' value={firstName} onChange={handleChange} />
      <label htmlFor='lastName'>Last name</label>
      <input type='text' id='lastName' name='lastName' value={lastName} onChange={handleChange} />
      <label htmlFor='phoneNumber'>Phone name</label>
      <input type='text' id='phoneNumber' name='phoneNumber' value={phoneNumber} onChange={handleChange} />
      <input type='submit' value='Add' />
    </form>
  )
}
