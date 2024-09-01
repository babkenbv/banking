# banking

Banking system simulator
Create database

    `CREATE DATABASE banking_db;`

Use the newly created database


    `USE banking_system;`

Create users table


    CREATE TABLE users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(50) NOT NULL UNIQUE,
        password VARCHAR(100) NOT NULL,
        balance DECIMAL(10, 2) DEFAULT 0.00
    );

Create transactions table


    CREATE TABLE transactions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        senderEmail INT NOT NULL,
        receiverEmail INT NOT NULL,
        amount DECIMAL(10, 2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (senderEmail) REFERENCES users(id),
        FOREIGN KEY (receiverEmail) REFERENCES users(id)
    );


Register User: Use Postman or a similar tool to send a POST request to 
   
    http://localhost:3000/api/users/register 
  
with a JSON body:

    {
        "username": "john_doe",
        "password": "password123",
        "balance": 100.00
    }


Update User Balance: Send a PUT request to 

    http://localhost:3000/api/users/balance 
    
with a JSON body:

    {
        "username": "john_doe",
        "amount": 50.00
    }

Create a transaction: Send a POST request to 

    http://localhost:3000/api/transactions/transfer

with a JSON body:

    {
        "senderEmail": "johndoe2@gmail.com",
        "receiverEmail": "johndoe@gmail.com",
        "amount": 150
    }

