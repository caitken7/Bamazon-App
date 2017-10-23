var mysql = require("mysql");
var inquirer = require("inquirer")

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "BamazonDB"
});

connection.connect(function(err) {
  if (err) throw err;
  // console.log("connected as id " + connection.threadId);
  console.log("\n+++++++++++++++++++++++++++++++++");
  console.log("**** Welcome to Bamazon.com ****");
  console.log("+++++++++++++++++++++++++++++++++\n");
  displayItems();
});

function displayItems() {
  connection.query("SELECT * FROM bamazonTable", function(err, res) {

    console.log("\n=================================");
    console.log("The following items are for sale:\n");

    for (i = 0; i < res.length; i++){
      console.log("++++++++++++++++++++");
      console.log("Item ID: " + res[i].item_id);
      console.log("Name: " + res[i].product_name);
      console.log("Category: " + res[i].department_name);
      console.log("Price: $" + res[i].price)
      console.log("Quantity: " + res[i].stock_quantity)
    }
    console.log("++++++++++++++++++++\n");
    promptID();

  })
};

function promptID() {
  inquirer.prompt([
  {
    name: "promptID",
    message: "To purchase an item, enter the product ID"
  }])
  .then(function(answers) {

    var itemID = answers.promptID;

    if (answers.promptID > 10 || answers.promptID < 1) {
      console.log("Please enter an existing product ID")
      promptID();
    }

    connection.query("SELECT * FROM bamazonTable where item_id=" + itemID, function(err, res) {


      if (res[0].stock_quantity == 0){
        console.log("Sorry, this item is out of stock.");
        promptID();
      }
      else {
        console.log("\nYou selected:");
        console.log("++++++++++++++++++++");
        console.log("Item ID: " + res[0].item_id);
        console.log("Name: " + res[0].product_name);
        console.log("Category: " + res[0].department_name);
        console.log("Price: $" + res[0].price)
        console.log("Quantity: " + res[0].stock_quantity)
        console.log("++++++++++++++++++++\n");
        promptQuantity(itemID)
      }
      
    })
  });
};

function promptQuantity(itemID) {
  inquirer.prompt([
  {
    name: "promptQuantity",
    message: "How many would you like to buy?"
  }])
  .then(function(answers){
    var quantity = answers.promptQuantity;

    connection.query("SELECT * FROM bamazonTable where item_id=" + itemID, function(err, res) {
      
      var stockQuantity = res[0].stock_quantity;
      var productName = res[0].product_name;
      var productPrice = res[0].price;
      var total = res[0].price * quantity;

      if (quantity > stockQuantity){
        console.log("Sorry! There are only " + stockQuantity + " available");
        promptQuantity(itemID);
      }
      else {

        if (quantity === 1){
          console.log("================");
          console.log("Thank you for shopping with us.");
          console.log("You ordered " + quantity + " " + productName + " for $" + productPrice + ".");
          console.log("Your total is $" + total + ".");

          updateQuantity(itemID, productName, quantity, stockQuantity)
          confirm();
        }
        else if (quantity > 1){
          console.log("================");
          console.log("Thank you for shopping with us.");
          console.log("You ordered " + quantity + " " + productName + "s for $" + productPrice + " each.");
          console.log("Your total is $" + total + ".");

          updateQuantity(itemID, productName, quantity, stockQuantity)
          confirm();
        }
        else if (quantity == 0){
          console.log("Terrific, you ordered nothing.");
          confirm();
        }
        else {
          console.log("Please enter a valid quantity.");
          promptQuantity(itemID);
        }
      }
    })
  })  
};

function updateQuantity(itemID, productName, quantity, stockQuantity) {

  var updatedQuantity = stockQuantity - quantity;
  console.log("================");
  console.log("ItemID: " + itemID);
  console.log("There was " + stockQuantity);
  console.log("You Bought " + quantity);
  console.log("There are now " + updatedQuantity);
  console.log("================");

  var sql = "UPDATE bamazonTable SET stock_quantity = '" + updatedQuantity + "' WHERE item_id = '" + itemID + "'";
  connection.query(sql , function (err, result) {
    if (err) throw err;
  });
}

function confirm() {
  inquirer.prompt([
  {
    name: "confirm",
    message: "Press any key to continue."
  }])
  .then(function(answers){
    var confirm = answers.confirm;
    displayItems();
  })
};

function exit() {
  console.log('Press any key to exit');

  process.stdin.setRawMode(true);
  process.stdin.resume();
  process.stdin.on('data', process.exit.bind(process, 0));
};