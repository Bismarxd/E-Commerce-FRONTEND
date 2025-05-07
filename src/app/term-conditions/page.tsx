import React from 'react'

const Terms = () => {
  return (
    <>
     <div className='font-bold text-4xl'>
        <title>Términos y Condiciones</title>
        <meta name="description" content="Términos y condiciones de nuestro sitio web." />
      </div>
      <main className="max-w-3xl mx-auto p-6 space-y-6">
        <h1 className="text-3xl font-bold">Términos y Condiciones</h1>
        <p>
          Bienvenido a nuestro sitio web. Al acceder y utilizar nuestros servicios, aceptas cumplir con estos términos y condiciones.
          Si no estás de acuerdo con alguna parte, te recomendamos que no utilices nuestro sitio.
        </p>

        <h2 className="text-2xl font-semibold mt-4">1. Uso del Sitio</h2>
        <p>
          El contenido de este sitio web es solo para fines informativos. No garantizamos la exactitud, integridad o actualidad de la información proporcionada.
        </p>

        <h2 className="text-2xl font-semibold mt-4">2. Propiedad Intelectual</h2>
        <p>
          Todos los contenidos, incluyendo textos, imágenes, logotipos y diseños, son propiedad de nuestro sitio o de terceros con licencia.
          No está permitida la reproducción, distribución o modificación sin autorización previa.
        </p>

        <h2 className="text-2xl font-semibold mt-4">3. Responsabilidad</h2>
        <p>
          No nos hacemos responsables de daños o pérdidas derivadas del uso de este sitio web. El usuario es responsable de la seguridad de su información y dispositivo.
        </p>

        <h2 className="text-2xl font-semibold mt-4">4. Enlaces a Terceros</h2>
        <p>
          Este sitio puede contener enlaces a sitios de terceros. No tenemos control sobre su contenido ni nos hacemos responsables de su uso.
        </p>

        <h2 className="text-2xl font-semibold mt-4">5. Modificaciones</h2>
        <p>
          Nos reservamos el derecho de modificar estos términos en cualquier momento. Se recomienda revisar esta página periódicamente.
        </p>

        <h2 className="text-2xl font-semibold mt-4">6. Contacto</h2>
        <p>
          Si tienes dudas sobre estos términos, puedes contactarnos a través de nuestro formulario de contacto.
        </p>
      </main>
    </>
  )
}

export default Terms