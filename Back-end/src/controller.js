const database = require("./database");
const FoodRepository = require("./repository");

const repository = new FoodRepository(database);

async function getAllFoods(request, reply) {
  const responseDB = await repository.getAllFoods();

  if (responseDB.error) return reply.status(404).json(responseDB.error);

  reply.json(responseDB);
}

async function getFoodById(request, reply) {
  const id = request.params.id;

  const responseFood = await repository.getFoodById(id);
  
  if (responseFood.length === 0) {
    return reply.status(404).json({ error: "Alimento não encontrado" });
  }

  const responseFillings = await repository.getFillingsById(id);

  const response = {
    food: responseFood,
    fillings: responseFillings,
  };

  reply.json(response);
}

async function setPayment(request, reply) {
  try {
    const requiredFields = ['id_foods', 'cpf', 'description', 'price'];
    for (const field of requiredFields) {
      if (!request.body[field]) {
        return reply.status(400).json({ error: `Campo ${field} é obrigatório` });
      }
    }

    const responseDB = await repository.setPayment(request.body);
    return reply.json(responseDB);
    
  } catch (error) {
    console.error("Erro no pagamento:", error);
    return reply.status(500).json({ error: "Erro ao processar pagamento" });
  }
}

async function getHistoryByCpf(request, reply) {
  const { cpf } = request.query;

  if (!cpf) return reply.status(400).json({ error: "CPF é obrigatório" });

  const responseDB = await repository.getHistoryByCpf(cpf);

  if (responseDB.error) return reply.status(404).json(responseDB.error);

  reply.json(responseDB);
}

module.exports = { getAllFoods, getFoodById, setPayment, getHistoryByCpf };