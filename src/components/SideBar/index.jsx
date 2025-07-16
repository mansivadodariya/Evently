import React, { useState } from "react";
import {
  FaHome,
  FaCalendarAlt,
  FaSignOutAlt,
  FaBars,
  FaUserCircle,
} from "react-icons/fa";
import { images } from "../../assets/inde";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // ✅ Auth Context

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { logout, user } = useAuth(); // ✅ Get logged-in user

  const handleLogout = async () => {
    await logout();
    window.location.href = "/login";
  };

  const menuItems = [
    { name: "Dashboard", icon: <FaHome size={18} />, path: "/" },
    { name: "Events", icon: <FaCalendarAlt size={18} />, path: "/events" },
  ];

  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      <div className="md:hidden w-full flex justify-between items-center bg-[#f6ecf9] p-4 shadow-md fixed top-0 left-0 z-30">
        <button onClick={() => setIsOpen(!isOpen)}>
          <FaBars size={24} className="text-purple-900" />
        </button>
        <div className="flex items-center gap-2">
          <FaUserCircle size={36} className="text-purple-900" />
          <span className="text-purple-900 font-semibold">
            {user?.displayName || user?.email?.split("@")[0] || "Guest"}
          </span>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-20 md:hidden"
          onClick={closeSidebar}
        ></div>
      )}

      <div
        className={`fixed md:relative top-0 left-0 h-screen w-60 bg-[#fff3f7] p-5 flex flex-col
        transform transition-transform duration-300 ease-in-out z-30
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="flex items-center gap-2 text-2xl font-bold text-purple-800 mb-10">
          <img src={images.logo} alt="Logo" className="w-10 aspect-square" />
          <span>Evently</span>
        </div>

        <nav className="flex-1 space-y-4">
          {menuItems.map((item, index) => (
            <Link
              to={item.path}
              key={index}
              onClick={closeSidebar}
              className={`flex items-center gap-3 px-4 py-2 rounded-xl cursor-pointer text-purple-900 
                ${
                  location.pathname === item.path
                    ? "bg-purple-100 font-semibold"
                    : "hover:bg-purple-100"
                }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}

          <div
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2 rounded-xl cursor-pointer text-red-500 hover:bg-red-100"
          >
            <FaSignOutAlt size={18} />
            <span>Logout</span>
          </div>
        </nav>

        <div className="hidden md:flex items-center gap-2 mt-auto">
          <FaUserCircle size={36} className="text-purple-900" />
          <span className="text-purple-900 font-semibold">
            {user?.displayName || user?.email?.split("@")[0] || "Guest"}
          </span>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
