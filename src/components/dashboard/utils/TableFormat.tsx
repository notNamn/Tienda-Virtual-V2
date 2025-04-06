import React from 'react'

export default function TableFormat() {
  return (
    <div className=" rounded-xl shadow-md overflow-hidden">
            {/* Table Header */}
            <div className="p-6 border-b border-gray-200">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                        <h2 className="text-2xl font-bold">
                            Admistracion de productos 
                        </h2>
                        <p className="text-gray-500 mt-1">
                            Administra todos los productos disponibles aqui.
                        </p>
                    </div>
                    <div className="mt-4 md:mt-0">
                        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition duration-150 ease-in-out">
                            Agregar producto
                        </button>
                    </div>
                </div>

                {/* Search and Filter */}
                <div className="mt-6 flex flex-col sm:flex-row gap-4">

                    <div className="relative flex-grow">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <input
                            type="text" className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full "
                            placeholder="Search members..."
                        />
                    </div>

                    <div>
                        <select className="border border-gray-300 rounded-lg px-4 py-2  w-full sm:w-auto">
                            <option value="">All Departments</option>
                            <option value="engineering">Engineering</option>
                            <option value="design">Design</option>
                            <option value="marketing">Marketing</option>
                            <option value="sales">Sales</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="table min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            {["Name", "Role", "Department", "Status", "Actions"].map((heading) => (
                                <th 
                                    key={heading} 
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    {heading}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {[
                            {
                                name: "Tom Cook",
                                email: "tom.cook@example.com",
                                role: "Senior Developer",
                                department: "Engineering",
                                status: "Active",
                                img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
                                statusColor: "bg-green-100 text-green-800",
                            },
                            {
                                name: "Sarah Johnson",
                                email: "sarah.johnson@example.com",
                                role: "Product Designer",
                                department: "Design",
                                status: "Active",
                                img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
                                statusColor: "bg-green-100 text-green-800",
                            },
                            {
                                name: "Michael Roberts",
                                email: "michael.roberts@example.com",
                                role: "Marketing Manager",
                                department: "Marketing",
                                status: "On Leave",
                                img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
                                statusColor: "bg-yellow-100 text-yellow-800",
                            },
                        ].map((person) => (
                            <tr key={person.email} className="hover:bg-gray-50 transition-colors duration-150">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <img className="h-10 w-10 rounded-full object-cover" src={person.img} alt={person.name} />
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">{person.name}</div>
                                            <div className="text-sm text-gray-500">{person.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{person.role}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{person.department}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${person.statusColor}`}>
                                        {person.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <a href="#" className="text-indigo-600 hover:text-indigo-900 mr-3">Edit</a>
                                    <a href="#" className="text-red-600 hover:text-red-900">Delete</a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
                <div className="flex items-center justify-between flex-col sm:flex-row">
                    <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">1</span> to <span className="font-medium">3</span> of <span className="font-medium">24</span> results
                    </p>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                        {["Previous", "1", "2", "3", "...", "8", "9", "Next"].map((item, index) => (
                            <a key={index} href="#" className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 ${item === "1" ? "bg-indigo-50 text-indigo-600" : "bg-white"}`}>
                                {item}
                            </a>
                        ))}
                    </nav>
                </div>
            </div>
        </div>
  )
}
