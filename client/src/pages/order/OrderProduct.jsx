import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetProductByIdQuery } from '../../redux/services/productApiSlice';
import { useFirebase } from '../../firebase/firebase';
import PayPal from '../../components/PayPal';
import { toast } from 'react-toastify';

const OrderProduct = () => {
  
  const [checkout,setCheckout] = useState(false)
  const [img, setImage] = useState('');
  const [quantity, setQuantity] = useState('');
  const [address, setAddress] = useState('');
  const [postCode, setPostalCode] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [totalPrice, setTotalPrice] = useState('');
  const [taxPrice, setTaxPrice] = useState('');

  const { id } = useParams();
  console.log(id);
  const firebase = useFirebase();

  const { data: product, error, isLoading } = useGetProductByIdQuery(id);
  console.log(product);

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

  const navigate= useNavigate()
  const handleSuccess = (order) => {
    console.log('Order successful: ', order);
    toast.success(`Order successful with id:${order.id}`)
    navigate('/products')
  };

  return (
    <>
      <div className='flex justify-center ml-5 mr-5 mt-2'>
        <div className='w-[45%] '>
          <h1 className='mt-5 text-center font-bold text-2xl text-green-600'>Check details</h1>
          <div className='flex mt-5'>
            <div>
              <img src={img} alt={product._id} className='w-[7rem]' />
            </div>
            <div className='ml-6 mt-5'>
              <h1 className='text-pink-600 font-bold'>{product.name}</h1>
              <p className='w-[30rem] text-[#868686]'>{(product.description).substring(0, 160)}</p>
            </div>
          </div>
          <div className='mt-1'>
            <div className='flex flex-col'>
              <label className='font-bold text-pink-600'>Quantity</label>
              <input type="number"
                value={quantity}
                onChange={e => setQuantity(e.target.value)}
                className='bg-[#161616] border-b focus:outline-none pl-2 w-[20rem]' min="1" max={product.stock} />
            </div>
            <h1 className='text-blue-600 font-bold text-2xl mt-5 border-b mb-2'>Address</h1>

            <div className="flex flex-wrap">
              <div className='flex flex-col'>
                <label className='font-bold text-pink-600'>Address</label>
                <input type="text"
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  className='bg-[#161616] border-b focus:outline-none pl-2 w-[20rem]' min="1" max={product.stock} />
              </div>
              <div className='flex flex-col ml-5'>
                <label className='font-bold text-pink-600'>City</label>
                <input type="text"
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  className='bg-[#161616] border-b focus:outline-none pl-2 w-[20rem]' min="1" max={product.stock} />
              </div>
            </div>
            <div className="flex flex-wrap mt-5">
              <div className='flex flex-col'>
                <label className='font-bold text-pink-600'>Postal Code</label>
                <input type="number"
                  value={postCode}
                  onChange={e => setPostalCode(e.target.value)}
                  className='bg-[#161616] border-b focus:outline-none pl-2 w-[20rem]' min="1" max={product.stock} />
              </div>
              <div className='flex flex-col ml-5'>
                <label className='font-bold text-pink-600'>Country</label>
                <input type="text"
                  value={country}
                  onChange={e => setCountry(e.target.value)}
                  className='bg-[#161616] border-b focus:outline-none pl-2 w-[20rem]' min="1" max={product.stock} />
              </div>
            </div>
            <div className="w-full mt-2">
              <div className='flex flex-col  w-[98%]'>
                <label className='font-bold text-pink-600'>Phone No.</label>
                <input type="number"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className='bg-[#161616] border-b focus:outline-none pl-2 w-full' min="1" max={product.stock} />
              </div>
            </div>
          </div>
        </div >
        <div className='w-[40%]'>
          <h1 className='mt-5 text-center font-bold text-2xl text-green-600'>Payment method</h1>
          <div className=' ml-5'>
            <div className='flex justify-between mt-5 w-[70%] ml-[6rem]'>
              <p className='font-bold'>Price</p>
              <p>Rs. {product.price}</p>
            </div>
            <div className='flex justify-between mt-5 w-[70%] ml-[6rem]'>
              <p className='font-bold'>Tax Price</p>
              <p>Rs. {taxPrice}</p>
            </div>
            <div className='flex justify-between mt-5 w-[70%] ml-[6rem]'>
              <p className='font-bold'>Shippment Price</p>
              <p>Rs.20</p>
            </div>
            <div className='flex justify-between mt-5 w-[80%] ml-[6rem] border-t'>
              <p className='font-bold'>Total Price</p>
              <p className='mr-14'>Rs.{totalPrice}</p>
            </div>
          </div>
          <div className='ml-[10rem] '>
            {checkout?(
              <PayPal amount={product.price} onSuccess={handleSuccess} />      ):(
              <button onClick={()=>setCheckout(true)} className='bg-orange-400 w-[20rem] mt-2 rounded-md p-1 hover:bg-blue-600'>Checkout</button>
            )}
          </div>
        </div>
      </div>
      {/* <button className='bg-pink-600 mt-[5rem] w-[80%] ml-[10rem] p-1 rounded-full bg-opacity-20 hover:bg-opacity-100' onClick={handlePayment}>Click to order</button> */}
    </>
  );
}

export default OrderProduct;
