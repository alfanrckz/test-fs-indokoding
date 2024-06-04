# Awesome Project Build with TypeORM

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `data-source.ts` file
3. Run `npm start` command


# How to use this API

How to use authorization
1. Click tab authorization on postman
2. Choose Type "Bearer Token" on the left
3. Insert token on the right

#### A. User

1. Register User<br>
* Url : http://localhost:5000/api/v1/register
* Method : `POST`
* Json body example :

        {
            "name" : "Suka Jeruk",
            "email" : "sukajeruk@gmail.com",
            "password" : "jeruk123"
            "gender" : "Laki-Laki",
        }

2. Login<br>
* Url       : http://localhost:5000/api/v1/login
* Method    : `POST`
* Json body example :

        {
            "email" : "sukajeruk@gmail.com",
            "password" : "jeruk123"
        }

note: you will received token which is used to authorization<br>

#### B. Product

1. Getting all products (no authorization)<br>
* Url       : http://localhost:5000/api/products
* Method    : `GET`
  
2. Getting a Product (no authorization)<br>
* Url       : http://localhost:5000/api/v1/product/{product-id}
* Method    : `GET`

3. Create a product (required authorizaton)
* Url       : http://localhost:5000/api/v1/product
* Method    : `POST`
* Form-data body example :

```
    name       = Laptop Gaming
    description = Laptop yang bisa melibas semua game termasuk epep
    image       = laptop.png
    price       = 100
```
4. Update a product (required authorizaton)<br>  
* Url       : http://localhost:5000/api/v1/product/{product-id}
* Method    : `PATCH`
* Form-data body example :

```
    name       = Laptop Gaming v2
    description = Laptop yang bisa melibas semua game termasuk epep dan juga pabji
    image       = hape.png
    price       = 200
```

5. Delete a product (required authorization)<br>
* Url       : http://localhost:5000/api/v1/product/{product-id}
* Method    : `DELETE`
