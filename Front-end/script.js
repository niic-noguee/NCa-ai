let currentFoodId = 1;
let selectedFillings = [];
const API_BASE_URL = "http://localhost:8080"; 

// Obter comida e recheios
async function getFood(idFood) {
  try {
    const response = await fetch(`http://localhost:3000/food/${idFood}`, {
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Dados recebidos:", data);

    if (!data.food || !data.fillings) {
      throw new Error("Dados incompletos da API");
    }

    document.querySelector("#price").textContent = data.food[0].price.toFixed(2);
    renderFillings(data.fillings);
    
  } catch (error) {
    console.error("Erro detalhado:", error);
    alert(`Erro ao carregar: ${error.message}\nVerifique o console (F12)`);
  }
}

// Renderizar recheios
function renderFillings(fillings) {
  const fillingsContainer = document.querySelector(".fillings");
  fillingsContainer.innerHTML = "";

  fillings.forEach(filling => {
    let div = document.createElement("div");
    div.innerHTML = `
      <input type="checkbox" value="${filling.price}" 
             data-price="${filling.price}" 
             onchange="updateSelectedFillings(this, '${filling.name}', ${filling.price})" />
      ${filling.name} (R$ ${filling.price.toFixed(2)})
    `;
    fillingsContainer.appendChild(div);
  });
}

// Atualizar recheios selecionados
function updateSelectedFillings(checkbox, name, price) {
  if (checkbox.checked) {
    selectedFillings.push({ name, price });
  } else {
    selectedFillings = selectedFillings.filter(item => item.name !== name);
  }
  calculateTotal();
}

// Calcular preço total
function calculateTotal() {
  const basePrice = parseFloat(document.querySelector("#price").textContent || "0");
  const fillingsTotal = selectedFillings.reduce((sum, item) => sum + item.price, 0);
  const total = basePrice + fillingsTotal;
  
  document.querySelector("#totalPrice").textContent = total.toFixed(2);
}

// Finalizar compra
async function completePurchase() {
  try {
    // 1. Coletar dados
    const cpf = document.querySelector("#cpf").value.trim();
    const foodName = document.querySelector('input[name="food"]:checked').nextSibling.textContent.trim();
    const basePrice = parseFloat(document.querySelector("#price").textContent);
    const totalPrice = parseFloat(document.querySelector("#totalPrice").textContent);
    
    // 2. Validações
    if (!cpf) throw new Error("CPF é obrigatório!");
    if (cpf.length < 11) throw new Error("CPF deve ter 11 dígitos");
    if (selectedFillings.length === 0) throw new Error("Selecione pelo menos 1 recheio");
    if (isNaN(totalPrice)) throw new Error("Preço inválido");

    // 3. Preparar descrição
    const description = `${foodName} com ${selectedFillings.map(f => f.name).join(", ")}`;
    
    // 4. Enviar para o backend
    const response = await fetch("http://localhost:3000/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_foods: currentFoodId,
        cpf: cpf,
        pay_date: new Date().toISOString().split('T')[0], // Data atual
        description: description,
        price: totalPrice
      })
    });

    // 5. Tratar resposta
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Erro no servidor");
    }

    // 6. Sucesso!
    alert("Compra finalizada com sucesso!");
    
    // 7. Resetar formulário
    selectedFillings = [];
    document.querySelectorAll('.fillings input[type="checkbox"]').forEach(cb => cb.checked = false);
    document.querySelector("#totalPrice").textContent = "0.00";
    
  } catch (error) {
    console.error("Erro na compra:", error);
    alert(`Erro: ${error.message}`);
  }
}

// Inicializar
document.addEventListener("DOMContentLoaded", () => {
  getFood(1);
  
  // Adicionar botão de finalizar compra
  const priceContainer = document.querySelector(".price-container");
  const totalDiv = document.createElement("div");
  totalDiv.innerHTML = `
    <h2>Preço Total: R$ <span id="totalPrice">0.00</span></h2>
    <button onclick="completePurchase()" style="padding: 10px; margin-top: 10px; background-color: #cf2410; color: white; border: none; border-radius: 5px; cursor: pointer;">
      Finalizar Compra
    </button>
  `;
  priceContainer.appendChild(totalDiv);
});