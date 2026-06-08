import React from "react";

import DashboardCards from "./DashboardCards";

function Dashboard() {

  return (

    <div>

      <h1 className="text-4xl font-bold text-black  dark:text-white mb-8">
        📊 Admin Dashboard
      </h1>

      <DashboardCards />

    </div>
  );
}

export default Dashboard;