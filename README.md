<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://www.iforium.com/wp-content/uploads/nodejs-new-pantone-white.png" width="320" alt="Nest Logo" /></a>
</p>



### Deploy on

https://desafio-nodej.herokuapp.com/

## Description

Desafio nodejs, mini api pura de autenticação e retorno dos dados do usuário, utilizando:

Express e Javascript. 

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn dev

# watch mode
$ yarn dev

# production mode
$ yarn start
```

# Api routes

###  **Status Route** :
GET https://desafio-nodej.herokuapp.com/status

> Response { server on }


###  **Signup** :
POST https://desafio-nodej.herokuapp.com/signup 

> Request 

     {
     "name": "joao",
     "email": "maria@tx.com",
     "password": "12345",
     "telephones": [
       {
         "number": 9131234330,
         "area_code": 11
       }
     ]
    }

> Response

     {
    	"id": "61b88d5bdad1bc50c450cc47",
    	"created_at": "2021-12-14T12:25:38.229Z",
    	"modified_at": "2021-12-14T12:25:38.229Z"
    }

###  **Signin** :
POST https://desafio-nodej.herokuapp.com/signin

> Request 

    {
     "email": "maria@mail.com",
     "password": "@maria123"
    }

> Response

    {
    	"id": "61b88d5bdad1bc50c450cc47",
    	"name": "maria",
    	"email": "maria@mailcom",
    	"token": "eyJhbGciOiJIUzI1NiI..."
    }

###  **User info** :
GET https://desafio-nodej.herokuapp.com/user

> Headers

    Authorization : {
    	Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVC....
    }

> Response

    {
    	"id": "61b88d5bdad1bc50c450cc47",
    	"email": "maria@mail.com",
    	"telephones": [
    		{
    			"_id": "61b88d5bdad1bc50c450cc4a",
    			"user_id": "61b88d5bdad1bc50c450cc47",
    			"area_code": 11,
    			"number": 9131234330,
    			"__v": 0
    		}
    	],
    	"created_at": "2021-12-14T12:25:38.229Z",
    	"modified_at": "2021-12-14T12:25:38.229Z"
    }

