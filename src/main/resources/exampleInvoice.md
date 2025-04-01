# EXAMPLE INVOICE

````json
{
  "id": 1,
  "seller": {
    "id": 1,
    "firstName": "Pedro",
    "lastName": "Perez",
    "shopAddress": "Calle 1",
    "dni": 12345678,
    "phoneNumber": 12345678,
    "user": {
      "id": 2,
      "username": "seller",
      "password": "seller",
      "role": "SELLER"
    }
  },
  "customer": {
    "id": 3,
    "firstName": "John",
    "lastName": "Doe",
    "phoneNumber": 12345678,
    "dni": 12345678
  },
  "order": {
    "id": 1,
    "subtotal": 9450.0,
    "orderDetails": [
      {
        "id": 1,
        "product": {
          "id": 1,
          "title": "iPhone 14",
          "description": "iPhone 14 Pro Max",
          "price": 1000.0,
          "stock": 10,
          "imageUrl": "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg"
        },
        "quantity": 1,
        "subTotal": 1000.0
      },
      {
        "id": 2,
        "product": {
          "id": 2,
          "title": "PlayStation 5",
          "description": "PlayStation 5 edición estándar",
          "price": 1000.0,
          "stock": 10,
          "imageUrl": "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg"
        },
        "quantity": 2,
        "subTotal": 2000.0
      },
      {
        "id": 3,
        "product": {
          "id": 3,
          "title": "Samsung Galaxy S23",
          "description": "Smartphone Samsung S23 Ultra",
          "price": 950.0,
          "stock": 15,
          "imageUrl": "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg"
        },
        "quantity": 3,
        "subTotal": 2850.0
      },
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
        "quantity": 4,
        "subTotal": 3600.0
      }
    ]
  },
  "subtotal": 9450.0,
  "taxRate": 0.1,
  "taxAmount": 945.0,
  "total": 10395.0,
  "createdAt": "2025-03-31T15:08:24.842Z",
  "status": "PAGADO",
  "paymentMethod": "Tarjeta",
  "receiptNumber": "B001-000123"
}
````