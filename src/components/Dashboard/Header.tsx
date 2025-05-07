import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaShoppingCart } from "react-icons/fa";
import { HiBars3BottomLeft } from "react-icons/hi2";
import { axiosInstance } from "@/lib/axiosInstance";
import { User } from "@/types/types";

interface DashboardHeaderProps {
  openSidebar: boolean;
  setOpenSidebar: (open: boolean) => void;
}

const Header: React.FC<DashboardHeaderProps> = ({
  setOpenSidebar,
  openSidebar,
}) => {

  const [user, setUser] = useState<User>()

  const getUser=async() => {
    await axiosInstance.get("/user").then((data) => {
      if(data?.data?.status)
      {
        setUser(data?.data?.user)
      }
    })
  }

  useEffect(() => {
    getUser()
  },[])

  return (
    <div className="flex px-4 bg-white shadow-md sticky top-0 w-full z-50 items-center justify-between">
      <Link href={"/"} className="flex items-center space-x-3 py-4">
        <FaShoppingCart className="text-[#196597] text-3xl" />
        <div className="font-bold">
          <span className="text-3xl text-[#1655a7]">S</span>
          <span className="text-2xl text-blue-500">hop</span>
          <span className="text-3xl text-gray-800">K</span>
          <span className="text-2xl text-gray-800">ing</span>
        </div>
      </Link>
      <div className="flex items-center space-x-4">
        {/* <div className="relative group me-4 py-4">
          <div className="flex items-center space-x-2 cursor-pointer">
            <Image
              src="/banderaEspañol.svg"
              className="h-5 w-5"
              alt="español"
              width={500}
              height={500}
            />
            <span>Español</span>
            <MdOutlineKeyboardArrowDown className="text-xl ms-3" />
          </div>
          <div className="absolute top-14 left-[1px] w-48 bg-white rounded shadow-md hidden group-hover:block gap-3">
            <div className="flex items-center p-2 space-x-2 gap-3 cursor-pointer">
              <Image
                src="/banderaEspañol.svg"
                className="h-5 w-5"
                alt="español"
                width={500}
                height={500}
              />
              <span>Español</span>
            </div>
            <div className="flex items-center p-2 space-x-2 gap-3 cursor-pointer">
              <Image
                src="/banderaEspañol.svg"
                className="h-5 w-5"
                alt="español"
                width={500}
                height={500}
              />
              <span>Español</span>
            </div>
          </div>
        </div> */}
        {/* <div className="bg-blue-100 p-2 rounded">
            <TbHttpPost className="text-[#f34d13]"/>
        </div> */}
        <div onClick={() => setOpenSidebar(!openSidebar)} className="bg-red-100 cursor-pointer p-2 rounded">
            <HiBars3BottomLeft className="text-[#1637a3]"/>

        </div>
        <div className="flex items-center space-x-2 p-2">
            <Image src="/placeholder.256x256.png" alt="user icon" className="w-8 h-8 rounded-md" width={200} height={200}/>
            <div className="flex flex-col">
                <span className="text-sm">Hola</span>   
                <span className="text-sm">{user?.name}</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
