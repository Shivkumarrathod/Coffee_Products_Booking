import React, { useState } from 'react'
import {useGetLatestProductQuery} from '../redux/services/productApiSlice'
import {useFirebase} from '../firebase/firebase'
import SingleProduct from '../components/SingleProduct'
import { FiInstagram } from "react-icons/fi";
import { FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const Home = () => {
  return (
   <>
     <div className=' w-full mb-[5rem] flex mt-10' >
      <div className="w-[60%] flex justify-between mt-[6rem]">
        <div className='w-[5%]  flex flex-col p-2 items-center justify-center cursor-pointer'>
          <FiInstagram className='p-1 m-2' size={30}/>
          <FaGithub className='p-1 m-2' size={30}/>
          <FaXTwitter className='p-1 m-2' size={30}/>
        </div>
       <div className='w-[82%] mt-10'>
            <h1 className='font-cursive font-semibold text-5xl'>best coffee</h1>
            <h1 className='text-4xl text-orange-500 mb-1 font-bold'>Make <span className='text-white font-semibold'>your day</span> great</h1>
            <h1 className='text-5xl font-sans'>with our <span className='text-orange-500'>coffee!</span></h1>
            <p className='font-sans mt-2 w-[80%] ml-1 mb-3'>Welcome to Coffe Products, where every cup tells a story. 
              Our coffee is meticulously sourced from the finest beans around the world. Join us on a journey of coffee excellence, and experience the art of brewing perfection. Discover your favorite blend today and elevate your coffee moments to new heights. </p>
            <Link to='/products' className='bg-orange-600 p-2 mt-5 rounded-full p-1 bg-opacity-20 hover:bg-opacity-100 px-3'>See More Products</Link>
       </div>
      </div>
       <div className='p-1 mt-12 rounded-full drop-shadow-5xl shadow-custom-mixed'>
         <img src="/coffee.jpg" alt="home image" className='rounded-full w-[27rem] h-[26rem] shaddow-lg'/>
       </div>
    </div>
    <div className='h-[20rem] w-full bg-[#161616]'>

    </div>
   </>
  )
}

export default Home