import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CiHeart } from "react-icons/ci";

import { useFirebase } from '../firebase/firebase'
import { useDeleteCartProductMutation } from '../redux/services/cartApiSlice';
import { useSelector } from 'react-redux';

const SingleCart = ({p,refetch,_id}) => {
    
    const [image,setImage]  = useState('')
    const firebase = useFirebase()

    const getImage = async()=>{
      const imageUrl = await firebase.getImage(p.image)
      setImage(imageUrl)
    }
    getImage()

    const [deletFromCart] = useDeleteCartProductMutation()
  
    const {userInfo} = useSelector(state=>state.auth)
  
    const handleRemoveFromCart=async()=>{
       try {
          await deletFromCart({_id}).unwrap()
          console.log("removed");
          refetch()
       } catch (error) {
        console.log(error.message);
       }
    }
    return (
      <div className='w-[16rem] m-3 p-1 cursor-pointer flex w-[80%] ml-[5rem]'>
        <Link to={`/product/${p._id}`} className='w-[10%]'>
          <div className='w-full flex justify-center'>
            <img src={image} alt={p._id} className='w-[7rem] h-[9rem] shadow-2xl shadow-[#262626] hover:shadow-pink-500' />
          </div>
        </Link>
        
        <div className='w-[70%] ml-5'>
            <Link to={`/product/${p._id}`} className='w-[10%]'>
              <div className="flex justify-between ">
                  <h1 className='font-bold text-[#F4D03F] p-1 ml-8'>{p.name}</h1>
                  <h1 className='mr-5 mt-2 hover:text-blue-600'><CiHeart size={22}/></h1>
              </div>
            </Link>
            
            <Link to={`/product/${p._id}`} className='w-[10%]'>
              <p className='text-[#E5E7E9] ml-8 w-[30rem]'>{(p.description).substring(0,130)}...</p>
            </Link>
          {/* <div className="flex justify-between">
          </div> */}
          <div className="flex justify-between">
             <h1 className='text-green-600 font-bold p-1 ml-4 mb-3 mt-8 hover:bg-[#161616] p-1 rounded-full px-5'>Rs.{p.price+"  "}<span className='text-white font-semibold '>/pcs</span></h1>
            <button className=' mt-8 bg-pink-600 bg-opacity-20 p-1 rounded-full w-[20%]  hover:bg-opacity-100' onClick={handleRemoveFromCart}>Remove from cart</button>
          </div>
        </div>
      </div>          
    ) 
}

export default SingleCart