import React, { useEffect, useState } from "react";

import OrderStatusChart
from "../charts/OrderStatusChart";
import RevenueChart from "../charts/RevenueChart";
import { dashboardApi } from "./dashboard.api";
import api from "../api/axios";
import TopSellingBooksChart
from "../charts/TopSellingBooksChart";

function DashboardCards() {

  const [activities, setActivities] =
  useState([]);

 const [dashboardData, setDashboardData] = useState({
  stats: {},
  recentActivity: {},
});

  const fetchStats = async () => {

    try {

      const data = await dashboardApi.getStats();

      setDashboardData(data);

    } catch (error) {

      console.log(error);
    }
  };



const fetchActivities = async () => {
  try {
    const res = await api.get(
      "/activity"
    );

    setActivities(res.data);

  } catch (error) {

    console.log(error);

  }
};



  useEffect(() => {

  fetchStats();

  fetchActivities();

}, []);

  const { stats, recentActivity } = dashboardData;

  return (

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

     <div className="bg-gray-100 dark:bg-slate-900 p-6 rounded-2xl shadow-lg border border-gray-300 dark:border-slate-800">
        <h2 className="text-gray-400 text-lg">
          Total Books
        </h2>

        <p className="text-4xl font-bold mt-2 text-pink-500">
          {stats.totalBooks}
        </p>

      </div>

       <div className="bg-gray-100 dark:bg-slate-900 p-6 rounded-2xl shadow-lg border border-gray-300 dark:border-slate-800">


        <h2 className="text-gray-400 text-lg">
          Contact Messages
        </h2>

        <p className="text-4xl font-bold mt-2 text-blue-400">
          {stats.totalMessages}
        </p>

      </div>

       <div className="bg-gray-100 dark:bg-slate-900 p-6 rounded-2xl shadow-lg border border-gray-300 dark:border-slate-800">


        <h2 className="text-gray-400 text-lg">
          Subscribers
        </h2>

        <p className="text-4xl font-bold mt-2 text-green-400">
          {stats.totalSubscribers}
        </p>
</div>



<div className="bg-gray-100 dark:bg-slate-900 p-6 rounded-2xl shadow-lg border border-gray-300 dark:border-slate-800">
  <h2 className="text-gray-400 text-lg">
    Total Orders
  </h2>

  <p className="text-4xl font-bold mt-2 text-yellow-400">
    {stats.totalOrders}
  </p>
</div>

<div className="bg-gray-100 dark:bg-slate-900 p-6 rounded-2xl shadow-lg border border-gray-300 dark:border-slate-800">
  <h2 className="text-gray-400 text-lg">
    Total Revenue
  </h2>

  <p className="text-4xl font-bold mt-2 text-green-500">
    ₹{stats.totalRevenue}
  </p>
</div>

<div className="bg-gray-100 dark:bg-slate-900 p-6 rounded-2xl shadow-lg border border-gray-300 dark:border-slate-800">
  <h2 className="text-gray-400 text-lg">
    Active Orders
  </h2>

  <p className="text-4xl font-bold mt-2 text-orange-400">
    {stats.pendingOrders}
  </p>
</div>




     <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-lg border border-gray-300 dark:border-slate-800">
  <h2 className="text-2xl font-bold mb-6 text-black dark:text-white">
    🚀 Recent Activity
  </h2>

  <div className="space-y-4">

    <div className="bg-gray-100 dark:bg-slate-800 p-4 rounded-xl">

      <p className="text-gray-400 text-sm">
        Latest Book
      </p>

      <h3 className="text-lg font-semibold text-black dark:text-white">
        {recentActivity?.latestBook?.name || "No books"}
      </h3>

    </div>

    <div className="bg-gray-100 dark:bg-slate-800 p-4 rounded-xl">

      <p className="text-gray-400 text-sm">
        Latest Message
      </p>

      <h3 className="text-lg font-semibold text-black dark:text-white">
        {recentActivity?.latestMessage?.name || "No messages"}
      </h3>

    </div>

<div className="bg-gray-100 dark:bg-slate-800 p-4 rounded-xl">

      <p className="text-gray-400 text-sm">
        Latest Subscriber
      </p>

      <h3 className="text-lg font-semibold text-black dark:text-white">
        {recentActivity?.latestSubscriber?.email || "No subscribers"}
      </h3>

    </div>

  </div>

</div>








<div className="md:col-span-3 bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-lg border border-gray-300 dark:border-slate-800">

  <h2 className="text-2xl font-bold mb-6 text-black dark:text-white">
    🕒 Activity Timeline
  </h2>

  <div className="space-y-4">

    {activities.map((item) => (

      <div
        key={item._id}
        className="bg-gray-100 dark:bg-slate-800 px-4 py-3 rounded-xl"
      >

        <p className="text-black dark:text-white font-medium">
          {item.text}
        </p>

      <p className="text-sm text-gray-500 mt-2">
  {new Date(item.createdAt).toLocaleString()}
</p>


      </div>
    ))}

  </div>

</div>



<div className="md:col-span-3">
  <RevenueChart />
  
</div>

<div className="md:col-span-3">
  <OrderStatusChart />
</div>


<div className="md:col-span-3">
  <TopSellingBooksChart />
</div>








    </div>
  );
}

export default DashboardCards;