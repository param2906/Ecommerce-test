import React, { useEffect, useState } from 'react';
import { Button, Drawer,Input,Form,Select } from 'antd';
import axios from 'axios'
const Drawers = ({title,onClose,open,isCreate,data,categories,products,setProducts}) => {
  const [form] = Form.useForm();
  
  const onFinish = async(value)=>{
   if(isCreate){
    const product = await axios.post('http://localhost:5000/api/products',value)
    const newProducts = [...products,product.data]
    setProducts(newProducts)
  
    }else{
    
    const product = await axios.put(`http://localhost:5000/api/products/${data.id}`,value)
    const newProducts = products.map((prod) => {
        if (prod.id === data.id) {
          return { ...prod, ...product.data }; 
        }
        return prod; 
      });
      setProducts(newProducts);
    } 
    onClose()
    form.resetFields()
  }
  
  useEffect(()=>{
    if(!isCreate){
        form.setFieldsValue({
            name:data.name, 
            price:data.price,
            categoryId:data.categoryId
        })
    }

  },[open])
  return (
    <>
      <Drawer title={title} onClose={onClose} open={open}>
      <Form
      form={form}
      onFinish={onFinish}
      style={{
        maxWidth: 600,
      }}
      >
        <Form.Item
            name="name"
            label="Name"
            rules={[
            {
                required: true,
            },
            ]}
        >
            <Input />
        </Form.Item>
        <Form.Item
            name="price"
            label="Price"
            rules={[
            {
                required: true,
            },
            ]}
        >
            <Input type="number"/>
        </Form.Item>
        <Form.Item name="categoryId" label="Select">
          <Select>
            {categories.map((category)=>{
                return (
                    <Select.Option value={category.id}>{category.name}</Select.Option>
                )
            })}
          </Select>
        </Form.Item>
        <Button type="primary" htmlType="submit">
        {title}
      </Button>
      </Form>
      </Drawer>
    </>
  );
};
export default Drawers;