let currentFoodId = 1;
let selectedFillings = [];
const API_BASE_URL = "http://localhost:3000";

const fillingsContainer = document.getElementById('fillings-container');
const selectedItemsContainer = document.getElementById('selected-items');
const totalPriceElement = document.getElementById('total-price');
const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
const checkoutBtn = document.querySelector('.checkout-btn');

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
});

function setupEventListeners() {
    // Menu mobile
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
        });
    }

    // Botão de finalizar compra
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', completePurchase);
    }

    // Cards de açaí
    document.querySelectorAll('.food-card').forEach((card, index) => {
        card.addEventListener('click', (event) => {
            selectFood(index + 1, event);
        });
    });
}

// Selecionar açaí
function selectFood(foodId, event) {
    currentFoodId = foodId;
    getFood(foodId);

    document.querySelectorAll('.food-card').forEach(card => {
        card.style.border = '2px solid transparent';
        card.style.transform = 'scale(1)';
    });
    
    const selectedCard = event.currentTarget.closest('.food-card');
    selectedCard.style.border = `2px solid var(--primary-color)`;
    selectedCard.style.transform = 'scale(1.02)';
}

async function getFood(idFood) {
    try {
        showLoading(true);
        
        const response = await fetch(`${API_BASE_URL}/food/${idFood}`);
        
        if (!response.ok) {
            throw new Error(`Erro ${response.status}: ${await response.text()}`);
        }

        const data = await response.json();
        
        if (data.food && data.fillings) {
            renderFillings(data.fillings);
        } else {
            throw new Error("Estrutura de dados inesperada");
        }

    } catch (error) {
        console.error("Erro:", error);
        showMessage(`Erro: ${error.message}`, 'error');
    } finally {
        showLoading(false);
    }
}

// Renderizar recheios
function renderFillings(fillings) {
    fillingsContainer.innerHTML = '';

    if (!fillings || fillings.length === 0) {
        fillingsContainer.innerHTML = '<p class="no-fillings">Nenhum complemento disponível para este item.</p>';
        return;
    }

    fillings.forEach((filling, index) => {
        const fillingId = filling.id || `filling-${index}`;
        const fillingElement = document.createElement('div');
        fillingElement.className = 'filling-item';
        fillingElement.innerHTML = `
            <input type="checkbox" 
                   id="${fillingId}" 
                   data-price="${filling.price}" 
                   onchange="updateSelectedFillings(this, '${filling.name}', ${filling.price})">
            <label for="${fillingId}">
                ${filling.name} (R$ ${filling.price.toFixed(2)})
            </label>
        `;
        fillingsContainer.appendChild(fillingElement);
    });
}

// Atualizar recheios selecionados
function updateSelectedFillings(checkbox, name, price) {
    const filling = { name, price: parseFloat(price) };

    if (checkbox.checked) {
        selectedFillings.push(filling);
    } else {
        selectedFillings = selectedFillings.filter(item => item.name !== name);
    }

    updateOrderSummary();
}

// Atualizar resumo do pedido
function updateOrderSummary() {
    selectedItemsContainer.innerHTML = '';

    const foodCard = document.querySelector(`.food-card:nth-child(${currentFoodId})`);
    if (!foodCard) return;

    const baseFood = foodCard.querySelector('h4').textContent;
    const basePriceText = foodCard.querySelector('p').textContent;
    const basePrice = parseFloat(basePriceText.replace('R$ ', '').replace(',', '.'));

    const baseItem = document.createElement('div');
    baseItem.className = 'selected-item';
    baseItem.innerHTML = `
        <span>${baseFood}</span>
        <span>R$ ${basePrice.toFixed(2)}</span>
    `;
    selectedItemsContainer.appendChild(baseItem);

    // Adicionar recheios
    selectedFillings.forEach(filling => {
        const item = document.createElement('div');
        item.className = 'selected-item';
        item.innerHTML = `
            <span>+ ${filling.name}</span>
            <span>R$ ${filling.price.toFixed(2)}</span>
        `;
        selectedItemsContainer.appendChild(item);
    });
    calculateTotal();
}

// Calcular total do pedido
function calculateTotal() {
    const foodCard = document.querySelector(`.food-card:nth-child(${currentFoodId})`);
    if (!foodCard) return;

    const basePriceText = foodCard.querySelector('p').textContent;
    const basePrice = parseFloat(basePriceText.replace('R$ ', '').replace(',', '.'));
    const fillingsTotal = selectedFillings.reduce((sum, item) => sum + item.price, 0);
    const total = basePrice + fillingsTotal;

    totalPriceElement.textContent = `R$ ${total.toFixed(2)}`;
}

// Finalizar compra
async function completePurchase() {
    const cpfInput = document.getElementById('cpf-input');
    const cpf = cpfInput.value.trim();

    try {
        if (!cpf) throw new Error("CPF é obrigatório!");
        if (cpf.length < 11) throw new Error("CPF deve ter 11 dígitos");
        if (selectedFillings.length === 0) throw new Error("Selecione pelo menos 1 recheio");

        showLoading(true);

        const foodCard = document.querySelector(`.food-card:nth-child(${currentFoodId})`);
        const foodName = foodCard.querySelector('h4').textContent;
        const description = `${foodName} com ${selectedFillings.map(f => f.name).join(", ")}`;
        const totalPrice = parseFloat(totalPriceElement.textContent.replace('R$ ', ''));

        const response = await fetch(`${API_BASE_URL}/payment`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id_foods: currentFoodId,
                cpf: cpf,
                pay_date: new Date().toISOString().split('T')[0],
                description: description,
                price: totalPrice
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Erro no servidor");
        }

        showMessage("Pedido realizado com sucesso!", 'success');
        resetOrder();

    } catch (error) {
        console.error("Erro:", error);
        showMessage(error.message, 'error');
    } finally {
        showLoading(false);
    }
}

// Resetar pedido
function resetOrder() {
    selectedFillings = [];
    document.querySelectorAll('.filling-item input[type="checkbox"]').forEach(cb => {
        cb.checked = false;
        cb.closest('.filling-item').classList.remove('selected');
    });
    updateOrderSummary();
    document.getElementById('cpf-input').value = '';
}

function showMessage(message, type) {
    document.querySelectorAll('.message').forEach(el => el.remove());
    
    const messageElement = document.createElement('div');
    messageElement.className = `message ${type}`;
    messageElement.textContent = message;

    document.querySelector('main').appendChild(messageElement);

    setTimeout(() => {
        messageElement.remove();
    }, 3000);
}

function showLoading(show) {
    const loadingElement = document.getElementById('loading-overlay');
    
    if (show) {
        if (!loadingElement) {
            const newLoadingElement = document.createElement('div');
            newLoadingElement.id = 'loading-overlay';
            newLoadingElement.innerHTML = `
                <div class="loading-spinner"></div>
                <p>Carregando...</p>
            `;
            document.body.appendChild(newLoadingElement);
        }
    } else {
        if (loadingElement) {
            loadingElement.remove();
        }
    }
}