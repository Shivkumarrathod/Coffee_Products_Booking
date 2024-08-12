import React, { useEffect, useRef } from 'react';

const PayPal = ({ amount, onSuccess }) => {
  const paypalRef = useRef();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=AVwuooMPCTltxNfcm_UN2uz9CZBpHd9gm1y4x_aCLUUc7IhRrOOym5CS-GCcWDlXFL_jy8yEdezG2-3-&currency=CAD`; // Replace YOUR_CLIENT_ID with your actual PayPal client ID
    script.addEventListener('load', () => {
      if (window.paypal && paypalRef.current) {
        window.paypal.Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    currency_code: 'CAD',
                    value: amount,
                  },
                },
              ],
            });
          },
          onApprove: async (data, actions) => {
            const order = await actions.order.capture();
            onSuccess(order);
          },
          onError: (err) => {
            console.error(err);
          },
        }).render(paypalRef.current);
      }
    });

    document.body.appendChild(script);

    // Cleanup on unmount
    return () => {
      document.body.removeChild(script);
    };
  }, [amount, onSuccess]);

  return <div className='w-[20rem] mt-5' ref={paypalRef}></div>;
};

export default PayPal;
