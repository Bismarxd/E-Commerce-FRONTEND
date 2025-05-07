"use client"
import React, {useState} from 'react'

const faqs = [
    {
      question: "¿Cuáles son los métodos de pago disponibles?",
      answer: "Aceptamos pagos con tarjetas de crédito y débito (Visa, MasterCard, American Express), PayPal y transferencias bancarias."
    },
    {
      question: "¿Realizan envíos a todo el país?",
      answer: "Sí, realizamos envíos a nivel nacional. Los tiempos de entrega varían según la ubicación."
    },
    {
      question: "¿Cuánto tiempo tarda en llegar mi pedido?",
      answer: "El tiempo de entrega estimado es de 3 a 7 días hábiles, dependiendo de la ubicación."
    },
    {
      question: "¿Puedo devolver un producto?",
      answer: "Sí, aceptamos devoluciones dentro de los 15 días posteriores a la entrega, siempre que el producto esté en su estado original."
    },
    {
      question: "¿Cómo puedo rastrear mi pedido?",
      answer: "Te enviaremos un correo con un enlace para rastrear tu pedido una vez que haya sido enviado."
    },
    {
      question: "¿Cómo funcionan las devoluciones y cambios?",
      answer: "Puedes solicitar un cambio o devolución dentro de los 15 días posteriores a la entrega. Para ello, el producto debe estar sin usar y en su empaque original. Contáctanos para iniciar el proceso."
    }
  ];
const Faq = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
      setOpenIndex(openIndex === index ? null : index);
    };
   
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-4">Preguntas Frecuentes</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border p-3 rounded-lg cursor-pointer" onClick={() => toggleFAQ(index)}>
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">{faq.question}</h3>
              <span>{openIndex === index ? "−" : "+"}</span>
            </div>
            {openIndex === index && <p className="mt-2 text-gray-600">{faq.answer}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Faq