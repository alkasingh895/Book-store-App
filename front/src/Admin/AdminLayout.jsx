import React, { useState } from "react";
import {
  Link,
  Outlet,
  useNavigate,
  useLocation,
} from "react-router-dom";

function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const location = useLocation();

  const navigate = useNavigate();

  const navLinkClass = (path) =>
    `p-3 rounded-lg duration-200 text-sm text-left ${
      location.pathname === path
        ? "bg-pink-400 text-white"
        : "hover:bg-pink-300 dark:hover:bg-slate-200"
    }`;

  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white dark:bg-slate-950 text-black dark:text-white">
      <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-pink-400">Admin Panel</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">Manage books, orders and messages</p>
        </div>
        <button
          onClick={() => setIsSidebarOpen((prev) => !prev)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-black dark:text-white shadow-sm"
          aria-label="Toggle sidebar"
        >
          ☰
        </button>
      </div>

      <div
        className={`fixed inset-0 bg-black/30 z-20 transition-opacity duration-300 md:hidden ${
          isSidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={closeSidebar}
      />

      <aside
        className={`fixed top-0 left-0 z-30 h-full w-80 max-w-[80vw] transform bg-gray-100 dark:bg-slate-900 border-r border-gray-300 dark:border-slate-800 p-5 transition-transform duration-300 md:relative md:translate-x-0 md:w-64 md:max-w-none ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between md:justify-start gap-3 mb-10">
          <div>
            <h1 className="text-3xl font-bold text-pink-400">Admin Panel</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Dashboard & management</p>
          </div>
          <button
            onClick={closeSidebar}
            className="md:hidden rounded-lg px-3 py-2 text-sm bg-slate-200 dark:bg-slate-800"
            aria-label="Close sidebar"
          >
            ✕
          </button>
        </div>

        <div className="flex flex-col gap-3">
          <Link to="/admin" onClick={closeSidebar} className={navLinkClass("/admin")}>📊 Dashboard</Link>
          <Link to="/admin/books" onClick={closeSidebar} className={navLinkClass("/admin/books")}>📚 Manage Books</Link>
          <Link to="/admin/messages" onClick={closeSidebar} className={navLinkClass("/admin/messages")}>📩 Contact Messages</Link>
          <Link to="/admin/newsletter" onClick={closeSidebar} className={navLinkClass("/admin/newsletter")}>📧 Newsletter</Link>
          <Link to="/admin/orders" onClick={closeSidebar} className={navLinkClass("/admin/orders")}>📦 Orders</Link>
        </div>

        <div className="mt-10 md:mt-16">
          <button
            onClick={() => {
              closeSidebar();
              navigate("/");
            }}
            className="w-full bg-pink-400 hover:bg-pink-600 text-white py-3 rounded-lg duration-300"
          >
            ← Back to Home
          </button>
        </div>
      </aside>

      <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto md:ml-0">
        <div className="max-w-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AdminLayout;