import React from 'react'

const AboutUs = () => {
  return (
    <>
        <div className='font-bold text-4xl'>
            <title>Sobre Nosotros</title>
            <meta name="description" content="Conoce más sobre nuestra tienda de ropa y lo que nos inspira." />
        </div>
        <main className="max-w-3xl mx-auto p-6 space-y-6">
        <h1 className="text-3xl font-bold">Sobre Nosotros</h1>
        <p>
          Bienvenidos a nuestra tienda de ropa, un espacio dedicado a ofrecerte lo último en moda para que siempre te sientas
          cómodo y con estilo. Nos apasiona brindarte productos de alta calidad, con diseños únicos y atemporales.
        </p>

        <h2 className="text-2xl font-semibold mt-4">Nuestra Misión</h2>
        <p>
          Nuestra misión es ofrecer ropa de alta calidad que combine confort, estilo y accesibilidad para todos. Queremos ser la
          tienda de confianza de nuestros clientes, ofreciéndoles las últimas tendencias y un servicio excepcional.
        </p>

        <h2 className="text-2xl font-semibold mt-4">Nuestra Visión</h2>
        <p>
          Ser reconocidos como la tienda de ropa más confiable y accesible, destacándonos por ofrecer productos innovadores y
          sostenibles que acompañen a nuestros clientes en cada ocasión especial.
        </p>

        <h2 className="text-2xl font-semibold mt-4">Nuestros Valores</h2>
        <ul className="list-disc pl-6">
          <li>Calidad en cada prenda.</li>
          <li>Compromiso con la sostenibilidad y el medio ambiente.</li>
          <li>Atención al cliente personalizada.</li>
          <li>Innovación constante en los diseños.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-4">Nuestro Equipo</h2>
        <p>
          Somos un equipo de apasionados por la moda, comprometidos a brindarte la mejor experiencia de compra. Nos esforzamos para
          ofrecerte productos de calidad y un servicio excepcional que te haga sentir siempre bien contigo mismo.
        </p>
        </main>
    </>
  )
}

export default AboutUs