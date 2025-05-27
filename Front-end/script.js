var infoFood = {};
var infoFillings = [];

async function getFood(idFood) {
  const response = await fetch("http://localhost:8080/food/" + idFood);
  const data = await response.json();

  console.log(data);
  infoFood = data.food[0];
  infoFillings = data.fillings;

  document.querySelector("#price").innerHTML = infoFood.price;
  renderFillings();
}

function renderFillings() {
  document.querySelector(".fillings").innerHTML = "";

  for (let filling of infoFillings) {
    let div = document.createElement("div");
    div.innerHTML = `<input type="checkbox" /> ${filling.name} (R$ ${filling.price})`;

    document.querySelector(".fillings").appendChild(div);
  }
}

/* Pegando as informações da tapioca */
getFood(1);
