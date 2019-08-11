var inquirer = require('inquirer');
var mysql = require("mysql");

//connection to mysql to bamazon database
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "bamazon"
});

//connection test
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    // connection.end();

    //runs function to list all items
    listAllItems();
});

//function to list all products listed on bamazon
function listAllItems() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].price);
        }
        console.log("-----------------------------------");

        //runs inquirer function
        userBuy();
    })
}

//compares user prompts to database and allows purchse or if unavailable
function inventoryCheck(id, units) {
    console.log(id);
    console.log(units);
   var storeID;
   var storeUnits;
   
    connection.query("SELECT * FROM products", function (err, res) {
        var newStock;
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            storeID = res[i].item_id;
            storeUnits = res[i].stock_quantity;
            if(storeID == id) {
                if (storeUnits < units) {
                    console.log("Insufficient quantity! in inventory. Please try again.");
                }
                else {
                    newStock = storeUnits - units;
                    //runs function to take in a new stock number for database
                    updateProduct(storeID, newStock);
                    var price = res[i].price*units;
                    console.log("You have successfully purchased this item! Your total cost will be " + price);
                }
            }
        }
        connection.end();
    })
}

//function that asks user what item they would like to buy and how many of each
function userBuy() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Enter the ID number of the item you would like to purchase: ",
                name: "item_id"
            },
            {
                type: "input",
                message: "How many units of each would you like to purchase?",
                name: "units"
            }
        ])
        .then(function (inquirerResponse) {
            inventoryCheck(inquirerResponse.item_id, inquirerResponse.units);
        })
}

//updates stock_quantity of items purchased to the database
function updateProduct(id, unitsLeft) {
    var query = connection.query(
      "UPDATE products SET ? WHERE ?",
      [
        {
          stock_quantity: unitsLeft
        },
        {
          item_id: id
        }
      ],
      function(err, res) {
        if (err) throw err;
        // console.log(res.affectedRows + " products updated!\n");
        // Call deleteProduct AFTER the UPDATE completes
      }
    );
  
    // logs the actual query being run
    // console.log(query.sql);
  }