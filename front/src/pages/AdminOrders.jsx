import React, { useEffect, useState } from "react";
import api from "../api/axios";

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
  try {
    const res = await api.get("/order/all");

    setOrders(res.data);
  } catch (error) {
    console.log(error);
  }
};

  const handleStatusChange = async (
  orderId,
  status
) => {
  try {
    await api.put(
      `/order/status/${orderId}`,
      { status }
    );

    fetchOrders();
  } catch (error) {
    console.log(error);
  }
};
  const updateReturnStatus = async (
  orderId,
  bookId,
  returnStatus
) => {
  try {
    await api.put(
      `/order/return-status/${orderId}`,
      {
        bookId,
        returnStatus,
      }
    );

    fetchOrders();
  } catch (error) {
    console.log(error);
  }
};

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        📦 All Orders
      </h1>

      <div className="overflow-x-auto">
        <table className="w-full bg-white dark:bg-slate-800 rounded-xl overflow-hidden">
          <thead>
            <tr className="bg-slate-200 dark:bg-slate-700">
              <th className="p-3 text-left">
                Customer
              </th>

              <th className="p-3 text-left">
                Amount
              </th>

              <th className="p-3 text-left">
                Payment
              </th>

              <th className="p-3 text-left">
                Status
              </th>

              <th className="p-3 text-left">
                Return Requests
              </th>
            </tr>
          </thead>

          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b"
                >
                  <td className="p-3">
                    {order.fullName}
                  </td>

                  <td className="p-3">
                    ₹{order.totalAmount}
                  </td>

                  <td className="p-3">
                    {order.paymentMethod}
                  </td>

                  <td className="p-3">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(
                          order._id,
                          e.target.value
                        )
                      }
                      className="
                        px-3
                        py-2
                        rounded-lg
                        bg-slate-100
                        dark:bg-slate-700
                        border
                        border-slate-300
                        dark:border-slate-600
                      "
                    >
                      <option value="Order Placed">
                        Order Placed
                      </option>

                      <option value="Confirmed">
                        Confirmed
                      </option>

                      <option value="Packed">
                        Packed
                      </option>

                      <option value="Shipped">
                        Shipped
                      </option>

                      <option value="Out For Delivery">
                        Out For Delivery
                      </option>

                      <option value="Delivered">
                        Delivered
                      </option>

                      <option value="Cancelled">
                        Cancelled
                      </option>
                    </select>
                  </td>

                  <td className="p-3">
                    {order.items?.some(
                      (item) =>
                        item.returnRequested
                    ) ? (
                      order.items.map(
                        (item) =>
                          item.returnRequested && (
                            <div
                              key={item._id}
                              className="
                                border
                                p-3
                                rounded-lg
                                mb-2
                                bg-slate-50
                                dark:bg-slate-700
                              "
                            >
                              <p className="font-semibold">
                                {
                                  item.bookId
                                    ?.name
                                }
                              </p>

                              <div className="mt-2">
  <span
    className={`px-3 py-1 rounded-full text-xs font-semibold ${
      item.returnStatus === "Approved"
        ? "bg-green-100 text-green-700"
        : item.returnStatus === "Rejected"
        ? "bg-red-100 text-red-700"
        : "bg-yellow-100 text-yellow-700"
    }`}
  >
    {item.returnStatus}
  </span>
</div>
                              {item.returnStatus ===
                                "Pending" && (
                                <div className="flex gap-2 mt-2">
                                  <button
                                    onClick={() =>
                                      updateReturnStatus(
                                        order._id,
                                        item
                                          .bookId
                                          ._id,
                                        "Approved"
                                      )
                                    }
                                    className="
                                      bg-green-500
                                      hover:bg-green-600
                                      text-white
                                      px-3
                                      py-1
                                      rounded
                                    "
                                  >
                                    Approve
                                  </button>

                                  <button
                                    onClick={() =>
                                      updateReturnStatus(
                                        order._id,
                                        item
                                          .bookId
                                          ._id,
                                        "Rejected"
                                      )
                                    }
                                    className="
                                      bg-red-500
                                      hover:bg-red-600
                                      text-white
                                      px-3
                                      py-1
                                      rounded
                                    "
                                  >
                                    Reject
                                  </button>
                                </div>
                              )}
                            </div>
                          )
                      )
                    ) : (
                      <span className="text-gray-500">
                        No Return Request
                      </span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="
                    text-center
                    p-6
                    text-gray-500
                  "
                >
                  No Orders Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminOrders;