## STORE FRONT BACKEND
- this project is a backend of a store providing the following functionalities:
. log in (authenticate)/ sign up(create user)
. delete and show one or all users
. add / delete products
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
