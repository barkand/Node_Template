[See Full Project with Demo](https://github.com/barkand/Gatsby_Footballiga)

# Backend:

> [server](https://github.com/barkand/Node_Template)

- public
- src
  - admin
  - Core
  - [Game](https://github.com/barkand/Node_Footballiga_Game)
  - log
  - [Market](https://github.com/barkand/Node_Market)

#### Init:

> npm init --yes

>     "start": "npx nodemon src/server.ts",

> npm i express ts-node-dev dotenv && npm i -D typescript nodemon @types/express @types/node

> tsc --init

#### Libraries:

> Security: npm i cors helmet helmet-csp && npm i -D @types/cors

> JWT: npm i jsonwebtoken && npm i -D @types/jsonwebtoken

> DB: npm i mongoose

> Req: npm i compression && npm i -D @types/compression

> Cookie: npm i cookie-parser && npm i -D @types/cookie-parser

> ImageRest: npm i express-form-data && npm i -D @types/express-form-data

> Log: npm i morgan winston && npm i -D @types/morgan

> Test: npm i -D chai mocha chai-http && npm i -D @types/mocha @types/chai-http

> Redis: npm i redis

> GQL: npm i apollo-server-express express-graphql graphql lodash && npm i -D @types/lodash

> Mail: npm i nodemailer && npm i -D @types/nodemailer

#### How to run:

> npm run start
