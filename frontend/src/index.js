import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { QueryClientProvider , QueryClient } from '@tanstack/react-query'
import {  Elements } from '@stripe/react-stripe-js'
import reportWebVitals from './reportWebVitals';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AuthProvider } from './AuthContext/AuthContext';

import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe("pk_test_51OtWF1SJZnL5mNpg7ByYbVbvLThmnUDMRaz5FUubYDessCBK2BTd0JG7KUeFEiVRqkiMVKud1Bz0VolzvqPHo91Y00kibuYLwg")
const option =  {
  mode : "payment",
  currency : "inr",
  amount : 2024
  }
const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient()
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Elements stripe={stripePromise} options={option}>
    <     App />

        </Elements>
      </AuthProvider>
    <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
