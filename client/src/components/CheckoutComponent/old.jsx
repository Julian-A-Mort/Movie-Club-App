// import React from 'react';
// import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
// import { gql, useQuery } from '@apollo/client';
// import { Box } from '@chakra-ui/react'; // Import Box from Chakra UI
// import client from '../../apolloClient';

// const FETCH_PRICE_QUERY = gql`
//   query GetPrice {
//     getPrice
//   }
// `;

//   //card element 
//   const CARD_ELEMENT_OPTIONS = {
//     style: {
//       base: {
//         color: "#32325d",
//         fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
//         fontSmoothing: "antialiased",
//         fontSize: "16px",
//         "::placeholder": {
//           color: "#aab7c4",
//         },
//       },
//       invalid: {
//         color: "#fa755a",
//         iconColor: "#fa755a",
//       },
//     },
//   };
  

// async function fetchPaymentIntentClientSecret(price) {
//     const response = await fetch('http://localhost:4000/create-payment-intent', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ amount: price }),
//     });
//     const data = await response.json();
//     return data.clientSecret;
//   }

// function CheckoutForm() {
//     const stripe = useStripe();
//     const elements = useElements();
  
//     const { loading, error, data } = useQuery(FETCH_PRICE_QUERY, {
//       client,
//     });
  
//     const handleSubmit = async (event) => {
//       event.preventDefault();
  
//       if (!stripe || !elements) {
//         return;
//       }
  
//       const clientSecret = await fetchPaymentIntentClientSecret(data.getPrice);
//       const result = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: elements.getElement(CardElement),
//           billing_details: {
//             name: 'Jenny Rosen',
//           },
//         },
//       });
  
//       if (result.error) {
//         console.error(result.error.message);
//       } else {
//         if (result.paymentIntent.status === 'succeeded') {
//           console.log('Payment succeeded!');
//         }
//       }
//     };
  
//     if (loading) {
//       return <p>Loading...</p>;
//     }
  
//     if (error) {
//       return <p>Error: {error.message}</p>;
//     }
  
//     return (
//         <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
//           <CardElement options={CARD_ELEMENT_OPTIONS} />
//           <button type="submit" disabled={!stripe || loading} style={{ marginTop: '20px', fontSize: '16px', cursor: 'pointer', padding: '10px 20px', border: 'none', backgroundColor: '#00a4e4', color: 'white', borderRadius: '5px' }}>
//             Pay
//           </button>
//         </form>
//       );
//     }
  
//   const CheckoutComponent = CheckoutForm;
  
//   export default CheckoutComponent;
  