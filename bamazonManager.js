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

connection.connect(function(err) { // here we show user SQL products table upon connect
    if (err) console.log(err);
    console.log("connected as id " + connection.threadId);

    connection.query("SELECT * FROM products", function(err, result) {
        if (err) console.log(err);
        console.log(result);
        start();
    });
});

function start() { // prompt user choices to start ===> answer for switch case
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
    connection.query("SELECT item_id, product_name, price, stock_quantity FROM products", function(error, result) {
        if (error) {
            console.log(error);
        } else {
            console.log(result);
            for (var i = 0; i < result[i].length; i++) {
                console.log('Products for Sale');
                console.log('\nProduct item_id: ', result[i].item_id);
                console.log('\nProduct name: ', result[i].product_name);
                console.log('\nProduct price: ', result[i].price);
                console.log('\nProduct stock quantity: ', result[i].stock_quantity);
                start();
            }

        };
    });


    function lowInventory() {
        connection.query("SELECT * FROM products WHERE stock_quantity < 5", function(error, result) {
            if (error) {
                console.log(error);
            } else
                console.log(result);
            for (var i = 0; i < result[i].length; i++) {
                console.log('Products for Sale');
                console.log('\nProduct item_id: ', result[i].item_id);
                console.log('\nProduct name: ', result[i].product_name);
                console.log('\nProduct price: ', result[i].price);
                console.log('\nProduct stock quantity: ', result[i].stock_quantity);
                start();
            }
        });
    };


    function addInventory() {
        inquirer
            .prompt([{
                name: "item_id",
                type: "input",
                message: "Which item would you like to add stock quantity?",
                validate: function(value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                },
                name: "quantity",
                type: "input",
                message: "What quantity will you be adding?",
                validate: function(value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                },
            }])
            .then(function(user) {
                item = user.item_id;
                quantity = user.quantity;

                console.log('You selected item id: ' + item + ' and added stock quantity: ' + quantity);

                connection.query( //  validate user input with actual item_id
                    "UPDATE products SET stock_quantity = stock_quantity - " + units + " WHERE id = " + item,
                    function(error, result, field) {
                        if (error) {
                            console.log(error)
                            console.log("Your item was not added to inventory! Please try again!");
                            start();
                        } else { //  we have user go to next prompt for unit quantity
                            console.log("Your item was successfully added to inventory!");
                            start();
                        }
                    });
            });
    };


    function addProduct() {
        inquirer
            .prompt([{
                name: "action",
                type: "rawlist",
                message: "Please add your product according to the following prompts",
                choices: [
                    "What is the item #?",
                    "What is the product name?",
                    "What is the department name",
                    "What is the product price?",
                    "How many units are in stock?"
                ]
            }]).then(function(user) {

                console.log(JSON.stringify(user, null, ' '));

                for (var i = 0; i < user[i].length; i++) {
                    var item_id = user[i].item_id + '________';
                    var productName = user[i].product_name + '________';
                    var departmentName = user[i].department_name + '________';
                    var price = user[i].price + '________';
                    var quantity = user[i].stock_quantity + '________';
                    console.log(item_id + '|' + productName + '|' + departmentName + '|' + price + '|' + quantity);
                }

                connection.query(
                    'INSERT INTO Products (item_id, product_name, department_name, price, stock_quantity) VALUES (?, ?, ?, ?, ?)' [item_id, productName, departmentName, price, quantity],
                    function(error, result) {

                        if (error) console.log(error);
                        for (var i = 0; i < result[i].length; i++) {

                            console.log(result);
                            console.log('Your new product has been successfully added to inventory!');
                            console.log('Item id: ' + result[0].item_id);
                            console.log('Product name: ' + result[0].product_name);
                            console.log('Department name: ' + result[0].department_name);
                            console.log('Price: $' + result[0].price);
                            console.log('Stock Quantity: ' + result[0].stock_quantity);
                        };
                    });
            });
    };
