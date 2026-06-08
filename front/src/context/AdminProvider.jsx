import React, { useContext, createContext, useState } from 'react';

export const AdminContext = createContext();

export default function AdminProvider({ children }) {
  const initialAdminUser = localStorage.getItem("AdminUser");  
  const [adminUser, setAdminUser] = useState(
    initialAdminUser ? JSON.parse(initialAdminUser) : undefined
  );

  return (
    <AdminContext.Provider value={[adminUser, setAdminUser]}>
      {children}
    </AdminContext.Provider>
  );
}

export const useAdmin = () => useContext(AdminContext);
