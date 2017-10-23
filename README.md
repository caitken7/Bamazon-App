# Bamazon App

### An Amazon-like storefront using Node.js & MySQL

An Amazon-like storefront that takes in orders from customers and deplete stock from the store's inventory. You can also view as a manager, and track/add inventory. 

Requires the MySQL and Inquirer npm packages.


The products table has the following columns:

   * item_id (unique id for each product)

   * product_name (Name of product)

   * department_name

   * price (cost to customer)

   * stock_quantity (how much of the product is available in stores)

## Instructions

1. To run the Bamazon customer interface use  `$ node bamazonCustomer.js `. This allows you to buy items and update the database quantity.
   * Enter Item ID to buy product.
   * Enter quantity to buy.


2. To run the Bamazon manager interface use  `$ node bamazonManager.js `.

   * Select the following options from the menu:
   		* View Products 
  		* View Low Inventory 
  		* Add to Inventory 
  		* Add New Product 

