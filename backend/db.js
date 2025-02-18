const mongoose = require("mongoose");

mongoose.connect("DATABASE LINK"); //paste link here
const todoSchema = new mongoose.Schema({
  title: String,
  description: String,
  completed: Boolean,
});

const todo = mongoose.model("todo", todoSchema);

module.exports = {
  todo,
};
