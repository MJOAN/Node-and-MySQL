
1. Create a new MySQL table called `departments`. Your table should include the following columns:

2. Modify the products table so that there's a product_sales column and modify the `bamazonCustomer.js` 
app so that this value is updated with each individual products total revenue from each sale.

3. Modify your `bamazonCustomer.js` app so that when a customer purchases anything from the store, 
the price of the product multiplied by the quantity purchased is added to the product's product_sales column.

   * Make sure your app still updates the inventory listed in the `products` column.

4. Create another Node app called `bamazonSupervisor.js`. 


5. When a supervisor selects `View Product Sales by Department`, 
the app should display a summarized table in their terminal/bash window. Use the table below as a guide.

| department_id | department_name | over_head_costs | product_sales | total_profit |
| ------------- | --------------- | --------------- | ------------- | ------------ |
| 01            | Electronics     | 10000           | 20000         | 10000        |
| 02            | Clothing        | 60000           | 100000        | 40000        |

6. The `total_profit` 
column should be calculated on the fly using the difference between 
`over_head_costs` and `product_sales`. `total_profit` should not be stored in any database. 
You should use a custom alias.

7. If you can't get the table to display properly after a few hours, 
then feel free to go back and just add `total_profit` to the `departments` table.

   * Hint: You may need to look into aliases in MySQL.
   * Hint: You may need to look into GROUP BYs.
   * Hint: You may need to look into JOINS.
   * **HINT**: There may be an NPM package that can log the table to the console. 
- - -


unction start() {  // prompt user choices to start ===> answer for switch case
    inquirer
        .prompt({
            name: "action",
            type: "rawlist",
            message: "What would you like to do?",
            choices: [
                "View product sales by department?",
                "Create new department?"
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