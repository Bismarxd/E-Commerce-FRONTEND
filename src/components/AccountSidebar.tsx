"use client";
import React from "react";
import Link from "next/link";
import {
  FaHome,
  FaHistory,

  FaUser,
  FaKey,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { usePathname } from "next/navigation";

const AccountSidebar = () => {
  const pathname = usePathname();
  return (
    <div className="w-full md:w-1/4 bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
      <div className="flex flex-col items-center">
        <img
          src="https://placehold.co/100x100"
          alt="User profile"
          className="rounded-full mb-4"
        />
        <h2 className="text-xl font-semibold hidden md:block">Bismar Mayta</h2>
        <p className="text-gray-600 hidden md:block">+591 69933860</p>
      </div>
      <nav className="mt-8 w-full">
        <ul className="space-y-4 w-full flex flex-col items-center md:items-start">
          {[
            { icon: <FaHome />, text: "Descripción General", route: "overview" },
            {
              icon: <FaHistory />,
              text: "Historial de Pedidos",
              route: "order-history",
            },
            // { icon: <FaUndoAlt />, text: "Devoluciones", route: "return-orders" },
            { icon: <FaUser />, text: "Información de la Cuenta", route: "account-info" },
            { icon: <FaKey />, text: "Cambiar la contraseña", route: "change-password" },
            { icon: <FaMapMarkerAlt />, text: "Dirección", route: "address" },
          ].map((item, index) => (
            <Link
              key={index}
              href={`/accounts/${item.route}`}
              className={`flex items-center p-2 rounded-lg transition w-full justify-center md:justify-start ${
                pathname === `/accounts/${item.route}`
                  ? "text-red-500 bg-gray-100"
                  : "text-gray-600 hover:bg-gray-200 hover:text-black"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="ml-2 hidden md:inline">{item.text}</span>
            </Link>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default AccountSidebar;