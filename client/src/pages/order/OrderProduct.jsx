import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetProductByIdQuery } from '../../redux/services/productApiSlice';
import { useFirebase } from '../../firebase/firebase';
import axios from 'axios';

const OrderProduct = () => {
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

  const loadRazorpayScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const res = await loadRazorpayScript('https://checkout.razorpay.com/v1/checkout.js');

    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }

    const result = await axios.post('http://localhost:7000/create-order', {
      amount: totalPrice, // amount in INR
      currency: 'INR'
    });

    if (!result) {
      alert('Server error. Are you online?');
      return;
    }

    const { amount, id: order_id, currency } = result.data;

    const options = {
      key: 'YOUR_KEY_ID', // Enter the Key ID generated from the Dashboard
      amount: amount.toString(),
      currency: currency,
      name: 'Test Company',
      description: 'Test Transaction',
      order_id: order_id,
      handler: async (response) => {
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature
        };

        // Send the response to your backend for verification
        const verifyResult = await axios.post('http://localhost:5000/verify-payment', data);
        if (verifyResult.data.status === 'success') {
          alert('Payment successful!');
        } else {
          alert('Payment verification failed.');
        }
      },
      prefill: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        contact: '9999999999'
      },
      notes: {
        address: 'Some Address'
      },
      theme: {
        color: '#61dafb'
      }
    }

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!product) return <div>No product found</div>;

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
        </div>
      </div>
      <button className='bg-pink-600 mt-[5rem] w-[80%] ml-[10rem] p-1 rounded-full bg-opacity-20 hover:bg-opacity-100' onClick={handlePayment}>Click to order</button>
    </>
  );
}

export default OrderProduct;
