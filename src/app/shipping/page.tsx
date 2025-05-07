"use client"
import React, {useState} from 'react'

const sections = [
    {
      question: "Zonas de Envío",
      answer: "Realizamos envíos a nivel nacional. También ofrecemos envíos internacionales a ciertos países."
    },
    {
      question: "Tiempo de Entrega",
      answer: "El tiempo estimado de entrega es de 3 a 7 días hábiles a nivel nacional, y de 10 a 20 días hábiles para envíos internacionales."
    },
    {
      question: "Costo de Envío",
      answer: "El costo del envío varía según la ubicación y el peso del paquete. Ofrecemos envío gratuito en pedidos superiores a cierto monto."
    },
    {
      question: "Devoluciones y Reembolsos",
      answer: "Una vez que tu pedido haya sido enviado, recibirás un correo con un número de seguimiento para rastrear tu paquete en tiempo real."
    }
  ];


const Shipping = () => {

    const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(prevIndex => (prevIndex === index ? null : index));
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-4">Políticas de Envios</h2>
      <div className="space-y-4">
        {sections.map((section, index) => (
          <div key={index} className="border p-3 rounded-lg cursor-pointer" onClick={() => toggleFAQ(index)}>
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">{section.question}</h3>
              <span>{openIndex === index ? "−" : "+"}</span>
            </div>
            {openIndex === index && <p className="mt-2 text-gray-600">{section.answer}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Shipping