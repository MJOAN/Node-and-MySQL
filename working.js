var mysql = require("mysql");
var inquirer = require("inquirer");

global.item;
global.units;
global.stock;
global.newstock;

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon"
});

connection.connect(function(error) { // here we show user SQL products table upon connect
    if (error) console.log(error);
    console.log("connected as id " + connection.threadId);

    connection.query("SELECT * FROM products", function(error, result, field) {
        if (error) console.log(error);
        console.log(result);
        start();
    });
});

function start() { // prompt user choices to start ===> answer for switch case
    inquirer
        .prompt([{
                type: "input",
                name: "item_id",
                message: "What is the item_id of the product you would like to buy?"
            },
            {
                name: "units",
                type: "input",
                message: "How many units of the product would you like to buy?",
                validate: function(value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                        return false;
                    }
            },
        ]).then(function(user) {

            console.log(JSON.stringify(user, null, ' '));

            item = user.item_id; // inquirer user response object {name}
            units = parseInt(user.units); // inquirer user response object {input}

            console.log('Thank you! You selected item id: ' + item + ' and number of units: ' + units);

            connection.query(
                "SELECT stock_quantity FROM products WHERE ?", [{item_id: item}], function(error, result, field) {
                    var stock = result.stock_quantity;
                    var newstock = stock - units;
                    console.log(newstock, stock);
                    
                    if (error) {
                        console.log("There was a problem with your order, please start again!");
                        start();
                    } 

                    else if (units > stock) {
                        console.log('We cannot place this order. There is insufficient stock! Please start again!');
                        start();
                    }

                    else (units <= stock) 
   
                        console.log(newstock, stock)
                        console.log('Thank you! We have stock! Your order is being processed!');
                        console.log("Our inventory has been updated with " + newstock + " quantity of stock!");
                        orderTotal();
                    }); 
            
            function orderTotal() {
                connection.query( // update MySQL
                    "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?", [units, item], function(error, result, field) {
                        if (error) {
                            console.log(error);
                        } else {
                        
                            console.log(result.stock_quantity);
                            console.log(result);
                            var product = result.product_name;
                            var price = parseInt(result.price);
                            var quantity = result.stock_quantity;
                            var orderTotal = quantity * price.toFixed(2);
                            
                            //console.log("Your product: " + product + "will ship wihtin 7-10 business days!");
                            console.log("Thank you for shopping with Bamazon! Your order total is: $" + orderTotal);
                        };
                    });
                };
            });
        }
    

