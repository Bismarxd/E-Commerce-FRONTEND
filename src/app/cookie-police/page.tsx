import React from 'react'

const CokkiePolice = () => {
  return (
    <>
         <div className='font-bold text-4xl'>
        <title>Política de Cookies</title>
        <meta name="description" content="Política de cookies de nuestro sitio web." />
      </div>
      <main className="max-w-3xl mx-auto p-6 space-y-6">
        <h1 className="text-3xl font-bold">Política de Cookies</h1>
        <p>
          Este sitio web utiliza cookies para mejorar la experiencia del usuario y optimizar su funcionamiento.
          Al continuar navegando, aceptas el uso de cookies según esta política.
        </p>

        <h2 className="text-2xl font-semibold mt-4">¿Qué son las cookies?</h2>
        <p>
          Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas un sitio web.
          Permiten recordar información sobre tu navegación para mejorar tu experiencia en futuras visitas.
        </p>

        <h2 className="text-2xl font-semibold mt-4">Tipos de cookies que utilizamos</h2>
        
        <h3 className="text-xl font-medium">Cookies esenciales</h3>
        <p>
          Son necesarias para el correcto funcionamiento del sitio web y no pueden desactivarse.
          Permiten funciones como la autenticación de usuarios y la gestión de carritos de compra.
        </p>

        <h3 className="text-xl font-medium">Cookies de análisis</h3>
        <p>
          Nos ayudan a entender cómo los usuarios interactúan con nuestro sitio, recopilando datos anónimos
          sobre el tráfico y el comportamiento de navegación.
        </p>

        <h3 className="text-xl font-medium">Cookies de personalización</h3>
        <p>
          Permiten recordar tus preferencias, como el idioma seleccionado o la configuración de visualización,
          para ofrecerte una experiencia más personalizada.
        </p>

        <h3 className="text-xl font-medium">Cookies de publicidad</h3>
        <p>
          Se utilizan para mostrar anuncios relevantes según tus intereses y limitar la repetición de anuncios.
          También pueden ser utilizadas por terceros para ofrecer publicidad personalizada.
        </p>

        <h2 className="text-2xl font-semibold mt-4">Gestión y desactivación de cookies</h2>
        <p>
          Puedes configurar tu navegador para bloquear o eliminar cookies en cualquier momento. Sin embargo,
          esto puede afectar algunas funcionalidades del sitio. 
        </p>

        <h2 className="text-2xl font-semibold mt-4">Contacto</h2>
        <p>
          Si tienes dudas sobre nuestra política de cookies, puedes contactarnos a través de nuestro formulario de contacto.
        </p>
      </main>
    </>
  )
}

export default CokkiePolice