const expenseForm = document.getElementById('expense-form');
const expenseName = document.getElementById('expense-name');
const expenseAmount = document.getElementById('expense-amount');
const expenseList = document.getElementById('expense-list');
const totalAmount = document.getElementById('total-amount');

const pages = document.querySelectorAll('.page');
const navLinks = document.querySelectorAll('nav a');

let expenses = [];

function showPage(pageId) {
    pages.forEach(page => {
        page.style.display = page.id === pageId ? 'block' : 'none';
    });
}

function handleRouteChange() {
    const pageId = window.location.hash.substring(1) || 'dashboard';
    showPage(pageId);
}

window.addEventListener('hashchange', handleRouteChange);
window.addEventListener('load', handleRouteChange);

function renderExpenses() {
    expenseList.innerHTML = '';
    let total = 0;
    expenses.forEach((expense, index) => {
        const li = document.createElement('tr');
        li.innerHTML = `
            <td>${expense.name}</td>
            <td>$${expense.amount.toFixed(2)}</td>
            <td><button class="delete-btn" data-index="${index}">Delete</button></td>
        `;
        expenseList.appendChild(li);
        total += expense.amount;
    });
    totalAmount.textContent = total.toFixed(2);
}

function addExpense(e) {
    e.preventDefault();
    const name = expenseName.value;
    const amount = parseFloat(expenseAmount.value);
    if (name && amount) {
        expenses.push({ name, amount });
        renderExpenses();
        expenseName.value = '';
        expenseAmount.value = '';
    }
}

function deleteExpense(e) {
    if (e.target.classList.contains('delete-btn')) {
        const index = e.target.dataset.index;
        expenses.splice(index, 1);
        renderExpenses();
    }
}

expenseForm.addEventListener('submit', addExpense);
expenseList.addEventListener('click', deleteExpense);

renderExpenses();
