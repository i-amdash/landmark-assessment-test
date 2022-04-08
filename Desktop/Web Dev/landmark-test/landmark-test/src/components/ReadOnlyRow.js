import React from 'react'

const ReadOnlyRow = ({ infos, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
        <td>{infos.name}</td>
        <td>{infos.number}</td>
        <td>{infos.email}</td>
        <td>{infos.image}</td>
            <button type='button' onClick={(event) => handleEditClick(event, infos)}>Edit</button>
            <button type='button' onClick={() => handleDeleteClick(infos.id)}>Delete</button>
    </tr>
  )
}

export default ReadOnlyRow