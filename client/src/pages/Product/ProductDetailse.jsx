import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetProductByIdQuery } from '../../redux/services/productApiSlice';
import { useFirebase } from '../../firebase/firebase';
import { CiHeart } from "react-icons/ci";
import {useAddToCartMutation} from '../../redux/services/cartApiSlice'
import { useSelector } from 'react-redux';

const ProductDetailse = () => {
  const { id } = useParams();
  const firebase = useFirebase();
  const { data: product, error, isLoading } = useGetProductByIdQuery(id);
  const [img, setImg] = useState('');
  
  const [addToCart] = useAddToCartMutation()

  useEffect(() => {
    const getImage = async () => {
      if (product && product.image) {
        const imgUrl = await firebase.getImage(product.image);
        setImg(imgUrl);
      }
    };
    getImage();
  }, [product, firebase]);


  const {userInfo} = useSelector(state=>state.auth)
  const navigate = useNavigate()

  const handleAddToCart =async()=>{
      try {
        const res = await addToCart({product:product._id,user:userInfo.data._id}).unwrap()
        console.log(res);
        navigate(`/cart/${userInfo.data._id}`)
      } catch (error) {
        console.log(error.message);
      }
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!product) return <div>No product found</div>;

  return (
    <div className='flex h-[90vh]'>
      <div className='p-1 flex items-center justify-center w-[40%] '>
        <img src={img} alt={product._id} className='w-[20rem] shadow-2xl rounded-lg shadow-yellow-600' />
      </div>
      <div className='mt-[9rem] w-[50%]'>
        <div>
          <div className="flex justify-between">
            <h1 className='font-bold text-2xl'><span className='text-pink-500 '>Name</span>:{"   " + product.name}</h1>
            <button className='text-pink-600'><CiHeart size={28} /></button>
          </div>
          <p className='mt-1'><span className='text-pink-500 '>About Product</span>:{product.description}</p>
          <div className="flex justify-around mt-5">
            <h1 className='mt-5 '><span className='text-pink-500 p-1'>Brand</span>: {product.brand}</h1>
            <h1 className='mt-5 '><span className='text-pink-500 p-1'>Quantity</span>: {product.quantity}</h1>
            <h1 className='mt-5 '><span className='text-pink-500 p-1'>stock</span>: {product.stock}</h1>
          </div>
          <div className="flex justify-between">
            <h1 className='mt-[5rem] font-bold text-2xl'><span className='text-pink-600'>Price</span>: Rs.{product.price}</h1>
            <button className='bg-blue-600 h-[2rem] w-[11rem] mt-20 rounded-full bg-opacity-20 hover:bg-opacity-100' onClick={handleAddToCart}>Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default  ProductDetailse