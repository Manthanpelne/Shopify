import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { selectCurrentOrder } from "../features/orders/orderSlice";
import { useSelector } from "react-redux";
import { CheckoutForm } from "./checkoutForm";
import "../stripe.css";
import { Link } from "react-router-dom";


// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(import.meta.env.VITE_PRIVATE_KEY);

export default function StripeCheckout() {
  const [clientSecret, setClientSecret] = useState("");
  const currentOrder = useSelector(selectCurrentOrder)

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("http://localhost:8080/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({totalAmount:currentOrder.totalAmount, orderId:currentOrder.id})
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="Stripe">
       <div className='flex justify-between bg-gray-800 mt-2'>
        <h1 className=" text-white m-4 p-1 text-[14px] mt-3 font-semibold">CHECKOUT</h1>
        <Link to="/"><h1 className='text-white m-4 p-1 text-[14px] mt-3 font-semibold'>HOME</h1></Link>
      </div>

      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}