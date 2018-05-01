const express = require("express");
const app = express();
const morgan = require('morgan'); // Logging 
const bodyParser = require('body-parser');

app.use(morgan("dev"));
app.use(bodyParser.json())

const pathToRoutes = "./api/routes/"
const testRoute = require(pathToRoutes + "test");
const elasticRoute = require(pathToRoutes + "elasticsearch")


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin","*"); //TODO: CHANGE TO LOCALHOST ONLY
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization"); //TODO: Decide what headers to use

    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "GET, POST, PATCH"); //TODO: Decide allowed methods
        return res.status(200).json({});
    }

    next();
});

app.use("/test", testRoute);
app.use("/elasticsearch", elasticRoute);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});
  
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});

module.exports = app;