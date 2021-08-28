const mongoose = require("mongoose");
const schema = mongoose.Schema;
const accessory = require("./Accessory");

const cubeSchema = new schema({
  name: String,
  description: String,
  imageUrl: String,
  difficultyLevel: Number,
  addedAccessories: [{ type: schema.Types.ObjectId, ref: "Accessory" }],
});

const Cube = mongoose.model("Cube", cubeSchema);

module.exports = Cube;

exports.newCube = function (req, res) {
  console.log("POSTing new body of code. ", req.body);
  const newCube = new Cube(req.body);
  console.log(newCube);
  newCube.save(function (err, newCube) {
    if (err) return console.error(err);
    console.log("Cube was saved.");
  });

  res.redirect(301, "/");
};