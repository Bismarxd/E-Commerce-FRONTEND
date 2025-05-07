"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FaBars, FaCartArrowDown, FaHeart, FaSearch, FaShoppingCart, FaUser } from 'react-icons/fa';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import MenuTabs from './MenuTabs';
import Profile from './Profile';
import CartSideBar from '../CartSidebar';
import Cookies from 'js-cookie';
import Sidebar from './HomeSidebar';
import { axiosInstance } from '@/lib/axiosInstance';
import { User } from '@/types/types';

const Header = () => {
  const [user, setUser] = useState<User>()
 
  const pathname = usePathname();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Estado para el Sidebar
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  const getUser = async ()=>{
    await axiosInstance.get("/user").then((data) => {
      if(data?.data?.status)
      {
        setUser(data?.data?.user)
      } 
    })
  } 

  useEffect(() => {
    // Verificar si el token está presente antes de hacer la solicitud
    const token = Cookies.get("token");
    if (token) {
      setIsLoggedIn(true);
      getUser();  // Solo obtener el usuario si el token está presente
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // useEffect(() => {
  //   setIsLoggedIn(!!Cookies.get("token"));
  // }, [!!Cookies.get("token")]);

  if (isLoggedIn === null) return null;

  

  return (
    <>
      <div className="bg-white shadow-md sticky top-0 z-50">
        <div className="xl:container flex px-2 xl:px-4 items-center justify-between max-auto">
          {/* 🔹 Ícono del menú para abrir el Sidebar */}
          <div className="block lg:hidden cursor-pointer ">
            <FaBars className='text-2xl font-normal' onClick={() => setIsSidebarOpen(true)} />
          </div>

          <div className='flex items-center space-x-4 xl:space-x-8'>
            <Link href={'/'} className='flex items-center space-x-3 py-4'>
              <FaShoppingCart className='text-[#196597] text-3xl'/>
              <div className='font-bold'>
                <span className='text-3xl text-[#1655a7]'>S</span>
                <span className='text-2xl text-blue-500'>hop</span>
                <span className='text-3xl text-gray-800'>K</span>
                <span className='text-2xl text-gray-800'>ing</span>
              </div>
            </Link>

            <div className="hidden lg:flex items-center space-x-8 py-4"> 
              <Link href={"/"} className={`font-bold text-xl ${pathname === "/" ? "text-[#196597]" : "text-black"}`}>Inicio</Link>
              <div className="relative group py-4">
                <button className='text-black font-bold text-xl flex items-center gap-2'>
                  Categorias <MdOutlineKeyboardArrowDown className='text-2xl'/>
                </button>
                <div className="absolute top-14 left-[-100px] w-[800px] bg-white rounded shadow-md hidden group-hover:block">
                  <MenuTabs/>
                </div>
              </div>
              <Link href={'/offers'} className={`py-4 font-bold text-xl ${pathname === "/offers" ? 'text-[#196597]' : ''}`}>
                Ofertas
              </Link>
            </div>
          </div>

          <div className='hidden lg:flex items-center space-x-3 xl:space-x-6'>
            <div className="relative">
              <input 
                type="text" 
                placeholder='Buscar Producto'
                className='pl-10 pr-4 py-2 rounded-full bg-gray-100 focus:outline-none'
              />
              <FaSearch className='absolute left-3 top-1/2 text-gray-400 transform -translate-y-1/2'/>
            </div>

            <Link href={"/wishlist"}>
              <FaHeart className='text-black cursor-pointer hover:text-orange-700'/>
            </Link>

            <div className="relative group me-4 py-4">
              <div className="flex items-center space-x-2">
                <FaUser className='text-black cursor-pointer'/>
              </div>

              <div className="absolute top-10 right-[-10px] w-52 p-3 bg-white rounded-md shadow-md hidden group-hover:block">
                {!isLoggedIn ? (
                  <div className='flex flex-col py-3 items-center justify-center'>
                    <Link className='text-white block py-2 px-3 bg-[#15299b80] hover:bg-[#263272d3] rounded-full' href={"/register"}>Registrar Nueva Cuenta</Link>
                    <p className='py-1 text-center'>o</p>
                    <Link className='px-3 py-2 block bg-[#0c054e80] hover:bg-[#0c054ebe] rounded-full text-white' href={"/login"}>Iniciar Sesión</Link>
                  </div>
                ) : (
                  <Profile user={{ name: user?.name || "", mobile: user?.mobile || 0, avatarUrl: "/avatar.jpg" }} />
                )}
              </div>
            </div>

            <div className="bg-black p-3 rounded-full cursor-pointer hover:bg-white">
              <FaCartArrowDown onClick={() => setIsCartOpen(true)} className='text-white text-xl hover:text-black'/>
            </div>
          </div>

          <div className="lg:hidden">
            <FaSearch className='p-1 text-2xl'/> 
          </div>
        </div>
      </div>

      {/* 🔹 Sidebar Drawer */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* 🔹 Sidebar del Carrito */}
      {isCartOpen && <CartSideBar isOpen={isCartOpen} setIsOpen={setIsCartOpen}/>}
    </>
  );
}

export default Header;
