import React, { useState } from 'react';
import { Button, Input, Modal } from 'antd';
import axios from 'axios';
const Modals = ({categories,setCategories}) => {
  const [name,setName] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [require,setRequired] = useState(false)
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async() => {
   if(name===null){
    setRequired(true)
   }
   else{
   
   const data = {
    name:name
   }
    const category = await axios.post('http://localhost:5000/api/category',data)
    
    const newcategory = [...categories,category.data]
    setCategories(newcategory)
    setIsModalOpen(false);
    setName(null)
  }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleNameChange = (e)=>{
    setRequired(false)
    setName(e.target.value)
  }
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Create Category
      </Button>
      <Modal title="Basic Modal" open={isModalOpen} footer={<Button key="submit" type="primary" onClick={handleOk}>
            Submit
          </Button>} onCancel={handleCancel}>
        <label>Name:
        <Input name='name' type='text' onChange={handleNameChange} value={name} required={true}/>
        </label>
        {require &&<p style={{color:'red'}}>Field is required</p>}
      </Modal>
    </>
  );
};
export default Modals;