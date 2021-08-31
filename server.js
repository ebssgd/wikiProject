const env = process.env.NODE_ENV || "development";
const config = require("./config/config")[env];
const app = require("express")();

require("./config/express")(app);
require("./config/routes")(app);
require("dotenv").config();

const mongoose = require("mongoose");

mongoose
  .connect(process.env.HOST_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) =>
    console.log(
      "Deadpool: I want to die a natural death at the age of 102. Like the city of Detroit."
    )
  )
  .catch((err) => console.log(err));

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Houston, we have a problem."));
db.once("open", function () {
  console.log("We have liftoff!");
});

app.listen(config.port, console.log(`Listening on port ${config.port}!`));

// // Mongo DB Connection
// mongoose.connect(process.env.DB_URI,  {
//   dbName: process.env.DB_NAME,
//   user: process.env.DB_USER,
//   pass: process.env.DB_PASS,
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
//   .then( (res) => console.log('db connected'))
//   .catch((err) => console.log(err));

// Check out what the heck an env file is. You need a .env file to use the above code
