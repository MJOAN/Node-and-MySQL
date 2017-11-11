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
                "What is the item_id of the product you would like to buy?",
                "How many units of the product would you like to buy?"
            ]
        })
        .then(function(answer) {
            switch (answer.action) {
                case "What is the item_id of the product you would like to buy?":
                    searchId();
                    break;

                case "How many units of the product would you like to buy?":
                    buyQuantity();
                    break;
            	}
        	});
		};

function searchId() {   // ask user to enter item_id validate
    inquirer
        .prompt([{
            name: "item",
            type: "input",
            message: "What is the item_id of the product you would like to buy?",
            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }])
	.then(function(answer) {   
		var itemId = answer.item_id;
		console.log('You selected item id: ' + itemId);

        connection.query(   //  validate user input with actual item_id
            "SELECT * FROM products WHERE item_id = ?", {
            },
            
        function(error) {   // if error we have user go back to start
            if (error) {
	            console.log(error)
	            console.log("Your item was not successfully selected! Please start again!");
	            start();
            }
       		else {  //  we have user go to next prompt for unit quantity
	            console.log("Your item was successfully selected!");
	            buyQuantity();  // prompt for buy quantity
	            }
	        });
        });
    };

function buyQuantity() {  // buyquanity() includes 'sufficient stock' logic 
   inquirer
        .prompt([{
            name: "item",
            type: "input",
            message: "How many units of the product would you like to buy?",
            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }])
	.then(function(answer) {  // here we parse answer into integer for quantity
		quantity = parseInt(answer.quantity) {
		console.log('You selected ' + quantity + 'quantity');
		sufficientStock();
		};
	});
};

function sufficientStock() {  //  show stock quantity
    connection.query( 
    	'SELECT * FROM products WHERE ?', [{item_id: stock_quantity}], function(err, res){
			if (error) console.log(error);
				var stock_quantity = res[0].stock_quantity;
				if (quantity >= stock_quantity) {
				console.log('We cannot place this order. There is insufficient stock!');
				}
				else if (quantity <= stock_quantity) {
				console.log('We are in process of placing your order!');
				updateSQL();
				}
			});
    	};

function updateSQL() {  // we update SQL inventory	
	connection.query(
		'UPDATE products SET stock_quantity = stock_quantity MINUS ?', function(err, res) {
			if (error) console.log(error);
				console.log(res);
				orderTotal();
		});
	};

function orderTotal() {  // we provide user with order total
	connection.query( 
    	'SELECT price FROM products WHERE ?', [{item_id: stock_quantity}], function(err, res) {
			if (error) console.log(error);
				quantity = res[0].stock_quantity;
				price = res[0].price;
				orderTotal = quantity * price.toFixed(2);
      			console.log("Thank you for shopping with Bamazon! Your order total is: $" + orderTotal);
			});
		}

            
module.exports = mysql;
module.exports = inquirer;