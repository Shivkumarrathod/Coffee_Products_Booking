import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetProductByIdQuery } from '../../redux/services/productApiSlice';
import { useFirebase } from '../../firebase/firebase';
import PayPal from '../../components/PayPal';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useCreateOrderMutation } from '../../redux/services/orderApiSlice';

const OrderProduct = () => {
  
  const [checkout,setCheckout] = useState(false)
  const [img, setImage] = useState('');
  const [totalPrice, setTotalPrice] = useState('');
  const [taxPrice, setTaxPrice] = useState('');
  const [address,setAddress] = useState('')

  const { id } = useParams();
  const firebase = useFirebase();

  const { data: product, error, isLoading } = useGetProductByIdQuery(id);

  const {userInfo} = useSelector(state=>state.auth)
  useEffect(() => {
    const getImage = async () => {
      if (product && product.image) {
        const imgUrl = await firebase.getImage(product.image);
        const price = product.price * 0.03 + 20 + product.price;
        setTaxPrice(product.price * 0.03);
        setTotalPrice(price);
        setImage(imgUrl);
      }
    };
    getImage();
  }, [product, firebase]);

  const [createOrder] = useCreateOrderMutation();
  
  const navigate= useNavigate()
  const handleSuccess = async(order) => {
    try {
      const paymentMethod="PayPal"
      const createdOrder = await createOrder({product:product._id,user:userInfo.data._id,toAddress:address,paymentMethod,paymentResult:order})
      console.log(createdOrder);
    } catch (error) {
      console.log(error);
    }
    console.log('Order successful: ', order);
    navigate('/products')
  };
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!product) return <div>No product found</div>;
  return (
    <>
      <div className='flex justify-center ml-5 mr-5'>
        <div className='w-[20%]'>
          <div className='flex mt-[10rem] justify-center  p-1'>
          <img src={img} alt={product._id} className='w-[40rem] shadow-2xl rounded-lg shadow-yellow-600' />
        </div>
        </div>
        <div className='w-[50rem] ml-[5rem]'>
          <div className='w-[60%] '>
            <div className='flex mt-[5rem] '>
              <div className='ml-6 mt-5'>
                <h1 className='text-pink-600 font-bold'>{product.name}</h1>
                <p className='w-[30rem] text-[#868686]'>{(product.description).substring(0, 160)}</p>
              </div>
            </div>  
        </div >
        <div className='mt-5'>
              <h1 className='font-semibold text-2xl mt-5  mb-2 ml-5'>Address</h1>
              <textarea name="text"
              value={address}
              onChange={(e)=>setAddress(e.target.value)}
               placeholder='Enter the address....' className='bg-[#161616] w-[40rem] ml-5 p-2 focus:outline-none'></textarea>
        </div>
        <div className='ml-2'>
          <div className='ml-[2rem]'>
            <div className='flex justify-between mt-5 w-[70%] '>
              <p className='font-bold'>Price</p>
              <p>Rs. {product.price}</p>
            </div>
            <div className='flex justify-between mt-5 w-[70%] '>
              <p className='font-bold'>Tax Price</p>
              <p>Rs. {taxPrice}</p>
            </div>
            <div className='flex justify-between mt-5 w-[70%]'>
              <p className='font-bold'>Shippment Price</p>
              <p>Rs.20</p>
            </div>
            <div className='flex justify-between mt-5 w-[80%] border-t'>
              <p className='font-bold'>Total Price</p>
              <p className='mr-14'>Rs.{totalPrice}</p>
            </div>
          </div>
          <div className='w-full '>
            {checkout?(
              <PayPal amount={product.price} onSuccess={handleSuccess} />      ):(
              <button onClick={()=>setCheckout(true)} className='bg-orange-400 w-[82%] ml-[1rem] mt-5 rounded-md p-1 hover:bg-blue-600'>Checkout</button>
            )}
          </div>
        </div>
      </div>
        </div>
        
      {/* <button className='bg-pink-600 mt-[5rem] w-[80%] ml-[10rem] p-1 rounded-full bg-opacity-20 hover:bg-opacity-100' onClick={handlePayment}>Click to order</button> */}
    </>
  );
}

export default OrderProduct;
