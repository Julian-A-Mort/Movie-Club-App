import React, { useEffect, useState } from 'react';
import '@stripe/stripe-js';
import '@stripe/react-stripe-js';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useQuery, gql } from '@apollo/client';
import { Formik, Field, Form } from 'formik';

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Alert,
  AlertIcon,
  VStack
} from '@chakra-ui/react';

const FETCH_PRICE_QUERY = gql`
  query GetPrice {
    getPrice
  }
`;



// Customize your Card Element styling
const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#aab7c4",
        },
        ":focus": {
          color: "#424770", // Darken text color slightly on focus
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
      ":hover": {
        // Example hover state styling
        boxShadow: "0 3px 6px 0 #aab7c4",
      },
    },
  };
  

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { data, loading, error } = useQuery(FETCH_PRICE_QUERY);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    if (!stripe || !elements || !data?.getPrice) {
      console.log("Stripe.js has not loaded yet.");
      return;
    }

    const amount = data.getPrice * 100; // Convert price to the smallest currency unit
    const response = await fetch('/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount }),
    });
    const paymentIntentRes = await response.json();

    const cardElement = elements.getElement(CardElement);

    const paymentResult = await stripe.confirmCardPayment(paymentIntentRes.clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: { name: values.name, email: values.email },
      },
    });

    if (paymentResult.error) {
      console.error(paymentResult.error.message);
    } else if (paymentResult.paymentIntent.status === 'succeeded') {
      console.log('Payment succeeded!');
    }

    setSubmitting(false);
    resetForm();
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;


  return (
    <Box p={4} bg="gray.100" boxShadow="sm" borderRadius="md">
      <Formik
        initialValues={{ email: '', name: '' }}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Field as={Input} id="email" name="email" placeholder="Email" />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Field as={Input} id="name" name="name" placeholder="Name on card" />
              </FormControl>
              <FormControl>
                <FormLabel>Card Details</FormLabel>
                <Box p={2} bg="white" borderRadius="md">
                  <CardElement options={CARD_ELEMENT_OPTIONS} />
                </Box>
              </FormControl>
              <Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit" disabled={!stripe || loading}>
                Pay
              </Button>
            </VStack>
          </Form>
        )}
      </Formik>
    </Box>
  );
};


export default CheckoutForm;
