import React, {
  useEffect,
  useState,
} from "react";

import Chart from "react-apexcharts";

import { useInView }
from "react-intersection-observer";

import {
  orderStatusApi,
} from "../api/orderStatusAnalytics.api";

function OrderStatusChart() {


 const {
  ref,
  inView,
} = useInView({
  triggerOnce: true,
  threshold: 0.3,
});   

  const [data, setData] =
    useState(null);

  const fetchStatus =
    async () => {

      try {

        const response =
          await orderStatusApi
            .getOrderStatus();

        setData(response);

      } catch (error) {

        console.log(error);

      }
    };

  useEffect(() => {

    fetchStatus();

  }, []);

  if (!data) {

    return (
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-lg">
        Loading...
      </div>
    );
  }

  const series = [
    data.delivered,
    data.pending,
    data.cancelled,
    data.returned,
  ];



  const totalOrders =
  series.reduce(
    (a, b) => a + b,
    0
  );



  const options = {

    labels: [
      "Delivered",
      "Pending",
      "Cancelled",
      "Returned",
    ],

    colors: [
      "#22C55E",
      "#F59E0B",
      "#EF4444",
      "#3B82F6",
    ],

    legend: {
      position: "bottom",
    },

    

plotOptions: {
  pie: {
    donut: {
      size: "70%",

      labels: {

        show: true,

        value: {
          show: true,

          fontSize: "36px",

          fontWeight: 700,

          color: "#8B5CF6",
        },

        total: {
          show: true,

          label: "Orders",

          fontSize: "18px",

          formatter: () =>
            data.totalOrders,
        },
      },
    },
  },
},


chart: {
  animations: {
    enabled: true,

    easing: "easeinout",

    speed: 3500,

    animateGradually: {
      enabled: true,

      delay: 800,
    },

    dynamicAnimation: {
      enabled: true,

      speed: 2500,
    },
  },
},



  };

  return (

    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-lg border border-gray-300 dark:border-slate-800">

      <h2 className="text-2xl font-bold mb-2 text-black dark:text-white">
        Order Status
      </h2>

      <p className="text-gray-500 mb-6">
        Order distribution overview
      </p>

      <div ref={ref}>

  {inView && (

    <Chart
      options={options}
      series={series}
      type="donut"
      height={350}
    />

  )}

</div>

    </div>
  );
}

export default OrderStatusChart;