import Stripe from "stripe";
import Order from "../modal/order.model.js";
import { Messages } from "openai/resources/chat/completions.mjs";



export const createCheckoutSession =
  async (req, res) => {


 const stripe = new Stripe(
      process.env.STRIPE_SECRET_KEY
    );


    try {

      const {
        userId,
        cartItems,
        formData,
        paymentMethod,
        totalAmount,
      } = req.body;


console.log("REQ BODY =", req.body);
console.log("CART ITEMS =", cartItems);

const expectedDeliveryDate =
  new Date();

expectedDeliveryDate.setDate(
  expectedDeliveryDate.getDate() + 5
);



const order =
        await Order.create({
          userId,
          items: cartItems.map(
            (item) => ({
              bookId:
                item.bookId._id,
              quantity:
                item.quantity,
            })
          ),

          ...formData,

          paymentMethod,
          totalAmount,

   expectedDeliveryDate,

          payment: false,
          paymentStatus:
            "Pending",

          status: "Pending",
        });

   

 const line_items =
        cartItems.map((item) => ({
          price_data: {
            currency: "inr",

            product_data: {
              name:
                item.bookId.name,
            },

            unit_amount:
              item.bookId.price *
              100,
          },

          quantity:
            item.quantity,
        }));


        console.log(
  "LINE ITEMS =",
  JSON.stringify(line_items, null, 2)
);


const session =
        await stripe.checkout.sessions.create({
          mode: "payment",

          line_items,

          success_url:
            `http://localhost:5173/payment-success?orderId=${order._id}`,

          cancel_url:
            `http://localhost:5173/checkout`,
        });

      res.json({
        success: true,
        session_url:
          session.url,
      });

    } catch (error) {

       console.log(
    "STRIPE ERROR =",
    error
  );

      res.status(500).json({
        success: false,
        Message:error.Message,
      });

    }

  };

  export const verifyStripePayment =
  async (req, res) => {

    try {

      const { orderId } =
        req.query;

      await Order.findByIdAndUpdate(
        orderId,
        {
          payment: true,

          paymentStatus:
            "Paid",

          status:
            "Order Placed",
        }
      );

      res.json({
        success: true,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,
      });

    }

  };