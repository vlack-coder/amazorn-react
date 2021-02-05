import React, { useState, useEffect } from "react";
import "./Payment.css";
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import { Link, useHistory } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./reducer";
import axios from "./axios";
// // import { v5 as uuidv5 } from 'uuid';
// import { db } from "./firebase";
import { usePaystackPayment } from 'react-paystack';

const PaystackHookExample = () => {
  const history = useHistory();
  const [{ basket, user }, dispatch] = useStateValue();
  const config = {
    reference: (new Date()).getMilliseconds(),
    email: "user@example.com",
    amount: `${getBasketTotal(basket) * 100}`,
    publicKey: 'pk_test_62b5022242e04bcea510a48244390c6d18a4581f',
};

// you can call this function anything
const onSuccess = (reference) => {
  // Implementation for whatever you want to do with reference and after success call.
  console.log(reference);
  dispatch({
    type: "EMPTY_BASKET",
  });

  history.replace("/orders");
};

// you can call this function anything
const onClose = () => {
  // implementation for  whatever you want to do when the Paystack dialog closed.
  console.log('closed')
}

    const initializePayment = usePaystackPayment(config);
    return (
      <div>
          <button onClick={() => {
              initializePayment(onSuccess, onClose)
          }}>Paystack Hooks Implementation</button>
      </div>
    );
};

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(true);

  // useEffect(() => {
  //   // generate the special stripe secret which allows us to charge a customer
  //   const getClientSecret = async () => {
  //     const response = await axios({
  //       method: "post",
  //       // Stripe expects the total in a currencies subunits
  //       url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
  //       data: {
  //         email: 'customer@email.com',
  //        currency: 'NGN'
  //       }
  //     }).then((response) => {
  //       console.log(response);
  //     }, (error) => {
  //       console.log(error);
  //     })
  //     setClientSecret(response.data.clientSecret);
  //   };

  //   getClientSecret();
  // }, [basket]);

  // console.log("THE SECRET IS >>>", clientSecret);
  // console.log('👱', user)

  const handleSubmit = async (event) => {
    // do all the fancy stripe stuff...
    event.preventDefault();
    setProcessing(true);
    await axios({
      method: "post",
      // Stripe expects the total in a currencies subunits
      url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
      data: {
        email: "customer@email.com",
        currency: "NGN",
      },
    }).then(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );

    // await stripe
    //   .confirmCardPayment(clientSecret, {
    //     payment_method: {
    //       card: elements.getElement(CardElement),
    //     },
    //   })
    //   .then(({ paymentIntent }) => {
    //     // paymentIntent = payment confirmation
    //     console.log("THE PAYMENT INTENT IS >>>", paymentIntent);

    //     db.collection("users")
    //       .doc(user?.uid)
    //       .collection("orders")
    //       .doc(paymentIntent.id)
    //       .set({
    //         basket: basket,
    //         amount: paymentIntent.amount,
    //         created: paymentIntent.created,
    //       });

    setSucceeded(true);
    setError(null);
    setProcessing(false);

    //   });
  };

  const handleChange = (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout (<Link to="/checkout">{basket?.length} items</Link>)
        </h1>

        {/* Payment section - delivery address */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>123 React Lane</p>
            <p>Los Angeles, CA</p>
          </div>
        </div>

        {/* Payment section - Review Items */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__items">
            {basket.map((item) => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>

        {/* Payment section - Payment method */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            {/* Stripe magic will go */}

            {/* <form onSubmit={handleSubmit}> */}
            {/* <CardElement onChange={handleChange} /> */}

            <div className="payment__priceContainer">
              <CurrencyFormat
                renderText={(value) => <h3>Order Total: {value}</h3>}
                decimalScale={2}
                value={getBasketTotal(basket)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"₦"}
              />
              {/* <button
                onClick={handleSubmit}
                disabled={processing || disabled || succeeded}
              ></button>
              <button
                disabled={processing || disabled || succeeded}
                type="submit"
              >
                <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
              </button> */}
            </div>
            < PaystackHookExample />

            {/* Errors */}
            {error && <div>{error}</div>}
            {/* </form> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
