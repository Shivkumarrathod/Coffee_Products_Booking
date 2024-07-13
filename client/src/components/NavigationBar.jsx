import {Link, useNavigate} from 'react-router-dom'
import { PiUserCircleFill } from "react-icons/pi";
import { useEffect, useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { logout } from '../redux/feauter/auth/authSlice';
const NavigationBar = () => {
  
  const [userLoggedIn,setUserLoggedIn] = useState(false)
  const [selectLoginOption,setSelectLoginOption] = useState(false)
  const [showLogout,setShowLogout] = useState(false)
  const [isAdmin,setIsAdmin] = useState(false)
  const {userInfo} = useSelector(state=>state.auth)
  
  useEffect(()=>{
    if (userInfo) {
      setUserLoggedIn(true)
      if (userInfo.isAdmin||userInfo.data?.isAdmin) {
        setIsAdmin(true)
      }else{
        setIsAdmin(false)
      }
    }
  },[userInfo,userLoggedIn,isAdmin])

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout =()=>{
    try {
      dispatch(logout())
      setUserLoggedIn(!userLoggedIn)
      setIsAdmin(false)
      navigate('/login')
    } catch (error) {
      console.log(error?.data?.message||error.message);
    }
  }
  return (
    <div className='w-full  h-[3.4rem] flex justify-center'>
       <div className='w-[95%] border-b flex items-center'>

        <div className='w-[20%] '>
          <Link to='/' className='flex items-center justify-center '>
            <h1 className='font-bold text-3xl text-red-600 hover:text-white'>Coffee</h1>
            <p className='ml-1 mt-2 font-bold hover:text-red-600'>Products</p>
          </Link>
        </div>
        <div className="w-[70%] flex gap-10">
          <Link to='/' className='border-b-6 hover:border-b hover:border-white hover:text-red-500 font-bold '>Home</Link>
          <Link to='/products' className='border-b-6 hover:border-b hover:border-white hover:text-red-500 font-bold '>Products</Link>
          {userInfo&&(
            <Link to={`/cart/${userInfo.data._id}`} className='border-b-6 hover:border-b hover:border-white hover:text-red-500 font-bold '>Cart</Link>
          )}
          {isAdmin&&(<>
            <Link to='/admin/product' className='border-b-6 hover:border-b hover:border-white hover:text-red-500 font-bold '>Create Product</Link>
            <Link to='/admin/category' className='border-b-6 hover:border-b hover:border-white hover:text-red-500 font-bold '>Create Category</Link>
            {/* <Link to='/' className='border-b-6 hover:border-b hover:border-white hover:text-red-500 font-bold '>Cart</Link> */}
          </>
          )}
          {/* <Link to='/' className='border-b-6 hover:border-b hover:border-white hover:text-red-500 font-bold '>Home</Link> */}
        </div>
        <div className='w-[10%] p-1'>
                <div onClick={()=>{setSelectLoginOption(!selectLoginOption)
                  setShowLogout(!showLogout)
                }} className='cursor-pointer'>
                  <PiUserCircleFill size={32}  className='ml-[2rem] font-bold hover:text-red-600  '/>
                </div>
          {userLoggedIn?(
            <>
             {showLogout&&(
              <div className='absolute mt-5 -ml-[5rem]  w-[10rem] flex flex-col p-1'>
                <button
                  onClick={handleLogout}
                  className='text-center font-semibold p-1 border-b hover:text-red-600 border rounded-full' 
                >Logout</button>
             </div>
             )}
            </>
          ):(
            <>
                {
                 selectLoginOption&&(
                  <div className='absolute mt-5 -ml-[5rem]  w-[10rem] flex flex-col p-1'>
                    <Link to='/login' className='text-center font-semibold p-1 border-b hover:text-red-600 border rounded-full' onClick={()=>setSelectLoginOption(!setSelectLoginOption)}>Login</Link>
                    <Link to='/signup' className='text-center font-semibold  mt-1 p-1 hover:text-red-600 border rounded-full 'onClick={()=>setSelectLoginOption(!setSelectLoginOption)}>Create one</Link>
                  </div>
                 )
                }
            </>
          )}
        </div>
       </div>
    </div>
  )
}

export default NavigationBar