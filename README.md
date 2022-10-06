## STORE FRONT BACKEND
- this project is a backend of a store providing the following functionalities:
. log in (authenticate)/sign up(create user)
. delete and show one or all users
. add/delete products
. show all products
. get one product
. show top 5 most popular products
. show products by category
. create/delete/get one or all orders
. get active/complete orders by user id
. add product to order

## Build:
. in your terminal run: 
- npm intit 
- npm install
- npm run build
- npm run format

## Database installation and setup
- postgres should be installed to your machine 
- the required packages are added to the package.json file and will be installed by running npm install
* Database running on port: 5432

#### Setup
- create two databases one for testing and one for development, In your terminal run:
 1. psql -U <username>
 2. <password>
 3. CREATE DATABASE store_dev ;
 4. CREATE DATABASE store_test ;
 5. \q 
 6. db-migrate up 


## Usage Instructions:
. to start the application run: npm run start

## Testing:
. in your terminal run: "npm run dev" to test project functionalities before build.

. testing for problematic patterns (linting):
- in your terminal run: npm run lint 

. unit testing:
- in your terminal run: npm run test 
    
## Tools:
- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

## API Endpoints
* Server running on port: 3000
#### Products
- A Index route: 'api/products [GET]
- A SHOW route: 'api/products/:id' [GET]
- A Create route [token required]: 'api/products/:id' [POST]
- A Delete route [token required]: 'api/products/:id' [DELETE]
- A Top 5 most popular products  route: 'api/products/popular' [GET]
- A Products by category route: 'api/products/category/:cate' [GET]


#### Users
- A Index route [token required]: 'api/users' [GET]
- A SHOW route [token required]: 'api/users/:id' [GET]
- A Delete route [token required]: 'api/users/:id' [DELETE]
- A Create route [return token ]: 'api/users' [POST]

#### Orders
- A Index route [token required]: 'api/orders' [GET]
- A SHOW route [token required]: 'api/orders/:id' [GET]
- A Delete route [token required]: 'api/orders:id' [DELETE]
- A Create route [token required]: 'api/orders' [POST]
- A route to show current orders by user id [token required]: 'api/orders/active/:id' [GET]
- A route to show complete orders by user id [token required]: 'api/orders/completed/:id' [GET]


## Data Base
#### Tables
- Products (
    id:number,
    name:varchar, 
    price:number, 
    category:varchar
    )

- Users (
    id:number, 
    firstName:varchar, 
    lastName:varchar, 
    password:varchar
    )

- Orders (
    id:number, 
    status:varchar, 
    user_id: varchar
    )

- Product_Order (
    id:number, 
    quantity: number, 
    order_id:varchar, 
    product_id:varchar
    )


## ENVIROMRNT VARIABLES

PORT = 3000
ENV = dev

POSTGRES_HOST = localhost
POSTGRES_PORT = 5432
POSTGRES_DB = store_dev
POSTGRES_DB_TEST = store_test
POSTGRES_USER = postgres
POSTGRES_PASSWORD = sys
SALT_ROUNDS = 10 
PEPPER = hahahhah-not-even-close
TOKEN_SECRET = thatsAtokenSecretem13m14m15kksserer