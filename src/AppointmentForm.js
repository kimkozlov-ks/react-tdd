import React, { useState } from 'react'
import { TimeSlotTable } from './TimeSlotTable'
export const AppointmentForm = ({
  selectableServices,
  service,
  onSubmit,
  salonOpensAt,
  salonClosesAt,
  today,
  availableTimeSlots
}) => {
  const [selected, setSelected] = useState(service)

  return (
    <form id='appointment' onSubmit={() => onSubmit(selected)}>
      <label htmlFor={'service'}>Service</label>
      <select name='service' id='service' value={service} readOnly onChange={(e) => setSelected(e.target.value)}>
        <option />
        {selectableServices.map((s) => (
          <option value={s} name={s} key={s}>
            {s}
          </option>
        ))}
      </select>
      <TimeSlotTable
        salonOpensAt={salonOpensAt}
        salonClosesAt={salonClosesAt}
        today={today}
        availableTimeSlots={availableTimeSlots}
      />
    </form>
  )
}

AppointmentForm.defaultProps = {
  selectableServices: ['Cut', 'Blow-dry', 'Cut & color', 'Beard trim', 'Cut & beard trim', 'Extensions'],
  salonOpensAt: 9,
  salonClosesAt: 19,
  today: new Date(),
  availableTimeSlots: []
}
