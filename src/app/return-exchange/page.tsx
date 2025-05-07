"use client"
import React, {useState} from 'react'

const sections = [
    {
      question: "Condiciones Generales",
      answer: "Para realizar un cambio o devolución, el producto debe estar en perfectas condiciones, con etiquetas y empaque original."
    },
    {
      question: "Plazo para Cambios y Devoluciones",
      answer: "Dispones de un plazo de 30 días desde la fecha de compra para realizar un cambio o devolución."
    },
    {
      question: "Proceso de Cambio",
      answer: "Para solicitar un cambio, contacta nuestro servicio de atención al cliente con el número de pedido y la razón del cambio."
    },
    {
      question: "Devoluciones y Reembolsos",
      answer: "Los reembolsos se procesarán en un plazo de 5 a 10 días hábiles después de recibir el producto devuelto."
    }
  ];


const ReturnExchange = () => {

    const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(prevIndex => (prevIndex === index ? null : index));
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-4">Políticas de Cambios y Devoluciones</h2>
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

export default ReturnExchange