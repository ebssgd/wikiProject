const env = process.env.NODE_ENV || "development";
const config = require("./config/config")[env];
const app = require("express")();

require("./config/express")(app);
require("./config/routes")(app);
const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://ebssgd:Bryan5219@cluster0.vtfhi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
      dbName: "kingslandWiki",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then((res) => console.log("Please, dear God, don't screw this up."))
  .catch((err) => console.log(err));

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Houston, we have a problem."));
db.once("open", function () {
  console.log("We have liftoff!");
});

app.listen(config.port, console.log(`Listening on port ${config.port}!`));
