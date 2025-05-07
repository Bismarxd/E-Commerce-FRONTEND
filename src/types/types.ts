import { JSX } from "react";

//****************************ACCOUNT*******************************
export interface User {
  name: string;
  mobile: number;
  email?: string;
  avatarUrl: string;
}

//**************************ADDRESSS******************************
export interface AddressCardProps {
  fullName: string;
  email: string
  phone: string
  streetAddress: string
  country: string;
  state: string;
  city: string;
  zipCode: string;
}

//******************ORDERS*********************
export interface OrderItem {
    productName: string;
    quantity: number;
    price: number;
    description: string;
    productImage: string;
  }
  
export interface ShippingAddress {
        fullName: string;
        email: string;
        phone: string;
        streetAddress: string;
    }

interface Address {
        name: string | undefined;
        email: string | undefined;
        phone: string | undefined;
        address: string | undefined;
    }

type Status = "Pendiente" | "Aceptado" | "Enviado" | "En Camino" | "Pagado" | "Entregado" | "Cancelado" | "Devuelto" | "Reemboolsado"

export interface Order {
  _id?: string;
  status: Status;
  orderId: string | undefined;
  date: string;
  orderStatus?: string;
  refundStatus?: string;
  orderDate?: string | undefined;
  paymentType: string;
  orderType: string;
  items: OrderItem[];
  shippingAddress?: ShippingAddress;
  subtotal: number;
  tax: number;
  discount: number;
  shippingCharge?: number;
  from?: string;
  address: Address;
  total?:number;
  userId?:User;
  shippingFee: number | undefined;
  fetchOrder: () => void;

  
    customer?: string;
    amount?: number;
   
    action?: JSX.Element;
}

export type TableData = {
    [key: string]: string | number | JSX.Element;
  };


  
//**************************PRODUCTS**************************

export interface Image {
    url: string; 
    _id: string;
  }

export interface Offers {
      discountPercentage: number ;
      flashSale: "Yes" | "No";
      startDate: Date;
      endDate: Date;   
  }

export interface ShippingReturn {
    shippingType: string;
    isProductQuantityMultiply: "Yes" | "No";
    shippingCost: number;
    shippingReturnPolicy: string;
} 

export interface Seo {
    id: string;
    metaTitle: string;
    metaDescription: string;
    metaKeywords: string;
    metaImage: Image;
    getProducts: () => Promise<void>;
}

export interface Product {
  _id: string;
   name: string;
   sku: string;
   category: string;
   subcategory: string;
   barcode: string;
   buyingPrice: number;
   sellingPrice: number;
   tax: string;
   brand: string;
   status: "Active" | "Inactive";
   canPurchaeAble: "Yes" | "No";
   showStock: "Enable" | "Disable";
   refundable: "Yes" | "No";
   maximunPurchaseQuantity: number;
   lowStockQuantityWarning: number;
   unit: string;
   weight: string;
   tags: string;
   description: string;
   images: Image[];
   offers?: Offers;
   shippingReturn?: ShippingReturn;
   seo?: Seo; 
   videos: Video[]
    variations: Variation[];
    slug?: string;
     
}

export interface Variation {
  _id: string;
  color: string;
  size: string;
  price: number;
  sku: string;
  quantityAvailable: number;
}

export interface Video {
  videoProvider: string;
  videoLink: string;
  _id: string;
}

export interface Category {
  category: string;
  subcategory: string;
}

export interface Brand {
   _id: React.ReactNode;
    name: string;
    description: string;
    status: string;
    image: Image;
}


//*********************ORDERS**********************************

export interface Stat {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
}

export interface MetricProps {
  totalOrders: string;
  totalCustomer: string;
  totalProducts: string;
  totalEarning: { totalEarning: string }[]; 
}

export interface SalesData {
  totalSales: number;
  avgSalesPerDay: number;
  dailySales: {
    _id: number;
    total: number;
  }[];
}

export interface OrderProps {
  _id: string;
  count: string;
}

export interface OrderStatusSummary {
  orderStatusSummary: {
    Cancelado: number;
    Entregado: number;
    Reemboolsado: number;
  };
  totalOrders: number
}

export interface CustomerActivity {
  count: number;
  _id:number
}







