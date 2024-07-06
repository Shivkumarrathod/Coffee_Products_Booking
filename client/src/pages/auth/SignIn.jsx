import {Link, useNavigate} from 'react-router-dom'
import { VscAccount } from "react-icons/vsc";
import { useEffect, useState } from 'react';
import { useLoginUserMutation } from '../../redux/services/userApiSlice';
import { useDispatch,useSelector } from 'react-redux';
import { setCredientials } from '../../redux/feauter/auth/authSlice';

const SignIn = () => {

  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [loginUser] = useLoginUserMutation()

  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const {userInfo} = useSelector(state=>state.auth)

  useEffect(()=>{
    if (userInfo) {
      navigate('/')
    }
  },[userInfo,navigate])
  
  const handleLogin=async()=>{
    try {
      const result = await loginUser({email,password})
      dispatch(setCredientials({...result}))
      navigate('/')
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <div className='w-full flex justify-center items-center h-[90vh]'>
      <div className='flex flex-col'>
          <div className='flex justify-center gap-2 mb-10'>
            <VscAccount size={30}/>
            <h1 className='mt-1 font-bold text-red-600'>Login</h1>
          </div>
          <div className='flex flex-col mb-5'>
            <label className='p-1'>EMAIL</label>
            <input type="text" 
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            placeholder='Enter Email'
            className='w-[25rem] rounded   p-1 pl-2 bg-black border-b focus:outline-none'/>
          </div>
          <div className='flex flex-col'>
            <label className='p-1'>PASSWORD</label>
            <input type="password" 
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            placeholder='Enter Password'
            className='w-[25rem] rounded  p-1 pl-2 bg-black border-b focus:outline-none'/>
          </div>
          <div className='mt-5 flex justify-between'>
            <Link to='/signup' className='mt-1'>Don't have an account?  <span className='text-red-600 cursor-pointer'>Create one</span></Link>
            <button className='bg-blue-600 w-[5rem] p-1 rounded-full' onClick={handleLogin}>Login</button>
          </div>
      </div>
    </div>
  )
}

export default SignIn