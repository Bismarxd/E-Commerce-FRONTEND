"use client";
import React, { useState, useEffect, ReactNode } from "react";

import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { FaPlusCircle } from "react-icons/fa";

interface TableData {
  [key: string]: string | number | boolean | ReactNode | null | [];
}

interface TableHeader {
  key: string;
  label: string;
  width: string;
}

interface TableProps {
  data: TableData[];
  columns: TableHeader[];
  title: string;
  title2: string;
  btnAction: () => void;
  isBtnNeeded?: boolean;
}

const DynamicTable: React.FC<TableProps> = ({
  data,
  columns,
  title,
  title2,
  btnAction,
  isBtnNeeded = true,
}) => {
  const [filteredData, setFilteredData] = useState<TableData[]>(data);
  const [searchTerm, setSearchTerm] = useState("");

  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  }>({
    key: columns[0]?.key || "", // Usa la primera columna como clave predeterminada
    direction: "asc",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Función para filtrar los datos según el término de búsqueda
  const filterData = (searchTerm: string) => {
    return data.filter((row) =>
      Object.values(row).some((value) =>
        value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  // Manejo del cambio de búsqueda
  useEffect(() => {
    const newFilteredData = filterData(searchTerm);
    setFilteredData(newFilteredData);
  }, [searchTerm, data]);

  // Función de ordenación
  const requestSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Ordenando los datos
  const sortedData = filteredData.sort((a, b) => {
    if (!sortConfig.key) return 0;

    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (aValue === null || aValue === undefined) return 1;
    if (bValue === null || bValue === undefined) return -1;

    if (aValue < bValue) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  // Paginación
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = sortedData.slice(indexOfFirstRow, indexOfLastRow);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(sortedData.length / rowsPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
  };

  return (
    <div className="p-4 shadow-lg rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">{title}</h1>
        <div className="flex items-center gap-3">
          <select
            className="border px-2 py-2 me-3 rounded-md"
            onChange={handleChange}
            name="rowperpae"
            id=""
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border rounded"
          />
          {isBtnNeeded && (
            <button
              onClick={btnAction}
              className="bg-blue-400 p-2 flex items-center text-white rounded-md gap-1 hover:bg-blue-700 border-blue-700"
            >
              <FaPlusCircle color="white" /> Añadir {title2}
            </button>
          )}
        </div>
      </div>
      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  style={{ width: column?.width + "px" }}
                  className={` p-2 text-left font-medium uppercase cursor-pointer`}
                >
                  <button
                    className="font-normal flex items-center gap-2 text-xs"
                    onClick={() => requestSort(column.key)}
                  >
                    {column.label}
                    {sortConfig.key === column.key ? (
                      sortConfig.direction === "asc" ? (
                        <span>
                          <MdOutlineKeyboardArrowUp />
                        </span>
                      ) : (
                        <span>
                          <MdOutlineKeyboardArrowDown />
                        </span>
                      )
                    ) : null}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentRows.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={`${
                  rowIndex % 2 === 0 ? "bg-white" : "bg-[#f9fafb]"
                } hover:bg-gray-50`}
              >
                {columns.map((column) => (
                  <td key={column.key} className="text-xs p-2 border-b gap-2">
                    {}
                    {column.key === "status" ? (
                      <span
                        className={
                          row.status === "Activo" || row.status === "Entregado" || row.status === "Pending"|| row.status === "Aceptado"
                            ? "text-green-500 bg-green-200 font-bold p-1 rounded-xl "
                            : row.status === "En Progreso"
                            ? "text-blue-500 bg-blue-200 font-bold p-1 rounded-xl"
                            : "text-red-500 bg-red-200 font-bold p-1 rounded-xl"
                        }
                      >
                        {row[column.key]}
                      </span>
                    ) : column.key === "action" ? (
                      <div className="flex space-x-2">
                        {["Productos", "Ordenes", "Categorias", "Marcas"].includes(title) && (
                        row[column.key]
                        )}
                      </div>
                    ) : (
                      row[column.key]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className="flex justify-end mt-4 gap-3">
        <button
          onClick={goToPreviousPage}
          className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300"
          disabled={currentPage === 1}
        >
          <MdOutlineKeyboardArrowLeft />
        </button>
        <nav>
          <ul className="flex space-x-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <li key={i + 1}>
                <button
                  onClick={() => paginate(i + 1)}
                  className={`p-2 rounded-lg ${
                    currentPage === i + 1
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {i + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <button
          onClick={goToNextPage}
          className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300"
          disabled={currentPage === totalPages}
        >
          <MdOutlineKeyboardArrowRight />
        </button>
      </div>
    </div>
  );
};

export default DynamicTable;
