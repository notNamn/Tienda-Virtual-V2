"use client";
import { Product } from '@/model/Entities';
import { updateProduct } from '@/service/ProductService';
import { useRouter } from 'next/navigation';
import React, {useState } from 'react';

type EditProductModalProps = {
    producto: Product,
    categories: string[], 
}

export default function EditProductModal({ producto, categories }: EditProductModalProps) {
    const refresh = useRouter();
    
    const [formData, setFormData] = useState<Partial<Product>>({
        id: producto.id,
        title: producto.title,
        price: producto.price,
        description: producto.description,
        category: { name: producto.category.name },
        stock: producto.stock,
        imageUrl: producto.imageUrl
    });
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        
        setFormData(prevFormData => {
            
            const newData = { ...prevFormData };
            
            
            if (name === 'category') {
                newData.category = { name: value };
            } else {
            
                (newData as any)[name] = value;
            }
            
            return newData;
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await updateProduct(producto.id, formData as Product);
            console.log("Product updated:", response);
            
            const modal = document.getElementById(`modal_edit_product_${producto.id}`) as HTMLDialogElement;
            modal.close();
            
            refresh.refresh();
        } catch (error) {
            console.error("Error updating product:", error);
        } 
    };

    const handleCloseModal = () => {
        const modal = document.getElementById(`modal_edit_product_${producto.id}`) as HTMLDialogElement;
        modal.showModal();
    };

    return (
        <>
            <a className="text-amber-500 hover:text-amber-900 mr-3 cursor-pointer"
                onClick={handleCloseModal}
            >
                Edit
            </a>

            <dialog id={`modal_edit_product_${producto.id}`} className='modal'>
                <div className='modal-box max-w-3xl p-0 bg-white rounded-lg overflow-hidden'>
                    <div className="flex justify-between items-center p-4 border-b">
                        <h2 className="text-2xl font-bold text-gray-800">
                            Editar Producto
                        </h2>
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost">✕</button>
                        </form>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                        {/* IMAGEN */}
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
                        
                        {/* FORMULARIO */}
                        <div className="flex flex-col">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <p className="text-gray-600 mb-4">
                                    Modifique los campos que desea actualizar
                                </p>
                                
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text font-medium">Nombre del producto</span>
                                    </label>
                                    <input 
                                        type="text" 
                                        name="title"
                                        value={formData.title || ''}
                                        onChange={handleChange}
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
                                        <option value={formData.category?.name} disabled>
                                            {formData.category?.name} 
                                        </option>
                                            {categories
                                            .filter(cat => cat !== formData.category?.name)
                                            .map(cat => (
                                               <option key={cat} value={cat}>
                                                   {cat}
                                               </option>
                                           ))
                                        }
                                    </select>
                                </div>
                                
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text font-medium">Stock disponible</span>
                                    </label>
                                    <input 
                                        type="number" 
                                        name="stock"
                                        value={formData.stock || 0}
                                        onChange={handleChange}
                                        className="input input-bordered w-full" 
                                        min="0"
                                        required
                                    />
                                </div>
                                
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text font-medium">URL de la imagen</span>
                                    </label>
                                    <input 
                                        type="url" 
                                        name="imageUrl"
                                        value={formData.imageUrl || ''}
                                        onChange={handleChange}
                                        className="input input-bordered w-full" 
                                        required
                                    />
                                </div>
                                
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text font-medium">Descripción</span>
                                    </label>
                                    <textarea 
                                        name="description"
                                        value={formData.description || ''}
                                        onChange={handleChange}
                                        className="textarea textarea-bordered h-24" 
                                        required
                                    ></textarea>
                                </div>
                                
                                <div className="flex justify-end space-x-3 mt-6">
                                    <button 
                                        type="button"
                                        className="btn btn-outline"
                                        onClick={() => {
                                            const modal = document.getElementById(`modal_edit_product_${producto.id}`) as HTMLDialogElement;
                                            modal.close();
                                        }}
                                    >
                                        Cancelar
                                    </button>
                                    <button 
                                        type="submit"
                                        className="btn bg-indigo-600 hover:bg-indigo-700 text-white"
                                    >
                                        Actualizar producto
                                    </button>
                                </div>
                            </form>
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