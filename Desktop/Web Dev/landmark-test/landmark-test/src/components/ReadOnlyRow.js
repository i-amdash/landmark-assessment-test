import React from 'react'

const ReadOnlyRow = ({ infos, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
        <td>{infos.title}</td>
        <td>{infos.category}</td>
        <td>{infos.description}</td>
        <td>{infos.imageUrl}</td>
            <button type='button' onClick={(event) => handleEditClick(event, infos)}>Edit</button>
            <button type='button' onClick={() => handleDeleteClick(infos.id)}>Delete</button>
    </tr>
  )
}

export default ReadOnlyRow