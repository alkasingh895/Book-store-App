import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";
import { 
  User as UserIcon, 


  MapPin, 
  Lock, 
  LogOut, 
  ShoppingBag, 
  DollarSign, 
  Package, 
  ShieldCheck,
  CheckCircle
} from "lucide-react";

function Profile() {
    const [showEditAddress, setShowEditAddress] =
useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("User")) || {});

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [fullname, setFullname] = useState(user?.fullname || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [address, setAddress] = useState(user?.address || "");
  const [city, setCity] = useState(user?.city || "");
  const [stateName, setStateName] = useState(user?.state || "");
  const [pincode, setPincode] = useState(user?.pincode || "");  



useEffect(() => {
  setFullname(user?.fullname || "");
  setEmail(user?.email || "");

  setPhone(user?.phone || "");
  setAddress(user?.address || "");
  setCity(user?.city || "");
  setStateName(user?.state || "");
  setPincode(user?.pincode || "");
}, [user]);





  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user?._id) {
      fetchOrders();
    }
  }, [user?._id]);

  

  const fetchOrders = async () => {
    try {
     const res = await api.get(
  `/order/user/${user._id}`
);
      setOrders(res.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };



  const totalOrders = orders.length;
  const totalSpent = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
  const totalItems = orders.reduce((total, order) => 
    total + (order.items?.reduce((sum, item) => sum + (item.quantity || 0), 0) || 0), 0
  );
  const latestOrder = orders.length > 0 ? orders[orders.length - 1] : null;

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (!oldPassword || !newPassword || !confirmPassword) {
      alert("Please fill all fields");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
     const res = await api.post(
  "/user/change-password", {
        userId: user._id,
        oldPassword,
        newPassword,
      });
      alert(res.data.message || "Password updated successfully!");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };   

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
     const res = await api.put(
  "/user/update-profile", {
        userId: user._id,
        fullname,
        email,
      });
      
      const updatedUser = res.data.user;
      localStorage.setItem("User", JSON.stringify(updatedUser));
      setUser(updatedUser);
      alert(res.data.message || "Profile updated!");
    } catch (error) {
      alert(error.response?.data?.message || "Error updating profile");
    }
  };

  const handleUpdateAddress = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put(
  "/user/update-address", {
        userId: user._id,
        phone,
        address,
        city,
        state: stateName,
        pincode,
      });

      const updatedUser = {
        ...user,
        phone,
        address,
        city,
        state: stateName,
        pincode,
      };

      localStorage.setItem("User", JSON.stringify(updatedUser));
      setUser(updatedUser);

setShowEditAddress(false);

alert(
  res.data.message ||
  "Address updated!"
);
    } catch (error) {
      alert(error.response?.data?.message || "Error updating address");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("User");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8 mt-12">
      <div className="max-w-6xl mx-auto">
        
        {/* Upper User Banner */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-2xl shadow-inner">
              {fullname ? fullname[0].toUpperCase() : "U"}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
  {user?.fullname || "User Name"}
  {user?.isAdmin && (
    <span className="inline-flex items-center gap-1 text-xs bg-purple-100 text-purple-700 px-2.5 py-0.5 rounded-full font-medium">
      <ShieldCheck size={14}/>
      Admin
    </span>
  )}
</h1>

<p className="text-gray-500 text-sm">
  {user?.email}
</p>
            </div>
          </div>


          
          <div className="flex gap-3">

  <Link
    to="/"
    className="
      flex
      items-center
      gap-2
      bg-blue-50
      text-blue-600
      hover:bg-blue-100
      px-4
      py-2
      rounded-xl
      text-sm
      font-semibold
      transition
      duration-200
    "
  >
    🏠 Home
  </Link>

  <button
    onClick={handleLogout}
    className="
      flex
      items-center
      gap-2
      bg-red-50
      text-red-600
      hover:bg-red-100
      px-4
      py-2
      rounded-xl
      text-sm
      font-semibold
      transition
      duration-200
    "
  >
    <LogOut size={16} />
    Logout
  </button>

</div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><ShoppingBag size={24}/></div>
            <div>
              <p className="text-sm text-gray-400 font-medium">Total Orders</p>
              <h3 className="text-2xl font-bold text-gray-800">{totalOrders}</h3>
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-orange-50 text-orange-600 rounded-xl"><Package size={24}/></div>
            <div>
              <p className="text-sm text-gray-400 font-medium">Total Items</p>
              <h3 className="text-2xl font-bold text-gray-800">{totalItems}</h3>
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-green-50 text-green-600 rounded-xl"><DollarSign size={24}/></div>
            <div>
              <p className="text-sm text-gray-400 font-medium">Total Spent</p>
              <h3 className="text-2xl font-bold text-gray-800">₹{totalSpent}</h3>
            </div>
          </div>
          <Link to="/my-orders" className="bg-gradient-to-br from-blue-600 to-indigo-600 p-5 rounded-2xl text-white shadow-md shadow-blue-100 flex items-center justify-between hover:opacity-95 transition">
            <div>
              <p className="text-blue-100 text-sm font-medium">Order History</p>
              <h3 className="text-lg font-bold mt-1">View Details →</h3>
            </div>
            <CheckCircle size={32} className="opacity-20"/>
          </Link>
        </div>

        {/* Layout Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Navigation Sidebar */}
          <div className="lg:col-span-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-1">
            <button 
              type="button"
              onClick={() => setActiveTab("profile")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition ${activeTab === "profile" ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"}`}
            >
              <UserIcon size={18}/> Edit Profile Info
            </button>
            <button 
              type="button"
              onClick={() => setActiveTab("address")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition ${activeTab === "address" ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"}`}
            >
              <MapPin size={18}/> Manage Addresses
            </button>
            <button 
              type="button"
              onClick={() => setActiveTab("password")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition ${activeTab === "password" ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"}`}
            >
              <Lock size={18}/> Security & Password
            </button>
          </div>

          {/* Core Content Area */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
            
            {activeTab === "profile" && (

              <form onSubmit={handleUpdateProfile} className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Personal Information</h2>
                  <p className="text-sm text-gray-500">Update your account name and email address.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Full Name</label>
                    <input type="text" value={fullname} onChange={(e) => setFullname(e.target.value)} className="w-full bg-white text-black border border-gray-300 focus:border-blue-500 outline-none p-3 rounded-xl" placeholder="Full Name" required />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Email Address</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-white text-black border border-gray-300 focus:border-blue-500 outline-none p-3 rounded-xl" placeholder="Email" required />
                  </div>
                </div>
                <div className="flex gap-3">

  <button
    type="button"
    onClick={() => {
      setFullname(user?.fullname || "");
      setEmail(user?.email || "");
      setActiveTab("");
    }}
    className="px-6 py-3 rounded-xl border border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
  >
    Cancel
  </button>

  <button
    type="submit"
    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl shadow-sm transition"
  >
    Save Changes
  </button>

</div>
              </form>
            )}


            {activeTab === "address" && (
  <div className="space-y-8">

    {/* Saved Address */}
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-1">
        Saved Delivery Address
      </h2>

      <p className="text-sm text-gray-500 mb-4">
        Your primary default delivery location details.
      </p>

      {orders.length > 0 ? (
        <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm text-gray-700">

          <p>
            <strong>Name:</strong>
            {" "}
            {latestOrder?.fullName}
          </p>

          <p>
  <strong>Phone:</strong>
  {" "}
  {user?.phone || "Not Added"}
</p>

<p className="sm:col-span-2">
  <strong>Address:</strong>
  {" "}
  {user?.address || "Not Added"}
</p>

<p>
  <strong>City:</strong>
  {" "}
  {user?.city || "Not Added"}
</p>

<p>
  <strong>State:</strong>
  {" "}
  {user?.state || "Not Added"}
</p>

<p>
  <strong>Pincode:</strong>
  {" "}
  {user?.pincode || "Not Added"}
</p>

        </div>
      ) : (
        <p className="text-gray-500">
          No Address Found
        </p>
      )}

      <button
        type="button"
        onClick={() =>
          setShowEditAddress(
            !showEditAddress
          )
        }
        className="
        mt-4
        bg-blue-600
        text-white
        px-5
        py-2
        rounded-lg
        hover:bg-blue-700
        "
      >
        ✏️ Edit Address
      </button>
    </div>

    {/* Edit Form */}
    {showEditAddress && (

      <form
        onSubmit={handleUpdateAddress}
        className="
        bg-white
        border
        rounded-xl
        p-5
        space-y-4
        "
      >

        <h3 className="text-lg font-bold">
          Update Address
        </h3>

        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) =>
            setPhone(e.target.value)
          }
          className="
          w-full
          bg-white
          text-black
          border
          border-gray-300
          p-3
          rounded-xl
          "
        />

        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) =>
            setAddress(e.target.value)
          }
          className="
          w-full
          bg-white
          text-black
          border
          border-gray-300
          p-3
          rounded-xl
          "
        />

        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) =>
            setCity(e.target.value)
          }
          className="
          w-full
          bg-white
          text-black
          border
          border-gray-300
          p-3
          rounded-xl
          "
        />

        <input
          type="text"
          placeholder="State"
          value={stateName}
          onChange={(e) =>
            setStateName(
              e.target.value
            )
          }
          className="
          w-full
          bg-white
          text-black
          border
          border-gray-300
          p-3
          rounded-xl
          "
        />

        <input
          type="text"
          placeholder="Pincode"
          value={pincode}
          onChange={(e) =>
            setPincode(
              e.target.value
            )
          }
          className="
          w-full
          bg-white
          text-black
          border
          border-gray-300
          p-3
          rounded-xl
          "
        />

        <div className="flex gap-3">

  <button
  type="button"
  onClick={() => {
    setPhone(user?.phone || "");
    setAddress(user?.address || "");
    setCity(user?.city || "");
    setStateName(user?.state || "");
    setPincode(user?.pincode || "");
    setShowEditAddress(false);
  }}
  className="px-6 py-3 rounded-xl border border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
>
  Cancel
</button>

  <button
    type="submit"
    className="
    bg-green-600
    text-white
    px-6
    py-3
    rounded-xl
    hover:bg-green-700
    "
  >
    Save Address
  </button>

</div>

      </form>

    )}

  </div>
)}

            {activeTab === "password" && (
              <form onSubmit={handleChangePassword} className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Security</h2>
                  <p className="text-sm text-gray-500">Ensure your account is using a secure password.</p>
                </div>
                <div className="space-y-4 max-w-md">
                  <div>
                    <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Current Password</label>
                    <input
  type="password"
  value={oldPassword}
  onChange={(e) => setOldPassword(e.target.value)}
  className="w-full bg-white text-black border border-gray-300 focus:border-blue-500 outline-none p-3 rounded-xl"
  required
/> </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">New Password</label>
                    <input
  type="password"
  value={newPassword}
  onChange={(e) => setNewPassword(e.target.value)}
  className="w-full bg-white text-black border border-gray-300 focus:border-blue-500 outline-none p-3 rounded-xl"
  required
/>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Confirm New Password</label>
                    <input
  type="password"
  value={confirmPassword}
  onChange={(e) => setConfirmPassword(e.target.value)}
  className="w-full bg-white text-black border border-gray-300 focus:border-blue-500 outline-none p-3 rounded-xl"
  required
/>                  </div>
                </div>
                <div className="flex gap-3">

  <button
    type="button"
    onClick={() => {
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }}
    className="px-6 py-3 rounded-xl border border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
  >
    Cancel
  </button>

  <button
    type="submit"
    className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-3 rounded-xl shadow-sm transition"
  >
    Update Password
  </button>

</div>
              </form>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}

export default Profile;