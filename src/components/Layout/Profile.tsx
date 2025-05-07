import React, { JSX } from "react";
import Image from "next/image";
import {
  FaKey,
  FaLock,
  FaMapMarkedAlt,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import Link from "next/link";
import Cookies from 'js-cookie'
import { User } from "@/types/types";


type MenuItems = {
  icon: JSX.Element;
  label: string;
  link: string;
};

type ProfileProps = {
  user: User;
};

const Profile: React.FC<ProfileProps> = ({ user }) => {

  const menuItems: MenuItems[] = [
    {
      icon: <FaLock className="mr-2" />,
      label: "Historial de Ordenes",
      link: "/accounts/overview",
    },
    // {
    //   icon: <FaUndoAlt className="mr-2" />,
    //   label: "Pedidos de Devolución",
    //   link: "/accounts/return-orders",
    // },
    {
      icon: <FaUser className="mr-2" />,
      label: "Información de la Cuenta",
      link: "/accounts/account-info",
    },
    {
      icon: <FaKey className="mr-2" />,
      label: "Cambiar Contraseña",
      link: "/accounts/change-password",
    },
    {
      icon: <FaMapMarkedAlt className="mr-2" />,
      label: "Dirección",
      link: "/accounts/addresss",
    },
    {
      icon: <FaSignOutAlt className="mr-2" />,
      label: "Cerrar Sesión",
      link: "",
    },
  ];

  const handleLogout=async () => {
    Cookies.remove("token")
    window.location.assign("/")
  }

  return (
    <div className="w-full">
      <div className="flex space-x-3 items-center">
        <div>
          <Image
            src={user.avatarUrl}
            alt="profile avatar"
            className="w-10 h-10 rounded-full"
            width={40}
            height={40}
          />
        </div>
        <div className="text-sm">
          <h2 className="font-medium">{user.name}</h2>
          <h2 className="text-xs text-gray-500">{user.mobile}</h2>
        </div>
      </div>
      <div className="mt-3">
        <ul className="space-y-3">
          {menuItems.map((item, index) => {
            return item?.label === "Cerrar Sesión" ? (
              <li
                className="block hover:bg-[#152cac94] p-2 rounded-lg"
                key={index}
              >
                <Link
                  href={"void:0"}
                  onClick={handleLogout}
                  className="flex items-center text-gray-500 hover:text-white border-b pb-2"
                >
                  {item.icon}
                  <span className="ms-2 text-sm">{item.label}</span>
                </Link>
              </li>
            ) : (
              <li
                className="block hover:bg-[#152cac94] p-2 rounded-lg"
                key={index}
              >
                <Link
                  href={item.link}
                  className="flex items-center text-gray-500 hover:text-white border-b pb-2"
                >
                  {item.icon}
                  <span className="ms-2 text-sm">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Profile;
