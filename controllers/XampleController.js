const XampleService = require("../services/XampleService");
const axios = require("axios");
const dotenv = require('dotenv')
dotenv.config();
const KOKUSHIMUSOU_SERVER = "http://localhost:"+process.env.PORT;

exports.index = async (req, res) => {
  const obj_operator = {};
  let response = await axios.get(KOKUSHIMUSOU_SERVER+"/get", obj_operator);
  response = response.data.hello[0];
  //console.log(response);
  const id = response.ID;
  const name = response.Name;
  const Obj = response.Obj;
  const day = response.Day;
  res.render('xamplepage', { id: id, name: name, Obj: Obj, day: day });
}

exports.getHelloWorld = async (req, res) => {
  try {
    //const req_body = req.body;
    const response = await XampleService.processHelloWorld();
    if (response) {
      
      res.send({ result: true, hello: response });
    } else {
      res.send({ result: true, hello: "oop" });
    }
  } catch (error) {
    res.send({ error: error.message });
  }
}

// exports.getXampleCreate = async (req, res) => {
//   try {
//     //const req_body = req.body;
//     const response = await XampleService.processXampleCreate();
//     res.send({ result: true, hello: response });
//   } catch (error) {
//     res.send({ error: error.message });
//   }
// }

exports.getXampleGet = async (req, res) => {
  try {
    //const req_body = req.body;
    const response = await XampleService.processXampleGet();
    res.send({ result: true, hello: response });
  } catch (error) {
    res.send({ error: error.message });
  }
}
