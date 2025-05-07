import Link from "next/link";
import React from "react";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineCategory } from "react-icons/md";
import { RiProductHuntLine } from "react-icons/ri";
import { TbCreditCardRefund, TbLogout, TbShoppingCartOff } from "react-icons/tb";
import { TfiShoppingCart } from "react-icons/tfi";
import { SiBrandfolder } from "react-icons/si";
import { usePathname } from "next/navigation";
import Cookies from 'js-cookie'
import { FaUserFriends } from "react-icons/fa";



const Sidebar: React.FC = () => {

  const pathname = usePathname();

  const sideBarSections = [
    
    {
      title: "Productos & Existencias",
      items: [
        
        {
          icon: <MdOutlineCategory/>,
          label: "Categorias",
          link: "/dashboard/categories",
        },
        {
          icon: <SiBrandfolder/>,
          label: "Marcas",
          link: "/dashboard/brands",
        },
        {
          icon: <RiProductHuntLine/>,
          label: "Productos",
          link: "/dashboard/products",
        },
      ],
    },
    {
      title: "Ordenes",
      items: [
        {
          icon: <TfiShoppingCart />,
          label: "Ver Ordenes",
          link: "/dashboard/orders",
        },
        {
          icon: <TbShoppingCartOff />,
          label: "Pedidos de Devolución",
          link: "/dashboard/return",
        },
        {
          icon: <TbCreditCardRefund />,
          label: "Devoluciones y Reembolsos",
          link: "/dashboard/categories",
        },
      ],
    },
    {
      title: "Usuarios",
      items: [
        {
          icon: <FaUserFriends />,
          label: "Gestion de Usuarios",
          link: "/dashboard/users",
        }
      ],
    },
    {
      title: "Configuración",
      items: [
        {
          icon: <TbLogout/>,
          label: "Cerrar Sesión",
          link: "",
        },]
    }
  ];

  const handleLogout=async () => {
      Cookies.remove("token")
      window.location.href="/"
    }
  


  return (
    <div className="h-full bg-white shadow-md w-64">
      <div className="p-4 scroll h-[90vh] overflow-x-hidden overflow-y-scroll">
        <Link
          href={"/dashboard"}
          className={`${
            pathname === "/dashboard"
              ? "bg-[#1633d8d0] text-white font-semibold"
              : ""
          } flex items-center space-x-2 p-2 rounded-md cursor-pointer`}
        >
          <IoHomeOutline />
          <span className="hidden md:inline">Dashboard</span>
        </Link>

        {sideBarSections?.map((item, index) => (
          <div className="mt-2" key={index}>
            <h2 className="text-xs text-gray-500 font-semibold hidden md:block">
              {item?.title}
            </h2>
            <div className="mt-2">
              {item?.items?.map((item, index) => {
                if(item?.label==="Cerrar Sesión")
                {
                  return (
                    <Link
                    href={item?.link}
                    className="hover:text-white hover:bg-red-600 flex items-center space-x-2 p-2 rounded-md cursor-pointer"
                    key={index}
                    onClick={()=>{handleLogout()}}
                  >
                    {item.icon}
                    <span className="hidden md:inline">{item?.label}</span>
                  </Link>
                  )
                } else
                {
                  return (
                    <Link
                    href={item?.link}
                    className={`${
                      item?.link === pathname
                        ? "bg-[#1633d8d0] text-white font-semibold"
                        : "hover:bg-[#1633d8d0] hover:text-white"
                    } flex items-center space-x-2 p-2 rounded-md cursor-pointer`}
                    key={index}
                  >
                    {item.icon}
                    <span className="hidden md:inline">{item?.label}</span>
                  </Link>
                  )
                }
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
