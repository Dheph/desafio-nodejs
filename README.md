<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->





## Description

Desafio nodejs, mini api de autenticação e listagem de usuários, utilizando:

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

com typescript, principios SOLID aplicados. 

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

# Api routes

###  **Signup** :
 https://desafio-nodej.herokuapp.com/signup 

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
https://desafio-nodej.herokuapp.com/authentication/user/login

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
https://desafio-nodej.herokuapp.com/user

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


## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
