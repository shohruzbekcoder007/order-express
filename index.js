const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const user = require('./routers/user.router');
const foodtype = require('./routers/foodtype.router');
const restaurant = require('./routers/restaurant.router');
const food = require('./routers/food.router');
const supplier = require('./routers/supplier.router');
const foodmeasure = require('./routers/foodmeasure.router');

const swaggerJsdoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")
const options = require("./swagger.json")

const app = express();

const specs = swaggerJsdoc({
    swaggerDefinition: options,
    apis: ["./routers/*.js"]
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/user', user)
app.use('/api/foodtype', foodtype)
app.use('/api/restaurant', restaurant)
app.use('/api/food', food)
app.use('/api/supplier', supplier)
app.use('/api/foodmeasure', foodmeasure)

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs
        // ,{ explorer: true }
    )
);

// Serverni ishga tushirish
const PORT = process.env.PORT || 8085;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


