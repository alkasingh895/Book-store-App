import React, { useEffect, useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";

function ContactMessages() {
  const [messages, setMessages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const messagesPerPage = 5;

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.get("/admin/messages/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessages(response.data.messages);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load messages");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this message?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      await api.delete(`/admin/messages/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Message deleted successfully ✅");
      fetchMessages();
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete message");
    }
  };

  const filteredMessages = messages.filter((msg) => {
    const name = msg.name?.toLowerCase() || "";
    const email = msg.email?.toLowerCase() || "";
    return (
      name.includes(searchTerm.toLowerCase()) ||
      email.includes(searchTerm.toLowerCase())
    );
  });

  const indexOfLastMessage = currentPage * messagesPerPage;
  const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
  const currentMessages = filteredMessages.slice(
    indexOfFirstMessage,
    indexOfLastMessage
  );
  const totalPages = Math.ceil(filteredMessages.length / messagesPerPage);

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div>
      <h1 className="text-4xl font-bold text-black dark:text-white mb-8">📩 Contact Messages</h1>

      <div className="mb-6">
        <input
          type="text"
          placeholder="🔍 Search messages..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-96 px-4 py-3 rounded-xl bg-gray-200 dark:bg-slate-800 text-black dark:text-white border border-slate-700 focus:outline-none focus:border-pink-500"
        />
      </div>

      <div className="hidden md:block overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
        <table className="table w-full text-sm">
          <thead>
            <tr className="bg-gray-200 dark:bg-slate-800 text-black dark:text-white">
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentMessages.map((msg) => (
              <tr
                key={msg._id}
                className="hover dark:bg-slate-800 text-black dark:text-white border-b border-slate-800"
              >
                <td className="px-4 py-3">{msg.name}</td>
                <td className="px-4 py-3">{msg.email}</td>
                <td className="px-4 py-3 max-w-xl line-clamp-2">{msg.message}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleDelete(msg._id)}
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
        {currentMessages.length ? (
          currentMessages.map((msg) => (
            <div
              key={msg._id}
              className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900"
            >
              <div className="flex flex-col gap-3 text-sm text-slate-700 dark:text-slate-300">
                <div>
                  <p className="font-semibold">Name</p>
                  <p>{msg.name}</p>
                </div>
                <div>
                  <p className="font-semibold">Email</p>
                  <p>{msg.email}</p>
                </div>
                <div>
                  <p className="font-semibold">Message</p>
                  <p className="whitespace-pre-wrap break-words">{msg.message}</p>
                </div>
              </div>
              <button
                onClick={() => handleDelete(msg._id)}
                className="mt-4 w-full rounded-xl bg-red-500 px-4 py-3 text-sm font-semibold text-white hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 text-center text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
            No messages found.
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

export default ContactMessages;
