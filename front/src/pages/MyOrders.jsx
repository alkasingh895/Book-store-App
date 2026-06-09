import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

function MyOrders() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);

  // Return modal
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [returnOrderId, setReturnOrderId] = useState(null);
  const [returnReason, setReturnReason] = useState("");
  const [refundType, setRefundType] = useState("Refund");
  const [selectedReturnItem, setSelectedReturnItem] = useState("");

  // Help modal
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [helpOrderId, setHelpOrderId] = useState(null);
  const [helpItem, setHelpItem] = useState(null);

  // Review modal
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewBookId, setReviewBookId] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("User"));
      const res = await api.get(
  `/order/user/${user._id}`
);
      setOrders(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelOrder = async (orderId) => {
    try {
      await api.put(
  `/order/cancel/${orderId}`
);
      alert("Order Cancelled");
      fetchOrders();
    } catch (error) {
      console.log(error);
      alert("Failed To Cancel Order");
    }
  };

  const handleReturnOrder = (orderId) => {
    setReturnOrderId(orderId);
    setShowReturnModal(true);
  };

  const submitReturnRequest = async () => {
    if (!selectedReturnItem) return alert("Please Select Item");
    if (!returnReason) return alert("Please Select Return Reason");

    try {
      await api.put(
  `/order/return/${returnOrderId}`,
  {
    returnReason,
    refundType,
    bookId: selectedReturnItem,
  }
);
      alert("Return Request Submitted");
      setShowReturnModal(false);
      setReturnReason("");
      setRefundType("Refund");
      setSelectedReturnItem("");
      fetchOrders();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed");
    }
  };

  const cancelReturnRequest = async () => {
    try {
      await api.put(
  `/order/cancel-return/${helpOrderId}`,
  {
    bookId: helpItem.bookId?._id,
  }
);
      alert("Return Request Cancelled");
      fetchOrders();
      setShowHelpModal(false);
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed");
    }
  };

  const openHelpModal = (orderId, item) => {
    setHelpOrderId(orderId);
    setHelpItem(item);
    setShowHelpModal(true);
  };

  const openReviewModal = async (bookId) => {
    try {
      const user = JSON.parse(localStorage.getItem("User"));
     const res = await api.get(
  `/book/${bookId}`
);
      const myReview = res.data.reviews.find(
        (review) => review.userId === user._id
      );
      if (myReview) {
        setRating(myReview.rating);
        setComment(myReview.comment);
      } else {
        setRating(5);
        setComment("");
      }
      setReviewBookId(bookId);
      setShowReviewModal(true);
    } catch (error) {
      console.log(error);
    }
  };



  const handleSubmitReview = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("User"));
      await api.post(
  `/book/${reviewBookId}/review`,
  {
    userId: user._id,
    userName: user.fullname,
    rating,
    comment,
  }
);
      alert("Review Added Successfully");
      setShowReviewModal(false);
      setRating(0);
      setComment("");
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed To Add Review");
    }
  };





  // ---------- helpers ----------
  const statusBadge = (status) => {
    const map = {
      Delivered: "bg-emerald-50 text-emerald-700 ring-emerald-200",
      Shipped: "bg-sky-50 text-sky-700 ring-sky-200",
      "Out For Delivery": "bg-violet-50 text-violet-700 ring-violet-200",
      Packed: "bg-indigo-50 text-indigo-700 ring-indigo-200",
      Confirmed: "bg-blue-50 text-blue-700 ring-blue-200",
      Cancelled: "bg-rose-50 text-rose-700 ring-rose-200",
      "Order Placed": "bg-amber-50 text-amber-700 ring-amber-200",
    };
    return map[status] || "bg-amber-50 text-amber-700 ring-amber-200";
  };

  const steps = [
    "Order Placed",
    "Confirmed",
    "Packed",
    "Shipped",
    "Out For Delivery",
    "Delivered",
  ];

  const currentStepIndex = (status) => {
    if (status === "Cancelled") return -1;
    return steps.indexOf(status);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 text-slate-800 dark:text-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate("/course")}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-pink-500 hover:bg-pink-600 px-2 py-1.5 text-sm font-medium shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
          >
            <span>←</span> Continue
          </button>

          <div className="hidden sm:block text-sm text-slate-500 dark:text-slate-400">
            {orders.length} {orders.length === 1 ? "order" : "orders"}
          </div>
        </div>

        {/* Heading */}
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            My Orders
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">
            Track, return or review your recent purchases.
          </p>
        </div>

        

 {/* Empty state */}

        {orders.length === 0 ? (
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-16 text-center shadow-sm">
            <div className="text-6xl mb-4">📦</div>
            <h2 className="text-xl font-semibold mb-2">No orders yet</h2>
            <p className="text-slate-500 dark:text-slate-400 mb-6">
              When you place an order it will show up here.
            </p>
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center justify-center rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-5 py-2.5 text-sm font-semibold hover:opacity-90 transition"
            >
              Browse books
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => {
              const stepIdx = currentStepIndex(order.status);
              const cancelled = order.status === "Cancelled";

              return (
                <div
                  key={order._id}
                  className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm hover:shadow-lg transition-all overflow-hidden"
                >
                  {/* Header */}
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-6 border-b border-slate-100 dark:border-slate-700">
                    <div className="min-w-0">
                      <div className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Order ID
                      </div>
                      <div className="font-mono text-sm mt-1 truncate">
                        #{order._id}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ring-1 ${statusBadge(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>

                      {(order.status === "Order Placed" ||
                        order.status === "Confirmed" ||
                        order.status === "Packed") && (
                        <button
                          onClick={() => handleCancelOrder(order._id)}
                          className="inline-flex items-center rounded-lg border border-rose-200 dark:border-rose-900/50 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 px-3 py-1.5 text-xs font-semibold hover:bg-rose-100 transition"
                        >
                          Cancel Order
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Meta grid */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-slate-100 dark:bg-slate-700">
                    <div className="bg-white dark:bg-slate-800 p-5">
                      <div className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        Payment
                      </div>
                      <div className="font-semibold mt-1">
                        {order.paymentMethod}
                      </div>
                    </div>
                    <div className="bg-white dark:bg-slate-800 p-5">
                      <div className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        Order Date
                      </div>
                      <div className="font-semibold mt-1">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="bg-white dark:bg-slate-800 p-5 col-span-2 md:col-span-1">
                      <div className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        Total
                      </div>
                      <div className="font-bold text-lg text-pink-600 dark:text-pink-400 mt-1">
                        ₹{order.totalAmount}
                      </div>
                    </div>
                  </div>

                  {/* Tracking */}
                  <div className="p-6 border-b border-slate-100 dark:border-slate-700">
                    <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Order Tracking
                    </h3>

                    {cancelled ? (
                      <div className="inline-flex items-center gap-2 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 px-4 py-2 text-sm font-semibold ring-1 ring-rose-200 dark:ring-rose-900/50">
                        ✕ Order Cancelled
                      </div>
                    ) : (
                      <div className="relative">
                        <div className="flex justify-between items-center relative">
                          {/* line */}
                          <div className="absolute top-3 left-0 right-0 h-0.5 bg-slate-200 dark:bg-slate-700" />
                          <div
                            className="absolute top-3 left-0 h-0.5 bg-emerald-500 transition-all"
                            style={{
                              width:
                                stepIdx <= 0
                                  ? "0%"
                                  : `${(stepIdx / (steps.length - 1)) * 100}%`,
                            }}
                          />
                          {steps.map((step, i) => {
                            const done = i <= stepIdx;
                            return (
                              <div
                                key={step}
                                className="relative flex flex-col items-center flex-1"
                              >
                                <div
                                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold z-10 ${
                                    done
                                      ? "bg-emerald-500 text-white"
                                      : "bg-slate-200 dark:bg-slate-700 text-slate-400"
                                  }`}
                                >
                                  {done ? "✓" : i + 1}
                                </div>
                                <div
                                  className={`mt-2 text-[10px] sm:text-xs text-center px-1 ${
                                    done
                                      ? "text-slate-800 dark:text-slate-200 font-semibold"
                                      : "text-slate-400"
                                  }`}
                                >
                                  {step}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}



<div className="mt-4 text-sm font-semibold">
  {order.status === "Delivered" ? (
    <p className="text-green-600">
      ✅ Delivered on{" "}
      {new Date(
        order.deliveredAt
      ).toLocaleDateString()}
    </p>
  ) : (
    order.status !== "Cancelled" && (
      <p className="text-blue-600">
        🚚 Expected Delivery:{" "}
        {new Date(
          order.expectedDeliveryDate
        ).toLocaleDateString()}
      </p>
    )
  )}
</div>

                  </div>

                  {/* Items */}
                  <div className="p-6">
                    <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Ordered Books
                    </h3>

                    <div className="space-y-2">
                      {order.items?.map((item) => (
                        <div
                          key={item._id}
                          className="flex flex-wrap items-center gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-700"
                        >
                          <div className="w-20 h-28 border rounded-lg  border-pink-500 overflow-hidden">
  <img
  src={item.bookId?.image}
  alt={item.bookId?.name}
  onClick={() =>
    navigate(`/book/${item.bookId._id}`)
  }
  className="w-full h-full object-cover"
/>
</div>

                  <div className="flex-1 min-w-0">
                            <div
                             onClick={() =>
    navigate(`/book/${item.bookId._id}`)
  }
                             className="font-semibold truncate cursor-pointer  hover:text-pink-500
    transition">
                              
                              
                              {item.bookId?.name}


                            </div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">
                              Quantity: {item.quantity}
                            </div>
                          </div>

                          <div className="font-semibold text-pink-600 dark:text-pink-400">
                            ₹{item.bookId?.price}
                          </div>

                          {item.returnRequested && (
                            <span className="bg-orange-100 dark:bg-orange-950/50 text-orange-700 dark:text-orange-300 px-2.5 py-1 rounded-md text-xs font-medium ring-1 ring-orange-200 dark:ring-orange-900/50">
                              ↩ Return ({item.returnStatus})
                            </span>
                          )}

                          {order.status === "Delivered" && (
                            <button
                              onClick={() => openHelpModal(order._id, item)}
                              className="inline-flex items-center rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-3 py-1.5 text-xs font-semibold hover:opacity-90 transition"
                            >
                              Help
                            </button>
                          )}
                        </div>
                      ))}


                      
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

{/* Review Modal */}

      {showReviewModal && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowReviewModal(false)}
        >
          <div
            className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-md shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-6 border-b border-slate-100 dark:border-slate-700">
              <h2 className="text-lg font-bold">Write a Review</h2>
              <button
                onClick={() => setShowReviewModal(false)}
                className="w-8 h-8 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <div className="p-6">
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
                Tap to rate
              </p>
              <div className="flex justify-center gap-2 mb-6 text-4xl">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onClick={() => setRating(star)}
                    className="cursor-pointer transition-transform hover:scale-110"
                  >
                    {star <= rating ? "⭐" : "☆"}
                  </span>
                ))}
              </div>

              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your thoughts..."
                className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-slate-800 dark:text-slate-100"
                rows="4"
              />

              <button
                onClick={handleSubmitReview}
                className="mt-4 w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-semibold transition"
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
      )}

{/* Return Modal */}

      {showReturnModal && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowReturnModal(false)}
        >
          <div
            className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-6 border-b border-slate-100 dark:border-slate-700 sticky top-0 bg-white dark:bg-slate-800">
              <h2 className="text-lg font-bold">Return Order</h2>
              <button
                onClick={() => setShowReturnModal(false)}
                className="w-8 h-8 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <div className="p-6">
              <h3 className="font-semibold mb-3 text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Select Item
              </h3>
              <div className="space-y-2 mb-6">
                {orders
                  .find((o) => o._id === returnOrderId)
                  ?.items.filter((item) => !item.returnRequested)
                  .map((item) => (
                    <label
                      key={item._id}
                      className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition ${
                        selectedReturnItem === item.bookId?._id
                          ? "border-pink-500 bg-pink-50 dark:bg-pink-950/30"
                          : "border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/40"
                      }`}
                    >
                      <input
                        type="radio"
                        name="returnItem"
                        value={item.bookId?._id}
                        checked={selectedReturnItem === item.bookId?._id}
                        onChange={(e) =>
                          setSelectedReturnItem(e.target.value)
                        }
                        className="accent-pink-500"
                      />
                      <span className="font-medium">
                        {item.bookId?.name} × {item.quantity}
                      </span>
                    </label>
                  ))}
              </div>

              <h3 className="font-semibold mb-3 text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Return Reason
              </h3>
              <div className="space-y-2 mb-6">
                {[
                  "Wrong Book",
                  "Damaged Book",
                  "Missing Pages",
                  "Ordered By Mistake",
                ].map((reason) => (
                  <label
                    key={reason}
                    className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition ${
                      returnReason === reason
                        ? "border-pink-500 bg-pink-50 dark:bg-pink-950/30"
                        : "border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/40"
                    }`}
                  >
                    <input
                      type="radio"
                      name="reason"
                      value={reason}
                      checked={returnReason === reason}
                      onChange={(e) => setReturnReason(e.target.value)}
                      className="accent-pink-500"
                    />
                    {reason}
                  </label>
                ))}
              </div>

              <h3 className="font-semibold mb-3 text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Refund Type
              </h3>
              <div className="grid grid-cols-2 gap-3 mb-6">
                <button
                  onClick={() => setRefundType("Refund")}
                  className={`p-4 rounded-xl border font-semibold transition ${
                    refundType === "Refund"
                      ? "bg-blue-500 text-white border-blue-500"
                      : "border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/40"
                  }`}
                >
                  💰 Refund
                </button>
                <button
                  onClick={() => setRefundType("Replacement")}
                  className={`p-4 rounded-xl border font-semibold transition ${
                    refundType === "Replacement"
                      ? "bg-emerald-500 text-white border-emerald-500"
                      : "border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/40"
                  }`}
                >
                  🔄 Replacement
                </button>
              </div>

              <button
                onClick={submitReturnRequest}
                className="w-full bg-rose-600 hover:bg-rose-700 text-white py-3 rounded-xl font-semibold transition"
              >
                Submit Return Request
              </button>
            </div>
          </div>
        </div>
      )}



{/* Help Modal */}

      {showHelpModal && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowHelpModal(false)}
        >
          <div
            className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-md shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-6 border-b border-slate-100 dark:border-slate-700">
              <h2 className="text-lg font-bold">Need Help?</h2>
              <button
                onClick={() => setShowHelpModal(false)}
                className="w-8 h-8 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-3">
              <button
                onClick={() => {
                  setShowHelpModal(false);
                  openReviewModal(helpItem.bookId?._id);
                }}
                className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-xl font-semibold transition"
              >
                ⭐ Write Review
              </button>

              {!helpItem?.returnRequested ? (
                <button
                  onClick={() => {
                    setReturnOrderId(helpOrderId);
                    setShowHelpModal(false);
                    setShowReturnModal(true);
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-rose-500 hover:bg-rose-600 text-white py-3 rounded-xl font-semibold transition"
                >
                  ↩ Return Item
                </button>
              ) : (
                <>
                  <div className="bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-300 p-4 rounded-xl ring-1 ring-orange-200 dark:ring-orange-900/50 text-sm font-medium">
                    Return Requested ({helpItem.returnStatus})
                  </div>

                  {helpItem.returnStatus === "Pending" && (
                    <button
                      onClick={cancelReturnRequest}
                      className="w-full bg-rose-600 hover:bg-rose-700 text-white py-3 rounded-xl font-semibold transition"
                    >
                      Cancel Return Request
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyOrders;
