import React from 'react'
import { useSelector } from 'react-redux'

const User = () => {

    const {userInfo} = useSelector(state=>state.auth)
    const {data} = userInfo
  return (
    <div className='w-[80%] h-[90vh] flex justify-center items-center'>
        {data.username}
        <h1 className='ml-5 text-red-600'>{data.email}</h1>
    </div>
  )
}

export default User