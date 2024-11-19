const XampleModel = require("../models//Example");

exports.processHelloWorld = async () => {
  const hi = "Msg from Service: Hello World";
  return hi;
}

//test model không chạy lại
// exports.processXampleCreate = async () => {
//   const xample = {
//     ID: 1,
//     Name: "String",
//     Obj: {object_id: 1, object_name: "Object name"},
//     Day: 2024/11/19,
//   }
//   return XampleModel.create(xample);
// }

exports.processXampleGet = async () => {
  return XampleModel.find();
}