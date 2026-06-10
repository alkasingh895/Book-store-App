import {
  useEffect,
} from "react";

import {
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import api from "../api/axios";

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



      console.log(
    "API URL =",
    import.meta.env.VITE_API_URL
  );


      try {

       await api.get(
  `/payment/verify?orderId=${orderId}`
);

        const user =
          JSON.parse(
            localStorage.getItem(
              "User"
            )
          );

        await api.delete(
  `/cart/clear/${user._id}`
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