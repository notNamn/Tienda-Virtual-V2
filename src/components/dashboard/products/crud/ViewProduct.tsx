import { Product } from '@/model/Entities';
import React from 'react'

type ViewProductProps = {
    producto: Product,
}
export function ViewProduct({ producto }: ViewProductProps) {

    const handleCloseModal = () => {
        const modal = document.getElementById(`modal_product_${producto.id}`) as HTMLDialogElement;
        modal.showModal();
    }

    return (
        <>
            <a className="text-indigo-600 hover:text-indigo-900 mr-3 cursor-pointer"
                onClick={handleCloseModal}
            >
                View
            </a>

            <dialog id={`modal_product_${producto.id}`} className="modal">
                <div className="modal-box max-w-3xl p-0 bg-white rounded-lg overflow-hidden">
                    {/* Header con botón de cierre */}
                    <div className="flex justify-between items-center p-4 border-b">
                        <h2 className="text-2xl font-bold text-gray-800">
                            Detalles del Producto
                        </h2>
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost">✕</button>
                        </form>
                    </div>
                    
                    {/* Contenido principal */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                        {/* Imagen del producto */}
                        <div className="relative">
                            <img 
                                className="w-full h-80 object-cover rounded-lg shadow-md transform transition duration-500 hover:scale-105" 
                                src={producto.imageUrl}
                                alt={producto.title} 
                            />
                            <div className="absolute top-3 right-3 bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                {producto.category.name}
                            </div>
                        </div>
                        
                        {/* Información del producto */}
                        <div className="flex flex-col justify-between">
                            <div>
                                <h2 className="text-3xl font-bold mb-2 text-gray-800">{producto.title}</h2>
                                <p className="text-gray-600 mb-6">{producto.description}</p>
                                
                                {/* Detalles adicionales */}
                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between border-b pb-2">
                                        <span className="font-semibold">Categoría:</span>
                                        <span>{producto.category.name}</span>
                                    </div>
                                    <div className="flex justify-between border-b pb-2">
                                        <span className="font-semibold">Stock:</span>
                                        <span className={`px-2 py-1 rounded-full text-xs ${producto.stock > 10 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {producto.stock} unidades
                                        </span>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Precio y botones */}
                            <div className="mt-auto">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-3xl font-bold text-indigo-600">${producto.price}</span>
                                    <div className="flex space-x-2">
                                        <button 
                                            className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg 
                                            shadow-md hover:bg-indigo-700 focus:outline-none 
                                            focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 transition duration-300 ease-in-out"
                                        >
                                            Editar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    )
}