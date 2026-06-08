import {
  useEffect,
} from "react";

import {
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import axios from "axios";

function PaymentSuccess() {

  const navigate =
    useNavigate();

  const [params] =
    useSearchParams();

  const orderId =
    params.get("orderId");

  useEffect(() => {

    verifyPayment();

  }, []);

  const verifyPayment =
    async () => {

      try {

        await axios.get(
          `http://localhost:5000/payment/verify?orderId=${orderId}`
        );

        const user =
          JSON.parse(
            localStorage.getItem(
              "User"
            )
          );

        await axios.delete(
          `http://localhost:5000/cart/clear/${user._id}`
        );

        navigate(
          "/my-orders"
        );

      } catch (error) {

        console.log(error);

      }

    };

  return (
    <div className="min-h-screen flex justify-center items-center text-3xl font-bold">
      Verifying Payment...
    </div>
  );

}

export default PaymentSuccess;