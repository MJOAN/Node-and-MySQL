 if (answer.quantity > chosenProduct.stock_quantity) {
                        //if the user quantity is greater than the available product spit the below message
                        console.log(`I am sorry. We do not carry that many items in stock. Please input a valid quantity for ${chosenProduct.product_name}. We currently only have ${chosenProduct.stock_quantity} in our inventory`);
                        end();
                    } else {
                        //if the user quantity is less then the stock quantity, update the product table accordingly with the users quantity, also adds the product_sales based on the product price multiplied by the users quantity.
                        var query = "UPDATE products SET stock_quantity = stock_quantity - ?, product_sales = product_sales + (price * ?) WHERE product_name = ?";
                        connection.query(query, [answer.quantity, answer.quantity, chosenProduct.product_name], function(err, res) {
                            //console.log(`This is the price of the product: ${chosenProduct.price}`);
                            //console.log(`This is the product_sales that is being added to the table ${chosenProduct.product_sales}`);
                            //console.log(`Users quantity: ${answer.quantity}`);
                            if (err) throw "Something went wrong. Please try again";
                            //console.log(res);
                            var total = answer.quantity * chosenProduct.price; // gets the total the user will be paying
                            var dept = chosenProduct.department_name; // grabbing the department name of the chosen item
                            //console.log(dept);
                            var deptQuery = "UPDATE departments SET total_sales = total_sales + ? WHERE department_name = ?";
                            //do another connection query to update the departments table with the total sales made
                            connection.query(deptQuery, [total, dept], function(err, res) {
                                if (err) throw "Something went wrong. Please try again";
                                //console.log("Great Success");
                            });
                            var orderNum = Math.floor(Math.random() * 90000) + 10000; //random order number
                            //console.log(total);
                            console.log(`Thank you for purchasing from Bamazon. Your total is $${total.toFixed(2)}. Your order will be delivered in 9 days after confirmation of payment. Please make sure your billing information is up to date. You will be charged shortly.`);
                            console.log("=================================================");
                            console.log(`Transaction completed. Your Order Number is #${orderNum}. Have a nice day. We thank you for for shopping at Bamazon!`);
                            end();
                        });
                    }
                })

            }
        }
    });
});

var end = function() {
    connection.end(function(err) {
        // The connection is terminated now
    });