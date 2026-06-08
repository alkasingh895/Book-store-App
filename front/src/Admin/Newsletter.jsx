import React, { useEffect, useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";

function Newsletter() {
  const [emails, setEmails] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const subscribersPerPage = 5;

  const fetchSubscribers = async () => {
    try {
      const response = await api.get("/admin/newsletter/all");
      setEmails(response.data.subscribers);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load subscribers");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this subscriber?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/admin/newsletter/${id}`);
      toast.success("Subscriber deleted successfully ✅");
      fetchSubscribers();
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete subscriber");
    }
  };

  const indexOfLastSubscriber = currentPage * subscribersPerPage;
  const indexOfFirstSubscriber = indexOfLastSubscriber - subscribersPerPage;
  const currentSubscribers = emails.slice(
    indexOfFirstSubscriber,
    indexOfLastSubscriber
  );
  const totalPages = Math.ceil(emails.length / subscribersPerPage);

  useEffect(() => {
    fetchSubscribers();
  }, []);

  return (
    <div>
      <h1 className="text-4xl font-bold text-black dark:text-white mb-8">📧 Newsletter Subscribers</h1>

      <div className="hidden md:block overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
        <table className="table w-full text-sm">
          <thead>
            <tr className="bg-gray-200 dark:bg-slate-800 text-black dark:text-white">
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentSubscribers.map((item) => (
              <tr
                key={item._id}
                className="hover bg-slate-900 text-white border-b border-slate-800"
              >
                <td className="px-4 py-3 break-words">{item.email}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid gap-4 md:hidden">
        {currentSubscribers.length ? (
          currentSubscribers.map((item) => (
            <div
              key={item._id}
              className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900"
            >
              <div className="flex flex-col gap-4 text-sm text-slate-700 dark:text-slate-300">
                <div>
                  <p className="font-semibold">Email</p>
                  <p className="break-words">{item.email}</p>
                </div>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="mt-2 w-full rounded-xl bg-red-500 px-4 py-3 text-sm font-semibold text-white hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 text-center text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
            No subscribers found.
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3 justify-center items-center mt-8 md:flex-row">
        <button
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentPage === 1}
          className="bg-gray-200 dark:bg-slate-800 text-black dark:text-white px-4 py-2 rounded-lg hover:bg-pink-300 dark:hover:bg-slate-700 disabled:opacity-50"
        >
          ← Previous
        </button>

        <span className="text-lg font-semibold text-black dark:text-white">Page {currentPage}</span>

        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage === totalPages}
          className="bg-gray-200 dark:bg-slate-800 text-black dark:text-white px-4 py-2 rounded-lg hover:bg-pink-300 dark:hover:bg-slate-700 disabled:opacity-50"
        >
          Next →
        </button>
      </div>
    </div>
  );
}

export default Newsletter;
