import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FaEnvelope, FaFacebook, FaInstagram, FaMapMarkedAlt, FaPhone, FaShoppingCart, FaTwitter, FaYoutube } from 'react-icons/fa'

const Footer = () => {
  return (
    <div className='p-6 md:py-12 bg-[#1f1f39]'>
        <div className="xl:container px-2 xl:px-4">
            <div className="flex flex-col gap-8 md:flex-row text-white justify-between items-start">
                <div className="mb-4 md:mb-0 w-full md:w-1/4">
                    <Link href={'/'} className='flex items-center space-x-3 py-4'>
                        <FaShoppingCart className='text-[#196597] text-3xl'/>
                        <div className='font-bold'>
                            <span className='text-3xl text-[#1655a7]'>S</span>
                            <span className='text-2xl text-blue-500'>hop</span>
                            <span className='text-3xl text-white'>K</span>
                            <span className='text-2xl text-white'>ing</span>
                        </div>
                    </Link>
                    <p className='mb-2 md-3 md:mt-8 text-white'>Suscribete para recibir noticias</p>
                    <div className='flex mt-5 items-center mb-4 rounded-full p-2 bg-white'>
                        <input 
                            className='p-2 focus:outline-none rounded-l-full text-black'
                            type='email' 
                            placeholder='Escribe tu E-Mail'
                        />
                        <button className='bg-[#ff4500] text-white p-2 rounded-r-full'>Suscribirse</button>
                    </div>
                    <div className="flex space-x-4 mt-5 md:mt-10">
                        <Link href={"#"}><FaFacebook size={10} className='w-10 h-10 bg-black rounded-full text-white'/></Link>
                        <Link href={"#"}><FaTwitter size={10} className='w-10 h-10 bg-black rounded-full text-white'/></Link>
                        <Link href={"#"}><FaInstagram size={10} className='w-10 h-10 bg-black rounded-full text-white'/></Link>
                        <Link href={"#"}><FaYoutube size={10} className='w-10 h-10 bg-black rounded-full text-white'/></Link>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row w-full md-0 md:ms-5">
                    <div className="mb-8 md:mb-0 w-full md:w-1/3">
                        <h3 className='font-bold mb-2 text-white'>Soporte</h3>
                        <ul>
                            <li className='mb-1'>
                                <Link href={"/faq"}>Preguntas Frecuentes</Link>
                            </li>
                            <li className='mb-1'>
                                <Link href={"/return-exchange"}>Cambios y Devoluciones</Link>
                            </li>
                            <li className='mb-1'>
                                <Link href={"/shipping"}>Envios</Link>
                            </li>
                            <li className='mb-1'>
                                <Link href={"/size-charts"}>Tabla de Tallas</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="mb-8 md:mb-0 w-full md:w-1/3">
                        <h3 className='font-bold mb-2 text-white'>Legal</h3>
                        <ul>
                            <li className='mb-1'>
                                <Link href={"/cookie-police"}>Política de Cookies</Link>
                            </li>
                            <li className='mb-1'>
                                <Link href={"/term-conditions"}>Termino & Condiciones</Link>
                            </li>
                            <li className='mb-1'>
                                <Link href={"/privacy-policy"}>Política de Privacidad</Link>
                            </li>
                            <li className='mb-1'>
                                <Link href={"/about-us"}>Sobre Nosotros</Link>
                            </li>
                            <li className='mb-1'>
                                <Link href={"/contact-us"}>Contactos</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="mb-8 md:mb-0 w-full md:w-1/3">
                        <h3 className='font-bold mb-2 text-white'>Contacto</h3>
                        <p className="mb-1 flex items-center gap-3">
                            <FaMapMarkedAlt/> Casa: 123, Calle:456, Ciudad: La Paz
                        </p>
                        <p className="mb-1 flex items-center gap-3">
                            <FaEnvelope/> info@gmail.com
                        </p>
                        <p className="mb-1 flex items-center gap-3">
                            <FaPhone/> +591 12345678
                        </p>
                        <div className="flex space-x-3 mt-4">
                            <Image className='h-[40px] w-[130px] rounded-xl' src="/playstore.png" alt='play store' width={300} height={300}/>
                            <Image className='h-[40px] w-[130px] rounded-xl' src="/appstore.png" alt='app store' width={300} height={300}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Footer