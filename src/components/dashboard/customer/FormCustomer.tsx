"use client";
import { Customer } from '@/model/Entities';
import { useCustomerStore } from '@/store/CustomerStore';
import React, { useState } from 'react';
import { FaUser, FaIdCard, FaPhone } from 'react-icons/fa';

export default function FormCustomer() {
  const [formData, setFormData] = useState<Partial<Customer>>({
    firstName: '',
    lastName: '',
    carnet: undefined,
    phoneNumber: undefined,
  });

  // Obtener la función updateCustomer del store
  const updateCustomer = useCustomerStore(state => state.updateCustomer);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const updatedData = {
      ...formData,
      [name]: value
    };
    
    // Actualizar el estado local
    setFormData(updatedData);
    
    // Actualizar el store en tiempo real
    updateCustomer({ [name]: value });
  };

  
  return (
    <div className="bg-white rounded-xl shadow-md p-8 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-8">Información del Cliente</h2>

      <div className="space-y-8">
        {/* Name fields */}
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
              <span className="flex items-center">
                <FaUser className="mr-2 text-blue-500" /> Apellido
              </span>
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Ingrese apellido"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
              <span className="flex items-center">
                <FaUser className="mr-2 text-blue-500" /> Nombre
              </span>
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Ingrese nombre"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Identity fields */}
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="identityType" className="block text-sm font-medium text-gray-700 mb-2">
              <span className="flex items-center">
                <FaIdCard className="mr-2 text-blue-500" /> Identificador 
                <span className="ml-1 font-light text-xs text-gray-500">(Obligatorio)</span>
              </span>
            </label>
            <select
              name="identityType"
              id="identityType"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              <option value="">Seleccione tipo</option>
              <option value="dni">DNI</option>
              <option value="carnet-extranjeria">Carnet de Extranjería</option>
              <option value="otro">Otro</option>
            </select>
          </div>

          <div>
            <label htmlFor="carnet" className="block text-sm font-medium text-gray-700 mb-2">
              <span className="flex items-center">
                <FaIdCard className="mr-2 text-blue-500" /> N° Documento
              </span>
            </label>
            <input
              type="number"
              id="carnet"
              name="carnet"
              placeholder="Ingrese número de documento"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              value={formData.carnet}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Phone field */}
        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
            <span className="flex items-center">
              <FaPhone className="mr-2 text-blue-500" /> N° Teléfono
            </span>
          </label>
          <input
            type="number"
            id="phoneNumber"
            name="phoneNumber"
            placeholder="Ingrese número de teléfono"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
}
