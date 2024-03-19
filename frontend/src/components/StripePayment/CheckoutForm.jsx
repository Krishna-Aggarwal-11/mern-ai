import React , { useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useParams, useSearchParams } from "react-router-dom";
import { useMutation } from '@tanstack/react-query';
import { createStripePayment } from "../../api/stripePayment/stripePayment";
import StatusMessage from "../Alert/StatusMessage";

const CheckoutForm = () => {
  const param = useParams();
  const [searchParams] = useSearchParams();
  const plan = param.plan;
  const amount = searchParams.get("amount");

  const mutation =  useMutation({
    mutationFn: createStripePayment
  })


  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState(null);

  const handleSumbit = async (e) => {
    e.preventDefault();
    if (elements === null) {
      return;
    }
    const { error: submitError } = await elements.submit();
    if (submitError) {
      setErrorMessage(submitError.message);
    }
    try {
      const data = {
        plan: plan,
        amount: amount,
      };

      mutation.mutate(data);
      if (mutation?.isSuccess) {
        const { error} = await stripe.confirmPayment({
          elements,
          clientSecret: mutation?.data?.clientSecret, 
          confirmParams: {
            return_url: "http://localhost:3000/success",
          }
        })
        if (error) {
          setErrorMessage(error.message);
        }
      }
    } catch (error) {
      setErrorMessage(error.message);
      
    }
  };

  return (
    <div className="bg-gray-900 h-screen -mt-4 flex justify-center items-center">
      <form  onSubmit={handleSumbit} className="w-96 mx-auto my-4 p-6 bg-white rounded-lg shadow-md">
        <div className="mb-4">
          <PaymentElement />
        </div>
        {mutation?.isPending && (
          <StatusMessage type="loading" message="Processing payment" />
        )}
        {mutation?.isError && (
          <StatusMessage type="error" message={mutation?.error?.response?.data?.data} />
        )}
        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Pay
        </button>
        {errorMessage && <div className="text-red-500 mt-4">{errorMessage}</div>}
      </form>
    </div>
  );
};

export default CheckoutForm;
