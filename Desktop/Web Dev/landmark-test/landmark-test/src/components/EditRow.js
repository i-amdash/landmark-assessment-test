import React from 'react'


const EditRow = ({
    editFormData,
    handleEditFormChange,
    handleCancelClick,
}) => {
  return (
    <tr>
        <td>
            <input 
                type="text"
                name="name"
                required="required"
                placeholder='Full Name'
                value={editFormData.name}
                onChange={handleEditFormChange}
                 />
        </td>

        <td>
            <input 
                type="tel"
                name="number"
                required="required"
                placeholder='Phone Number'
                value={editFormData.number}
                onChange={handleEditFormChange}
                 />
        </td>

        <td>
            <input 
                type="email"
                name="email"
                required="required"
                placeholder='Email Address'
                value={editFormData.email}
                onChange={handleEditFormChange}
                 />
        </td>

        <td>
            <input 
                type="file"
                name="image"
                required="required"
                accept='image/*'
                value={editFormData.image}
                onChange={handleEditFormChange}
                 />
        </td>

        <td>
            <button type='submit'>Save</button>
            <button type='button' onClick={handleCancelClick}>Cancel</button>
        </td>
    </tr>
  );
};

export default EditRow