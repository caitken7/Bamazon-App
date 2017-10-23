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

function initialize() {
	console.log("*** Welcome Bamazon Manager ***");
	confirmMenu();
};

function confirmMenu() {
  inquirer.prompt([
  {
    name: "confirm",
    message: "Press any key to continue."
  }])
  .then(function(answers){
    var confirm = answers.confirm;
    displayMenu();
  })
};

function displayMenu() {
	console.log("\n=================================\n");
	inquirer.prompt([
	  {
	  	type: "list",
	    name: "menuPrompt",
	    message: "What would you like to do?",
	    choices: ["View Products", "View Low Inventory", "Add to Inventory", "Add New Product"]
	  }])
	.then(function(answers) {

	    var menuPrompt = answers.menuPrompt;

		switch(menuPrompt) {
			case "View Products":
	    		viewProducts()
				break;
			case "View Low Inventory":
				viewLowInventory()
				break;
			case "Add to Inventory":
				addToInventory()
				break;
			case "Add New Product":
				addNewProduct()
				break;
			default:
				console.log("Error")
				return
		}
	});
};

function viewProducts() {

	connection.query("SELECT * FROM bamazonTable", function(err, res) {

	    console.log("\n=================================\n");
	    console.log("*** Product View ***\n");

	    for (i = 0; i < res.length; i++){
	      console.log("++++++++++++++++++++");
	      console.log("Item ID: " + res[i].item_id);
	      console.log("Name: " + res[i].product_name);
	      console.log("Category: " + res[i].department_name);
	      console.log("Price: $" + res[i].price)
	      console.log("Quantity: " + res[i].stock_quantity)
	    }
	    console.log("\n=================================\n");
	    confirmMenu()

  })
  
};

function viewLowInventory () {

	connection.query("SELECT * FROM bamazonTable", function(err, res) {

		var lowQuantity = false;

	    console.log("\n=================================\n");
	    console.log("*** Low Inventory View ***\n");

	    console.log("The following item quantities are low:");

	    for (i = 0; i < res.length; i++){
	    	if (res[i].stock_quantity < 6){
	    		lowQuantity = true;
	    	}
		}

		if (!lowQuantity) {
			console.log("No items are running low.")
		}
		else {
			for (i = 0; i < res.length; i++){
				if (res[i].stock_quantity < 6){
					console.log("++++++++++++++++++++");
					console.log("Item ID: " + res[i].item_id);
					console.log("Name: " + res[i].product_name);
					console.log("Category: " + res[i].department_name);
					console.log("Price: $" + res[i].price)
					console.log("Quantity: " + res[i].stock_quantity)
				}
		    }
		}
		console.log("\n=================================\n");
		confirmMenu()
  	})
  
};

function addToInventory() {
	console.log("\n=================================\n");
    console.log("*** Add to Inventory ***\n");

    // console.log("What item would you like to add");
    connection.query("SELECT * FROM bamazonTable", function(err, res) {

		console.log("\n=================================\n");

		for (i = 0; i < res.length; i++){
		  console.log("++++++++++++++++++++");
		  console.log("ID: " + res[i].item_id + " || Name: " + res[i].product_name);
		  console.log("Category: " + res[i].department_name + " || Price: $" + res[i].price)
		  console.log("Current Stock: " + res[i].stock_quantity)
		}
		console.log("\n=================================\n");

		inquirer.prompt([
			{
			name: "productID",
			message: "Enter the ID of the product you would like to add to:",
			},
			{
			name: "stockQuantity",
			message: "Enter how many units to add:",
			},
			])
			.then(function(answers) {

			var productID = answers.productID;
			var stockQuantity = answers.stockQuantity;
			updateQuantity(productID, stockQuantity);
		});
	})

   

};

function updateQuantity(productID, stockQuantity) {
	connection.query("SELECT * FROM bamazonTable WHERE item_ID='" + productID + "'", function(err, res) {
		
		var newQuantity = parseInt(res[0].stock_quantity) + parseInt(stockQuantity);

		console.log("++++++++++++++++++++");
		console.log("ID: " + res[0].item_id + " || Name: " + res[0].product_name);
		console.log("Category: " + res[0].department_name + " || Price: $" + res[0].price)
		console.log("Current Stock: " + res[0].stock_quantity + " || New Stock: " + newQuantity)
		inquirer.prompt([
		  {
		    name: "confirm",
		    message: "Update this item?(y/n)",
		  }
		])
		.then(function(answers) {
			if (answers.confirm = "y") {
				var sql = "UPDATE bamazonTable SET stock_quantity = '" + newQuantity + "' WHERE item_id = '" + res[0].item_id + "'";
				connection.query(sql , function (err, result) {
					if (err) throw err;
					console.log(stockQuantity + " " + res[0].product_name + "s added to inventory.");
					confirmMenu();
				});
			}
			else {
				displayMenu()
			}
		});
	})

    
}

function addNewProduct() {

    console.log("\n=================================\n");
    console.log("*** Add New Product ***\n");

    // console.log("What item would you like to add");

    inquirer.prompt([
		  {
		    name: "productName",
		    message: "What is the name of the product you would like to add?",
		  },
		  {
		    name: "departmentName",
		    message: "What is the product's department?",
		  },
		  {
		    name: "price",
		    message: "What is the product's price?",
		  },
		  {
		    name: "stockQuantity",
		    message: "How many units are in stock?",
		  },
		])
		.then(function(answers) {

			var productName = answers.productName;
			var departmentName = answers.departmentName;
			var price = answers.price;
			var stockQuantity = answers.stockQuantity;
			
			console.log("You added:\n");
			console.log("Name: " + productName);
			console.log("Department: " + departmentName);
			console.log("Price: $" + price)
			console.log("Quantity: " + stockQuantity)

			var sql = "INSERT INTO bamazonTable (product_name, department_name, price, stock_quantity) values ('" + productName + "', '" + departmentName + "', " + price + ", " + stockQuantity + ")"

			connection.query(sql, function(err, res) {
				
				console.log(productName + " added to inventory!");
				addAnotherProduct();
			})
		});
};

function addAnotherProduct() {
	inquirer.prompt([
	  {
	    name: "addMore",
	    message: "Add another product?(y/n)",
	  }
	])
	.then(function(answers) {

		if (answers.addMore === 'y') {
			addNewProduct()
		}
		else {
			displayMenu()
		}
	});
}


initialize();