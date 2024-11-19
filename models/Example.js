const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExampleSchema = new Schema({
    ID: Number,
    Name: String,
    Obj: Object,
    Day: Date,
});

module.exports = mongoose.model("example", ExampleSchema, "Example");