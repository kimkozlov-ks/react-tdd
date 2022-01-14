import React, { useState, useCallback } from 'react'
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
  const [appointment, setAppointment] = useState({})

  const handleStartsAtChange = useCallback(
    ({ target: { value } }) =>
      setAppointment((appointment) => ({
        ...appointment,
        startsAt: parseInt(value)
      })),
    []
  )

  return (
    <form id='appointment' onSubmit={() => onSubmit(appointment)}>
      <label htmlFor={'service'}>Service</label>
      <select
        name='service'
        id='service'
        value={service}
        readOnly
        onChange={(e) => setAppointment((prev) => ({ ...prev, service: e.target.value }))}
      >
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
        checkedTimeSlot={appointment.startsAt}
        handleChange={handleStartsAtChange}
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
