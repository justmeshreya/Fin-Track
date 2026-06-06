// Global App State Selection
const balanceEl = document.getElementById('total-balance');
const incomeEl = document.getElementById('total-income');
const expenseEl = document.getElementById('total-expenses');
const listEl = document.getElementById('transaction-list');
const formEl = document.getElementById('transaction-form');
const textInput = document.getElementById('text');
const amountInput = document.getElementById('amount');

// Initialize State from LocalStorage or leave empty
let transactions = localStorage.getItem('transactions') !== null 
    ? JSON.parse(localStorage.getItem('transactions')) 
    : [];

// Function to handle adding a transaction
function addTransaction(e) {
    e.preventDefault();

    const transaction = {
        id: Math.floor(Math.random() * 100000000),
        text: textInput.value,
        amount: +amountInput.value // the + sign parses string to floating number
    };

    transactions.push(transaction);
    updateDOM();
    updateLocalStorage();

    // Reset Form fields
    textInput.value = '';
    amountInput.value = '';
}


function updateValues() {
    const amounts = transactions.map(t => t.amount);

    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
    
    const income = amounts
        .filter(item => item > 0)
        .reduce((acc, item) => (acc += item), 0)
        .toFixed(2);

    const expense = (
        amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1
    ).toFixed(2);

    balanceEl.innerText = `$${total}`;
    incomeEl.innerText = `$${income}`;
    expenseEl.innerText = `$${expense}`;
}

function renderTransactions() {
    listEl.innerHTML = ''; // clear initial screen template state
    
    transactions.forEach(transaction => {
        const sign = transaction.amount < 0 ? '-' : '+';
        const item = document.createElement('li');

        // Apply visual logic based on arithmetic symbol polarity
        item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

        item.innerHTML = `
            ${transaction.text} <span>${sign}$${Math.abs(transaction.amount)}</span>
            <button class="delete-btn" onclick="deleteTransaction(${transaction.id})">x</button>
        `;

        listEl.appendChild(item);
    });
}


window.deleteTransaction = function(id) {
    transactions = transactions.filter(t => t.id !== id);
    updateLocalStorage();
    updateDOM();
}


function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}


function updateDOM() {
    renderTransactions();
    updateValues();
}


formEl.addEventListener('submit', addTransaction);


updateDOM();

