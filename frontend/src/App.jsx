import { useEffect, useState } from 'react'
import { Card,Col,Row,Button,Input,Select } from 'antd';
import Drawers  from './components/Drawer'
import Modals from './components/Modal'
import axios from 'axios'
import './App.css'
const { Search } = Input;


function App() {
  const [products, setProducts] = useState([])
  const [title, setTitle] = useState([])
  const [open, setOpen] = useState(false);
  const [data,setData] = useState()
  const [categories,setCategories] = useState([])
  const [isCreate,setIsCreate] = useState(false)
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  useEffect(()=>{
    (async ()=>{
      const products = await axios.get(`http://localhost:5000/api/products`)
      const categories = await axios.get('http://localhost:5000/api/category')
    
      setProducts(products.data)
      setCategories(categories.data)
    })();
   
    
  },[])
  useEffect(()=>{
    fetchProducts()
  },[searchQuery,selectedCategory])
  const createDrawer = () => {
    setTitle("Create Product")
    setData(null)
    setIsCreate(true)
    setOpen(true);
  };

  const editDrawer = (product)=>{
    setTitle("Update Product")
    setData(product)
    setIsCreate(false)
    setOpen(true);
  }
  const onClose = () => {
    setOpen(false);
  };
  const fetchProducts = async (value) => {
    try {
      let url = `http://localhost:5000/api/products?search=${searchQuery}&category=${selectedCategory}`;
      const response = await axios.get(url);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  const onSearch = (value)=>{
    setSearchQuery(value);
  }
  const handleFilter = (value)=>{
    setSelectedCategory(value)
    
  }
  const deleteProduct = async(id)=>{
    await axios.delete(`http://localhost:5000/api/products/${id}`)
    const newProducts = products.filter((prod) => prod.id !== id);
    setProducts(newProducts);
  }
  
  return (
    <>
    <div style={{display:'flex',justifyContent:"space-around"}}>
      
    
    <Search
      placeholder="input search text"
      onSearch={onSearch}
      style={{
        width: 200,
      }}
    />
    <Select 
    defaultValue="all"
    onChange={handleFilter}
    style={{
        width: 120,
      }}>
      {categories.map((category)=>{
          return (
              <Select.Option value={category.id}>{category.name}</Select.Option>
          )
      })}
    </Select>
    <Button type="primary" onClick={createDrawer}>
        Create Product
    </Button>
    <Modals setCategories={setCategories} categories={categories}/>
    {open &&<Drawers title={title} 
    onClose={onClose} 
    open={open} 
    data={data} 
    isCreate={isCreate} 
    categories={categories} 
    products={products}
    setProducts={setProducts}
    />}
     </div>
    <h1>Products</h1>
    <Row gutter={16}>
    {products.map((product)=>{
      return(
      <Col span={8}>
      <Card style={{marginBottom:'2rem'}} title={product.name} bordered={true} key={product.id}>
      
      <p>Price: {product.price}</p>
      <Button  type="primary" onClick={()=>editDrawer(product)}>
        Edit
    </Button>
    <Button style={{marginLeft:'6rem'}} type="primary" onClick={()=>deleteProduct(product.id)} danger>
        Delete
    </Button>
      </Card>
    </Col>
      )
    })}
    
  </Row>
 
  </>
  )
}

export default App
