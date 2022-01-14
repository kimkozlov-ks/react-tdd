import React from 'react'
export const AppointmentForm = ({ selectableServices, service, onSubmit }) => {
  return (
    <form id='appointment' onSubmit={onSubmit}>
      <label htmlFor={'service'}>Service</label>
      <select name='service' id='service' value={service} readOnly>
        <option />
        {selectableServices.map((s) => (
          <option key={s}>{s}</option>
        ))}
      </select>
    </form>
  )
}

AppointmentForm.defaultProps = {
  selectableServices: ['Cut', 'Blow-dry', 'Cut & color', 'Beard trim', 'Cut & beard trim', 'Extensions']
}
