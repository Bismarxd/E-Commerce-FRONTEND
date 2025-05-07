import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { axiosInstance } from "@/lib/axiosInstance";

type CategoryItem = {
  category: string;
  image: { url: string };
  _id: string;
  subcategory: string;
  status: string;
};

const MenuTabs = () => {

  const [activeTab, setActiveTab] = useState<string>("");
  
  // Para agrupar las subcategorías por categoría
  const [groupedCategories, setGroupedCategories] = useState<Record<string, CategoryItem[]>>({});

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get("/categories");
      if (response?.data?.status) {
        const fetchedCategories = response.data.data;
        
        // Agrupar categorías por 'category'
        const grouped = fetchedCategories.reduce((acc: Record<string, CategoryItem[]>, item: CategoryItem) => {
          if (!acc[item.category]) {
            acc[item.category] = [];
          }
          acc[item.category].push(item);
          return acc;
        }, {});
        
        setGroupedCategories(grouped);
        // Establecer el primer valor como activo si existe
        const firstCategory = Object.keys(grouped)[0] || "";
        setActiveTab(firstCategory);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const renderContent = () => {
    const activeCategoryItems = groupedCategories[activeTab];
    
    if (!activeCategoryItems) return null;

    return (
      <div className="flex py-3 w-full">
        <div className="flex justify-between space-x-8 p-4">
          <Image
            src={activeCategoryItems[0].image.url || "/placeholder.jpg"}
            alt="category"
            className="rounded-lg object-fill h-[300px] w-[300px]"
            width={500}
            height={500}
          />
        </div>

        <div className="flex justify-normal space-x-8 w-full">
          <ul className="gap-2 w-full ">
            {activeCategoryItems.map((item) => (
              <li key={item._id} className="block w-1/3 h-[30px]">
                <Link href={`/products?category=${item.subcategory}`}>
                  {item.subcategory}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full">
      <nav className="flex justify-center space-x-8 py-4 border-b">
        {/* Crear una pestaña por categoría */}
        {Object.keys(groupedCategories).map((categoryName) => (
          <button
            key={categoryName}
            onClick={() => setActiveTab(categoryName)}
            className={`text-black text-md font-bold ${
              activeTab === categoryName
                ? "text-blue-500 border-b-2 border-blue-500"
                : ""
            }`}
          >
            {categoryName}
          </button>
        ))}
      </nav>
      {renderContent()}
    </div>
  );
};

export default MenuTabs;

