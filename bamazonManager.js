
var mysql = require("mysql");
var inquirer = require("inquirer");

var itemId; 
var price;
var quantity; 
var orderTotal;

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon"
});

connection.connect(function(err) {  // here we show user SQL products table upon connect
    if (err) console.log(err);
    console.log("connected as id " + connection.threadId);

    connection.query("SELECT * FROM products", function (err, result) {
    if (err) console.log(err);
        console.log(result);
        start();
  });
});

function start() {  // prompt user choices to start ===> answer for switch case
    inquirer
        .prompt({
            name: "action",
            type: "rawlist",
            message: "What would you like to do?",
            choices: [
                "View products for sale",
                "View low inventory",
                "Add to inventory",
                "Add new product"
            ]
        })
        .then(function(answer) {
    switch (answer.action) {
        case "View products for sale":
            saleProducts(); // item IDs, names, prices, and quantities.
            break;

        case "View low inventory":
            lowInventory(); // inventory count lower than five
            break;

        case "Add to inventory":
            addInventory(); //prompt that will 'let' the manager "add more"
            break;

        case "Add new product":
            addProduct(); // add a completely new product to the store
            break;
    }
  });
};

function saleProducts() {
    connection.query("SELECT * FROM products WHERE item_id, product_name, price, stock_quantites", function (err, result) {
    if (err) console.log(err);
        console.log(result);
        start();
    });
  };


function lowInventory() {
    connection.query("SELECT * FROM products WHERE stock_quantites < 5", function (err, result) {
    if (err) console.log(err);
        console.log(result);
        start();
    });
  };


function addInventory() {
   inquirer
        .prompt([{
            name: "item",
            type: "input",
            message: "What item_id would you like to add stock_quantity to?",
            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }])
  .then(function(answer) {   
    var itemId = answer.item_id;
    var quantity = answer.stock_quantity;

    console.log('You selected item id: ' + itemId + ' stock quantity: ' + stock_quantity);

        connection.query(   //  validate user input with actual item_id
            "SELECT * FROM products WHERE item_id = ?", // ADD INTEGER to stock_quantity {
            },
            
        function(error) {   // if error we have user go back to start
            if (error) {
              console.log(error)
              console.log("Your item was not added to inventory! Please try again!");
              start();
            }
          else {  //  we have user go to next prompt for unit quantity
              console.log("Your item was successfully added to inventory!");
              start();
              }
          });
        });
    };



    connection.query("SELECT * FROM products WHERE item_id, product_name, price, stock_quantites", function (err, result) {
    if (err) console.log(err);
        console.log(result);
        start();
    });
  };















