import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import axios from 'axios';
import { toast } from 'react-toastify';
import { Adminmenu } from '../../components/layout/Adminmenu';
import { useLocation } from 'react-router-dom';
import { Box, Modal, Table, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { CategoryForm } from '../../components/form/CategoryForm';

export const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("")
  const [open, setOpen] = useState(false);
  const [selected ,setSelected]=useState(null)
  const [updatedName,setUpdatedName]=useState("")
  const handleOpen = (c) =>{
    setOpen(true);
    setUpdatedName(c.name)
    setSelected(c)
  } 
    
  const handleClose = () => setOpen(false);

  //handle form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:8080/api/v1/category/create-category', { name })
      if (data.success) {
        toast.success(`${name} is created`)
        getAllCategories()

      }
      else {
        toast.error(data.message)
      }
      setName("")
    } catch (err) {
      console.log(err);
      toast.error("something went wrong in input form")
    }
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

//handle update category
  const handleUpdate=async(e)=>{
    e.preventDefault();
    try{
      const {data}= await axios.put(`http://localhost:8080/api/v1/category/update-category/${selected._id}`,{name:updatedName})
      if(data.success){
        toast.success(`${updatedName} is updated`)
        setSelected(null)
        setUpdatedName("")
        setOpen(false)
        getAllCategories()
      }
      else{
        toast.error(data.message)
      }
    }catch(err){
      toast.error("something went wrong")
    }

  }

// handle delete category
  const handleDelete=async(pid)=>{
    try{
      const {data}=await axios.delete(`http://localhost:8080/api/v1/category/delete-category/${pid}`)
      console.log(data);
      console.log(pid);
      
      if(data.success){
        // toast.success(`${name} is deleted`)
        toast.success(`${data.message}`)
        getAllCategories()
      }
      else{
        toast.error(`${data.message}} `)
      }

    }catch(err){
      console.log(err);
      toast.error(`something went wrong`)
    }
  }


  return (
    <Layout>
      <div className='flex flex-row w-full mt-4 gap-12 '>
        <div >
          <Adminmenu />
        </div>
        <div className='w-[30%] ' >
          <p className='text-2xl   '>Manage Category</p>
          <div>
            <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} />
          </div>
          <Table className='w-full mt-2' style={{ border: '1px solid gainsboro' }} aria-label="simple table">
            <TableHead  >
              <TableRow className='flex ' >
                <TableCell > <p className='font-bold '>Name</p> </TableCell>
                <TableCell align='center' ><p className='font-bold '>Create Category</p></TableCell>
              </TableRow>

              {categories.map((c) => (
                <TableRow >
                  <TableCell key={c._id}>{c.name}</TableCell>
                  <TableCell  align='center' >
                    <button className='bg-sky-600 px-4 py-1 rounded-lg text-white mr-4 ' onClick={()=>handleOpen(c)} >EDIT</button>
                    <button className='bg-red-600 px-4 py-1 rounded-lg text-white  ' onClick={()=>handleDelete(c._id)} >DEL</button>
                  </TableCell>

                </TableRow>
              ))}

            </TableHead>
          </Table>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            
          >
            <Box>
              <Typography sx={{width:"full",marginTop:"20%",marginLeft:"45%",color:"wheat"}} id="transition-modal-title" variant="h6" component="h2">
                Update category
              </Typography>
              <Box sx={{width:"20%",marginLeft:"38%"}} >
                <CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate} />
              </Box>
            </Box>
          </Modal>
        </div>
      </div>
    </Layout>
  )
}
