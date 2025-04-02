# sales 


## CREATE ORDER  
http://localhost:8080/order/sale

````json
{
    "id": 1,
    "orderDetails": [],
    "count_products": 0.0
}
````

## ADD PRODUCT TO ORDER

AGREAGMOS 2 PRODUCTOS  
http://localhost:8080/order/sale/add/1/product/2/quantity/1
http://localhost:8080/order/sale/add/1/product/4/quantity/1

````json
{
    "id": 1,
    "orderDetails": [
        {
            "id": 1,
            "product": {
                "id": 2,
                "title": "PlayStation 5",
                "description": "PlayStation 5 edición estándar",
                "price": 1000.0,
                "stock": 5,
                "imageUrl": "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg"
            },
            "quantity": 4,
            "subTotal": 4000.0
        },
        {
            "id": 2,
            "product": {
                "id": 2,
                "title": "PlayStation 5",
                "description": "PlayStation 5 edición estándar",
                "price": 1000.0,
                "stock": 5,
                "imageUrl": "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg"
            },
            "quantity": 1,
            "subTotal": 1000.0
        }
    ],
    "count_products": 5.0
}
````

## DELETE product to ORDER


# PROCESS ORDER
http://localhost:8080/order/sale/1/process?carnetSeller=12345678&IGV=0.15 

REQUEST: 
````json
{
    "firstName": "Pedro",
    "lastName": "Perez",
    "phoneNumber": 1341342,
    "carnet": 12345678
}
````

response : 
````json
{
    "id": 1,
    "order": {
        "id": 1,
        "orderDetails": [
            {
                "id": 1,
                "product": {
                    "id": 2,
                    "title": "PlayStation 5",
                    "description": "PlayStation 5 edición estándar",
                    "price": 1000.0,
                    "stock": 5,
                    "imageUrl": "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg"
                },
                "quantity": 4,
                "subTotal": 4000.0
            },
            {
                "id": 2,
                "product": {
                    "id": 2,
                    "title": "PlayStation 5",
                    "description": "PlayStation 5 edición estándar",
                    "price": 1000.0,
                    "stock": 5,
                    "imageUrl": "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg"
                },
                "quantity": 1,
                "subTotal": 1000.0
            }
        ],
        "count_products": 5.0
    },
    "subtotal": 5000.0,
    "total": 5750.0,
    "createdAt": "2025-04-01T17:53:31.7870207",
    "seller": {
        "firstName": "Pedro",
        "lastName": "Perez",
        "shopAddress": "Calle 1",
        "carnet": 12345678,
        "phoneNumber": 12345678,
        "user": {
            "username": "seller",
            "password": null,
            "role": "SELLER"
        }
    },
    "customer": {
        "firstName": "Pedro",
        "lastName": "Perez",
        "phoneNumber": 1341342,
        "carnet": 12345678
    },
    "igv": 0.15
}
````