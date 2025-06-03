const express = require("express");
const Controller = require("./controller");
const cors = require("cors");

const server = express();
const PORT = 3000;

server.use(cors({
   origin: "http://localhost:8080", 
   methods: ["GET", "POST"], 
}));
server.use(express.json());

server.get("/foods", Controller.getAllFoods);
server.get("/food/:id", Controller.getFoodById);
server.post("/payment", Controller.setPayment);
server.get("/history", Controller.getHistoryByCpf);

server.listen(PORT, () => console.log("Servidor escutando 👂"));
