// document.addEventListener('DOMContentLoaded', () => {
//     const expenseForm = document.getElementById('expense-form');
//     const expenseInput = document.getElementById('expense-input');
//     const amountInput = document.getElementById('amount-input');
//     const categoryInput = document.getElementById('category-input');
//     const transactionList = document.getElementById('transaction-list');
//     const totalExpense = document.getElementById('total-expense');
//     const totalIncome = document.getElementById('total-income');
//     const balance = document.getElementById('balance');
//
//     expenseForm.addEventListener('submit', (event) => {
//         event.preventDefault();
//
//         const description = expenseInput.value.trim();
//         const amount = parseFloat(amountInput.value.trim());
//         const category = categoryInput.value;
//
//         if (description === '' || isNaN(amount) || amount <= 0) {
//             alert("Please enter a valid expense description and amount.");
//             return;
//         }
//
//         addTransaction(description, amount, category);
//         updateSummary();
//         clearInputs();
//
//     });
//
//     const addTransaction = (description, amount, category) => {
//         const transactionRow = document.createElement('tr');
//
//         transactionRow.innerHTML = `
//         <td>${description}</td>
//         <td>${category}</td>
//         <td>${amount.toFixed(2)}</td>
//         <td><button class="delete-btn">Delete</button></td>
//     `;
//
//         transactionList.appendChild(transactionRow);
//
//         transactionRow.querySelector('.delete-btn').addEventListener('click', () => {
//             transactionRow.remove();
//             updateSummary();
//         });
//     }
//
//     const updateSummary = () => {
//         let totalExpenses = 0;
//         let totalIncomes = 0;
//
//         const transactions = transactionList.querySelectorAll('tr');
//
//         transactions.forEach((transaction) => {
//             const amount = parseFloat(transaction.children[2].textContent);
//             const category = transaction.children[1].textContent;
//
//             if (category === "Income") {
//                 totalIncomes += amount;
//             } else {
//                 totalExpenses += amount;
//             }
//         });
//
//         totalExpense.textContent = totalExpenses.toFixed(2);
//         totalIncome.textContent = totalIncomes.toFixed(2);
//         balance.textContent = (totalIncomes - totalExpenses).toFixed(2);
//     }
//
//     const addIncome = () => {
//
//     }
//
//     const clearInputs = () => {
//         expenseInput.value = '';
//         amountInput.value = '';
//         categoryInput.value = 'Expense';
//     }
//
//
// });


// document.addEventListener('DOMContentLoaded', () => {
//     const expenseForm = document.getElementById('expense-form');
//     const expenseInput = document.getElementById('expense-input');
//     const amountInput = document.getElementById('amount-input');
//     const categoryInput = document.getElementById('category-input');
//     const transactionList = document.getElementById('transaction-list');
//     const totalExpense = document.getElementById('total-expense');
//     const totalIncome = document.getElementById('total-income');
//     const balance = document.getElementById('balance');
//
//     // New elements for handling income
//     const incomeAmountInput = document.getElementById('income-amount');
//
//     let currentTotalIncome = 0;
//
//     // Expense Form Submission
//     expenseForm.addEventListener('submit', (event) => {
//         event.preventDefault();
//
//         const description = expenseInput.value.trim();
//         const amount = parseFloat(amountInput.value.trim());
//         const category = categoryInput.value;
//
//         if (description === '' || isNaN(amount) || amount <= 0) {
//             alert("Please enter a valid expense description and amount.");
//             return;
//         }
//
//         addTransaction(description, amount, category);
//         updateSummary();
//         clearInputs();
//     });
//
//     const addTransaction = (description, amount, category) => {
//         const transactionRow = document.createElement('tr');
//
//         transactionRow.innerHTML = `
//             <td>${description}</td>
//             <td>${category}</td>
//             <td>${amount.toFixed(2)}</td>
//             <td><button class="delete-btn">Delete</button></td>
//         `;
//
//         transactionList.appendChild(transactionRow);
//
//         transactionRow.querySelector('.delete-btn').addEventListener('click', () => {
//             transactionRow.remove();
//             updateSummary();
//         });
//     }
//
//     const updateSummary = () => {
//         let totalExpenses = 0;
//
//         const transactions = transactionList.querySelectorAll('tr');
//
//         transactions.forEach((transaction) => {
//             const amount = parseFloat(transaction.children[2].textContent);
//             const category = transaction.children[1].textContent;
//
//             if (category !== "Income") {
//                 totalExpenses += amount;
//             }
//         });
//
//         totalExpense.textContent = totalExpenses.toFixed(2);
//         balance.textContent = (currentTotalIncome - totalExpenses).toFixed(2);
//     }
//
//     // Add income function triggered by income form
//     const addIncome = () => {
//         const incomeAmount = parseFloat(incomeAmountInput.value.trim());
//
//         if (isNaN(incomeAmount) || incomeAmount <= 0) {
//             alert("Please enter a valid income amount.");
//             return;
//         }
//
//         currentTotalIncome += incomeAmount;
//
//         totalIncome.textContent = currentTotalIncome.toFixed(2);
//         balance.textContent = (currentTotalIncome - parseFloat(totalExpense.textContent)).toFixed(2);
//
//         // Clear income input field
//         incomeAmountInput.value = '';
//     }
//
//     const clearInputs = () => {
//         expenseInput.value = '';
//         amountInput.value = '';
//         categoryInput.value = 'Expense';
//     }
// });

let totalIncome = 0;
let totalExpenses = 0;

// Function to add income
function addIncome() {
    const description = document.getElementById('income-description').value;
    const amount = parseFloat(document.getElementById('income-amount').value);

    if (!description || isNaN(amount) || amount <= 0) {
        alert('Please enter a valid income description and amount.');
        return;
    }

    // Update total income
    totalIncome += amount;
    updateSummary();

    // Add to transaction history
    addToTransactionHistory(description, amount, 'Income');

    // Clear input fields
    document.getElementById('income-description').value = '';
    document.getElementById('income-amount').value = '';
}

// Function to add expense
function addExpense() {
    const description = document.getElementById('expense-description').value;
    const category = document.getElementById('expense-category').value;
    const amount = parseFloat(document.getElementById('expense-amount').value);

    if (!description || isNaN(amount) || amount <= 0) {
        alert('Please enter a valid expense description and amount.');
        return;
    }

    // Update total expenses
    totalExpenses += amount;
    updateSummary();

    // Add to transaction history
    addToTransactionHistory(description, amount, 'Expense', category);

    // Clear input fields
    document.getElementById('expense-description').value = '';
    document.getElementById('expense-amount').value = '';
}

// Function to update the budget summary
function updateSummary() {
    const balance = totalIncome - totalExpenses;
    document.getElementById('total_income').innerText = totalIncome.toFixed(2);
    document.getElementById('total_expenses').innerText = totalExpenses.toFixed(2);
    document.getElementById('balance').innerText = balance.toFixed(2);
}

// Function to add transaction to the history table
function addToTransactionHistory(description, amount, type, category = '') {
    const transactionHistory = document.getElementById('transaction-history');
    const row = document.createElement('tr');

    row.innerHTML = `
    <td>${description}</td>
    <td>${category}</td>
    <td>${amount.toFixed(2)}</td>
    <td>${type}</td>
    <td><button onclick="deleteTransaction(this, ${amount}, '${type}')">Delete</button></td>
  `;

    transactionHistory.appendChild(row);
}

// Function to delete a transaction
function deleteTransaction(button, amount, type) {
    const row = button.parentElement.parentElement;
    row.remove();

    // Update totals based on the transaction type
    if (type === 'Income') {
        totalIncome -= amount;
    } else if (type === 'Expense') {
        totalExpenses -= amount;
    }

    updateSummary();
}

// Function to clear all transactions
function clearAll() {
    document.getElementById('transaction-history').innerHTML = '';
    totalIncome = 0;
    totalExpenses = 0;
    updateSummary();
}

