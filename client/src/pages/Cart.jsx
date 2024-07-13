import { useSelector } from "react-redux";
import { useGetAllUserproductsQuery } from "../redux/services/cartApiSlice"
import { useParams } from "react-router-dom";
import SingleCart from "../components/SingleCart";
import { useEffect } from "react";


const Cart = () => {
   const {id} = useParams()
   console.log(id);
   const {data:cartProduct,refetch} = useGetAllUserproductsQuery(id)
   useEffect(()=>{
    refetch()
   },[refetch])
  return (
    <div>
        {cartProduct?.map((p)=>(
            <div key={p._id} className="flex justify-center w-full mt-3">
              <SingleCart p={p.product} _id={p._id} refetch={refetch}/>
            </div>
        ))}
    </div>
  )
}

export default Cart