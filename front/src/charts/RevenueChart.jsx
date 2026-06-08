import React, {
  useEffect,
  useState,
} from "react";

import Chart from "react-apexcharts";


import { useInView }
from "react-intersection-observer";


import {
  revenueAnalyticsApi,
} from "../api/revenueAnalytics.api";






function RevenueChart() {

    

    
const [chartType, setChartType] =
  useState("monthly");

const [analyticsData,
  setAnalyticsData] =
  useState(null);








const {
  ref,
  inView,
} = useInView({
  triggerOnce: true,
  threshold: 0.3,
});  



const fetchAnalytics =
  async () => {
    try {

      const data =
        await revenueAnalyticsApi
          .getRevenueAnalytics();

      setAnalyticsData(data);

    } catch (error) {

      console.log(error);

    }
  };

useEffect(() => {

  fetchAnalytics();

}, []);



console.log(
  "Monthly Revenue:",
  analyticsData?.monthlyRevenue
);




const activeData =
  chartType === "weekly"
    ? analyticsData?.weeklyRevenue || []
    : chartType === "yearly"
    ? analyticsData?.yearlyRevenue || []
    : analyticsData?.monthlyRevenue || [];



let chartData = activeData;


if (chartType === "monthly") {

  const monthTemplate = [
    { month: "Jan", revenue: 0 },
    { month: "Feb", revenue: 0 },
    { month: "Mar", revenue: 0 },
    { month: "Apr", revenue: 0 },
    { month: "May", revenue: 0 },
    { month: "Jun", revenue: 0 },
    { month: "Jul", revenue: 0 },
    { month: "Aug", revenue: 0 },
    { month: "Sep", revenue: 0 },
    { month: "Oct", revenue: 0 },
    { month: "Nov", revenue: 0 },
    { month: "Dec", revenue: 0 },
  ];

  activeData.forEach((item) => {

    const monthIndex =
      item._id.month - 1;

    monthTemplate[
      monthIndex
    ].revenue =
      item.revenue;

  });

  chartData = monthTemplate;
}





if (chartType === "weekly") {

  const weekTemplate = [
    { day: "Sun", revenue: 0 },
    { day: "Mon", revenue: 0 },
    { day: "Tue", revenue: 0 },
    { day: "Wed", revenue: 0 },
    { day: "Thu", revenue: 0 },
    { day: "Fri", revenue: 0 },
    { day: "Sat", revenue: 0 },
  ];

  activeData.forEach((item) => {

    const days = [
      "",
      "Sun",
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
    ];

    const dayName =
      days[item._id.dayOfWeek];

    const index =
      weekTemplate.findIndex(
        (d) => d.day === dayName
      );

    if (index !== -1) {
      weekTemplate[index].revenue =
        item.revenue;
    }
  });

  chartData = weekTemplate;
}





  const categories =
  chartType === "weekly"
    ? chartData.map(
        (item) => item.day
      )
    : chartType === "monthly"
    ? chartData.map(
        (item) => item.month
      )
    : activeData.map(
        (item) => item._id.year
      );
  
  


  const series = [
  {
    name: "Revenue",

    data:
      chartType === "yearly"
        ? activeData.map(
            (item) => item.revenue
          )
        : chartData.map(
            (item) => item.revenue
          ),
  },
];

const options = {

colors: ["#6366F1"],

 chart: {
  toolbar: {
    show: false,
  },





  zoom: {
    enabled: false,
  },

  animations: {
    enabled: true,

    easing: "easeinout",

    speed: 1800,

    animateGradually: {
      enabled: true,
      delay: 150,
    },

  markers: {
  size: 6,

  hover: {
    size: 10,
  },
},



dynamicAnimation: {
enabled: true,
speed: 1200,
},


dropShadow: {
  enabled: true,

  top: 4,

  left: 0,

  blur: 10,

  opacity: 0.35,
},


  },
},




  dataLabels: {
    enabled: false,
  },

  stroke: {
  curve: "smooth",
  width: 4,
},

  grid: {
    borderColor: "#334155",
  },

 fill: {
  type: "gradient",

  gradient: {
    shade: "dark",

    type: "vertical",

    gradientToColors: [
      "#8B5CF6",
    ],

    opacityFrom: 0.9,

    opacityTo: 0.15,

    stops: [0, 100],
  },
},




  tooltip: {
    y: {
      formatter: (value) =>
        `₹${value}`,
    },
  },

  yaxis: {
    labels: {
      formatter: (value) =>
        `₹${value}`,
    },
  },

  xaxis: {
    categories,
  },
};


if (!analyticsData) {
  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-lg border border-gray-300 dark:border-slate-800">
      Loading Revenue Analytics...
    </div>
  );
}



  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-lg border border-gray-300 dark:border-slate-800">

      <h2 className="text-2xl font-bold mb-2 text-black dark:text-white">
  Revenue Analytics
</h2>

<p className="text-gray-500 mb-6">
  Track weekly, monthly and yearly revenue trends
</p>

      <>
  <div className="flex gap-3 mb-6 flex-wrap">

    <button
      onClick={() =>
        setChartType("weekly")
      }
      className={`px-4 py-2 rounded-lg ${
        chartType === "weekly"
          ? "bg-blue-500 text-white"
          : "bg-gray-200 dark:bg-slate-800"
      }`}
    >
      Weekly
    </button>

    <button
      onClick={() =>
        setChartType("monthly")
      }
      className={`px-4 py-2 rounded-lg ${
        chartType === "monthly"
          ? "bg-blue-500 text-white"
          : "bg-gray-200 dark:bg-slate-800"
      }`}
    >
      Monthly
    </button>

    <button
      onClick={() =>
        setChartType("yearly")
      }
      className={`px-4 py-2 rounded-lg ${
        chartType === "yearly"
          ? "bg-blue-500 text-white"
          : "bg-gray-200 dark:bg-slate-800"
      }`}
    >
      Yearly
    </button>

  </div>

  <div ref={ref}>

  {inView && (

    <Chart
      options={options}
      series={series}
      type="area"
      height={350}
    />

  )}

</div>


</>
    </div>
  );
}

export default RevenueChart;