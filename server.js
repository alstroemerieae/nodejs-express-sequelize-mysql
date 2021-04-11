const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const db = require("./app/models");
db.sequelize.sync({ force: true }).then(() => {
  console.log("Check http://localhost:8080/api/operations");
});

// Set server to port 8081
var corsOptions = {
  origin: "http://localhost:8081"
};

// Middleware
app.use(cors(corsOptions));
app.use(json());
app.use(urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.json({ message: "App is working. Check http://localhost:8080/api/operations" });
});
require("./app/routes/operation.routes")(app);

// Set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
