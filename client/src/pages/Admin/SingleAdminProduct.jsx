import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CiHeart } from "react-icons/ci";
import { useAddToCartMutation } from '../../redux/services/cartApiSlice';
import { useSelector } from 'react-redux';
import { useFirebase } from '../../firebase/firebase';


const SingleAdminProduct = ({p}) => {
  const [image,setImage]  = useState('')

  const firebase = useFirebase()

  const getImage = async()=>{
    const imageUrl = await firebase.getImage(p.image)
    setImage(imageUrl)
  }
  getImage()
  
  const [addToCart] = useAddToCartMutation()

  const {userInfo} = useSelector(state=>state.auth)
  const navigate = useNavigate()

  const handleAddCart=async()=>{
     try {
       const result = await addToCart({product:p._id,user:userInfo.data._id}).unwrap()
       console.log(result);
       navigate(`/cart/${userInfo.data._id}`)
     } catch (error) {
      console.log(error.message);
      navigate(`/cart/${userInfo.data._id}`)
     }
  }
  return (
    <div className='w-[16rem] m-3 p-1 cursor-pointer'>
      <Link to={`/product/${p._id}`}>
        <div className='w-full flex justify-center'>
          <img src={image} alt={p._id} className='w-[13rem] h-[15rem] shadow-2xl shadow-[#262626] hover:shadow-pink-500' />
        </div>
      </Link>
      <div>
          <Link to={`/product/${p._id}`}>
            <h1 className='font-bold text-[#F4D03F] p-1 text-center'>{p.name}</h1>
          </Link>
        {/* <p className='text-[#E5E7E9]'>{(p.description).substring(0,60)}...</p> */}
          <Link to={`/product/${p._id}`}>
              <div className="flex justify-between">
                <h1 className='text-green-600 font-bold p-1 ml-4 mb-3 '>Rs.{p.price+"  "}<span className='text-white font-semibold '>/pcs</span></h1>
                <h1 className='mr-5 mt-2'><CiHeart size={22}/></h1>
              </div>  
          </Link>
          <div className="flex justify-between">
            <button className='bg-pink-600 bg-opacity-20 p-1 rounded-full w-[8rem]  ml-6 hover:bg-opacity-100' onClick={handleAddCart}>Update</button>
            <button className='bg-pink-600 bg-opacity-20 p-1 rounded-full w-[8rem] ml-6 hover:bg-opacity-100' onClick={handleAddCart}>delete</button>
          </div>
      </div>
    </div>          
  ) 
}  
export default SingleAdminProduct