import React from 'react'

const SizeCharts = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold text-center mb-8">Tablas de Tallas</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Jeans</h2>
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 border border-gray-300">Talla</th>
              <th className="px-4 py-2 border border-gray-300">Cintura (cm)</th>
              <th className="px-4 py-2 border border-gray-300">Cadera (cm)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-2 border border-gray-300">S</td>
              <td className="px-4 py-2 border border-gray-300">70-75</td>
              <td className="px-4 py-2 border border-gray-300">90-95</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border border-gray-300">M</td>
              <td className="px-4 py-2 border border-gray-300">75-80</td>
              <td className="px-4 py-2 border border-gray-300">95-100</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border border-gray-300">L</td>
              <td className="px-4 py-2 border border-gray-300">80-85</td>
              <td className="px-4 py-2 border border-gray-300">100-105</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border border-gray-300">XL</td>
              <td className="px-4 py-2 border border-gray-300">85-90</td>
              <td className="px-4 py-2 border border-gray-300">105-110</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Pantalones</h2>
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 border border-gray-300">Talla</th>
              <th className="px-4 py-2 border border-gray-300">Cintura (cm)</th>
              <th className="px-4 py-2 border border-gray-300">Largo (cm)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-2 border border-gray-300">S</td>
              <td className="px-4 py-2 border border-gray-300">70-75</td>
              <td className="px-4 py-2 border border-gray-300">100-105</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border border-gray-300">M</td>
              <td className="px-4 py-2 border border-gray-300">75-80</td>
              <td className="px-4 py-2 border border-gray-300">105-110</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border border-gray-300">L</td>
              <td className="px-4 py-2 border border-gray-300">80-85</td>
              <td className="px-4 py-2 border border-gray-300">110-115</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border border-gray-300">XL</td>
              <td className="px-4 py-2 border border-gray-300">85-90</td>
              <td className="px-4 py-2 border border-gray-300">115-120</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Poleras</h2>
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 border border-gray-300">Talla</th>
              <th className="px-4 py-2 border border-gray-300">Pecho (cm)</th>
              <th className="px-4 py-2 border border-gray-300">Largo (cm)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-2 border border-gray-300">S</td>
              <td className="px-4 py-2 border border-gray-300">90-95</td>
              <td className="px-4 py-2 border border-gray-300">65-70</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border border-gray-300">M</td>
              <td className="px-4 py-2 border border-gray-300">95-100</td>
              <td className="px-4 py-2 border border-gray-300">70-75</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border border-gray-300">L</td>
              <td className="px-4 py-2 border border-gray-300">100-105</td>
              <td className="px-4 py-2 border border-gray-300">75-80</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border border-gray-300">XL</td>
              <td className="px-4 py-2 border border-gray-300">105-110</td>
              <td className="px-4 py-2 border border-gray-300">80-85</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default SizeCharts   