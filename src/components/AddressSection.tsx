import React from 'react';
import { FaEdit, FaPlusCircle } from 'react-icons/fa';

interface Address {
    fullName: string;
    phone: string;
    email: string;
    city: string;
    country: string;
    streetAddress: string;
}

interface Addresses {
    billingAddress:Address ;
    shippingAddress: Address;
}

interface AddressProps {
    title: string;
    handleEditForm: (title:string) => void;
    handleOpenForm: (title:string) => void;
    addresses: Addresses;
}



const AddressSection: React.FC<AddressProps> = ({addresses, title, handleOpenForm, handleEditForm }) => {
    return (
        <div className="bg-white p-4 rounded shadow mt-3">
            <h2 className="text-lg font-semibold mb-4">{title}</h2>
            <div className="border p-4 rounded mb-4">
                <p>{addresses?.shippingAddress?.fullName}</p>
                <p>{addresses?.shippingAddress?.phone}</p>
                <p>{addresses?.shippingAddress?.email}</p>
                <p>{addresses?.shippingAddress?.city}, {addresses?.shippingAddress?.country}</p>
                <p>{addresses?.shippingAddress?.streetAddress}</p>
            </div>
            <div className="flex justify-between items-center mb-4">
                <button onClick={() => handleEditForm(title)} className="text-white mr-2 flex items-center p-2 bg-green-400 rounded-lg hover:bg-green-600">
                    <FaEdit /> Editar
                </button>
                <button onClick={() => handleOpenForm(title)} className="bg-red-400 text-white p-2 rounded-lg flex items-center hover:bg-red-600">
                    <FaPlusCircle /> Añadir Nuevo
                </button>
            </div>
           
        </div>
    );
};

export default AddressSection;