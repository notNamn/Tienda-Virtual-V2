import { Seller } from '@/model/Entities'
import React from 'react'
import { FaUser, FaStore, FaPhone, FaIdCard, FaSave } from 'react-icons/fa'

type ProfileSellerProps = {
   seller: Seller; 
}

export default function ProfileSeller({seller}:ProfileSellerProps) {

    return (
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen py-8">
            <div className="w-full max-w-4xl mx-auto p-4">
                <div className=" dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-yellow-400 mb-6 flex items-center">
                        <FaUser className="mr-3 text-teal-500" />
                        Perfil de Vendedor
                    </h1>

                    <div className="mb-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="transition-all duration-200 hover:shadow-md p-4 rounded-lg">
                                <label htmlFor="last_name" className="block text-gray-700 dark:text-white mb-2 font-medium flex items-center">
                                    <FaUser className="mr-2 text-teal-500" />
                                    Apellido
                                </label>
                                <input 
                                    type="text" 
                                    id="last_name" 
                                    className="w-full rounded-lg border border-gray-300 py-3 px-4 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200" 
                                    value={seller.lastName}
                                />
                            </div>
                            <div className="transition-all duration-200 hover:shadow-md p-4 rounded-lg">
                                <label htmlFor="first_name" className="block text-gray-700 dark:text-white mb-2 font-medium flex items-center">
                                    <FaUser className="mr-2 text-teal-500" />
                                    Nombre
                                </label>
                                <input 
                                    type="text" 
                                    id="first_name" 
                                    className="w-full rounded-lg border border-gray-300 py-3 px-4 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200" 
                                    value={seller.firstName}    
                                />
                            </div>
                        </div>

                        <div className="mt-6 transition-all duration-200 hover:shadow-md p-4 rounded-lg">
                            <label htmlFor="address" className="block text-gray-700 dark:text-white mb-2 font-medium flex items-center">
                                <FaStore className="mr-2 text-teal-500" />
                                Dirección de la Tienda
                            </label>
                            <input 
                                type="text" id="address" 
                                className="w-full rounded-lg border border-gray-300 py-3 px-4 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200" 
                                value={seller.shopAddress}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                            <div className="transition-all duration-200 hover:shadow-md p-4 rounded-lg">
                                <label htmlFor="phone" className="block text-gray-700 dark:text-white mb-2 font-medium flex items-center">
                                    <FaPhone className="mr-2 text-teal-500" />
                                    Número de Teléfono
                                </label>
                                <input 
                                    type="number" id="phone" 
                                    className="w-full rounded-lg border border-gray-300 py-3 px-4 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200" 
                                    value={seller.phoneNumber}    
                                />
                            </div>
                            <div className="transition-all duration-200 hover:shadow-md p-4 rounded-lg">
                                <label htmlFor="carnet" className="block text-gray-700 dark:text-white mb-2 font-medium flex items-center">
                                    <FaIdCard className="mr-2 text-teal-500" />
                                    Carnet
                                </label>
                                <input 
                                    type="number" 
                                    id="carnet" 
                                    className="w-full rounded-lg border border-gray-300 py-3 px-4 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200" 
                                    value={seller.carnet}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 flex justify-end">
                        <button 
                            className="bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 dark:bg-teal-600 dark:hover:bg-teal-700 transition-all duration-300 transform hover:scale-105 flex items-center font-medium shadow-md hover:shadow-lg">
                            <FaSave className="mr-2" />
                            GUARDAR CAMBIOS
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
