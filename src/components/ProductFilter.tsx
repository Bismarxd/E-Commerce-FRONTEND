"use client";
import { axiosInstance } from "@/lib/axiosInstance";
import React, { useEffect, useState } from "react";
import Slider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css"; // Importa los estilos de react-range-slider-input

interface ProductFilters {
  subcategory?: string;
  category?: string;
  priceMin?: number;
  priceMax?: number;
  stockAvailable?: boolean;
}
interface Category {
  subcategory: string;
  // Otras propiedades de la categoría, si las hay.
}
interface ProductFilterProps {
  onFilterChange: (filters: ProductFilters) => void;
  filteredProducts: ProductFilters; // Cambiar el tipo según la estructura de tus productos
}
const ProductFilter: React.FC<ProductFilterProps> = ({ onFilterChange , filteredProducts}) => {
  const [sortBy, setSortBy] = useState<string>("");
  const [size, setSize] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [brand, setBrand] = useState<string>("");
  const [brands, setBrands] = useState<string[]>([]);


  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(10000);

  const getData = async () => {
    await axiosInstance.get("/categories").then((data) => {
      if(data?.data?.status)
      {
        const subcategories = (data.data.data as Category[]).map(item => item.subcategory); // Aquí usamos 'Category[]' para tipar los datos
        const uniqueSubcategories = Array.from(new Set(subcategories)); // `subcategories` ahora es un arreglo de strings
        setBrands(uniqueSubcategories); // No hay error, ya es string[]
      }
    })
  }

  useEffect(()=>{
    getData()
  },[])

  useEffect(() => {
    if(Object.keys(filteredProducts).length===0)
    {
      setMinPrice(0)
      setMaxPrice(10000)
      setBrand("")
      setColor("")
      setSize("")
      setSortBy("")
    }
  },[JSON.stringify(filteredProducts)])

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
    triggerFilterChange({ sortBy: sort });
  };

  const handleColorChange = (color: string) => {
    setColor(color);
    triggerFilterChange({ color }); // Asegúrate de que el nombre de la propiedad coincida
  };

  const handleSizeChange = (size: string) => {
    setSize(size);
    triggerFilterChange({ size }); // Asegúrate de que el nombre de la propiedad coincida
  };

  const handleBrandChange = (brand: string) => {
    setBrand(brand);
    triggerFilterChange({ subcategory: brand });
  };

  // const handleMultiRangeChange = (values: [number, number]) => {
  //   setMinPrice(values[0]);
  //   setMaxPrice(values[1]);
  //   triggerFilterChange({ minPrice: values[0], maxPrice: values[1] });
  // };

  const triggerFilterChange = (updateFilter = {}) => {
    // @ts-expect-error: El tipo de `updateFilter` se construye dinámicamente y puede no coincidir con `prevFilters`
    onFilterChange(prevFilters => ({
      ...prevFilters,
      ...updateFilter,  
    }));
  };
  

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Ordenar por</h3>
        <div>
          <label className="flex items-center gap-3 mb-2" htmlFor="sort-newest">
            <input
              type="radio"
              id="sort-newest"
              name="sort"
              onChange={() => handleSortChange("newest")}
              checked={sortBy === "newest"}
            />
            Más nuevos
          </label>

          <label
            className="flex items-center gap-3 mb-2"
            htmlFor="sort-price-low"
          >
            <input
              type="radio"
              id="sort-price-low"
              name="sort"
              onChange={() => handleSortChange("price-low-to-high")}
              checked={sortBy === "price-low-to-high"}
            />
            Precio: Menor a Mayor
          </label>

          <label
            className="flex items-center gap-3 mb-2"
            htmlFor="sort-price-high"
          >
            <input
              type="radio"
              id="sort-price-high"
              name="sort"
              onChange={() => handleSortChange("price-high-to-low")}
              checked={sortBy === "price-high-to-low"}
            />
            Precio: Mayor a Menor
          </label>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold mb-2">Precio</h3>
        <div className="flex items-center gap-3 mb-2">
          <input
            type="text"
            value={minPrice}
            className="w-1/2 p-1 border rounded mr-2"
            onChange={(e) => {
              const value = Number(e.target.value);
              setMinPrice(value);
              triggerFilterChange({ minPrice: value });
            }}
          />
          <input
            type="text"
            value={maxPrice}
            className="w-1/2 p-1 border rounded"
            onChange={(e) => {
              const value = Number(e.target.value);
              setMaxPrice(value);
              triggerFilterChange({ maxPrice: value });
            }}
          />
        </div>
        <Slider
          min={0}
          max={10000}
          step={10}
          value={[minPrice, maxPrice]}
          onInput={(values) => {
            setMinPrice(values[0]);
            setMaxPrice(values[1]);
            triggerFilterChange({ minPrice: values[0], maxPrice: values[1] });
          }}
        />
      </div>

      <div className="mb-4">
        <h3 className="font-semibold mb-2">Marca</h3>
        {brands.map(item => (
          <label key={item} className="flex items-center gap-3 mb-2">
            <input
              type="radio"
              name="brand"
              onChange={() => handleBrandChange(item)}
              checked={brand === item}
            />
            {item}
          </label>
        ))}
      </div>

      <div className="mb-4">
        <h3 className="font-semibold mb-2">Tamaño</h3>
        {["S", "M", "L"].map(item => (
          <label key={item} className="flex items-center gap-3 mb-2">
            <input
              type="radio"
              onChange={() => handleSizeChange(item)}
              checked={size === item}
            />
            {item}
          </label>
        ))}
      </div>

      <div className="mb-4">
        <h3 className="font-semibold mb-2">Color</h3>
        {["Rojo", "Blanco", "Azul"].map((item, index) => (
          <label key={index} className="flex items-center gap-3 mb-2">
            <input
              type="radio"
              name="color"
              onChange={() => handleColorChange(item)}
              checked={color === item}
            />
            {item}
          </label>
        ))}
      </div>
    </div>
  );
};

export default ProductFilter;
