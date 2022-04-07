import React, {Fragment, useState} from 'react';
import { nanoid } from 'nanoid';

import EditRow from './components/EditRow';
import ReadOnlyRow from './components/ReadOnlyRow';
import data from './mock-data.json';
import './App.scss';

const App = () => {
  
  const [info, setInfo] = useState(data);
  const [addFormData, setAddFormData] = useState({
    title: "",
    category: "",
    description: "",
    imageUrl: "",
  });
  
  const [editFormData, setEditFormData] = useState({
    title: "",
    category: "",
    description: "",
    imageUrl: "",
  });
  
  const [editInfoId, setEditInfoId] = useState(null);
  
  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = {...addFormData};
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };
  
  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newInfo = {
      id: nanoid(),
      title: addFormData.title,
      category: addFormData.category,
      description: addFormData.description,
      imageUrl: addFormData.imageUrl
    };

    const newInfos = [...info, newInfo];
    setInfo(newInfos);
  };
  
  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedInfo = {
      id: editInfoId,
      title: editFormData.title,
      category: editFormData.category,
      description: editFormData.description,
      imageUrl: editFormData.imageUrl,
    };

    const newInfos = [...info];

    const index = info.findIndex((infos) => infos.id === editInfoId);

    newInfos[index] = editedInfo;

    setInfo(newInfos);
    setEditInfoId(null);

  };

  const handleEditClick = (event, infos) => {
      event.preventDefault();
      setEditInfoId(infos.id);

      const formValues = {
        title: infos.title,
        category: infos.category,
        description: infos.description,
        imageUrl: infos.imageUrl,
      };

      setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditInfoId(null);
  };

  const handleDeleteClick = (infosId) => {
    const newInfos = [...info];

    const index = info.findIndex((infos) => infos.id === infosId);

    newInfos.splice(index, 1);

    setInfo(newInfos);
  }



  return (
    <div className='app'>

      <div className='appForm' id="appForm">

      <h1 className='head-text'>Landmark Assessment Test</h1>
      <h2 className='sub-head'>Form page</h2>

        <div className='form-bg'>
          <form onSubmit={handleAddFormSubmit}>
            <h3>A front-end test</h3>
                <div className='inputBox'>
                  <input 
                  type="text"
                  name="title"
                  required="required"
                  placeholder='Title...'
                  onChange={handleAddFormChange}
                  />
                </div>

                <div className='inputBox'>
                  <input 
                  type="text"
                  name="category"
                  required="required"
                  placeholder='Category...'
                  onChange={handleAddFormChange}
                  />
                </div>

                <div className='inputBox'>
                  <input 
                  type="text"
                  name="description"
                  required="required"
                  placeholder='Description...'
                  onChange={handleAddFormChange}
                  />
                </div>

                <div className='inputBox'>
                  <input 
                  type="imgurl"
                  name="imageUrl"
                  required="required"
                  placeholder='Image Url...'
                  onChange={handleAddFormChange}
                  />
                </div>
                <input type="submit" name="" id="" value="Add data" class="buttons"/>
          </form>
        </div>
      </div>

      <div className='appTable'>
        <form onSubmit={handleEditFormSubmit}>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Description</th>
                <th>ImageUrl</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {info.map((infos) => (
                <Fragment>
                  {editInfoId === infos.id ? (
                    <EditRow 
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                    />
                  ) : (
                    <ReadOnlyRow
                      infos={infos}
                      handleEditClick={handleEditClick}
                      handleDeleteClick={handleDeleteClick}
                    />
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        </form>
                  
        <a href='appForm'> 
        <input type="submit" name="" id="" value="Return to Form" class="button"/>
 
         </a>
      </div>

    </div>
  );
}

export default App;