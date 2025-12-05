// shift table
import React from 'react';

export default function ShiftTable({ shifts, onDelete }) {
  return (
    <table border="1" cellPadding={6} style={{ width: '100%', marginTop: 12 }}>
      <thead>
        <tr>
          <th>Employee</th><th>Date</th><th>Start</th><th>End</th><th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {shifts.map(s => (
          <tr key={s._id}>
            <td>{s.employee?.name} ({s.employee?.employeeCode})</td>
            <td>{s.date}</td>
            <td>{s.startTime}</td>
            <td>{s.endTime}</td>
            <td><button onClick={() => onDelete(s._id)}>Delete</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
