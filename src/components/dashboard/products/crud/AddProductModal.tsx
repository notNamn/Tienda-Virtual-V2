"use client";
import React, { useState } from 'react'
import { createProduct } from '@/service/ProductService';
import { useRouter } from 'next/navigation';
import { Product } from '@/model/Entities';

type AddProductModalProps = {
    categories: string[];
}

export function AddProductModal({ categories }: AddProductModalProps) {

    const refresh = useRouter();

    const [formData, setFormData] = useState<Partial<Product>>({
        category: { name: '' }
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        
        setFormData(prev => {
            const newData = { ...prev };
            
            if (name === 'category') {
                newData.category = { name: value };
            } else {
                (newData as any )[name] = value;
            }
            
            return newData;
        });
    };

    // cerrar modal 
    const handleCloseModal = () => {
        const modal = document.getElementById(`modal_product`) as HTMLDialogElement;
        modal.showModal();

        refresh.push('/dashboard/products/#', { scroll: false });

    };

    const handleCancelModal = () => {
        const modal = document.getElementById(`modal_product`) as HTMLDialogElement;
        modal.close();
        refresh.push('/dashboard/products');
    } 

    // procesar formulario
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await createProduct(formData as Product);
            console.log(response);
            
            const modal = document.getElementById(`modal_product`) as HTMLDialogElement;
            modal.close();
            
            setFormData({
                category: { name: '' }
            });

            refresh.refresh();
        } catch (error) {
            console.error("Error al crear el producto:", error);
        }
    };

    return (
        <>
            <button 
                className="bg-indigo-600 hover:bg-indigo-700 text-white 
                font-medium py-2 px-4 rounded-lg transition duration-150 ease-in-out"
                onClick={handleCloseModal}
            >
                Agregar producto
            </button>

            <dialog id={`modal_product`} className="modal">
                <div className="modal-box max-w-3xl p-0 bg-white rounded-lg overflow-hidden">
                    <div className="flex justify-between items-center p-4 border-b">
                        <h2 className="text-2xl font-bold text-gray-800">
                            Agregar Nuevo Producto
                        </h2>
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost">✕</button>
                        </form>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        <p className="text-gray-600">
                            Complete los campos para agregar un nuevo producto
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Nombre del producto */}
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text font-medium">
                                        Nombre del producto
                                    </span>
                                </label>
                                <input 
                                    type="text" 
                                    name="title"
                                    value={formData.title || ''}
                                    onChange={handleChange}
                                    placeholder="Ej: Smartphone Galaxy S21" 
                                    className="input input-bordered w-full" 
                                    required
                                />
                            </div>
                            
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text font-medium">Precio</span>
                                </label>
                                <input 
                                    type="number" 
                                    name="price"
                                    value={formData.price || ''}
                                    onChange={handleChange}
                                    placeholder="Ej: 599.99" 
                                    className="input input-bordered w-full" 
                                    min="0"
                                    step="0.01"
                                    required
                                />
                            </div>
                            
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text font-medium">Categoría</span>
                                </label>
                                <select 
                                    name="category"
                                    value={formData.category?.name || ''}
                                    onChange={handleChange}
                                    className="select select-bordered w-full"
                                    required
                                >
                                    <option value="" disabled>Seleccione una categoría</option>

                                    {categories.map((cat) =>(
                                        <option key={cat} value={cat}>
                                            {cat}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text font-medium">Stock disponible</span>
                                </label>
                                <input 
                                    type="number" 
                                    name="stock"
                                    value={formData?.stock}
                                    onChange={handleChange}
                                    placeholder="Ej: 50" 
                                    className="input input-bordered w-full" 
                                    min="0"
                                    required
                                />
                            </div>
                            
                            <div className="form-control w-full md:col-span-2">
                                <label className="label">
                                    <span className="label-text font-medium">URL de la imagen</span>
                                </label>
                                <input 
                                    type="url" 
                                    name="imageUrl"
                                    value={formData?.imageUrl}
                                    onChange={handleChange}
                                    placeholder="https://ejemplo.com/imagen.jpg" 
                                    className="input input-bordered w-full" 
                                    required
                                />
                            </div>
                            
                            <div className="form-control w-full md:col-span-2">
                                <label className="label">
                                    <span className="label-text font-medium">Descripción</span>
                                </label>
                                <textarea 
                                    name="description"
                                    value={formData?.description}
                                    onChange={handleChange}
                                    className="textarea textarea-bordered h-24" 
                                    placeholder="Describa el producto..."
                                    required
                                ></textarea>
                            </div>
                        </div>
                        
                        <div className="flex justify-end space-x-3 mt-6">
                            <button 
                                type="button"
                                className="btn btn-outline"
                                onClick={handleCancelModal}
                            >
                                Cancelar
                            </button>
                            <button 
                                type="submit"
                                className="btn bg-indigo-600 hover:bg-indigo-700 text-white"
                            >
                                Guardar producto
                            </button>
                        </div>
                    </form>
                </div>

                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    )
}