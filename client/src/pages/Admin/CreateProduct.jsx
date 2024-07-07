import React, { useState } from 'react'
import {useGetProductsQuery} from '../../redux/services/productApiSlice'

const CreateProduct = () => {
  const {data:product,isError,isLoading,refetch} = useGetProductsQuery()

  const [allProducts,setAllProducts] = useState(true)
  const [createProduct,setCreateProduct] = useState(false)

  return (
    <div className='w-full flex'>
      <div className='bg-[#161616] w-[12%] h-[90vh] flex flex-col p-2 mt-2 ml-9'>
        <div className='text-center mt-2  hover:opacity-70 cursor-pointer  p-1' onClick={()=>{setAllProducts(true);setCreateProduct(false)}}>All products</div>
        <div className='text-center mt-2  hover:opacity-70 cursor-pointer  p-1' onClick={()=>{setAllProducts(false);setCreateProduct(true)}}>Create Product</div>
      </div>
      <div className='bg-[#161616] w-[82%] ml-5 mt-2 '>
        {allProducts&&(
          <div>
              all Products
          </div>
        )}
        {createProduct&&(
          <div className='flex'>
               <div className='w-[65%]  h-[90vh] p-5'>
                <div className='flex justify-around'>
                  <div className='flex flex-col'>
                    <label>Product Name</label>
                    <input type="text" className='w-[22rem]' />
                  </div>
                  <div className='flex flex-col'>
                    <label>Brand</label>
                    <input type="number" className='w-[22rem]' />
                  </div>
                </div>

                <div className='flex justify-around'>
                  <div className='flex flex-col'>
                    <label>Stock</label>
                    <input type="text" className='w-[22rem]' />
                  </div>
                  <div className='flex flex-col'>
                    <label>Price</label>
                    <input type="number" className='w-[22rem]' />
                  </div>
                </div>
               </div>
               <div className='w-[35%]  h-[90vh] ml-2'>
                 <input type="file" />
               </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CreateProduct