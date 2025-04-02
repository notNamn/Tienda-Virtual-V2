# INVOICE API  

## CREATE INVOICE

http://localhost:8080/order/invoice

````json
{
  "id": 2,
  "orderDetails": [],
  "count_products": 0.0
}
````

## ADD PRODUCT TO INVOICE

http://localhost:8080/order/invoice/add/2/product/4/quantity/2

````json
{
    "id": 2,
    "orderDetails": [
        {
            "id": 4,
            "product": {
                "id": 4,
                "title": "Xbox Series X",
                "description": "Consola Xbox Series X 1TB",
                "price": 900.0,
                "stock": 12,
                "imageUrl": "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg"
            },
            "quantity": 2,
            "subTotal": 1800.0
        },
        {
            "id": 5,
            "product": {
                "id": 4,
                "title": "Xbox Series X",
                "description": "Consola Xbox Series X 1TB",
                "price": 900.0,
                "stock": 12,
                "imageUrl": "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg"
            },
            "quantity": 2,
            "subTotal": 1800.0
        }
    ],
    "count_products": 4.0
}
````


## PROCESS INVOICE


http://localhost:8080/order/invoice/2/process?carnetSeller=12345678&IGV=0.15

CUSTINER DATA
````json
{
    "firstName": "John",
    "lastName": "Doe",
    "phoneNumber": 987654321,
    "carnet": 54321
}

````

RESPONSE  : 

````json
{
    "id": 1,
    "order": {
        "id": 2,
        "orderDetails": [
            {
                "id": 4,
                "product": {
                    "id": 4,
                    "title": "Xbox Series X",
                    "description": "Consola Xbox Series X 1TB",
                    "price": 900.0,
                    "stock": 12,
                    "imageUrl": "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg"
                },
                "quantity": 2,
                "subTotal": 1800.0
            },
            {
                "id": 5,
                "product": {
                    "id": 4,
                    "title": "Xbox Series X",
                    "description": "Consola Xbox Series X 1TB",
                    "price": 900.0,
                    "stock": 12,
                    "imageUrl": "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg"
                },
                "quantity": 2,
                "subTotal": 1800.0
            }
        ],
        "count_products": 4.0
    },
    "subtotal": 3600.0,
    "total": 4140.0,
    "createdAt": "2025-04-01T18:06:24.8420116",
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
        "firstName": "John",
        "lastName": "Doe",
        "phoneNumber": 987654321,
        "carnet": 54321
    },
    "igv": 0.15
}
````
