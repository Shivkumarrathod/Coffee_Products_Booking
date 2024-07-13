import React, { useRef, useState,useNavigate } from 'react'
import {useGetProductsQuery,useCreateProductMutation} from '../../redux/services/productApiSlice'
import {useGetCategoriesQuery} from '../../redux/services/categoryapiSlice'
import SingleProduct from '../../components/SingleProduct'
import { useFirebase } from '../../firebase/firebase'

const CreateProduct = () => {
  const {data:product,isError,isLoading,refetch} = useGetProductsQuery()
  const {data:cat} = useGetCategoriesQuery()

  const [allProducts,setAllProducts] = useState(true)
  const [createProduct,setCreateProduct] = useState(false)
   

  const firebase = useFirebase()

  const [ProductCreation] = useCreateProductMutation()

  //product detailse
  const [name,setName] = useState('')
  const [description,setDescription] = useState('')
  const [stock,setStock] = useState('')
  const [brand,setBrand] = useState('')
  const [price,setPrice] = useState('')
  const [quantity,setQuantity] = useState('')
  const [category,setCategory] = useState('')
  const [image,setImage] = useState('')
  const [imageUrl,setImageUrl] = useState('')
 
  const fileInputref = useRef(null)
  const handleSubmit = async ()=>{
    try{
      const imageResult = await firebase.uploadImage(image,'products')
      console.log(imageResult);
      const product = await ProductCreation({name,image:imageResult,description,brand,quantity,stock,category,price})
      console.log(product);
      setName('')
      setDescription('')
      setCategory('')
      setImage('')
      setBrand('')
      setPrice('')
      setQuantity('')
      setStock('')
      refetch()
    } catch (error) {
      console.error(error)
    }
}
  const handleImage=()=>{
    fileInputref.current.click()
  }

  return (
    <div className='w-full flex'>
      <div className='bg-[#161616] w-[12%] h-[90vh] flex flex-col p-2 mt-2 ml-9'>
        <div className={`text-center mt-2  hover:opacity-70 cursor-pointer  p-1 ${allProducts?'bg-pink-800 bg-opacity-40 rounded-md':''}`} onClick={()=>{setAllProducts(true);setCreateProduct(false)}}>All products</div>
        <div className={`text-center mt-2  hover:opacity-70 cursor-pointer  p-1 ${createProduct?'bg-pink-800 bg-opacity-40 rounded-md':''}`} onClick={()=>{setAllProducts(false);setCreateProduct(true)}}>Create Product</div>
      </div>
      <div className='bg-[#161616] w-[82%] ml-5 mt-2 '>
        {allProducts&&(
          <div className='flex flex-wrap'>
              {product?.map((p)=>(
                <div key={p._id}>
                  <SingleProduct p={p}/>
                </div>
              ))}
          </div>
        )}
        {createProduct&&(
          <div className='flex'>
               <div className='w-[65%]  h-[80vh] p-5 mt-10'>
                <div className='flex justify-around mb-5  '>
                  <div className='flex flex-col'>
                    <label className='font-semibold'>Product Name</label>
                    <input type="text" value={name} onChange={(e)=>setName(e.target.value)} className='w-[22rem] bg-black border-b mt-2 p-1 pl-2 focus:outline-none' placeholder='Enter Product Name' />
                  </div>
                  <div className='flex flex-col'>
                    <label className='font-semibold'>Brand</label>
                    <input type="text" value={brand} onChange={(e)=>setBrand(e.target.value)} className='w-[22rem] bg-black border-b mt-2 p-1 pl-2 focus:outline-none' placeholder='Enter Brand' />
                  </div>
                </div>

                <div className='flex justify-around mb-5 '>
                  <div className='flex flex-col'>
                    <label className='font-semibold'>Quantity</label>
                    <input type="number" value={quantity} onChange={(e)=>setQuantity(e.target.value)} className='w-[22rem] bg-black border-b mt-2 p-1 pl-2 focus:outline-none' placeholder='Enter Quantity' />
                  </div>
                  <div className='flex flex-col'>
                    <label className='font-semibold'>Price</label>
                    <input type="number" value={price} onChange={(e)=>setPrice(e.target.value)} className='w-[22rem] bg-black border-b mt-2 p-1 pl-2 focus:outline-none' placeholder='Enter Price' />
                  </div>
                </div>
                <div className='flex justify-around mb-5 '>
                  <div className='flex flex-col'>
                    <label className='font-semibold mt-1'>Category</label>
                    <select onChange={e=>setCategory(e.target.value)} placeholder='Select category'  className='bg-black w-[22rem] p-1 mt-2 pl-2 border-b focus:outline:none cursore-pointer'>
                      {cat.map((c)=>(
                         <option value={c._id} onChange={(e)=>setCategory(e.target.value)} className='focus:outline-none cursor-pointer' key={c._id}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className='flex flex-col'>
                    <label className='font-semibold'>Stock</label>
                    <input type="number" value={stock} onChange={(e)=>setStock(e.target.value)} className='w-[22rem] bg-black border-b mt-2 p-1 pl-2 focus:outline-none' placeholder='Enter Price' />
                  </div>
                </div>
                 <div>
                  <textarea value={description} onChange={(e)=>setDescription(e.target.value)} className='w-[96%] ml-4 h-[10rem] bg-black pl-5 p-2 focus:outline-none' placeholder='Write something about product'></textarea>
                 </div>
                  <div className='w-full flex justify-center'>
                    <button className='w-[80%] hover:bg-red-600 bg-blue-600 mt-10 p-1 rounded-lg' onClick={handleSubmit}>Create product</button>
                  </div>
               </div>
               <div className='w-[35%]  h-[90vh] ml-2'>
                   <div>
                    {image?(
                        <div className='w-full flex justify-center items-center h-[80vh]'>
                           <img src={URL.createObjectURL(image)} alt={'product'} className='mt-2 p-2 w-[25rem] border' />
                        </div>
                    ):(
                      <div onClick={handleImage}>
                        <input type="file"
                         ref={fileInputref}
                         style={{display:'none'}}
                          name="image"   onChange={(e)=>setImage(e.target.files[0])} />
                          <div className='flex justify-center items-center w-full h-[90%] mt-[10rem]'>
                            <div className='border border-dashed w-[15rem] h-[15rem] flex justify-center items-center cursor-pointer'> add Image here</div>
                          </div>
                      </div>
                    )}
                   </div>
               </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CreateProduct