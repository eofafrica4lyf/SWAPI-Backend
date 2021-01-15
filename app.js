require("dotenv").config();
const express = require("express");
const app = express();
const server = require("http").Server(app);
const cors = require("cors");
const helmet = require("helmet")
const hpp = require("hpp");

//middleware
const errorMiddleware = require("./middleware/errors");
const ErrorHandler = require("./utils/ErrorHandler");

const allRoutes = require("./routes");
const swaggerUi = require("swagger-ui-express")
const swaggerDocument = require("./swapiDoc.json")

const PORT = process.env.PORT || 3000;

// express middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//Setup CORS
app.use(cors());

//Setup helmet
app.use(helmet());

// Prevent parameter pollution
app.use(hpp());

//api documentation
app.use("/api-docs", function(req, res, next){
    swaggerDocument.host = req.get('host');
    swaggerDocument.schemes = process.env.NODE_ENV === "production" ? ["https"]: ["http"]
    req.swaggerDoc = swaggerDocument;
    next();
}, swaggerUi.serve, swaggerUi.setup())

//all routes
app.use("/v1", allRoutes)

// Handle unhandled routes
app.all("*", (req, res, next) => {
    next(new ErrorHandler(`${req.originalUrl} route not found`, 404));
})

//error handlder
app.use(errorMiddleware);

server.listen(PORT, () => console.log(`Server is live on port ${PORT}`));

module.exports = server;