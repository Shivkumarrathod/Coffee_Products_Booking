import { useState } from "react"
import {useCreateCategoryMutation, useGetCategoriesQuery} from '../../redux/services/categoryapiSlice'

const CreateCategory = () => {
    const {data:category,isError,isLoading,refetch} = useGetCategoriesQuery()
    const [name,setName] = useState('')
    const [createCategory] = useCreateCategoryMutation()

    const handleCreateCategory = async()=>{
       try {
        const res = await createCategory({name}).unwrap()
        refetch()
       } catch (error) {
        console.log(error);
       }
    }
  return (
    <div className="flex justify-center items-center w-full h-[40rem]">
       <div className="w-[90%]  h-[35rem] border">
         <div className="flex  items-center h-[3rem]  font-bold ml-5">
            <div  className={`border-b border-b-2 cursor-pointer p-1 border-red-600  w-[90%] text-center ml-[2.5rem]`}>All Categories</div>
         </div>
                    <div className="ml-[4.4rem] w-full mt-5 flex">
                        <input type="text"
                          value={name}
                          onChange={(e)=>setName(e.target.value)}
                          className="w-[35rem] p-1 border-b bg-[#161616] rounded focus:outline-none pl-3" placeholder="Create Category"/>
                        <button 
                        onClick={handleCreateCategory}
                        className="ml-10 bg-blue-600 p-1 rounded-lg px-5">Create Category</button>
                    </div>
              {isLoading? isError?<div>Eorror accured!</div>:(<div>Loading....</div>):(
                <>
                  <div className="mt-2 ml-[4rem] flex flex-wrap">
                    {category?.map((c)=>(
                        <div key={c._id} className="m-2 bg-blue-500 p-1 rounded-md px-6">{c.name}</div>
                    ))}
                  </div>
                </>
         )}
       </div> 
    </div>
    
  )
}

export default CreateCategory