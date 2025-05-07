import React from 'react';
import { Stat } from '@/types/types';



const StatCard: React.FC<Stat> = ({ icon, label, value, color }) => {
  return (
    <div className={`${color} text-white p-4 rounded-lg flex items-center`}>
      <span className="text-2xl mr-4">{icon}</span>
      <div>
        <p>{label}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;
