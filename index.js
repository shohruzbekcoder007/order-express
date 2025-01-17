const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const user = require('./routers/user.router')
const foodtype = require('./routers/foodtype.router')
const restaurant = require('./routers/restaurant.router')
const app = express()

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(cors())
app.use(bodyParser.json())
app.use('/user', user)
app.use('/foodtype', foodtype)
app.use('/restaurant', restaurant)

// Serverni ishga tushirish
const PORT = process.env.PORT || 8085
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))


