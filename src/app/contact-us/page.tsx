import React from 'react'
import { FaEnvelope, FaFacebook, FaInstagram, FaMapMarkerAlt, FaPhoneAlt, FaTwitter } from 'react-icons/fa'

const ContactUs = () => {
  return (
    <>
        <div>
        <title>Contacto</title>
        <meta name="description" content="Contáctanos para más información sobre nuestros productos y servicios." />
      </div>
      <main className="max-w-3xl mx-auto p-6 space-y-6">
        <h1 className="text-3xl font-bold">Contactos</h1>
        <p>
          Si tienes preguntas sobre nuestros productos o necesitas asistencia, no dudes en ponerte en contacto con nosotros.
          Estamos aquí para ayudarte.
        </p>

        <h2 className="text-2xl font-semibold mt-4">Información de Contacto</h2>
        <ul className="space-y-4">
          <li className="flex items-center">
            <FaPhoneAlt className="text-xl mr-4 text-orange-800" />
            <span>Teléfono: +123 456 7890</span>
          </li>
          <li className="flex items-center">
            <FaEnvelope className="text-xl mr-4 text-orange-800" />
            <span>Email: contacto@tiendaropa.com</span>
          </li>
          <li className="flex items-center">
            <FaMapMarkerAlt className="text-xl mr-4 text-orange-800" />
            <span>Dirección: Calle de la Moda 123, Ciudad, País</span>
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-4">Síguenos en Redes Sociales</h2>
        <div className="flex space-x-6 text-2xl">
          <a href="https://www.facebook.com/tiendaropa" target="_blank" rel="noopener noreferrer">
            <FaFacebook />
          </a>
          <a href="https://www.instagram.com/tiendaropa" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
          <a href="https://twitter.com/tiendaropa" target="_blank" rel="noopener noreferrer">
            <FaTwitter />
          </a>
        </div>

       
      </main>
    </>
  )
}

export default ContactUs