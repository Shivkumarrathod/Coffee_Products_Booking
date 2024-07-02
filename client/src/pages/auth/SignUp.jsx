import {Link} from 'react-router-dom'
import { VscAccount } from "react-icons/vsc";
import { useEffect, useState } from 'react';
import { useCreateUserMutation } from '../../redux/services/userApiSlice';
import { setCredientials } from '../../redux/feauter/auth/authSlice';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [email,setEmail] = useState('')
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')

  const [createUser] = useCreateUserMutation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

    const {userInfo} = useSelector(state=>state.auth)
    console.log(userInfo);
  useEffect(()=>{
    if(userInfo){
      navigate('/')
    }
  },[navigate,userInfo])
  const handleCreateOne=async()=>{
    try {
      const result = await createUser({username,email,password}).unwrap()
      console.log(result);
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
            <h1 className='mt-1 font-bold text-red-600'>CREATE ONE</h1>
          </div>

          <div className='flex flex-col mb-5'>
            <label className='p-1'>USER NAME</label>
            <input type="text" className='w-[25rem] rounded p-1 pl-2 bg-black border-b focus:outline-none'
             placeholder='Enter your user name'
             value={username}
             onChange={(e)=>setUsername(e.target.value)}
            />
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
            <input type="text" 
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            placeholder='Enter Password'
            className='w-[25rem] rounded  p-1 pl-2 bg-black border-b focus:outline-none'/>
          </div>
          <div className='mt-5 flex justify-between'>
            <Link to='/login'>Have an account?  <span className='text-red-600 cursor-pointer'>Login</span></Link>
            <button className='bg-blue-600 w-[5rem] p-1 rounded-full' onClick={handleCreateOne}>Crate one</button>
          </div>
      </div>
    </div>
  )
}

export default SignUp
