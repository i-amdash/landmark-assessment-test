import React, {Fragment, useState} from 'react';
import { nanoid } from 'nanoid';


// Locally imported extensions
import EditRow from './components/EditRow';
import ReadOnlyRow from './components/ReadOnlyRow';
import data from './mock-data.json';
import './App.scss';

const App = () => {
  
  // (<img src={image} style={{ width: '400px' }} alt='' />)

  // useState Hooks 
  //  i stored my json data in the info state for the mock data
  const [image, setImage] = useState('');
  const [info, setInfo] = useState(data);
  const [addFormData, setAddFormData] = useState({
    name: "",
    number: "",
    email: "",
    image: "",
  });
  
  const [editFormData, setEditFormData] = useState({
    name: "",
    number: "",
    email: "",
    image: "",
  });
  
  const [editInfoId, setEditInfoId] = useState(null);

  const [switchPage, setSwitchPage] = useState(false);
  
  // My Add Data to table functions section
  const handleAddFormSubmit = (event) => {
    event.preventDefault();
    
    const newInfo = {
      id: nanoid(),
      name: addFormData.name,
      number: addFormData.number,
      email: addFormData.email,
      image: image
    };
    
    const newInfos = [...info, newInfo];
    setInfo(newInfos);
  };
  
  
  const handleAddFormChange = (event) => {
    event.preventDefault();
    
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;
    const newFormData = {...addFormData};
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };
  
  const uploadImage = async e => {
    const files = e.target.files
    const data = new FormData()
    data.append('file', files[0])
    data.append('upload_preset', 'zpyoxoxd')

    const res = await fetch(
      'https://api.cloudinary.com/v1_1/du6gwwr9h/image/upload', 
      {
        method: 'POST',
        body: data
      })
      
    const file = await res.json()
    
    setImage(file.secure_url);
  };

  // My Edit Data functions section
  
  const handleEditFormSubmit = (event) => {
    event.preventDefault();
    
    const editedInfo = {
      id: editInfoId,
      name: editFormData.name,
      number: editFormData.number,
      email: editFormData.email,
      image: editFormData.image,
    };
    
    const newInfos = [...info];
    
    const index = info.findIndex((infos) => infos.id === editInfoId);
    
    newInfos[index] = editedInfo;

    setInfo(newInfos);
    setEditInfoId(null);
    
  };
  
  const handleEditFormChange = (event) => {
    event.preventDefault();
    
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.files[0] ? image : event.value;
    
    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;
    
    setEditFormData(newFormData);
  };
  
  const handleEditClick = (event, infos) => {
    event.preventDefault();
    setEditInfoId(infos.id);

    const formValues = {
      name: infos.name,
      number: infos.number,
      email: infos.email,
      image: infos.image,
    };

    setEditFormData(formValues);
  };
  
  
  // function for cancel in edit 
  const handleCancelClick = () => {
    setEditInfoId(null);
  };
  
  // function for delete
  const handleDeleteClick = (infosId) => {
    const newInfos = [...info];

    const index = info.findIndex((infos) => infos.id === infosId);

    newInfos.splice(index, 1);

    setInfo(newInfos);
  }

  // funtion for switching the pages

  const handleSwitch = () => {
      
    if (switchPage === false) {

      setSwitchPage(true);
    } else {
      setSwitchPage(false);
    }
  }


  // function to handle image upload onChange
  const handleImageUpload = (event) => {
    handleAddFormChange(event);
    uploadImage(event);
  }

  // function to handle image edit onChange
  const handleImageEdit = (event) => {
    handleEditFormChange(event);
    uploadImage(event);
  }
// My Rendered component
  return (
    <div className='app'>
{!switchPage ? (
      <div className='appForm' id="appForm">
      <h1 className='head-text'><span>Landmark</span> Assessment Test</h1>
      <h2 className='sub-head'>Form page</h2>

        <div className='form-bg'>
          <form onSubmit={handleAddFormSubmit}>
            <h3>A front-end test</h3>
                <div className='inputBox'>
                  <input 
                  type="text"
                  name="name"
                  required="required"
                  placeholder='Full Name'
                  onChange={handleAddFormChange}
                  />
                </div>

                <div className='inputBox'>
                  <input 
                  type="tel"
                  name="number"
                  required="required"
                  placeholder='Phone Number'
                  onChange={handleAddFormChange}
                  />
                </div>

                <div className='inputBox'>
                  <input 
                  type="email"
                  name="email"
                  required="required"
                  placeholder='Email Address'
                  onChange={handleAddFormChange}
                  />
                </div>

                <div className='inputBox'>
                  <input 
                  type="file"
                  name="image"
                  required="required"
                  accept='image/*'
                  onChange={handleImageUpload}
                  />
                </div>
                <input type="submit" name="" id="" value="Add data" class="buttons"/>
          </form>
        </div>
        <button type='button' onClick={handleSwitch}>Switch Page</button>
      </div>
      
      ) : (

      <div className='appTable'>
        <form onSubmit={handleEditFormSubmit}>
          <table>
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Phone Number</th>
                <th>Email Address</th>
                <th>Picture</th>
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
                    handleImageEdit={handleImageEdit}
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
        <button type='button' onClick={handleSwitch}>Switch Page</button>
      </div>
    )}
</div>
  );
}

export default App;