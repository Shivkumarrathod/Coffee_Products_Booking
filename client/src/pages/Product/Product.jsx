import React from 'react'
import { useGetProductsQuery } from '../../redux/services/productApiSlice'
import SingleProduct from '../../components/SingleProduct'
const Product = () => {
    const {data:product} = useGetProductsQuery()

  return (
    <div>
      <div className='w-full flex '>
        <div className='w-[18%]  ml-5 mt-5'>
           
        </div>
        <div >
          <h1 className='font-bold text-pink-500 ml-[3.3rem] mt-4 text-2xl border-b border-white w-[90%]'>All Products</h1>
          <div className='w-[99%] flex flex-wrap ml-[2rem]'>
              {product?.map((p)=>(
              <div key={p._id} className='m-2'>
                <SingleProduct p={p}/>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product