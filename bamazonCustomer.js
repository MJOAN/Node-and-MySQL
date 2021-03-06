var mysql = require("mysql");
var inquirer = require("inquirer");

global.item;
global.units;
global.quantity;
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
        if (error) console.log(error) 
        console.log(result);
        start();
    });
});

function start() { // prompt user choices to start ===> answer for switch case
    inquirer
        .prompt([{
                type: "input",
                name: "id",
                message: "What is the item id of the product you would like to buy?"
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

            item = user.id; // inquirer user response object {name}
            units = parseInt(user.units); // inquirer user response object {input}

            console.log('Thank you! You selected item id: ' + item + ' and number of units: ' + units);

            connection.query(
                "SELECT * FROM products WHERE item_id = " + item, function(error, result, field) {
                    
                    console.log(result)
                    var quantity = result[0].stock_quantity;  // undefined
                    var newstock = quantity - units;  //NaN
                    
                    if (error) {
                        console.log("There was a problem with your order, please start again!");
                        start();
                    } 

                    else if (units > quantity) {
                        console.log('We cannot place this order. There is insufficient stock! Please start again!');
                        start();
                    }

                    else (units <= quantity) 
                        var total = quantity * result[0].price.toFixed(2);
                        console.log(result);
                        var product = result[0].product_name;
                        var price = parseInt(result[0].price);
                        var quantity = result[0].stock_quantity;   
                        console.log('Thank you! We have stock! Your order is being processed!');
                        console.log("Our inventory has been updated with " + newstock + " quantity of stock!");
                        console.log("Your product: " + product + " will ship wihtin 7-10 business days!");
                        console.log("Thank you for shopping with Bamazon! Your order total is: $" + total); 
                        updateSQL();
                     });
                }); 
            };


        function updateSQL() { 
                connection.query( // update MySQL
                    //"UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?", [units, item], 
                    "UPDATE products SET stock_quantity = stock_quantity - " + units + " WHERE id = " + item, function(error, result, field) {
                    if (error) console.log(error);
                    });
                };

