"use client";
import React from "react";
import { FaTimes } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const menuItems = [
  {
    label: "Inicio",
    link: "/",
  },
  {
    label: "Ofertas",
    link: "/offers",
  },
  {
    label: "Favoritos",
    link: "/wishlist",
  },
  {
    label: "Productos",
    link: "/products",
  },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const pathname = usePathname();
  console.log(pathname);

  return (
    <div
      className={`fixed inset-0 z-50 transition-transform transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } bg-black bg-opacity-50`}
      onClick={() => setIsOpen(false)}
    >
      <div
        className="bg-white w-64 h-full shadow-lg p-4 transition-transform transform"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Menú</h2>
          <FaTimes
            className="cursor-pointer text-red-600 text-xl"
            onClick={() => setIsOpen(false)}
          />
        </div>

        <nav>
          <ul className="space-y-4">
            {menuItems.map((item, index) => {
              return (
                <li key={index} onClick={() => setIsOpen(false)}>
                  <Link
                    href={item?.link}
                    className={`block ${
                      item?.link === pathname
                        ? "text-blue-600 font-semibold"
                        : "text-gray-800"
                    }`}
                  >
                    {item?.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
