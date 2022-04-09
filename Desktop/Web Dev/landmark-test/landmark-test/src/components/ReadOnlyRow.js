import React from 'react';

const ReadOnlyRow = ({ infos, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
        <td>{infos.name}</td>
        <td>{infos.number}</td>
        <td>{infos.email}</td>
        <td><img src={infos.image} style={{ width: '40px' }} alt='' /></td>
            <button 
            type='button' 
            onClick={(event) => handleEditClick(event, infos)}>
              Edit
            </button>
            <button 
            type='button' 
            onClick={() => handleDeleteClick(infos.id)}>
              Delete
            </button>
    </tr>
  );
};

export default ReadOnlyRow;