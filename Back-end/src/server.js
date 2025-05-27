const express = require("express");
const Controller = require("./controller");
const cors = require("cors");

const server = express();
const PORT = 8080;

server.use(cors());
server.use(express.json());

server.get("/foods", Controller.getAllFoods);
server.get("/food/:id", Controller.getFoodById);
server.post("/payment", Controller.setPayment);

/* TODO: Implementar a rota de históricos 
de pagamentos de um cliente */
// server.get("/history", Controller.getHistoryByCpf);

server.listen(PORT, () => console.log("Server ON"));
