import React, {
  useEffect,
  useState,
} from "react";

import Chart from "react-apexcharts";

import { useInView }
from "react-intersection-observer";

import {
  topSellingBooksApi,
} from "../api/topSellingBooks.api";

function TopSellingBooksChart() {

  const [books,
    setBooks] =
    useState([]);


    const [showChart,
  setShowChart] =
  useState(false);


  const {
    ref,
    inView,
  } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const fetchBooks =
    async () => {

      try {

        const data =
          await topSellingBooksApi
            .getTopSellingBooks();

        setBooks(
          data.books || []
        );

      } catch (error) {

        console.log(error);
      }
    };

  useEffect(() => {

    fetchBooks();

  }, []);



  useEffect(() => {

  if (inView) {

    setTimeout(() => {

      setShowChart(true);

    }, 500);

  }

}, [inView]);

  const categories =
    books.map(
      (book) =>
        book._id?.name
    );

  const series = [
    {
      name: "Sold",

      data: books.map(
        (book) =>
          book.totalSold
      ),
    },
  ];

  const options = {

    chart: {

      toolbar: {
        show: false,
      },

      animations: {
        enabled: true,

        easing:
          "easeinout",

        speed: 3000,

       animateGradually: {
      enabled: true,
      delay: 500,
    },


    dynamicAnimation: {
      enabled: true,
      speed: 2000,
    },

      },

    },

    plotOptions: {
      bar: {
        borderRadius: 8,

        horizontal: true,

         distributed: true,
      },
    },

    colors: [
       "#8B5CF6",
  "#06B6D4",
  "#22C55E",
  "#F59E0B",
  "#EF4444",
  "#EC4899",
  "#6366F1",
  "#14B8A6",
  "#84CC16",
  "#F97316",
    ],

    dataLabels: {
      enabled: true,



        style:{
            fontSize: "14px",

            fontWeight: "bold",
        }
    },

    xaxis: {
      categories,
    },

    grid: {
      borderColor:
        "#334155",
    },

  };

  return (
    <div
      ref={ref}
      className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-lg border border-gray-300 dark:border-slate-800"
    >

      <h2 className="text-2xl font-bold mb-2 text-black dark:text-white">
        Top Selling Books
      </h2>

      <p className="text-gray-500 mb-6">
        Best performing books by sales
      </p>

      {showChart && (

  <Chart
    options={options}
    series={series}
    type="bar"
    height={400}
  />

)}

    </div>
  );
}

export default TopSellingBooksChart;