# all the commands
# also copied from my code, which I wrote, from the group project in DLS and Full stack

# this script should only be runned the first time the docker compose gets run

# this one line is just to make it easier to find in the debug log
echo "MongoDB docker 'init script' have been started **************
**************************************************************
***************************************************************
****************************************************************"

# load data from our .env file
source .env

# if the docker volume is initialized, then skip the rest of the file
if [ -f /data/db/initialized ]; then
    echo "MongoDB is already initialized. Therefore the init script will be skipped"
    exit 0
fi

# this script will be setting up all our tables, users, privileges and raw data

# Wait for MongoDB to start
echo "Waiting for MongoDB to start..."
sleep 10

# start the program

mongosh --host "localhost" --u "$MON_USERNAME" --p "$MON_PASSWORD" --authenticationDatabase "admin" <<EOF
// all the mongosh commands

// switch or create db
use 04b;

// make tables
db.createCollection("end_user")
db.createCollection("order")
db.createCollection("product")

// add to tables - TODO - make this read from file 

db.end_user.insertMany([
    {
      "user_id": "USER123",
      "name": "John Doe",
      "email": "johndoe@example.com",
      "address": {
        "street": "123 Main St",
        "city": "Springfield",
        "state": "IL",
        "zip": "62701",
        "country": "USA"
      },
      "phone": "+1 555-123-4567"
    },
    {
      "user_id": "USER456",
      "name": "Jane Smith",
      "email": "janesmith@example.com",
      "address": {
        "street": "456 Elm St",
        "city": "Chicago",
        "state": "IL",
        "zip": "60601",
        "country": "USA"
      },
      "phone": "+1 555-234-5678"
    },
    {
      "user_id": "USER789",
      "name": "Michael Brown",
      "email": "michaelbrown@example.com",
      "address": {
        "street": "789 Oak St",
        "city": "Peoria",
        "state": "IL",
        "zip": "61602",
        "country": "USA"
      },
      "phone": "+1 555-345-6789"
    },
    {
      "user_id": "USER321",
      "name": "Emily White",
      "email": "emilywhite@example.com",
      "address": {
        "street": "321 Pine St",
        "city": "Naperville",
        "state": "IL",
        "zip": "60563",
        "country": "USA"
      },
      "phone": "+1 555-456-7890"
    },
    {
      "user_id": "USER654",
      "name": "David Green",
      "email": "davidgreen@example.com",
      "address": {
        "street": "654 Birch St",
        "city": "Aurora",
        "state": "IL",
        "zip": "60505",
        "country": "USA"
      },
      "phone": "+1 555-567-8901"
    }
  ])


db.product.insertMany([
    {
      "name": "Wireless Mouse",
      "description": "A comfortable wireless mouse with ergonomic design and long-lasting battery.",
      "price": 25.99,
      "category": "Electronics",
      "stock": 150,
      "available": true,
      "ean": "1234567890123"
    },
    {
      "name": "Bluetooth Headphones",
      "description": "Noise-cancelling Bluetooth headphones with high-quality sound.",
      "price": 89.99,
      "category": "Electronics",
      "stock": 75,
      "available": true,
      "ean": "2345678901234"
    },
    {
      "name": "Smartphone Case",
      "description": "A durable and stylish case to protect your smartphone from scratches and drops.",
      "price": 12.49,
      "category": "Accessories",
      "stock": 200,
      "available": true,
      "ean": "3456789012345"
    },
    {
      "name": "LED Desk Lamp",
      "description": "An adjustable LED desk lamp with dimming and color temperature settings.",
      "price": 34.99,
      "category": "Home & Office",
      "stock": 50,
      "available": true,
      "ean": "4567890123456"
    },
    {
      "name": "Coffee Maker",
      "description": "A sleek and modern coffee maker with a programmable timer and brew strength control.",
      "price": 59.99,
      "category": "Appliances",
      "stock": 30,
      "available": true,
      "ean": "5678901234567"
    },
    {
      "name": "Electric Kettle",
      "description": "A fast-boiling electric kettle with an automatic shut-off feature.",
      "price": 24.99,
      "category": "Appliances",
      "stock": 40,
      "available": true,
      "ean": "6789012345678"
    },
    {
      "name": "Laptop Backpack",
      "description": "A spacious and stylish laptop backpack with multiple compartments for storage.",
      "price": 42.99,
      "category": "Accessories",
      "stock": 120,
      "available": true,
      "ean": "7890123456789"
    },
    {
      "name": "4K TV",
      "description": "A 55-inch 4K Ultra HD television with vibrant colors and enhanced picture quality.",
      "price": 499.99,
      "category": "Electronics",
      "stock": 0,
      "available": false,
      "ean": "8901234567890"
    },
    {
      "name": "Gaming Chair",
      "description": "Ergonomic gaming chair with adjustable height and lumbar support for comfort.",
      "price": 149.99,
      "category": "Furniture",
      "stock": 35,
      "available": true,
      "ean": "9012345678901"
    },
    {
      "name": "Water Bottle",
      "description": "A stainless steel water bottle with insulation to keep drinks hot or cold for hours.",
      "price": 19.99,
      "category": "Accessories",
      "stock": 300,
      "available": true,
      "ean": "0123456789012"
    }
  ])

db.order.insertMany([
    {
      "name": "Wireless Mouse",
      "description": "A comfortable wireless mouse with ergonomic design and long-lasting battery.",
      "price": 25.99,
      "category": "Electronics",
      "stock": 150,
      "available": true,
      "ean": "1234567890123"
    },
    {
      "name": "Bluetooth Headphones",
      "description": "Noise-cancelling Bluetooth headphones with high-quality sound.",
      "price": 89.99,
      "category": "Electronics",
      "stock": 75,
      "available": true,
      "ean": "2345678901234"
    },
    {
      "name": "Smartphone Case",
      "description": "A durable and stylish case to protect your smartphone from scratches and drops.",
      "price": 12.49,
      "category": "Accessories",
      "stock": 200,
      "available": true,
      "ean": "3456789012345"
    },
    {
      "name": "LED Desk Lamp",
      "description": "An adjustable LED desk lamp with dimming and color temperature settings.",
      "price": 34.99,
      "category": "Home & Office",
      "stock": 50,
      "available": true,
      "ean": "4567890123456"
    },
    {
      "name": "Coffee Maker",
      "description": "A sleek and modern coffee maker with a programmable timer and brew strength control.",
      "price": 59.99,
      "category": "Appliances",
      "stock": 30,
      "available": true,
      "ean": "5678901234567"
    },
    {
      "name": "Electric Kettle",
      "description": "A fast-boiling electric kettle with an automatic shut-off feature.",
      "price": 24.99,
      "category": "Appliances",
      "stock": 40,
      "available": true,
      "ean": "6789012345678"
    },
    {
      "name": "Laptop Backpack",
      "description": "A spacious and stylish laptop backpack with multiple compartments for storage.",
      "price": 42.99,
      "category": "Accessories",
      "stock": 120,
      "available": true,
      "ean": "7890123456789"
    },
    {
      "name": "4K TV",
      "description": "A 55-inch 4K Ultra HD television with vibrant colors and enhanced picture quality.",
      "price": 499.99,
      "category": "Electronics",
      "stock": 0,
      "available": false,
      "ean": "8901234567890"
    },
    {
      "name": "Gaming Chair",
      "description": "Ergonomic gaming chair with adjustable height and lumbar support for comfort.",
      "price": 149.99,
      "category": "Furniture",
      "stock": 35,
      "available": true,
      "ean": "9012345678901"
    },
    {
      "name": "Water Bottle",
      "description": "A stainless steel water bottle with insulation to keep drinks hot or cold for hours.",
      "price": 19.99,
      "category": "Accessories",
      "stock": 300,
      "available": true,
      "ean": "0123456789012"
    }
  ])

// rettigheder

db.createRole({
  role: "TopGuy",
  privileges: [
    {
      resource: { db: "04b", collection: "order" },
      actions: ["find", "insert", "remove"]
    },
    {
      resource: { db: "04b", collection: "product" },
      actions: ["find", "insert", "remove", "update"]
    },
    {
      resource: { db: "04b", collection: "end_user" },
      actions: ["find", "insert", "remove"]
    },
    {
      resource: { db: "04b", collection: "" },
      actions: ["listCollections"]
    }
  ],
  roles: []
})

db.createRole({
  role: "MiddleGuy",
  privileges: [
    {
      resource: { db: "04b", collection: "product" },
      actions: ["find", "insert"]
    },
    {
      resource: { db: "04b", collection: "end_user" },
      actions: ["find", "insert"]
    },
    {
      resource: { db: "04b", collection: "" },
      actions: ["listCollections"]
    }
  ],
  roles: []
})

db.createRole({
  role: "ReadingGuy",
  privileges: [
    {
      resource: { db: "04b", collection: "product" },
      actions: ["find"]
    },
    {
      resource: { db: "04b", collection: "" },
      actions: ["listCollections"]
    }
  ],
  roles: []
})

// views and roles

db.createView('product_less', 'product',
   [{ $project: { name : 1, description: 1, price: 1, category: 1 } } ]
)

db.createRole(
   {
     role: "view_product",
     privileges: [
       { resource: { db: "04b", collection: "system.views" }, actions: [ "find" ] },
       { resource: { db: "04b", collection: "product_less" }, actions: [ "find","collStats"]}
     ],
     roles: [
      
     ]
   }
)

db.createView('product_name', 'product',
   [{ $project: { _id: 0, name : 1 } } ]
)

db.createRole(
   {
     role: "view_product_less",
     privileges: [
       { resource: { db: "04b", collection: "system.views" }, actions: [ "find" ] },
       { resource: { db: "04b", collection: "product_name" }, actions: [ "find","collStats"]}
     ],
     roles: []
   }
)

db.createView('one_product', 'product',
    [
        { $project: { name: 1, _id: 0 } },
        { $limit: 1 }
    ]
)

db.createRole(
   {
     role: "view_one_product",
     privileges: [
       { resource: { db: "04b", collection: "system.views" }, actions: [ "find" ] },
       { resource: { db: "04b", collection: "one_product" }, actions: [ "find","collStats"]}
     ],
     roles: []
   }
)

// create users

db.createUser({  
user: "$MON_U1_USE", 
pwd: "$MON_U1_PASS", 
roles: [  
{ role: "TopGuy", db: "04b" }  
]  
})

db.createUser({  
user: "$MON_U2_USE", 
pwd: "$MON_U2_PASS", 
roles: [  
{ role: "MiddleGuy", db: "04b" }  
]  
})

db.createUser({  
user: "$MON_U3_USE", 
pwd: "$MON_U3_PASS",  
roles: [  
{ role: "ReadingGuy", db: "04b" }  
]  
})

db.createUser({  
user: "$MON_U4_USE", 
pwd: "$MON_U4_PASS",  
roles: [  
{ role: "view_product", db: "04b" }  
]  
})

db.createUser({  
user: "$MON_U5_USE", 
pwd: "$MON_U5_PASS",  
roles: [  
{ role: "view_product_less", db: "04b" }  
]  
})

db.createUser({  
user: "$MON_U6_USE", 
pwd: "$MON_U6_PASS",   
roles: [  
{ role: "view_one_product", db: "04b" }  
]  
})

EOF

# keep the container alive
# wait  # TODO - check if this line IS needed to not kill the container