# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

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


## Data shapes
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
