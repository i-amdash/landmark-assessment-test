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
                name="title"
                required="required"
                placeholder='Insert Title...'
                value={editFormData.title}
                onChange={handleEditFormChange}
                 />
        </td>

        <td>
            <input 
                type="text"
                name="category"
                required="required"
                placeholder='Insert Category...'
                value={editFormData.category}
                onChange={handleEditFormChange}
                 />
        </td>

        <td>
            <input 
                type="text"
                name="description"
                required="required"
                placeholder='Insert Description...'
                value={editFormData.description}
                onChange={handleEditFormChange}
                 />
        </td>

        <td>
            <input 
                type="text"
                name="imageUrl"
                required="required"
                placeholder='Insert Image Url...'
                value={editFormData.imageUrl}
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