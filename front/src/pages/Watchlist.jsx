import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import Card from "../assets/components/Card";

function Watchlist() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("User"));
        if (!user) {
          setLoading(false);
          return;
        }

        const res = await api.get(`/watchlist/${user._id}`);
        const watchlistBooks = res.data.watchlist.map((item) => item.bookId);
        setBooks(watchlistBooks);
      } catch (err) {
        console.error("Error fetching watchlist:", err);
        setError("Failed to load watchlist. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchWatchlist();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 antialiased transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        
        {/* Professional Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 mb-10 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-start gap-4">
            <div className="
  p-2
  bg-red-50
  dark:bg-red-950/40
  rounded-xl
  text-red-500
  dark:text-red-400
  self-start
  
">
              <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                My Watchlist
              </h1>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Manage and keep track of your saved educational reading materials.
              </p>




              <p className="text-lg text-gray-500 dark:text-white mt-2.5">
              {books.length} saved books
                   </p>
            </div>
          </div>

          <div>
            <button
              onClick={() => navigate("/course")}
              className="group inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-xl 
                         bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 
                         border border-gray-200 dark:border-gray-700 shadow-sm 
                         hover:bg-gray-50 dark:hover:bg-gray-750 hover:text-blue-600 dark:hover:text-blue-400
                         focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 transition-all duration-200"
            >
              <svg
                className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Explore Courses
            </button>
          </div>
        </div>

        {/* Dynamic Content Views */}
        {loading ? (
          /* Loading State */
          <div className="flex flex-col justify-center items-center h-64 space-y-4">
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 rounded-full border-4 border-gray-200 dark:border-gray-800"></div>
              <div className="absolute inset-0 rounded-full border-4 border-t-blue-600 dark:border-t-blue-400 animate-spin"></div>
            </div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 animate-pulse">
              Retrieving your curated list...
            </p>
          </div>
        ) : error ? (
          /* Error State */
          <div className="max-w-md mx-auto p-4 bg-red-50/50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 rounded-2xl flex items-start gap-3 shadow-sm">
            <svg className="w-5 h-5 text-red-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h3 className="text-sm font-semibold text-red-800 dark:text-red-400">System Error</h3>
              <p className="mt-1 text-sm text-red-700 dark:text-red-300/80">{error}</p>
            </div>
          </div>
        ) : books.length === 0 ? (
          /* Empty State */
          <div className="max-w-md mx-auto bg-white dark:bg-gray-800 border border-gray-200/60 dark:border-gray-700/60 shadow-sm rounded-2xl p-8 text-center">
            <div className="inline-flex p-3 bg-gray-50 dark:bg-gray-750 text-gray-400 dark:text-gray-500 rounded-2xl mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1">
              Your watchlist is empty
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs mx-auto mb-5">
              Explore our extensive courses catalog and add books you want to read later.
            </p>
            
          </div>
        ) : (
          /* Card Grid View */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 animate-[fadeIn_0.4s_ease-out]">
            {books.map((item) => (
  <Card
    key={item._id}
    item={item}
    isWatchlist={true}
  />
))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Watchlist;