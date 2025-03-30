# DOCUMENTACION : 



## CRUD PRODUCTOS : 

- ### GET ALL :
http://localhost:8080/product
````json
[
    {
        "id": 1,
        "title": "iPhone 14",
        "description": "iPhone 14 Pro Max",
        "price": 1000.0,
        "stock": 10,
        "imageUrl": "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg",
        "category": {
            "name": "Tecnología"
        }
    },
    {
        "id": 2,
        "title": "PlayStation 5",
        "description": "PlayStation 5 edición estándar",
        "price": 1000.0,
        "stock": 10,
        "imageUrl": "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg",
        "category": {
            "name": "Videojuegos"
        }
    },
    {
        "id": 3,
        "title": "Samsung Galaxy S23",
        "description": "Smartphone Samsung S23 Ultra",
        "price": 950.0,
        "stock": 15,
        "imageUrl": "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg",
        "category": {
            "name": "Tecnología"
        }
    },
    {
        "id": 4,
        "title": "Xbox Series X",
        "description": "Consola Xbox Series X 1TB",
        "price": 900.0,
        "stock": 12,
        "imageUrl": "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg",
        "category": {
            "name": "Videojuegos"
        }
    },
    {
        "id": 5,
        "title": "MacBook Air M2",
        "description": "Laptop Apple MacBook Air con chip M2",
        "price": 1200.0,
        "stock": 8,
        "imageUrl": "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg",
        "category": {
            "name": "Tecnología"
        }
    },
    {
        "id": 6,
        "title": "Nintendo Switch OLED",
        "description": "Consola Nintendo Switch OLED",
        "price": 350.0,
        "stock": 20,
        "imageUrl": "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg",
        "category": {
            "name": "Videojuegos"
        }
    },
    {
        "id": 7,
        "title": "Refrigeradora LG",
        "description": "Refrigeradora LG 350L",
        "price": 800.0,
        "stock": 5,
        "imageUrl": "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg",
        "category": {
            "name": "Electrodomésticos"
        }
    },
    {
        "id": 8,
        "title": "Microondas Samsung",
        "description": "Microondas digital Samsung 32L",
        "price": 150.0,
        "stock": 18,
        "imageUrl": "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg",
        "category": {
            "name": "Electrodomésticos"
        }
    },
    {
        "id": 9,
        "title": "Reloj Inteligente Apple",
        "description": "Apple Watch Series 8",
        "price": 450.0,
        "stock": 14,
        "imageUrl": "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg",
        "category": {
            "name": "Tecnología"
        }
    },
    {
        "id": 10,
        "title": "Camiseta Nike",
        "description": "Camiseta deportiva Nike para hombre",
        "price": 30.0,
        "stock": 50,
        "imageUrl": "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg",
        "category": {
            "name": "Moda"
        }
    },
    {
        "id": 11,
        "title": "Pantalón Levi’s",
        "description": "Pantalón de mezclilla Levi’s 501",
        "price": 70.0,
        "stock": 35,
        "imageUrl": "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg",
        "category": {
            "name": "Moda"
        }
    },
    {
        "id": 12,
        "title": "Lavadora Whirlpool",
        "description": "Lavadora automática 18 kg",
        "price": 600.0,
        "stock": 10,
        "imageUrl": "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg",
        "category": {
            "name": "Electrodomésticos"
        }
    },
    {
        "id": 13,
        "title": "Audífonos Sony",
        "description": "Audífonos inalámbricos Sony WH-1000XM5",
        "price": 400.0,
        "stock": 25,
        "imageUrl": "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg",
        "category": {
            "name": "Tecnología"
        }
    },
    {
        "id": 14,
        "title": "Zapatillas Adidas",
        "description": "Zapatillas Adidas deportivas",
        "price": 85.0,
        "stock": 40,
        "imageUrl": "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg",
        "category": {
            "name": "Moda"
        }
    },
    {
        "id": 15,
        "title": "Aspiradora Dyson",
        "description": "Aspiradora Dyson V15 Detect",
        "price": 700.0,
        "stock": 7,
        "imageUrl": "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg",
        "category": {
            "name": "Electrodomésticos"
        }
    }
]
````

- ### GET BY ID :
http://localhost:8080/product/1
````json
{
    "id": 1,
    "title": "iPhone 14",
    "description": "iPhone 14 Pro Max",
    "price": 1000.0,
    "stock": 10,
    "imageUrl": "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg",
    "category": {
        "name": "Tecnología"
    }
}
````
- ### CREATE :
http://localhost:8080/product

REQUEST: 
````json
{
    "title": "Nuevo producto CREADO",
    "description": "Nueva description",
    "price": 1000.0,
    "stock": 10,
    "imageUrl": "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg",
    "category": {
        "name": "Tecnología"
    }
}
````
RESPONSE:
````json
{
    "id": 16,
    "title": "Nuevo producto CREADO",
    "description": "Nueva description",
    "price": 1000.0,
    "stock": 10,
    "imageUrl": "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg",
    "category": {
        "name": "Tecnología"
    }
}
````
- ### UPDATE :
http://localhost:8080/product/1

REQUEST:
````json
{
    "title": "Nuevo producto",
    "description": "Nueva description",
    "price": 1000.0,
    "stock": 10,
    "imageUrl": "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg",
    "category": {
        "name": "Videojuegos"
    }
}
````
RESPONSE: 
````json
{
    "id": 1,
    "title": "Nuevo producto",
    "description": "Nueva description",
    "price": 1000.0,
    "stock": 10,
    "imageUrl": "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg",
    "category": {
        "name": "Videojuegos"
    }
}
````
- ### DELETE :
http://localhost:8080/product/16
````json
{
    "status": 200,
    "message": "Product deleted successfully",
    "timestamp": "2025-03-30T16:10:31.2310297"
}
````

## CATEGORY :
- ### GET ALL :
http://localhost:8080/category
    RESPONSE:
````json
      [
    {
        "id": 1,
        "name": "Tecnología",
        "products": [
            {
                "id": 3,
                "title": "Samsung Galaxy S23",
                "description": "Smartphone Samsung S23 Ultra",
                "price": 950.0,
                "stock": 15,
                "imageUrl": "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg"
            },
            {
                "id": 5,
                "title": "MacBook Air M2",
                "description": "Laptop Apple MacBook Air con chip M2",
                "price": 1200.0,
                "stock": 8,
                "imageUrl": "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg"
            },
            {
                "id": 9,
                "title": "Reloj Inteligente Apple",
                "description": "Apple Watch Series 8",
                "price": 450.0,
                "stock": 14,
                "imageUrl": "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg"
            },
            {
                "id": 13,
                "title": "Audífonos Sony",
                "description": "Audífonos inalámbricos Sony WH-1000XM5",
                "price": 400.0,
                "stock": 25,
                "imageUrl": "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg"
            }
        ]
    },
    {
        "id": 2,
        "name": "Videojuegos",
        "products": [
            {
                "id": 2,
                "title": "PlayStation 5",
                "description": "PlayStation 5 edición estándar",
                "price": 1000.0,
                "stock": 10,
                "imageUrl": "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg"
            },
            {
                "id": 4,
                "title": "Xbox Series X",
                "description": "Consola Xbox Series X 1TB",
                "price": 900.0,
                "stock": 12,
                "imageUrl": "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg"
            },
            {
                "id": 6,
                "title": "Nintendo Switch OLED",
                "description": "Consola Nintendo Switch OLED",
                "price": 350.0,
                "stock": 20,
                "imageUrl": "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg"
            },
            {
                "id": 1,
                "title": "Nuevo producto",
                "description": "Nueva description",
                "price": 1000.0,
                "stock": 10,
                "imageUrl": "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg"
            }
        ]
    },
    {
        "id": 3,
        "name": "Electrodomésticos",
        "products": [
            {
                "id": 7,
                "title": "Refrigeradora LG",
                "description": "Refrigeradora LG 350L",
                "price": 800.0,
                "stock": 5,
                "imageUrl": "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg"
            },
            {
                "id": 8,
                "title": "Microondas Samsung",
                "description": "Microondas digital Samsung 32L",
                "price": 150.0,
                "stock": 18,
                "imageUrl": "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg"
            },
            {
                "id": 12,
                "title": "Lavadora Whirlpool",
                "description": "Lavadora automática 18 kg",
                "price": 600.0,
                "stock": 10,
                "imageUrl": "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg"
            },
            {
                "id": 15,
                "title": "Aspiradora Dyson",
                "description": "Aspiradora Dyson V15 Detect",
                "price": 700.0,
                "stock": 7,
                "imageUrl": "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg"
            }
        ]
    },
    {
        "id": 4,
        "name": "Moda",
        "products": [
            {
                "id": 10,
                "title": "Camiseta Nike",
                "description": "Camiseta deportiva Nike para hombre",
                "price": 30.0,
                "stock": 50,
                "imageUrl": "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg"
            },
            {
                "id": 11,
                "title": "Pantalón Levi’s",
                "description": "Pantalón de mezclilla Levi’s 501",
                "price": 70.0,
                "stock": 35,
                "imageUrl": "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg"
            },
            {
                "id": 14,
                "title": "Zapatillas Adidas",
                "description": "Zapatillas Adidas deportivas",
                "price": 85.0,
                "stock": 40,
                "imageUrl": "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg"
            }
        ]
    }
]
````

- ### GET BY NAME :
http://localhost:8080/category/name/Tecnología

````json
{
    "id": 1,
    "name": "Tecnología",
    "products": [
        {
            "id": 1,
            "title": "iPhone 14",
            "description": "iPhone 14 Pro Max",
            "price": 1000.0,
            "stock": 10,
            "imageUrl": "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg"
        },
        {
            "id": 3,
            "title": "Samsung Galaxy S23",
            "description": "Smartphone Samsung S23 Ultra",
            "price": 950.0,
            "stock": 15,
            "imageUrl": "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg"
        },
        {
            "id": 5,
            "title": "MacBook Air M2",
            "description": "Laptop Apple MacBook Air con chip M2",
            "price": 1200.0,
            "stock": 8,
            "imageUrl": "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg"
        },
        {
            "id": 9,
            "title": "Reloj Inteligente Apple",
            "description": "Apple Watch Series 8",
            "price": 450.0,
            "stock": 14,
            "imageUrl": "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg"
        },
        {
            "id": 13,
            "title": "Audífonos Sony",
            "description": "Audífonos inalámbricos Sony WH-1000XM5",
            "price": 400.0,
            "stock": 25,
            "imageUrl": "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg"
        }
    ]
}
````