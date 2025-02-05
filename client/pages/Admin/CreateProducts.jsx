import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import { Adminmenu } from '../../components/layout/Adminmenu'
import axios from 'axios';
import { toast } from 'react-toastify';
import { Select } from 'antd'
import { Modal } from '@mui/material';
const prod_init={
    name:"",
    description:"",
    price:"",
    quantity:'',

}

export const CreateProducts = () => {
    const[categories,setCategories]=useState([])
    const[category,setCategory]=useState()
    const[prodData,setProdData]=useState(prod_init)
    const[photo,setPhoto]=useState("")
    const[showphoto,setShowPhoto]=useState(false)
    const[open,setOpen]=useState(false)
    const[shipping,setShipping]=useState("")

    const handleOnchange=(e)=>{
        setProdData((curr)=>({...curr,[e.target.name]:e.target.value}))
    }

    

    //handleopen
    const handleOpen=()=>{
        setOpen(true)
    }
    const handleClose=()=>{
        setOpen(false)
    }

    //handleonclick-show button
    const handleonclick=()=>{
        handleshowphoto()
        handleOpen()
    }


    //handleshowphoto
    const handleshowphoto=()=>{
        setShowPhoto(true)
    }



    //get all categories
    const getAllCategories = async () => {
        try {
          const { data } = await axios.get("http://localhost:8080/api/v1/category/getcategory");
    
          if (data.success) {
            console.log(data.category);
            setCategories(data.category);
    
          }
        }
        catch (err) {
          console.log(err);
          toast.error("error in getting categories")
        }
      }
    
      useEffect(() => {
        getAllCategories()
      }, [])

    //create product function
    const handleCreate=async(e)=>{
        e.preventDefault();
        try{
            const productData = new FormData()
            productData.append('name',prodData.name)
            productData.append('description',prodData.description)
            productData.append('price',prodData.price)
            productData.append('quantity',prodData.quantity)
            productData.append('photo',photo)
            productData.append('category',category)
            productData.append('shipping', shipping)
            const {data}=  axios.post('http://localhost:8080/api/v1/products/create-product',productData)
            if(data?.success){
                console.log(data);
                toast.success("Product Created Successfully")

            }else{
                toast.error(data?.message)
            }

        }catch(err){
            console.log(err);
            toast.error("something went wrong")
        }
    }

    return (
        <Layout>
            <div className='flex flex-row w-full mt-4 gap-12 '>
                <div className='' >
                    <Adminmenu />
                </div>
                <div className='w-[50%]'>
                    <p className='text-2xl'>Create Products</p>
                    <Select className='w-[30%] mt-4' placeholder="select a category" size='large' showSearch onChange={(value)=>{setCategory(value)}}>
                    {
                        categories.map(c=>(
                            <Option key={c._id} value={c._id} >
                                {c.name}
                            </Option>
                        ))
                    }
                    </Select>
                    <div className= 'p-2 w-fit rounded-md mt-2 hover:text-white hover:bg-slate-500 flex gap-4 ' style={{border:"1px solid gainsboro"}}>
                        <label className=''  >
                            {photo?photo.name:"upload Photo"}
                            <input type="file" name='photo' accept='image/*' onChange={(e)=>setPhoto(e.target.files[0])} hidden />
                        </label>

                        <button className='bg-sky-600 px-4 py-1 rounded-lg text-white mr-4 ' 
                        onClick={handleonclick}>
                            show photo
                        </button>
                    </div>
                    {
                        photo &&(
                    <Modal open={open} onClose={handleClose}>
                        <div className='ml-[40%] mt-[10%] w-auto'>
                            {photo && showphoto &&(
                                <div className='h-[400px] max-w-fit   flex items-center rounded-md ' style={{border:"1px solid gainsboro"}}>
                                    <img className='p-3 max-h-[380px] max-w-fit  '  src={URL.createObjectURL(photo)} alt="product_photo"  />
                                </div>
                            )}
                        </div>
                    </Modal>
                        )
                    }
                    <div   className='mt-5 flex flex-col gap-4 w-[50%]'>
                        <input type="text" name='name' value={prodData.name} placeholder=' write product name' onChange={handleOnchange} className='p-2 outline-gray-400 ' style={{border:"1px solid gainsboro"}} />
                        <input type="text" name='description' value={prodData.description} placeholder='write description' onChange={handleOnchange} className='pb-8 pl-2  outline-gray-400 h-[5rem] ' style={{border:"1px solid gainsboro"}}/>
                        <input type="number" name='price' value={prodData.price} placeholder='write price' onChange={handleOnchange} className='p-2  outline-gray-400  ' style={{border:"1px solid gainsboro"}}/>
                        <input type="number" name='quantity' value={prodData.quantity} placeholder='write quantity' onChange={handleOnchange} className='p-2  outline-gray-400  ' style={{border:"1px solid gainsboro"}}/>
                        <Select className=' mt-4' placeholder="select Shipping" size='large' showSearch onChange={(value)=>setShipping(value)}>
                            <Option value="false" >NO</Option>
                            <Option value="true" >Yes</Option>
                        </Select>
                        <button onClick={handleCreate} className='bg-sky-600 px-4 py-1 rounded-lg text-white mr-4 '>
                            Create Product
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
