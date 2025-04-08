# AUTHENTICATION 

## Sign In
POST  http://localhost:8080/api/authentication/sign-in 

REQUEST: 
````json
{
    "username":"admin",
    "password": "admin"

}
````

RESPONSE:
````json
{
    "status": 200,
    "message": "Login correcto",
    "details": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsInJvbGVzIjoiUk9MRV9BRE1JTiIsInVzZXJJZCI6MSwiaWF0IjoxNzQ0MTI3NjQ5LCJleHAiOjE3NDQyMTQwNDl9.syT-B-TlBPorYNUbKFl97bnPtNzilsRSKgfw0TTrmeo",
    "timestamp": "2025-04-08T10:54:09.584628"
}
````

# Sign Up 
CREAR ACCOUNT

POST  http://localhost:8080/api/authentication/sign-up

REQUEST:
````json
{
    "username":"nuevo",
    "password": "nuevo"

}
````
RESPONSE: 
````json
{
    "status": 201,
    "message": "Usuario creado correctamente",
    "details": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJudWV2byIsInJvbGVzIjoiU0VMTEVSIiwidXNlcklkIjo0LCJpYXQiOjE3NDQxMjc3MjcsImV4cCI6MTc0NDIxNDEyN30.sTDU0uIS4LFqqXgGbx7o1zkmsQxcfvPpkdl-VVm7c1Q",
    "timestamp": "2025-04-08T10:55:27.9773138"
}
````

Si el usuario ya existe  
````json
{
    "status": 200,
    "message": "El usuario ya existe",
    "details": null,
    "timestamp": "2025-04-08T10:58:26.7386957"
}
````

para poder acceeder a los demas end point se debe de podner el token en el header de la solicitud