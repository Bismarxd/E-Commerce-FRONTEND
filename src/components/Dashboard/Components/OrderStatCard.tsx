import React from 'react';
import { Stat } from '@/types/types';


const OrderStatCard: React.FC<Stat> = ({ icon, label, value, color }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg flex items-center">
      <span className={`text-2xl ${color} mr-4`}>{icon}</span>
      <div>
        <p>{label}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
};

export default OrderStatCard;
