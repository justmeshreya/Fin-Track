<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FinanceTracker - Vanilla JS Dashboard</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="app-container">
        
        <header class="sidebar">
            <div class="logo">🧮 FinTrack</div>
            <nav>
                <a href="#" class="active">Dashboard</a>
            </nav>
        </header>

       
        <main class="main-content">
            <section class="top-bar">
                <h1>Financial Overview</h1>
                <div class="user-profile">JS Developer</div>
            </section>

            <!-- Overview Metrics Grid -->
            <section class="metrics-grid">
                <div class="card balance-card">
                    <h3>Total Balance</h3>
                    <p id="total-balance">$0.00</p>
                </div>
                <div class="card income-card">
                    <h3>Total Income</h3>
                    <p id="total-income">$0.00</p>
                </div>
                <div class="card expense-card">
                    <h3>Total Expenses</h3>
                    <p id="total-expenses">$0.00</p>
                </div>
            </section>

            
            <div class="content-grid">
              
                <section class="card form-section">
                    <h2>Add Transaction</h2>
                    <form id="transaction-form">
                        <div class="form-group">
                            <label for="text">Description</label>
                            <input type="text" id="text" placeholder="e.g., Freelance Project, Grocery" required>
                        </div>
                        <div class="form-group">
                            <label for="amount">Amount ($)</label>
                            <input type="number" id="amount" placeholder="Income (+) or Expense (-)" step="0.01" required>
                            <small>Use a minus (-) sign for expenses.</small>
                        </div>
                        <button type="submit" class="btn-submit">Add Transaction</button>
                    </form>
                </section>

                <!-- History Log Card -->
                <section class="card history-section">
                    <h2>Transaction History</h2>
                    <ul id="transaction-list" class="list">
                        <!-- Dynamic items will be added here via JS -->
                    </ul>
                </section>
            </div>
        </main>
    </div>
    <script src="app.js"></script>
    :root {
    --bg-dark: #0f172a;
    --bg-card: #1e293b;
    --text-main: #f8fafc;
    --text-muted: #94a3b8;
    --primary: #6366f1;
    --success: #10b981;
    --danger: #ef4444;
    --border: #334155;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

body {
    background-color: var(--bg-dark);
    color: var(--text-main);
    height: 100vh;
    overflow: hidden;
}

.app-container {
    display: flex;
    height: 100%;
}


.sidebar {
    width: 240px;
    background-color: #020617;
    border-right: 1px solid var(--border);
    padding: 2rem 1.5rem;
}

.logo {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 2rem;
    color: var(--primary);
}

.sidebar nav a {
    display: block;
    color: var(--text-muted);
    text-decoration: none;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    font-weight: 500;
}

.sidebar nav a.active {
    background-color: var(--primary);
    color: white;
}


.main-content {
    flex: 1;
    padding: 2rem;
    overflow-y: auto;
}

.top-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
}


.metrics-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
}

.card {
    background-color: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 0.75rem;
    padding: 1.5rem;
}

.card h3 {
    font-size: 0.875rem;
    color: var(--text-muted);
    margin-bottom: 0.5rem;
}

.card p {
    font-size: 1.75rem;
    font-weight: bold;
}

.income-card p { color: var(--success); }
.expense-card p { color: var(--danger); }

/* Form and History Grid split */
.content-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
}

@media (max-width: 768px) {
    .content-grid { grid-template-columns: 1fr; }
    .app-container { flex-direction: column; }
    .sidebar { width: 100%; height: auto; }
}


.form-group {
    margin-bottom: 1.25rem;
}

label {
    display: block;
    font-size: 0.875rem;
    color: var(--text-muted);
    margin-bottom: 0.5rem;
}

input {
    width: 100%;
    padding: 0.75rem;
    background-color: var(--bg-dark);
    border: 1px solid var(--border);
    border-radius: 0.5rem;
    color: white;
    font-size: 1rem;
}

input:focus {
    outline: 2px solid var(--primary);
}

small { color: var(--text-muted); }

.btn-submit {
    width: 100%;
    padding: 0.75rem;
    background-color: var(--primary);
    color: white;
    border: none;
    border-radius: 0.5rem;
    font-weight: bold;
    cursor: pointer;
}


.list {
    list-style-type: none;
    max-height: 300px;
    overflow-y: auto;
}

.list li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--bg-dark);
    padding: 0.75rem 1rem;
    margin-bottom: 0.5rem;
    border-radius: 0.375rem;
    border-left: 5px solid transparent;
    position: relative;
}

.list li.plus { border-left-color: var(--success); }
.list li.minus { border-left-color: var(--danger); }

.delete-btn {
    background-color: var(--danger);
    color: white;
    border: none;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    cursor: pointer;
    font-size: 0.75rem;
}
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
</body>
</html>
